# Molecule Polarity - implementation notes

This document contains miscellaneous notes related to the implementation of Molecule Polarity. It supplements the
internal (source code) documentation, and (hopefully) provides insight into "big picture" implementation issues. The
audience for this document is software developers who are familiar with JavaScript and PhET simulation development, as
described
in [PhET Development Overview](https://github.com/phetsims/phet-info/blob/main/doc/phet-development-overview.md).

First, read [model.md](https://github.com/phetsims/molecule-polarity/blob/main/doc/model.md), which provides a
high-level description of the simulation model.

## General

**Model-view transform**: Many PhET simulations have a model-view transform that maps between model and view coordinate
frames (see `ModelViewTransform2`). The domain of this simulation has no need for a model coordinate frame, so the model
and view coordinate frames are treated as equivalent, and no transform is required. (If you don't understand that, don't
worry about it.)

**Query parameters**: Query parameters are used to enable sim-specific features, mainly for debugging and testing. All
such query parameters are documented in `MPQueryParameters`.

**Memory management**:

Classes related to the Preferences dialog (created dynamically by joist) must implement `dispose`.
See `MPPreferencesNode` and its subcomponents.

Instances of all other classes are created statically, at startup. They are created with `isDisposable: false`, or have
a `dispose` method that looks like this:

```ts
public dispose(): void {
  Disposable.assertNotDisposable();
}
```

## Two Atoms and Three Atoms screens (2D)

The code in `js/common/model/` is a 2D model, used exclusively by these 2 screens.

Some of the view components (particularly controls and icons) in `js/common/view/` are shared by all 3 screens.

The main difference between the "Two Atoms" and "Three Atoms" screens is the lack of "Surface" controls in the "Three
Atoms" screen. As noted in [model.md](https://github.com/phetsims/molecule-polarity/blob/main/doc/model.md), surfaces
are not provided for the Three Atoms screen because the manipulation of bond angles for a triatomic molecule results in
undefinable surfaces.

## Real Molecules screen (3D)

Similar to above, the 3D view coordinates are the same as the model coordinates (in Angstroms).

It uses THREE.js for the 3D view. Additionally, it requires the use of additional THREE.js addons which are not
packaged with THREE.js, and are instead added as a separate sherpa preload (three-r160-addons). THREE.js types are
included via @types/three (perennial), and the addon types are manually specified in view/three-r160-addons.d.ts.

It is highly recommended to familiarize yourself with THREE.js and the underlying WebGL concepts before working
on the 3D view.

### Molecular Data

assets/generate-molecule-data.ts is a script that takes assets/sdf/ as input and writes to assets/generated-data/
(using a large assortment of computational chemistry libraries and tools). assets/generated-data/all-molecules.json is
a combination of all of the molecule JSON, and can be essentially copy-pasted into js/realmolecules/model/RealMoleculeData.ts
for the data section. This molecular data is fairly comprehensive, containing molecular position, structure, surface,
dipoles, partial charges, and more.

It should support adding more molecules (add a SDF and compute), or should be easy to remove molecules or data.
The generation code contains more code that can generate much more than what is currently stored/shipped, including many
more partial charge models if needed in the future.

`RealMolecule` on startup will parse the data into a significantly better API for use in the sim.

### Per-Molecule Overrides

Some molecules require visual or data overrides that are not captured by the generated data. These are centralized in
`js/realmolecules/model/RealMoleculeCustomization.ts` (e.g. initial rotations, bond type overrides like ozone, and
initial bond dipole reversals for specific bonds). When adding or updating molecule data, review and update this file
as needed to keep the 3D view consistent and readable.

### RealMolecule

It has associated data stored in RealAtom/RealBond/SurfaceVertex, and is persistent. They all track whether they are in
"basic" or "advanced" mode, and give updated data accordingly.

### THREE.js Objects

In addition to the 2D Scenery scene graph, we have a 3D THREE.js scene graph. It is generally chosen to suffix these
types with 'View' instead of 'Node' to distinguish them from the 2D Scenery nodes. For example, `AtomView` is a THREE.js
object that represents an atom in the 3D view, while `AtomNode` is a Scenery node that represents an atom in the 2D view.

### THREE.js Disposal

THREE.js geometries, materials and textures need to be manually disposed when no longer needed, or they will leak memory.

This is NOT needed for meshes, object3ds, or other similar types of objects.

### Layering

The main 3D view needs to render certain things in specific orders, due to blending constraints, when the depth buffer
is written, and the significant use of "transparency over transparency over transparency". This is typically problematic
to render in a WebGL-style THREE.js way without specific control over layering.

The `.renderOrder` attribute of THREE.js objects in the main view is specified to control the rendering in the main
render pass, and the constants for that are stored in `RenderOrder.ts`.

Additionally, `depthWrite` and `depthTest` are used on materials to control whether the depth buffer is written to or
tested against for certain objects. A full description of a depth buffer is out of scope for this document, but it is
highly recommended to read https://en.wikipedia.org/wiki/Z-buffering before working with layering concepts in this sim.
Essentially, if one material is rendered with `depthWrite:true`, the position of it will be remembered, and anything
rendered afterward with `depthTest:true` will only be visible if it is closer to the camera than that position.

Notably, the depth buffer is shared ACROSS render passes, so that atom labels are occluded by surfaces, but in front of
other things for visibility.

### Passes

A few needs (focus highlights, molecular dipole highlight, text "over" dipole arrows and surfaces but behind atoms)
require the use of splitting things into separate passes, so THREE.js addons (`EffectComposer` and such) are required.

`EffectComposer` is used with the main renderer to add concrete passes. See RealMoleculesScreenView for more.

### GLSL

It is recommended to have a working familiarity with GLSL ES for working with layering or the main surface. Some custom
shaders needed to be written, and the adapted THREE.js addons also require a bit of understanding of WebGL and GLSL.
