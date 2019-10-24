# Molecule Polarity - implementation notes

This document contains miscellaneous notes related to the implementation of Molecule Polarity. It supplements the internal (source code) documentation, and (hopefully) provides insight into "big picture" implementation issues.  The audience for this document is software developers who are familiar with JavaScript and PhET simulation development, as described in [PhET Development Overview](https://github.com/phetsims/phet-info/blob/master/doc/phet-development-overview.md).

First, read [model.md](https://github.com/phetsims/molecule-polarity/blob/master/doc/model.md), which provides a high-level description of the simulation model.

## General

**Model-view transform**: Many PhET simulations have a model-view transform that maps between model and view coordinate frames (see [ModelViewTransform2](https://github.com/phetsims/phetcommon/blob/master/js/view/ModelViewTransform2.js)). The domain of this simulation has no need for a model coordinate frame, so the model and view coordinate frames are treated as equivalent, and no transform is required. (If you don't understand that, don't worry about it.)

**Query parameters**: Query parameters are used to enable sim-specific features, mainly for debugging and testing. All such query parameters are documented in [MPQueryParameters](https://github.com/phetsims/molecule-polarity/blob/master/js/common/MPQueryParameters.js).

**Memory management**: All objects created in this simulation exist for the lifetime of the simulation, so there is no need to call `dispose`.  Since there is no need to call `dispose`, it is generally not implemented for sim-specific types. Likewise, when an observer is registered (e.g. via `link` or `addListener`), there is no need to unregister that observer (e.g. via `unlink` or `removeListener`).  For clarity, all calls that register an observer indicate whether a corresponding unregister call is required. For example:

```js
// Position the dipole to be parallel with the bond, with some perpendicular offset. unlink not needed.
bond.dipoleProperty.link( function( dipole ) {
  ...
}
```

## Two Atoms and Three Atoms screens (2D)

The code in `js/common/model/` is a 2D model, used exclusively by these 2 screens.
  
Some of the view components (particularly controls and icons) in `js/common/view/` are shared by all 3 screens.

The main difference between the "Two Atoms" and "Three Atoms" screens is the lack of "Surface" controls in the "Three Atoms" screen.  As noted in [model.md](https://github.com/phetsims/molecule-polarity/blob/master/doc/model.md), surfaces are not provided for the Three Atoms screen because the manipulation of bond angles for a triatomic molecule results in undefinable surfaces.

## Real Molecules screen (3D)

*TODO: describe 3D model*, see https://github.com/phetsims/molecule-polarity/issues/32
