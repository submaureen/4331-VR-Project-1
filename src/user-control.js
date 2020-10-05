

var foobs = []
var foobString = []
document.addEventListener('hitstart', event => {

    if (event.target.components["aabb-collider"]) {
        // console.log(event.target.components["aabb-collider"]["intersectedEls"])
        foobs = event.target.components["aabb-collider"]["intersectedEls"]
    }

    console.log('we been hit!!')


})

document.addEventListener('hitend', event => {

    if (event.target.components["aabb-collider"]) {
        // console.log(event.target.components["aabb-collider"]["intersectedEls"])
        foobs = event.target.components["aabb-collider"]["intersectedEls"]
    }

    console.log('we been left!!')


})

AFRAME.registerComponent('poopoo',
    {
        init: function () {
            this.el.addEventListener('mouseover', function (e) {
                console.log("he!");

            })
        }
    }
)


AFRAME.registerComponent('change-color-on-hover', {


    init: function () {
        var data = this.data;
        var el = this.el;  // <a-box>

        el.addEventListener('mousedown', function () {
            if (el.id == 'zojirushi') {
                console.log('clicked')
                el.setAttribute('animation-mixer', 'loop: once; timeScale: .25');
            }
        });
    }
});


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
                    console.log('boinked norm')
                    document.getElementById('masterLight').setAttribute('color', '')
                    document.getElementById('def1').setAttribute('light', 'type: ambient; color: white')
                    document.getElementById('def2').setAttribute('light', 'type: directional; color: #FFF; intensity: 0.2')
                    break;
                case 'unlitty':
                    var prevState = document.getElementById('def1').getAttribute('visible')
                    var prevStateMaster = document.getElementById('masterLight').getAttribute('visible')
                    document.getElementById('def1').setAttribute('visible', !prevState)
                    document.getElementById('def2').setAttribute('visible', !prevState)
                    document.getElementById('masterLight').setAttribute('visible', !prevStateMaster)
                    //document.getElementById('def1').setAttribute(`visible`, !)
                    break;
                case 'covid':
                    var status =  document.getElementById("post").getAttribute("visible");
                    var postCovid = document.getElementsByClassName("postcov");
                    var preStatus = document.getElementById("pre").getAttribute("visible");
                    document.getElementById("pre").setAttribute('visible', !preStatus)
                    for (var i = 0; i < postCovid.length; i++) {
                        postCovid[i].setAttribute('visible', !status)
                    }
                    break;


            }


        });
    }
});



function toggleColor() {
    console.log(document.getElementById('scene'))

    console.log(document.getElementById('scene').getAttribute('renderer'))

    var value = !document.getElementById('scene').getAttribute('renderer').colorManagement

    document.getElementById('scene').setAttribute('renderer', `colorManagement: ${value}; antialias: false`)

    var body = document.getElementById('aframe-wrapper')

    var content = body.innerHTML;

    body.innerHTML = content

    // scene.setAttribute('renderer', 'colorManagement', 'true')
}

function toggleRona() {
    let preVal = document.getElementById('pre').getAttribute('visible');
    let postVal = document.getElementById('post').getAttribute('visible');

    let preBool = !preVal
    let postBool = !postVal

    document.getElementById('pre').setAttribute('visible', preBool.toString())
    document.getElementById('post').setAttribute('visible', postBool.toString())

}

function parseIngredients() {
    console.log(foobs)
    if (foobString.includes("eggFood") && (foobString.length == 1)) {
        document.getElementById('eggMeal').setAttribute('visible', true)

    }

}