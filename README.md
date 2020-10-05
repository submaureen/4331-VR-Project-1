# Virtual Reality 4331 Project 1
Project 1 is designed to show the effects of COVID-19 on our lives.
I have created a simplified view of how my living space was affected over the months, with a house modelled in Blender. I created each low poly model except for one.

This is meant to be a simplification of the 3 places I stayed the most during quarantine. My bed, the living room, and the kitchen.
## House
![House](https://i.imgur.com/uaqNwKv.png)
This is the house in A-frame.

## Instructions and Interactions

There are instructions to move using WASD upon entering the scene.
Additionally, there are buttons and instructions to apply lighting effects and COVID mode.

## Lighting
![L](https://i.imgur.com/rMlTW9c.png)
The lighting color will change to white, blue, or red.
The pink button applies a shader that allows objects to ignore light, allowing for an unshaded look.
This was achieved by using a lighting script and by changing the colorManagement settings on renderer.

source of script and render settings: my [Stackoverflow question](https://stackoverflow.com/questions/63964389/ignore-lighting-in-a-frame-imported-gltf-model-similarly-to-blender/63973677#63973677).


In order to keep track of the buttons, I registered a component to use as an attribute for each lighting method.
```
AFRAME.registerComponent('buttons', {


    init: function () {
        var data = this.data;
        var el = this.el;  // <a-box>

        el.addEventListener('mousedown', function () {
            switch (el.id) {
                case 'cookingTime':
                    foobString = [];
                    foobs.forEach(foob => {
                        console.log(foob.id)
                        foobString.push(foob.id)
                    });
                    parseIngredients();
                    break;
                case 'redLight':
                    console.log('boinked red')
                    document.getElementById('masterLight').setAttribute('color', 'red')
                    document.getElementById('def1').setAttribute('light', 'type: ambient; color: red')
                    document.getElementById('def2').setAttribute('light', 'type: directional; color: #FFF; intensity: 0.2')
                    break;
                case 'blueLight':
                    console.log('boinked blue')
                    document.getElementById('masterLight').setAttribute('color', 'blue')
                    document.getElementById('def1').setAttribute('light', 'type: ambient; color: blue')
                    document.getElementById('def2').setAttribute('light', 'type: directional; color: #FFF; intensity: 0.2')
                    break;
                case 'normLight':
``` 
et cetera.

## Covid switching

I toggled the visibility of entities with the postcovid class in order to switch between scenes.
```
                    var status =  document.getElementById("post").getAttribute("visible");
                    var postCovid = document.getElementsByClassName("postcov");
                    var preStatus = document.getElementById("pre").getAttribute("visible");
                    document.getElementById("pre").setAttribute('visible', !preStatus)
                    for (var i = 0; i < postCovid.length; i++) {
                        postCovid[i].setAttribute('visible', !status)
```

## Drag and Drop
The drag and drop code is under the MIT license here.

[Dragndrop](https://github.com/extraymond/aframe-mouse-dragndrop)

However, it was deprecated. It has not been updated for a year.

I fixed some of the function and tweaked the camera to my liking.

```
AFRAME.registerComponent("track-cursor", {
    init: function () {
        this.el.addEventListener("mousedown", e => {
            if (this.el.is("cursor-hovered")) {
                this.el.sceneEl.camera.el.setAttribute("look-controls", {
                    enabled: true
                });
                this.el.addState("dragging");
            }
        })
        this.el.addEventListener("mouseup", e => {
            if (this.el.is("dragging")) {
                this.el.sceneEl.camera.el.setAttribute("look-controls", {
                    enabled: true
                });
                this.el.removeState("dragging");
            }
        })
    },
});
```

## Models
I built every model except for this broccoli. I created every texture as well in Blender.

[Broccoli](https://sketchfab.com/3d-models/foodtent-broccolirework-eba77c4126d2458a93481231c4831b3b)

It is surprisingly hard to model a broccoli.

List of models I created:
* House
* Bedframe
* Mattress
* Pillow
* Sofa 1
* Sofa 2
* Kitchen Appliances (stove, drawers, fridge, sink)
* Tables
* Chairs
* Chicken
* Rice cooker
* All of the food except for broccoli (rice, chicken, etc)
