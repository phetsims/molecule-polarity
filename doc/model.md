# Molecule Polarity - model description

This is a high-level description of the model used in Molecule Polarity. It's intended for audiences that are not
necessarily technical.

## 2D Model

The "Two Atoms" and "Three Atoms" screens use a 2D model.

**Electronegativity** (EN) ranges internally from 2 to 4, but is never displayed to the user. The difference in EN
between 2 bonded atoms is herein referred to as _delta EN_, and varies from 0 to 2.

**Bond dipoles** are parallel to the bond axis, and their length is linearly proportional to delta EN. Note that this is
a simplification; in reality, dipole is not influenced solely by EN.

**Molecular dipole** is the vector sum of the bond dipoles. In the "Two Atoms" screen, the molecular dipole is not
shown, as it is equivalent to the bond dipole. In the "Three Atoms" screen, manipulating EN results in an understanding
of summing vector magnitudes, while manipulating bond angles results in an understanding of summing vector angles.

The magnitude of an atom's **partial charge** is linearly proportional to the absolute value of delta EN, and we vary
the size of the delta shown accordingly. A partial charge's sign is determined by the sign of delta EN. If an atom has a
higher EN than the atom at the other end of the bond, then the partial charge's sign is negative; otherwise it is
positive. For atoms that participate in more than one bond (e.g., atom B in the "Three Atoms" screen), net partial
charge is the sum of the partial charges contributed by each bond.

**Electrostatic potential** and **electron density** are linearly proportional to delta EN. Larger delta EN corresponds
to greater difference in potential (or electron density)
and is reflected in the coloring of the surface. When delta EN is at its maximum, the surface is colored using the full
range of colors shown in the color key. When delta EN is zero, the entire surface is colored with the neutral color
shown at the midpoint of the color key. These surfaces are not implemented for the triatomic molecule in the "Three
Atoms" screen, because the manipulation of bond angles results in undefinable surfaces.

When the **e-field** is turned on, the molecule rotates until its molecular dipole is in alignment (anti-parallel) with
the e-field. The speed of rotation is linearly proportional to the magnitude of the molecular dipole. Animation is
disabled while the user is rotating the molecule or changing EN values.

## 3D Model

The "Real Molecules" screen uses a 3D model.

Initial molecular geometry is pulled from the [PubChem database](https://pubchem.ncbi.nlm.nih.gov/).

NOTE there is a "basic" and "advanced" mode. In general, the "basic" mode uses simplified intuitive calculations based
on electronegativity differences, while the "advanced" mode uses much more realistic quantum chemistry calculations.

The "basic" mode is intended to be more pedagogical and accessible, while the "advanced" mode is intended to be more
realistic and informative, but less accessible.

### Bond Dipoles

For the "basic" mode, bond dipole magnitude is linearly proportional to delta EN, as in the 2D model.

For the "advanced" mode, bond dipole magnitude is calculated based on the Hirschfeld partial charges, computed from the
quantum chemistry package [ORCA](https://www.faccts.de/orca/). They are then rescaled so that the sum of the bond dipoles
matches the magnitude of the molecular dipole (see below).

### Molecular Dipoles

For the "basic" mode, the molecular dipole is the vector sum of the bond dipoles, as in the 2D model.

For the "advanced" mode, the molecular dipole is calculated from the electron density using the quantum chemistry package
[Psi4](https://psicode.org/).

### Surfaces

The surface geometry for both the "basic" and "advanced" modes is generated as a solvent-excluded surface using
[MSMS](https://ccsb.scripps.edu/msms/) with a probe radius of 1.4 Å.

#### Electrostatic Potential

For the "basic" mode, the electrostatic potential is directly computed from partial charges using the classical 
point-charge Coulomb electrostatic potential (Coulomb superposition). This uses partial charges computed from the
original Java simulation, using the [Spartan](https://www.wavefun.com/products/spartan.html) chemical modeling software.

For the "advanced" mode, the electrostatic potential is computed from the electron density using the Poisson equation,
which is solved numerically using the finite difference method using the quantum chemistry package [Psi4](https://psicode.org/).

The source data of electrostatic potential is colorized by default with white being the neutral (or for the alternative
color scheme in options, green).

#### Electron Density

For the "basic" mode, the electron density is actually just the "basic" electrostatic potential, but re-colored using
the black-to-white color scheme (there is no electron density being computed).

For the "advanced" mode, the electron density is computed using the quantum chemistry package [Psi4](https://psicode.org/).

The source data of electron density is colorized by a consistent across-molecule color scheme, with white being
the lowest density and blue being the highest density.

### Partial Charges

Only shown for the "advanced" mode, this is computed using the quantum chemistry package 
[ORCA](https://www.faccts.de/orca/) using the Hirschfeld method.