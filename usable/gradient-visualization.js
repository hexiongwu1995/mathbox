// gradient-visualization.js
const container = document.querySelector(".mathbox-container");

const mathbox = MathBox.mathBox({
    element: container,
    plugins: ["core", "controls", "cursor"],
    controls: {
        klass: THREE.OrbitControls,
    },
    camera: {
        fov: 40,
    },
});

three = mathbox.three;
three.camera.position.set(4, 2, 2);

const controls = three.controls;
controls.enablePan = true;
controls.enableZoom = true;
controls.enableRotate = true;
controls.enableDamping = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;
controls.target.set(0, 0, 0);
controls.update();

three.renderer.setClearColor(new THREE.Color(0xffffff), 1.0);

colors = {
    axis: new THREE.Color(0.3, 0.3, 0.3),
    grid: new THREE.Color(0.9, 0.9, 0.9),
    frame: new THREE.Color(0.9, 0.9, 0.9),
    labels: new THREE.Color(0.6, 0.6, 0.6),
};

var rangeX = 1;
var rangeY = 2;
var rangeZ = 1;

view = mathbox
    .set({
        scale: 500,
        focus: 5,
    })
    .clock({ speed: 1 / 2 })
    .cartesian({
        range: [
            [-rangeX, rangeX],
            [0, rangeY],
            [-rangeZ, rangeZ],
        ],
        scale: [1, 1, 1],
    });

[1, 2, 3].forEach(element => {
    view.axis({
        axis: element, end: true, width: 2, color: colors.axis,
    })
})

var offset_coefficient = 1.06;
view
    .array({
        data: [
            [rangeX * offset_coefficient, 0, 0],
            [0, rangeY * offset_coefficient, 0],
            [0, 0, rangeZ * offset_coefficient],
        ],
        channels: 3,
        live: false,
    })
    .text({
        data: ["x", "y", "z"],
    })
    .label({
        color: colors.labels,
        outline: 0,
        offset: [0, 0],
    });

view
    .transform({
        position: [0, 0, 0],
    })
    .grid({
        axes: [1, 3],
        width: 1,
        color: colors.grid,
        depth: 0.5,
    })
    .end()

var rectXZ = [[1, 0, 1], [1, 0, -1], [-1, 0, -1], [-1, 0, 1]];
var rectXY = [[1, 0, 0], [1, 2, 0], [-1, 2, 0], [-1, 0, 0]];

drawRect(view, rectXZ, [0, 2, 0]);
drawRect(view, rectXY, [0, 0, 1]);
drawRect(view, rectXY, [0, 0, -1]);

view.area({
    axes: "xz",
    width: 21,
    height: 21,
    expr: function (emit, x, z, i, j, t) {
        var y = x * x + z * z;
        emit(x, y, z);
    },
})
.surface({
    lineX: true,
    lineY: true,
    shaded: false,
    color: "rgba(180, 220, 240, 1)",
    lineBias: 1,
    opacity: 0.5,
});

var sliceX = view
    .group()
    .slice({
        height: [10, 11],
    })
    .line({
        color: 0xc00040,
        opacity: 0.5,
        width: 1,
        zBias: 3,
    })
    .end();

var sliceY = view
    .group()
    .slice({
        width: [10, 11],
    })
    .transpose({
        order: "yx",
    })
    .line({
        color: 0x0080f0,
        opacity: 0.5,
        width: 1,
        zBias: 3,
    })
    .end();