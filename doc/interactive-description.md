# EM Explorations

## To do

- Map out with visual more detailed interaction information for the three different slider types (move, rotate, and electronegativity), as requested for developer.  
- Add design for Screen 3

## Most Important Notes

**Biggest design challenges in this sim so far: Describing Rotate interaction so clear nonvisually, and describing magnitude of molecular dipole qualitatively so that learner can infer it is the sum of bond dipoles.**  
**As a result:** 

* **This design incorporates three distinct slider designs. The Rotate slider design (Rotate Molecule AB and Rotate Molecule ABC) currently have the most uncertainty in terms of interaction design. Developing a lightweight prototype would be valuable for testing and refinement.**  
* **The MolecularDipole6 parameter also may need further refinement, so a lightweight version of this would be helpful.** 

# Interactive objects / Traversal Order

## Two Atoms

Rotate Molecule AB, slider (rotation)   
Atom A, Electronegativity slider  
Atom B, Electronegativity slider  
Bond Dipole, checkbox  
Partial Charges, checkbox  
Bond Character, checkbox  
Surface, radio Button (None, Electrostatic Potential, Electron Density)  
Electric Field, toggle button

Reset All, button

Home, button  
Screen 1, button  
Screen 2, button  
Screen 3, button  
Keyboard Shortcuts, button  
All Audio, toggle button  
Preferences, pop-up button  
PhET Menu, pop-up button

## Three Atoms

Move Atom A, slider (move around B)   
Atom C, slider (move around B)   
Rotate Molecule ABC, slider (rotation)   
Atom A, Electronegativity slider  
Atom B, Electronegativity slider  
Atom C, Electronegativity slider  
Bond Dipole, checkbox  
Molecular Dipole, checkbox  
Partial Charges, checkbox

Electric Field, toggle button

Reset All, button

Home, button  
Screen 1, button  
Screen 2, button  
Screen 3, button  
Keyboard Shortcuts, button  
All Audio, toggle button  
Preferences, pop-up button  
PhET Menu, pop-up button

# Regions / Parameters

| Parameters | Region Count | Screen | Region Names | Notes |
| ----- | ----- | ----- | ----- | ----- |
| **BondChar6** | 6 | 1 | {{nonpolar covalent / nearly nonpolar covalent / slightly polar covalent / polar covalent / slightly ionic / mostly ionic}} | Can’t say “ionic”. Implementation: See Bond Parameters table |
| **BondCharProgress2** | 2 | 1 | {{more ionic / more covalent}} | Implementation: ΔEN \> 0 \= more ionic; ΔEN \< 0 more covalent |
| **BondDipole6** | 6 | 1/2 | {{no / very small / small / medium / large / very large}} | Implementation: See Bond Parameters table |
| **DipoleOrientAB2** | 2 | 1/2 | {{B / A}} |  |
| **DipoleOrientBC2** | 2 | 2 | {{B / C}} |  |
| **DipoleProgress3** | 3 | 1/2 | {{smaller / larger / zero}} | Maybe none instead of zero? Both awkward at times, but I think zero is more clear between the two. |
| **ElectronDensity6** | 6 | 1 | {{evenly / nearly evenly / slightly unevenly / unevenly / very unevenly / most unevenly}} | Question: Is there a better terminology for this, particularly helping with this last one?  |
| **ElectronDensityShift4** | 4 | 1 | {{shifted slightly / shifted / shifted much more / shifted almost completely}} |  |
| **ElectronDensityProgress2** | 2 | 1 | {{more / less}} |  |
| **ElectroPotential6** | 6 | 1 | {{no / very small / small / medium / large / very large}} |  |
| **ElectroPotentialProgress5** | 5 | 1 | {{more positive / less positive / neutral / less negative / more negative}} | 2-range spectrum \- positive-neutral-negative, need to reflect this in progress description |
| **EN6-A/B/C** | 6 | 1/2 | {{very low / low / medium-low / medium-high / high / very high}} |  |
| **Field2** | 2 | 1/2 | {{on / off}} |  |
| **MolecularDipole6** | 6 | 2 | {{no / very small / small / large / very large / extremely large}} | Need to list mappingMay need a larger region set \- alternative 7-region set \= {{no / very small / small / medium / large / very large / extremely large}} |
| **Orient12** | 12 | 2 | {{1 \- 12}} |  |
| **OrientationAtomA** | 9 | 1 | {{at 9 / between 10 and 11 / at 12 / between 1 and 2 / at 3 / between 4 and 5 / at 6 / between 7 and 8 / at 9}} | Changed from 4 quadrant approach to clockface to bridge with Three Atom screen. Went with “between…” rather than “10:30” for example, so sentence structure ends in “o’clock”. May be a simpler way to result in the same outcome. |
| **OrientationAtomB** | 9 | 1 | {{at 3 / between 4 and 5 / at 6 / between 7 and 8 / at 9 / between 10 and 11 / at 12 / between 1 and 2 / at 3}} |  |
| **OrientationMol3** | 3 | 1 | {{horizontal / diagonal / vertical}} |  |
| **PartialCharge2** | 2 | 1/2 | {{positive / negative}} |  |
| **PartialCharge6** | 6 | 1/2 | {{no / very small / small / medium / large / very large}} |  |
| **PartialChargeProgress3** | 3 | 1/2 | {more positive / more negative / zero}} | Maybe none instead of zero?? |
| **Polarity6** | 6 | 1/2 | {{nonpolar / weakly polar / polar / strongly polar / very strongly polar}} |  |
| **Rotation2** | 2 | 1/2 | {{clockwise / counterclockwise}} |  |
| **Shape7** | 7 | 2 | {linear / nearly linear / slightly bent / bent / very bent / extremely bent, slight overlap / atoms overlap}} | Last one may need work, depends on visual. |
| **Note: Does Not Include aria-valuetext for sliders. See list associated with each slider below.** |  |  |  |  |

