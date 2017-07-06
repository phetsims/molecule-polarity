// Copyright 2014-2017, University of Colorado Boulder

/**
 * Mol2 data for Molecule Polarity molecules.
 * These strings were created by processing files in data/mol2/ with bin/mol2string.sh
 */
define( function( require ) {
  'use strict';

  // modules
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );

  var mol2Data = {
    BF3: '\n@<TRIPOS>MOLECULE\nM0001\n4 3\nSMALL\nUSER_CHARGES\n\n\n@<TRIPOS>ATOM\n1   B          0.000000000     0.000000000     0.000000000       B   1  M0001    0.842505\n2   F2         1.317730477     0.000000000     0.000000000       F   1  M0001   -0.281790\n3   F3        -0.658865212    -1.141188034     0.000000000       F   1  M0001   -0.280358\n4   F1        -0.658865212     1.141188034     0.000000000       F   1  M0001   -0.280358\n\n\n@<TRIPOS>BOND\n1      1      2    1\n2      1      3    1\n3      1      4    1\n',
    BH3: '\n@<TRIPOS>MOLECULE\nM0001\n4 3\nSMALL\nUSER_CHARGES\n\n\n@<TRIPOS>ATOM\n1   B          0.000000000     0.000000000     0.000000000       B   1  M0001    0.301318\n2   H2         1.194020007     0.000000000     0.000000000       H   1  M0001   -0.100484\n3   H1        -0.597010030     1.034051652     0.000000000       H   1  M0001   -0.100417\n4   H3        -0.597010030    -1.034051652     0.000000000       H   1  M0001   -0.100417\n\n\n@<TRIPOS>BOND\n1      1      2    1\n2      1      3    1\n3      1      4    1\n',
    CF4: '\n@<TRIPOS>MOLECULE\nM0001\n5 4\nSMALL\nUSER_CHARGES\n\n\n@<TRIPOS>ATOM\n1   C          0.000000000     0.000000000     0.000000000     C.3   1  M0001    0.423049\n2   F2         0.767550071     0.767550071     0.767550071       F   1  M0001   -0.105762\n3   F4        -0.767550071    -0.767550071     0.767550071       F   1  M0001   -0.105762\n4   F1        -0.767550071     0.767550071    -0.767550071       F   1  M0001   -0.105762\n5   F3         0.767550071    -0.767550071    -0.767550071       F   1  M0001   -0.105762\n\n\n@<TRIPOS>BOND\n1      1      2    1\n2      1      3    1\n3      1      4    1\n4      1      5    1\n',
    CH2F2: '\n@<TRIPOS>MOLECULE\nM0001\n5 4\nSMALL\nUSER_CHARGES\n\n\n@<TRIPOS>ATOM\n1   C          0.000000000     0.508880377     0.000000000     C.3   1  M0001    0.100550\n2   F1        -0.849638760    -0.279924721     0.712931573       F   1  M0001   -0.159942\n3   F2         0.849638760    -0.279924721    -0.712931573       F   1  M0001   -0.159942\n4   H2         0.584571302     1.120073795     0.696664989       H   1  M0001    0.109667\n5   H1        -0.584571302     1.120073795    -0.696664989       H   1  M0001    0.109667\n\n\n@<TRIPOS>BOND\n1      1      2    1\n2      1      3    1\n3      1      4    1\n4      1      5    1\n',
    CH2O: '\n@<TRIPOS>MOLECULE\nM0001\n4 3\nSMALL\nUSER_CHARGES\n\n\n@<TRIPOS>ATOM\n1   C          0.000000000    -0.513414193     0.000000000     C.2   1  M0001    0.270184\n2   H2         0.937733342    -1.108161039     0.000000000       H   1  M0001    0.038366\n3   H1        -0.937733342    -1.108161039     0.000000000       H   1  M0001    0.038366\n4   O          0.000000000     0.693037081     0.000000000     O.2   1  M0001   -0.346916\n\n\n@<TRIPOS>BOND\n1      1      2    1\n2      1      3    1\n3      1      4    2\n',
    CH3F: '\n@<TRIPOS>MOLECULE\nM0001\n5 4\nSMALL\nUSER_CHARGES\n\n\n@<TRIPOS>ATOM\n1   C          0.000000000    -0.544634581     -0.314444929     C.3   1  M0001   -0.230517\n2   F          0.000000000     0.653285682      0.377174675       F   1  M0001   -0.166365\n3   H3         0.894500911    -0.605355263     -0.945836067       H   1  M0001    0.132320\n4   H2         0.000000022    -1.380015731      0.395915449       H   1  M0001    0.132281\n5   H1        -0.894500971    -0.605355263     -0.945836067       H   1  M0001    0.132281\n\n\n@<TRIPOS>BOND\n1      1      2    1\n2      1      3    1\n3      1      4    1\n4      1      5    1\n',
    CH4: '\n@<TRIPOS>MOLECULE\nM0001\n5 4\nSMALL\nUSER_CHARGES\n\n\n@<TRIPOS>ATOM\n1   C          0.000000000     0.000000000     0.000000000     C.3   1  M0001   -0.802069\n2   H2         0.631308955     0.631308955     0.631308955       H   1  M0001    0.200517\n3   H4        -0.631308955    -0.631308955     0.631308955       H   1  M0001    0.200517\n4   H1        -0.631308955     0.631308955    -0.631308955       H   1  M0001    0.200517\n5   H3         0.631308955    -0.631308955    -0.631308955       H   1  M0001    0.200517\n\n\n@<TRIPOS>BOND\n1      1      2    1\n2      1      3    1\n3      1      4    1\n4      1      5    1\n',
    CHCl3: '\n@<TRIPOS>MOLECULE\nM0001\n5 4\nSMALL\nUSER_CHARGES\n\n\n@<TRIPOS>ATOM\n1   C          0.000000000     0.426947296     0.199088797     C.3   1  M0001   -0.025406\n2   Cl3        1.679749846     0.064339414    -0.296802193      Cl   1  M0001   -0.052513\n3   Cl2       -0.583371043    -0.738205731     1.424261451      Cl   1  M0001   -0.052227\n4   Cl1       -1.096378803     0.491364837    -1.212561131      Cl   1  M0001   -0.052227\n5   H          0.000000000     1.410846233     0.657888472       H   1  M0001    0.182373\n\n\n@<TRIPOS>BOND\n1      1      2    1\n2      1      3    1\n3      1      4    1\n4      1      5    1\n',
    CHF3: '\n@<TRIPOS>MOLECULE\nM0001\n5 4\nSMALL\nUSER_CHARGES\n\n\n@<TRIPOS>ATOM\n1   C          0.000000000     0.306679815     0.143007144     C.3   1  M0001    0.282658\n2   F3         1.238681555    -0.024709182    -0.252514124       F   1  M0001   -0.135111\n3   F2        -0.430189639    -0.616522312     1.016633272       F   1  M0001   -0.135350\n4   F1        -0.808491945     0.290188044    -0.927813411       F   1  M0001   -0.135350\n5   H          0.000000000     1.297120094     0.604857028       H   1  M0001    0.123152\n\n\n@<TRIPOS>BOND\n1      1      2    1\n2      1      3    1\n3      1      4    1\n4      1      5    1\n',
    CO2: '\n@<TRIPOS>MOLECULE\nM0001\n3 2\nSMALL\nUSER_CHARGES\n\n\n@<TRIPOS>ATOM\n1   C          0.000000053     0.000000000     0.000000000       C   1  M0001    0.685248\n2   O2         1.169151228     0.000000000     0.000000000     O.2   1  M0001   -0.342624\n3   O1        -1.169151228     0.000000000     0.000000000     O.2   1  M0001   -0.342624\n\n\n@<TRIPOS>BOND\n1      1      2    2\n2      1      3    2\n',
    F2: '\n@<TRIPOS>MOLECULE\nM0001\n2 1\nSMALL\nUSER_CHARGES\n\n\n@<TRIPOS>ATOM\n1   F2         0.701463749     0.000000000     0.000000000       F   1  M0001   -0.000000\n2   F1        -0.701463749     0.000000000     0.000000000       F   1  M0001    0.000000\n\n\n@<TRIPOS>BOND\n1      1      2    1\n',
    H2: '\n@<TRIPOS>MOLECULE\nM0001\n2 1\nSMALL\nUSER_CHARGES\n\n\n@<TRIPOS>ATOM\n1   H2         0.371398326     0.000000000     0.000000000       H   1  M0001    0.000000\n2   H1        -0.371398326     0.000000000     0.000000000       H   1  M0001   -0.000000\n\n\n@<TRIPOS>BOND\n1      1      2    1\n',
    H2O: '\n@<TRIPOS>MOLECULE\nM0001\n3 2\nSMALL\nUSER_CHARGES\n\n\n@<TRIPOS>ATOM\n1   H2         0.761229899    -0.478138566     0.000000000       H   1  M0001    0.376285\n2   O          0.000000000     0.120865773     0.000000000     O.3   1  M0001   -0.752569\n3   H1        -0.761229899    -0.478138566     0.000000000       H   1  M0001    0.376285\n\n\n@<TRIPOS>BOND\n1      1      2    1\n2      2      3    1\n',
    HCN: '\n@<TRIPOS>MOLECULE\nM0001\n3 2\nSMALL\nUSER_CHARGES\n\n\n@<TRIPOS>ATOM\n1   C         -0.507116828     0.000000000     0.000000000     C.1   1  M0001    0.047988\n2   N          0.649877246     0.000000000     0.000000000     N.1   1  M0001   -0.282540\n3   H         -1.577592738     0.000000000     0.000000000       H   1  M0001    0.234552\n\n\n@<TRIPOS>BOND\n1      1      2    3\n2      1      3    1\n',
    HF: '\n@<TRIPOS>MOLECULE\nM0001\n2 1\nSMALL\nUSER_CHARGES\n\n\n@<TRIPOS>ATOM\n1   F          0.088719117     0.000000000     0.000000000       F   1  M0001   -0.430703\n2   H         -0.845032750     0.000000000     0.000000000       H   1  M0001    0.430703\n\n\n@<TRIPOS>BOND\n1      1      2    1\n',
    N2: '\n@<TRIPOS>MOLECULE\nM0001\n2 1\nSMALL\nUSER_CHARGES\n\n\n@<TRIPOS>ATOM\n1   N2         0.552776918     0.000000000     0.000000000     N.1   1  M0001    0.000000\n2   N1        -0.552776918     0.000000000     0.000000000     N.1   1  M0001   -0.000000\n\n\n@<TRIPOS>BOND\n1      1      2    3\n',
    NH3: '\n@<TRIPOS>MOLECULE\nM0001\n4 3\nSMALL\nUSER_CHARGES\n\n\n@<TRIPOS>ATOM\n1   N          0.000000000  0.126805440  0.073211156     N.3   1  M0001   -1.009460\n2   H3         0.812950611  0.017126748 -0.532078981       H   1  M0001    0.337416\n3   H2         0.000000004 -0.686909199  0.687346876       H   1  M0001    0.336022\n4   H1        -0.812950611  0.017126746 -0.532078862       H   1  M0001    0.336022\n\n\n@<TRIPOS>BOND\n1      1      2    1\n2      1      3    1\n3      1      4    1\n',
    O2: '\n@<TRIPOS>MOLECULE\nM0001\n2 1\nSMALL\nUSER_CHARGES\n\n\n@<TRIPOS>ATOM\n1   O2         0.607254209      0.000000000     0.000000000     O.2   1  M0001    0.000000\n2   O1        -0.607254209      0.000000000     0.000000000     O.2   1  M0001   -0.000000\n\n\n@<TRIPOS>BOND\n1      1      2    2\n',
    O3: '\n@<TRIPOS>MOLECULE\nM0001\n3 2\nSMALL\nUSER_CHARGES\n\n\n@<TRIPOS>ATOM\n1   O2         0.000000000     0.434529301     0.000000000     O.3   1  M0001    0.242265\n2   O1        -1.083210079    -0.217264624     0.000000000       O   1  M0001   -0.121133\n3   O3         1.083210079    -0.217264624     0.000000000       O   1  M0001   -0.121133\n\n\n@<TRIPOS>BOND\n1      1      2    1\n2      1      3    1\n'
  };

  moleculePolarity.register( 'mol2Data', mol2Data );

  return mol2Data;
} );
