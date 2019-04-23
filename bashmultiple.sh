#!/bin/bash

array=( 20 30 40 50 )
for i in "${array[@]}"
do

    gnome-terminal  --tab  -- sh -c "./bash.sh $i"
    echo "$i in progess..."
    sleep 1400
    killall node
    echo "$i complete."
done