## Bond Parameters

| ΔEN | Polarity | Bond Dipole | Partial Charges | Bond Character | Electrostatic Potential | Electron Density |  |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | ----- |
| **0** | nonpolar | no | no | nonpolar covalent | no difference | evenly shared |  |
| **0\<ΔEN≤0.2** | very weakly polar | very small | Very small | nearly nonpolar covalent | Very small difference | nearly evenly shared |  |
| **0.2\<ΔEN≤0.4** | very weakly polar | very small | Very small | nearly nonpolar covalent | Very small difference | nearly evenly shared |  |
| **0.4\<ΔEN≤0.6** | weakly polar | small | small | slightly polar covalent | small difference | slightly unevenly shared |  |
| **0.6\<ΔEN≤0.8** | weakly polar | small | small | slightly polar covalent | small difference | slightly unevenly shared |  |
| **0.8\<ΔEN≤1** | polar | medium | medium |   polar covalent | medium difference | unevenly shared |  |
| **1\<ΔEN≤1.2** | polar | medium | medium |  polar covalent | medium difference | unevenly shared |  |
| **1.2\<ΔEN≤1.4** | strongly polar | large | large |  slightly ionic | large difference | very unevenly shared |  |
| **1.4\<ΔEN≤1.6** | strongly polar | large | large |  slightly ionic | large difference | very unevenly shared |  |
| **1.6\<ΔEN≤1.8** | very strongly polar | very large | very large | Mostly ionic  | very large difference | most unevenly shared |  |
| **1.8\<ΔEN≤2** | very strongly pola | very large | very large | Mostly ionic | very large difference | most unevenly shared |  |

# Two Atom Screen

## Screen Summary

| Status  | Screen Summary  Sections | Design | Notes |
| ----- | ----- | ----- | ----- |
| Ready for Review | **Play Area** | In Play Area: There is an interactive two-atom molecule, A–B. You can rotate the molecule, and change each atom’s electronegativity to explore the effect on the bond dipole. Turn on an electric field to see how the molecule responds. | Question: Could say “molecule’s polarity” instead of bond dipole…? |
| Ready for Review | **Control Area** | In Control Area: Checkboxes change visibility of the bond dipole and partial charges. A radio button lets you choose to add electrostatic potential or electron density surfaces to the molecule. You can turn on the electric field, or reset the sim to start over. |  . |
| Ready for Review | **Current Details** | Currently, the molecule is {{Polarity6}}. The electric field is {{Field2}}. |  |
|  |  |  |  |
|  |  |  |  |
| Ready for NS | **Interaction Hint** | Change atom electronegativities to explore the effect on the bond dipole. |  |
|  |  |  |  |
|  |  |  |  |

## Play Area

