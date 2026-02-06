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

### Layering

The main 3D view needs to render certain things in specific orders, due to blending constraints, when the depth buffer
is written, and the significant use of "transparency over transparency over transparency". This is typically problematic
to render in a WebGL-style THREE.js way without specific control over layering.

The `.renderOrder` attribute of THREE.js objects in the main view is specified to control the rendering in the main
render pass, and the constants for that are stored in `RenderOrder.ts`.

### Passes

A few needs (focus highlights, molecular dipole highlight, text "over" dipole arrows and surfaces but behind atoms)
require the use of splitting things into separate passes, so THREE.js addons (`EffectComposer` and such) are required.

`EffectComposer` is used with the main renderer to add concrete passes.