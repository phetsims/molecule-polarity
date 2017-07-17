# Molecule Polarity - model description

This is a high-level description of the model used in Molecule Polarity. It's intended for audiences
that are not necessarily technical.

## 2D Model

The "Two Atoms" and "Three Atoms" screens use a 2D model.

**Electronegativity** (EN) ranges internally from 2 to 4, but is never displayed to the user.
The difference in EN between 2 bonded atoms is herein referred to as _delta EN_,
and varies from 0 to 2.

**Bond dipoles** are parallel to the bond axis, and their length is linearly proportional
to delta EN. Note that this is a simplification; in reality, dipole is not influenced
solely by EN.

**Molecular dipole** is the vector sum of the bond dipoles. In the "Two Atoms" screen,
the molecular dipole is not shown, as it is equivalent to the bond dipole.
In the "Three Atoms" screen, manipulating EN results in an understanding of summing
vector magnitudes, while manipulating bond angles results in an understanding
of summing vector angles.

The magnitude of an atom's **partial charge** is linearly proportional to the absolute value
of delta EN, and we vary the size of the delta shown accordingly. A partial charge's sign
is determined by the sign of delta EN. If an atom has a higher EN than the atom at the other
end of the bond, then the partial charge's sign is negative; otherwise it is positive.
For atoms that participate in more than one bond (e.g., atom B in the "Three Atoms" screen),
net partial charge is the sum of the partial charges contributed by each bond.

**Electrostatic potential** and **electron density** are linearly proportional to delta EN.
Larger delta EN corresponds to greater difference in potential (or electron density)
and is reflected in the coloring of the surface. When delta EN is at its maximum, the
surface is colored using the full range of colors shown in the color key.  When delta
EN is zero, the entire surface is colored with the neutral color shown at the midpoint
of the color key. These surfaces are not implemented for the triatomic molecule in
the "Three Atoms" screen, because the manipulation of bond angles results in undefinable surfaces.

When the **e-field** is turned on, the molecule rotates until its molecular dipole
is in alignment (anti-parallel) with the e-field. The speed of rotation is linearly proportional
to the magnitude of the molecular dipole. Animation is disabled while the user
is rotating the molecule or changing EN values.

## 3D Model

*TODO: describe 3D model*, see https://github.com/phetsims/molecule-polarity/issues/32