| Status  | Traversal Order | Design | Notes |
| ----- | ----- | ----- | ----- |
| Ready for Dev | ***Under H2 Play Area*** | H3 Heading: **Molecule AB** Structure: intro sentence then list.  Currently, the molecule is: {{Polarity6}}    **If bond dipole checked:** with  {{BondDipole6}} dipole arrow. **If bond dipole nonzero**\- Bond dipole points to {{DipoleOrientAB2}}.   **If partial charges checked:**  Partial charges are {{PartialCharge6}}. **If partial charges:** Atom A has partial {{PartialCharge2}} charge, Atom B has partial {{PartialCharge2}} charge.   **If bond character checked:** Bond is {{BondChar6}}.   ** If radio button \= electrostatic potential:** { $ElectroPotential6 } electrostatic difference across molecule.  **If radio button \= electron density:**     *For first 2 regions:*  Electron density is {{ElectronDensity6}} distributed between atoms. e.g. Electron density {{evenly}} distributed between atoms. OR     *For last 4 regions:* Electron density is {{ElectronDensity6}} distributed, shifted {{ElectronDensityShift4}} towards atom {{A / B}}.              e.g. Electron density {{slightly unevenly}} distributed, shifted                      {{slightly}} towards Atom {{B}}.   **If Electric Field toggle \= on and molecule polar:** Molecule aligned with electric field. **Orientation:** Molecule is {{OrientationMol3}} with Atom A {{OrientationAtomA}} o’clock and Atom B {{OrientationAtomB}} o’clock. **Electronegativity values:** Electronegativity for atom A is {{EN6-A}}, for Atom B is {{EN6-B}}.   | Bond list / molecule list suggestion.Tried this suggestion, not sure it helps. Breaking up this way doesn’t feel helpful \- orientation is least important thing so don’t want to list that very early, etc. Also nice to stay aligned with ordering in control panel \- those are already ordered based on priority.  |
| Ready for Dev | ***Slider***  Slider Min:0 Slider Max: 2pi Increments: Default \= 2pi/8 Shift+arrow \= no difference | **accessibleName:** Rotate Molecule AB **accessibleHelpText: Rotate molecule 360 degrees.**  **accessibleObjectResponse (ARIA valuetext for slider):**  0 degrees, horizontal 45 degrees, diagonal 90 degrees, vertical  135 degrees, diagonal 180 degrees, horizontal 225 degrees, diagonal 270 degrees, vertical 315 degrees, diagonal 360 degrees, horizontal, back to start  On initial arrowpress for interaction with slider and on direction change: {{Rotation2}}  **accessibleContextResponse**: **If no motion due to electric field:** **none** **If motion due to electric field:** Rotating {{Rotation2}\] Horizontal, Aligned with electric field.  | **Questions:**  Can the slider auto update as the molecule moves in the field? Should the slider go 0-360, or 0-315? Opted for full range to start with. I think it will be needed for the second screen, so it should be consistent here. Code-wise, need to be careful with start and end points in the same location but described differently. Notes:“Molecule rotation” (not the “molecule”) is the object, and other attributes are context. Pros and cons of slider interaction vs draggable object.  Benefits: Moving through a range of values, so \<input type \= “range”\> aligns Single step interaction (not two-step) Simpler delivery of rotation state, I think, through ARIA valuetext.  Possible challenges: Changes due to electric field (may be a benefit, as aria-valuetext may be read out automatically as molecule changes position) Can’t continuously spin molecule, only back-and-forth rotation (no continuous slider) |
| Ready for Dev | **Slider** Slider Min:2 Slider Max: 4 Increments: Default \= 0.4 Shift+arrow \= 0.2 | **accessibleName:** Atom A Electronegativity **accessibleHelpText:** Change how strongly Atom A attracts electrons.  **accessibleObjectResponse:**  Electronegativity ARIA valuetext: 0 \- very low 1 \- low 2 \- medium-low 3 \- medium-high 4 \- high 5 \- very high  **accessibleContextResponse**:   **If bond dipole checked:** Dipole arrow {{DipoleProgress3}}  **If dipole changes direction:** Bond dipole arrow now points to {{DipoleOrientAB2}}   **If partial charges checked:** Partial charge is {{PartialChargeProgress3}} **If partial charge changes sign:** Partial charge now {{PartialCharge2}}    **If bond character checked:** Bond is {{BondCharProgress2}}.   ** If radio button \= electrostatic potential:** {{ElectroPotentialProgress6}} electrostatic difference.  **If radio button \= electron density:** {{ElectronDensityProgress2}} electron density.   ** If Electric Field toggle \= on:** Molecule aligned with electric field.  | For context responses, added progress indicators based on view/surface selections by user. Want wording to front attribute name then progress indicator, but made some more complex sentences so flipped when that was the case (e.g., bond dipole vs electrostatic potential).  **Note on preference for qualitative sliders:**  Quantitative range of 2-4 isn’t great if exposing this. Actual range for atoms is \~0.7 \- 4\. Also, EN has no units, it’s a relative scale. Would probably want to indicate that in helptext or elsewhere, but is actually not relevant to the sim. There’s a reason the visual display has no numbers.  |
| Ready for Dev | **slider** | **accessibleName:** Atom B Electronegativity **accessibleHelpText:** Change how strongly Atom B attracts electrons. **accessibleObjectResponse:**  See Atom A slider **accessibleContextResponse**:  See Atom A slider |   |
|  |  |  |  |
|  |  |  |  |
| Not started |  |  **End Heading Molecule AB** |  |

