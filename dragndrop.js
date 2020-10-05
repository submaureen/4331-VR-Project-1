if (window.AFRAME == null) {
    console.error("aframe not found, please import it before this component.")
}

AFRAME.registerSystem("track-cursor", {
    init: function () {
        this.el.setAttribute("cursor", { rayOrigin: "mouse" });
    }
});

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

AFRAME.registerComponent("dragndrop", {
    dependencies: ["track-cursor"],
    init: function () {
        this.range = 0;
        this.dist = 0;
        this.middle = 0;

        this.el.addEventListener("stateadded", e => {
            if (e.detail == "dragging") {
                console.log("dragging!")

                let mouse = new THREE.Vector2()
                let camera = this.el.sceneEl.camera
                let rect = document.querySelector('body').getBoundingClientRect()
                let centerX = document.getElementById('scene').clientWidth / 2
                let centerY = document.getElementById('scene').clientHeight / 2
                mouse.x = ((centerX - rect.left) / rect.width) * 2 - 1
                mouse.y = - ((centerY - rect.top) / rect.height) * 2 + 1
                let vector = new THREE.Vector3(mouse.x, mouse.y, -1).unproject(camera)



                this.range = 0;
                // console.log(document.getElementById('cursor'))
                this.dist = this.el.object3D.position
                    .clone()
                    .sub(vector)
                    .length();
            }
        })

        this.direction = new AFRAME.THREE.Vector3();
        this.target = new AFRAME.THREE.Vector3();
        document.addEventListener("wheel", e => {
            if (e.deltaY < 0) {
                this.range += 0.1;
            } else {
                this.range -= 0.1;
            }
        });
    },
    updateDirection: function () {
        this.direction.copy(this.el.sceneEl.getAttribute("raycaster").direction);
    },
    updateTarget: function () {

        let mouse = new THREE.Vector2()
        let camera = this.el.sceneEl.camera
        let rect = document.querySelector('body').getBoundingClientRect()
        let centerX = document.getElementById('scene').clientWidth / 2
        let centerY = document.getElementById('scene').clientHeight / 2
        mouse.x = ((centerX - rect.left) / rect.width) * 2 - 1
        mouse.y = - ((centerY - rect.top) / rect.height) * 2 + 1
        let vector = new THREE.Vector3(mouse.x, mouse.y, -1).unproject(camera)
        this.target.copy(
            vector
                .clone()
                .add(this.direction.clone().multiplyScalar(this.dist))
        );
    },
    tick: function () {
        if (this.el.is("dragging")) {
            this.updateDirection();
            this.updateTarget();
            this.el.object3D.position.copy(this.target);
        }
    }
});

AFRAME.registerComponent('mouse-to-world', {
    init: function () {
        document.addEventListener('click', (e) => {
            let mouse = new THREE.Vector2()
            let camera = AFRAME.scenes[0].camera
            let rect = document.querySelector('body').getBoundingClientRect()
            // console.log(document.getElementById('scene').clientWidth);
            // console.log(e.clientX)
            let centerX = document.getElementById('scene').clientWidth / 2
            let centerY = document.getElementById('scene').clientHeight / 2
            mouse.x = ((centerX - rect.left) / rect.width) * 2 - 1
            mouse.y = - ((centerY - rect.top) / rect.height) * 2 + 1
            let vector = new THREE.Vector3(mouse.x, mouse.y, -1).unproject(camera)
            let vectorCenter = new THREE.Vector3(rect.width / 2, rect.height / 2, -2).unproject(camera)
            //console.log(rect.width)
            //console.log(rect.height)
            // console.log(vector)
        })
    }
});