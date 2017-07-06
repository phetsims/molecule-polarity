#!/bin/bash
#=======================================================================================================================
#
# Converts a mol2 file to a string. Comment lines are ignored.
#
# Input files live in data/mol2/.
# Output of this script must be pasted into js/common/model/realmolecules/mol2Data.js
#
# Usage: mol2string.sh h2o.mol2 > h2o.txt
#
# @author Chris Malley (PixelZoom, Inc.)
#
#=======================================================================================================================

while read line
do
  if [[ ${line:0:1} != "#" ]]
  then
    echo -n "${line}" | tr -d '\r\n'
    echo -n "\\n"
  fi
done < $1
