#!/bin/bash

array=( 25 27 28 )
for i in "${array[@]}"
do

    gnome-terminal  --tab  -- sh -c "./bash.sh $i"
    echo "$i in progess..."
    sleep 1950
    killall node
    echo "$i complete."
done