## Control Area

| Status  | Traversal Order | Design | Notes |
| ----- | ----- | ----- | ----- |
| Ready for Dev | **checkbox** | **accessibleName:** Bond Dipole **accessibleHelpText:** Explore with or without bond dipole shown. **accessibleObjectResponse: ** Check: Bond Dipole shown Uncheck: Bond Dipole hidden **accessibleContextResponse**: **None**  |  |
|  |  |  |  |
|  |  |  |  |
| Ready for Dev | **checkbox** | **accessibleName:** Partial Charges **accessibleHelpText:** Explore with or without partial charges shown. **accessibleObjectResponse:** Check: Partial Charges shown Uncheck: Partial Charges hidden **accessibleContextResponse**: **None**  |  |
| Ready for Dev | **checkbox** | **accessibleName:** Bond Character **accessibleHelpText:** Explore with or without bond character shown. **accessibleObjectResponse: ** Check: Bond Character shown Uncheck: Bond Character hidden **accessibleContextResponse**: **None**  |  |
| Ready for Dev | **Radio button group** | **accessibleName:** Surface  **Button labels:**None Electrostatic Potential  Electron Density **accessibleHelpText:** (one sentence then a list) Explore with different charge surfaces shown.  Electrostatic potential ranges from positive to neutral to negative (surface colors: blue to white to red).  Electron density ranges from less to more (surface colors: white to dark grey).  **accessibleObjectResponse: ** No charge surfaces shown Electrostatic Potential surface shown Electron Density surface shown **accessibleContextResponse**: **None**  | Added “charge” to object response so that it didn't end up with an awkward “no surfaces” statement. There is a surface shown always, just not a charge representation. This addition addresses that issue and adds clarity. |
| Ready for Dev | **Toggle** | **accessibleName:** Electric Field **accessibleHelpText:** Turns the electric field on or off. When on, a negative plate appears on left and a positive plate on right, creating the electric field. **accessibleObjectResponse:** Electric field { $Field2 } **accessibleContextResponse**: **None**  | Need to indicate location of pos/neg plates, to help link to alignment of molecules. |
| Ready for Dev | **button** | **Reset all button, common code** |  |

# Three Atom Screen

## Screen Summary

| Status  | Screen Summary  Sections | Current Design | Notes |
| ----- | ----- | ----- | ----- |
| Ready for Review | **Play Area** | In Play Area: There is an interactive three-atom molecule, A–B–C. You can change each atom’s electronegativity, rotate the molecule around the central atom B, and move atoms A and C to adjust the bond angle. As you make changes, you can explore how shape and bond polarity affect the molecule’s overall dipole. | “Shape” vs “bond angle” |
| Ready for Review | **Control Area** | In Control Area: Checkboxes change visibility of bond dipoles, molecular dipole, and partial charges. You can turn on the electric field to see how the molecule responds, or reset the sim to start over. |  |
| Ready for Review | **Current Details** | Currently, the molecule is {{Polarity6}}, the shape is {{Shape7}}. The electric field is {{Field2}}. |   |
|  |  |  |  |
|  |  |  |  |
| Ready for Review | **Interaction Hint** | Move Atom A or C to explore how shape changes the molecular dipole. | “Shape” vs “bond angle” |
|  |  |  |  |
|  |  |  |  |

## Play Area

