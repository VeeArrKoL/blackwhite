# blackwhite
KoLmafia script for predicting the contents of [Black and White Apron Meal Kits](https://wiki.kingdomofloathing.com/Black_and_White_Apron_Meal_Kit).

## Installation
Install blackwhite into KoLmafia by using this command in the gCLI:
```
git checkout VeeArrKoL/blackwhite
```

## Usage
To predict the contents of the next meal kit, use:
```
blackwhite
```

To predict the contents of a meal kit for a specific path, class, and previous-kits-eaten, use:
```
blackwhite <pathId> <classId> <prevEaten>
```

The output will first list the main ingredient of the kit and its effect, followed by each of the three meal options with their optional ingredients and corresponding effects.

## API
From a JavaScript script, it is possible to call the underlying blackwhite functions directly and get strucutred data as a response:
```
const bw = require("blackwhite.js");

let pathId=0;
let classId=1;
let prevEaten=0;
let mealKit = bw.getMealKit(pathId, classId, prevEaten);
```
