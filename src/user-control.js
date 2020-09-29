
document.addEventListener('keydown', event => {

    console.log(event.key);
    switch (event.key) {
        case 'p':
            toggleColor();

            break;

        case 'o':
            document.getElementById('chi2').setAttribute('visible', 'false')
            break;

        default:
            break;
    }
})

AFRAME.registerComponent('poopoo',
    {
        init: function () {
            this.el.addEventListener('mouseover', function(e){
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
        console.log('clicked')
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