| Status  | Traversal Order | Design | Notes |
| ----- | ----- | ----- | ----- |
| Ready for Dev | ***Under H2 Play Area*** | H3 Heading: **Molecule ABC** Structure: intro sentence then list.  Currently, the molecule is: {{Polarity6}}  **Orientation:** Molecule is {{Shape7}} with Atom A at {{Orient12}} o’clock, Atom B at center, and Atom C at {{Orient12}} o’clock. **If Electric Field toggle \= on:** Molecule aligned with electric field. **Electronegativity values:** Electronegativity for atom A is {{EN6-A}}, for Atom B is {{EN6-B}}, for Atom C is {{EN6-C}}.   **If molecular dipole checked:** With {{MolecularDipole6}} molecular dipole arrow.           **If molecular dipole non-zero**  Molecular dipole points to {{Orient12}} o’clock.          When molecular dipole \= 2x bond dipoles Molecular dipole is twice the size of bond dipoles.   (Bond Properties)    **If bond dipole checked:** with {{BondDipole6}} AB bond dipole arrow. **If AB bond dipole non-zero**\- AB bond dipole points to {{DipoleOrientAB2}}, towards {{Orient12}} o’clock. With {{BondDipole6} BC bond dipole arrow **If BC bond dipole non-zero**\- BC bond dipole points to {{DipoleOrientBC2}}, towards {{Orient12}} o’clock.  **If partial charges checked:** Atom A has {{PartialCharge6}}  {{PartialCharge2}} partial charge, Atom B has {{PartialCharge6}} {{PartialCharge2}} partial charge, Atom C has {{PartialCharge6}} {{PartialCharge2}} partial charge. For any atom with no partial charge, remove {{PartialCharge2}} from the phrase.    | Questions: Notes:\- Shape serves as proxy for bond angle. \- Organized this, listing of molecule properties first and then bond properties. For partial charges, I figured there were multiple ways to structure how this sentence changes based on zero partial charge values, so just described desired behavior rather than listing out the logic. Can list specific logic if needed. \- added info about twice the size of the bond dipoles to help learner infer that the molecular dipole is sum of bond dipoles. Hard to convey that with qualitative info only. Cues like this where possible can help.  |
| Not started | ***Slider*** Slider Min:0 Slider Max: 2pi Increments: Default \= 2pi/4 Shift+arrow \= 2pi/12  Left/up \= counterclockwise movement Right/down \= clockwise movement  | **accessibleName:** Move Atom A **accessibleHelpText:** Move Atom A around center Atom B. **accessibleObjectResponse:** aria-valuetext 9 o’clock 10 o’clock 11 o’clock 12 o’clock 1 o’clock 2 o’clock 3 o’clock 4 o’clock 5 o’clock 6 o’clock 7 o’clock 8 o’clock 9 o’clock Additionally, object responses indicating overlap/on top of Atom C. Overlapping Atom C On top of Atom C  **accessibleContextResponse**:    **If bond dipole checked:** Bond dipole points to {{Orient12}} o’clock.  **If molecular dipole checked:** {{MolecularDipole6}} molecular dipole\- points to {{Orient12}} o’clock.  | Notes: Context Responses: For simplicity, choosing to not include context responses re bond dipole magnitude and  partial charges, as they remain unchanged. |
| Ready for Dev | ***Slider*** Slider Min:0 Slider Max: 2pi Increments: Default \= 2pi/4 Shift+arrow \= 2pi/12  Left/up \= counterclockwise movement Right/down \= clockwise movement | **accessibleName:** Move Atom C **accessibleHelpText:** Move Atom C around center Atom B. **accessibleObjectResponse:**  Same as Move Atom A slider, exception start/end at 3 o’clock by default, additional object responses: Overlapping Atom A On top of Atom A  **accessibleContextResponse**:  Same as Move Atom A slider |  |
| Ready for Dev | ***Slider***  Slider Min:0 Slider Max: 360 Increments: Default \= 2pi/8 Shift+arrow \= 2pi/12 | **accessibleName:** Rotate Molecule ABC **accessibleHelpText:** Rotate molecule 360 degrees. **accessibleObjectResponse:** aria-valuetext 0 degrees, starting position 30 degrees 60 degrees 90 degrees 120 degrees 150 degrees 180 degrees, halfway 210 degrees 240 degrees 270 degrees 300 degrees 330 degrees 360 degrees, back to starting position  **accessibleContextResponse**:   **If molecular dipole checked:** Molecular dipole points to {{Orient12}} o’clock.  If motion due to electric field: Rotating {{Rotation2}}, Aligned with electric field.  | Notes:\- Location when electric field is on depends on electronegativity values of sliders, not on user-decided positioning. To assist with this, would be helpful if slider is able to read out any position along continuous interaction in degrees. Once interaction happens through alternative input, slider can snap to position as described here. I believe this is unique to Three Atom screen.  |
| Ready for Dev | **Slider** Slider Min:2 Slider Max: 4 Increments: Default \= 0.4 Shift+arrow \= 0.2 | **accessibleName:** Atom A Electronegativity **accessibleHelpText:** Change how strongly Atom A attracts electrons.  **accessibleObjectResponse:**  Electronegativity ARIA valuetext: 0 \- very low 1 \- low 2 \- medium-low 3 \- medium-high 4 \- high 5 \- very high  **accessibleContextResponse**:   **If bond dipole checked:** Bond dipole arrow {{DipoleProgress3}}     **If bond dipole AB changes direction:** Bond dipole arrow now points to {{DipoleOrientAB2}}  **If molecular dipole checked:** Molecular dipole arrow {{DipoleProgress3}} Points to {{Orient12}} o”clock.   **If partial charges checked:** Partial charge is {{PartialChargeProgress3}} **If partial charge changes sign:** Partial charge now {{PartialCharge2}}   **If Electric Field toggle \= on:** Molecule aligned with electric field.  |   |
| Not started | **Slider** Slider Min:2 Slider Max: 4 Increments: Default \= 0.4 Shift+arrow \= 0.2 | **accessibleName:** Atom B Electronegativity **accessibleHelpText:** Change how strongly Atom B attracts electrons.  **accessibleObjectResponse:**  See Atom A slider **accessibleContextResponse**:   **If bond dipole checked:** Bond dipole AB {{DipoleProgress3}}, BC {{DipoleProgress3}}     **If bond dipole AB changes direction:** Bond dipole AB now points to {{DipoleOrientAB2}}    **If bond dipole BC changes direction:** Bond dipole BC now points to {{DipoleOrientBC2}}  **If molecular dipole checked:** Molecular dipole arrow {{DipoleProgress3}} Points to {{Orient12}} o”clock.   **If partial charges checked:** Partial charge is {{PartialChargeProgress3}}   **If Electric Field toggle \= on and molecule polar:** Molecule aligned with electric field.  |  Notes: Sometimes bond dipole arrows behave the same \- would be ideal to consolidate in those cases. Have not included that in the current design. Bond dipole direction given as AB/BA, molecular dipole given as clock orientation. I think that’s ok, the molecule description in play area will list atoms A/B and molecular dipoles in clock orientation, to help with connections. There is an inherent difficulty with the adding of bond dipoles and atom orientation, since dipoles can flip orientation, but atoms don’t. Question: Is there a different approach that is more streamlined across the sim?  |
|  |  |  |  |
|  |  |  |  |
| Ready for NS | **Slider** Slider Min:2 Slider Max: 4 Increments: Default \= 0.4 Shift+arrow \= 0.2 | **accessibleName:** Atom C Electronegativity **accessibleHelpText:** Change how strongly Atom C attracts electrons. **accessibleObjectResponse:**  See Atom A slider **accessibleContextResponse**:  See Atom A slider \- single difference at: **If bond dipole BC changes direction:** Bond dipole arrow now points to {{DipoleOrientBC2}}  |  |

## Control Area

| Status  | Traversal Order | Design | Notes |
| ----- | ----- | ----- | ----- |
| Ready for Dev | **checkbox** | **accessibleName:** Bond Dipoles **accessibleHelpText:** Explore with or without bond dipoles shown. **accessibleObjectResponse: ** Check: Bond Dipoles shown Uncheck: Bond Dipoles hidden **accessibleContextResponse**: **None**  | Same as 2 Atoms Screen EXCEPT ‘dipole’ is now ‘dipoles’.  |
|  |  |  |  |
|  |  |  |  |
| Ready for Dev | **checkbox** | **accessibleName:** Molecular Dipole **accessibleHelpText:** Explore with or without molecular dipole shown. **accessibleObjectResponse: ** Check: Molecular Dipole shown Uncheck: Molecular Dipole hidden **accessibleContextResponse**: **None** |  |
| Ready for Dev | **checkbox** | **accessibleName:** Partial Charges **accessibleHelpText:** Explore with or without partial charges shown. **accessibleObjectResponse:** Check: Partial Charges shown Uncheck: Partial Charges hidden **accessibleContextResponse**: **None**  | Same as 2 Atoms Screen |
| Ready for Dev | **Toggle** | **accessibleName:** Electric Field **accessibleHelpText:** Turns the electric field on or off. When on, a negative plate appears on left and a positive plate on right, creating the electric field. **accessibleObjectResponse:** Electric field { $Field2 } **accessibleContextResponse**: **None**  | Need to indicate location of pos/neg plates, to help link to alignment of molecules. Same as 2 Atoms Screen |
| Ready for Dev | **button** | **Reset all button, common code** |  |

# Real Molecules

## Screen Summary

| Status  | Screen Summary  Sections | Current Design | Notes |
| ----- | ----- | ----- | ----- |
| Not started | **Play Area** | In Play Area: There is an interactive molecule from a list of real molecules. You can rotate it in 3D and explore its atoms, shape, and polarity,  |  |
| Not started | **Control Area** | In Control Area: You can choose a molecule to explore and use checkboxes to show or hide bond dipoles, the molecular dipole, partial charges, atom labels, and atom electronegativities. You can also choose between electrostatic potential or electron density surfaces to see how charge is distributed. Reset the sim to start over. |  |
| Not started | **Current Details** | Currently, you are viewing **{ $MoleculeName }**. The molecule is **{ $Polarity6 }**, with **{ $ShapeGeometry }** geometry. |   |
|  |  |  |  |
|  |  |  |  |
| Not started | **Interaction Hint** | Choose a molecule and rotate it to explore how shape and bond polarity determine the molecular dipole. |  |
|  |  |  |  |
|  |  |  |  |

## 

| Molecule | Geometry | Polarity6 | ElectroPotential6 | Electron Density Pattern | Bond Dipole Pattern | Molecular Dipole Pattern |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| H2 | linear | nonpolar | no | evenly shared | none | none |
| N2 | linear | nonpolar | no | evenly shared | none | none |
| O2 | linear | nonpolar | no | evenly shared | none | none |
| F2 | linear | nonpolar | no | evenly shared | none | none |
| HF | linear | very strongly polar | very large | highly unevenly shared (toward F) | single strong dipole toward F | strong molecular dipole toward F |
| H2O | bent | strongly polar | large | unevenly shared (toward O) | two dipoles pointing toward O | dipoles reinforce |
| CO2 | linear | nonpolar | small | uneven near O atoms but symmetric | two equal dipoles that oppose | cancel |
| HCN | linear | strongly polar | large | unevenly shared (toward N) | dipole from H→C and C→N align | strong linear dipole toward N |
| O3 | bent | polar | medium | uneven across the three atoms | bond dipoles not equal | partial reinforcement |
| NH3 | trigonal pyramidal | strongly polar | large | unevenly shared (toward N) | three dipoles tilting toward N | reinforce upward |
| BH3 | trigonal planar | nonpolar | very small | nearly evenly shared | three equal dipoles in plane | cancel |
| BF3 | trigonal planar | nonpolar | small | uneven near F atoms but symmetric | three strong outward dipoles | cancel |
| CH2O | trigonal planar | polar | medium–large | uneven (toward O) | strong C=O dipole plus H–C dipoles | reinforce toward O |
| CH4 | tetrahedral | nonpolar | no | evenly shared | four equal dipoles | cancel |
| CH3F | tetrahedral | polar | medium | more density at F | one strong C–F dipole | net dipole toward F |
| CH2F2 | tetrahedral | polar | medium–large | two negative regions at F | two C–F dipoles not opposite | reinforce |
| CHF3 | tetrahedral | strongly polar | large | strong density toward three F atoms | three strong C–F dipoles | large net dipole |
| CF4 | tetrahedral | nonpolar | small | density high at F but symmetric | four equal outward dipoles | cancel |
| CHCl3 | tetrahedral | polar | medium–large | density toward Cl atoms | three C–Cl dipoles dominate | net dipole toward Cl side |

## 

## Play Area

| Status  | Traversal Order | Design | Notes |
| ----- | ----- | ----- | ----- |
| Not started | ***Under H2 Play Area*** | H3 Heading: { **$MolName** } **Molecule** Structure: intro sentence then list.  The molecule is: { $MolFormula }. { $ShapeGeometry } geometry. And is { $Polarity6 }.  **If molecular dipole checked:** With {{MolecularDipole6}} molecular dipole arrow.           **If molecular dipole non-zero**  Molecular dipole points to {{Orient12}} o’clock.          When molecular dipole \= 2x bond dipoles Molecular dipole is twice the size of bond dipoles. (Bond Properties)    **If bond dipole checked:** with {{BondDipole6}} AB bond dipole arrow. **If AB bond dipole non-zero**\- AB bond dipole points to {{DipoleOrientAB2}}, towards {{Orient12}} o’clock. With {{BondDipole6} BC bond dipole arrow **If BC bond dipole non-zero**\- BC bond dipole points to {{DipoleOrientBC2}}, towards {{Orient12}} o’clock.  **If partial charges checked:** Atom A has {{PartialCharge6}}  {{PartialCharge2}} partial charge, Atom B has {{PartialCharge6}} {{PartialCharge2}} partial charge, Atom C has {{PartialCharge6}} {{PartialCharge2}} partial charge. For any atom with no partial charge, remove {{PartialCharge2}} from the phrase. **Electronegativity values:** Electronegativity for atom A is {{EN6-A}}, for Atom B is {{EN6-B}}, for Atom C is {{EN6-C}}.  Surfaces  **Orientation:** Molecule is with Atom A at {{Orient12}} o’clock, Atom B at center, and Atom C at {{Orient12}} o’clock. |   |
| Not started | ***4-way Draggable Object*** Slider Min:0 Slider Max: 2pi Increments: Default \= 2pi/4 Shift+arrow \= 2pi/12  Left/up \= counterclockwise movement Right/down \= clockwise movement  | **accessibleName:** Move { $MolName } **accessibleHelpText:** Move molecule in three dimensions (info re interaction)  **accessibleObjectResponse:** aria-valuetext 9 o’clock 10 o’clock 11 o’clock 12 o’clock 1 o’clock 2 o’clock 3 o’clock 4 o’clock 5 o’clock 6 o’clock 7 o’clock 8 o’clock 9 o’clock Additionally, object responses indicating overlap/on top of Atom C. Overlapping Atom C On top of Atom C  **accessibleContextResponse**:    **If bond dipole checked:** Bond dipole points to {{Orient12}} o’clock.  **If molecular dipole checked:** {{MolecularDipole6}} molecular dipole\- points to {{Orient12}} o’clock.  | Notes:  |
| Not started | ***Combobox***  | **accessibleName:**  Molecule { $MolName } **Button Label with initial selection:** Molecule Hydrogen Fluoride **accessibleHelpText:** Choose a different molecule to view.  **accessibleObjectResponse:**  H₂ (hydrogen) N₂ (nitrogen) O₂ (oxygen) F₂ (fluorine) HF (hydrogen fluoride) H₂O (water) CO₂ (carbon dioxide) HCN (hydrogen cyanide) O₃ (ozone) NH₃ (ammonia) BH₃ (borane) BF₃ (boron trifluoride) CH₂O (formaldehyde) CH₄ (methane) CH₃F (fluoromethane) CH₂F₂ (difluoromethane) CHF₃ (trifluoromethane) CF₄ (tetrafluoromethane) CHCl₃ (chloroform)  **accessibleContextResponse**: **None.**  | Maybe just full name? |

## Control Area

| Status  | Traversal Order | Design | Notes |
| ----- | ----- | ----- | ----- |
| Not started | **checkbox** | **accessibleName:** Bond Dipoles **accessibleHelpText:** Explore with or without bond dipoles shown. **accessibleObjectResponse: ** Check: Bond Dipoles shown Uncheck: Bond Dipoles hidden **accessibleContextResponse**: **None**  | Same as 2 Atoms Screen EXCEPT ‘dipole’ is now ‘dipoles’.  |
|  |  |  |  |
|  |  |  |  |
| Not started | **checkbox** | **accessibleName:** Molecular Dipole **accessibleHelpText:** Explore with or without molecular dipole shown. **accessibleObjectResponse: ** Check: Molecular Dipole shown Uncheck: Molecular Dipole hidden **accessibleContextResponse**: **None** |  |
| Not started | **checkbox** | **accessibleName:** Partial Charges **accessibleHelpText:** Explore with or without partial charges shown. **accessibleObjectResponse:** Check: Partial Charges shown Uncheck: Partial Charges hidden **accessibleContextResponse**: **None**  | Same as 2 Atoms Screen |
| Not started | **checkbox** | **accessibleName:** Atom Labels **accessibleHelpText:** Explore with or without atom labels shown. **accessibleObjectResponse:** Check: Partial Charges shown Uncheck: Partial Charges hidden **accessibleContextResponse**: **None**  | Same as 2 Atoms Screen |
| Not started |  | **accessibleName:** Atom Electronegativities **accessibleHelpText:** Explore with or without atom electronegativities shown. **accessibleObjectResponse:** Check: Partial Charges shown Uncheck: Partial Charges hidden **accessibleContextResponse**: **None** |  |
| Ready for Dev | **button** | **Reset all button, common code** |  |

# 

# Archive

**Two Atom Screen**

Molecule, draggable (rotation) \- 9 presses to go 360deg \[0, 45, 90, etc) \- horizontal / vertical / diagonal (quadrants?), A/B location (“molecule horizontal, A to B or A left, B right) Probably something common in BLV community to map to…not a clock for this. 

Also:   
Bond dipole → magnitude (small, medium, large), direction (A to B / B to A)  
Partial charges → Atom A (value, magnitude), Atom B (value, magnitude). Ex \- Atom A large partial negative charge  
Bond character → Bond is {{mostly ionic / mostly covalent / polar covalent / nonpolar covalent}} (4-point scale for deltaEN)  
Electrostatic potential → Electrostatic potential shows a {{large / medium / small / no}} charge difference across the molecule.  
Electron density → Electron density is {{strongly uneven / slightly uneven / mostly shared / evenly shared}} between atoms.

Atom A, Electronegativity slider \- slider value (qualitative ideal, numeric in EN if available)  
Bond dipole → magnitude (smaller/larger), direction confirmation (same / change)  (A to B / B to A) (vector is longer, corresponding to bigger dipole)  
Partial charges → magnitude (smaller/larger/none), direction confirmation (same / change)  (A to B / B to A) Ex \-  larger partial charges.   
Bond character → more {{ionic / covalent}}

Atom B, Electronegativity slider \- (same)  
Bond Dipole, checkbox  
Partial Charges, checkbox  
Bond Character, checkbox

Surface, radio Button (None, Electrostatic Potential, Electron Density)  
Electric Field, toggle button  
