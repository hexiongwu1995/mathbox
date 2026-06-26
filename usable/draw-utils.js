// usable/draw-utils.js

/**
 * 绘制矩形边框
 */

function drawRect(view, points, position) {
    view.array({ data: points, channels: 3, live: false });
    view
        .transform({ position, scale: [1, 1, 1] })
        .line({ closed: true, color: colors.frame, width: 1, join: "miter" })
        .end();
}


/**
* 绘制圆形轮廓线
* @param {number} originx - 圆心 x
* @param {number} originy - 圆心 y
* @param {number} originz - 圆心 z
* @param {'xy'|'xz'|'yz'} plane - 所在平面
* @param {number} radius - 半径
* @param {number} linewidth - 线宽
*/

// 自定义绘制圆形的函数
function drawCirc(view, originx, originy, originz, plane, radius, linewidth) {
    let disc = [], n = 30;
    for (var i = 0; i < n; i++) {
        let theta = (MathBox.τ * i) / n;  // MathBox.τ = 2π

        if (plane === "xy") {
            disc.push([(originx + radius * Math.cos(theta)), (originy + radius * Math.sin(theta)), originz])
        } else if (plane === "xz") {
            disc.push([originx + radius * Math.cos(theta), originy, originz + radius * Math.sin(theta)])
        } else if (plane === "yz") {
            disc.push([originx, originy + radius * Math.cos(theta), originz + radius * Math.sin(theta)])
        }

    }
    // 提供数据
    view.array({
        data: disc,
        items: 1,
        channels: 3,
    });

    // 绘制轮廓圆（线）
    view.line({
        color: 'black',
        width: linewidth,
        closed: true,
    });
}