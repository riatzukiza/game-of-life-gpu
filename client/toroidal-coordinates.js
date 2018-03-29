var _point = (function _point$(x_y$5, i_j$5) {
    /* *point eval.sibilant:2:0 */

    var x = x_y$5[0],
        y = x_y$5[1],
        i = i_j$5[0],
        j = i_j$5[1];

    return [m.cos(((x / i) * tau)), m.sin(((y / j) * tau))];
});
var coordinateGrid = (function coordinateGrid$(j_i$3) {
    /* coordinate-grid inc/dl.sibilant:3:8 */

    var j = j_i$3[0],
        i = j_i$3[1];

    return dl.tidy((() => {

        var r = [];
        for (var x = 0; x < i; ++(x)) {
            var r_ = r[x] = [];;
            for (var y = 0; y < j; ++(y)) {
                r_.push(_point([x, y], [i, j]))
            }

        };
        return dl.tensor(r).reshape([1, i, j, 2]);

    }));
});
var modTensor = (function modTensor$(t, m) {
    /* mod-tensor inc/dl.sibilant:3:8 */

    return dl.tidy((() => {

        var q = t.div(m);
        var r = q.sub(dl.where(dl.greater(q, dl.scalar(0)), q.floor(), q.ceil()));
        return r.mul(m);

    }));
});
var pointTensor = (function pointTensor$(x_y$6, i_j$6) {
    /* point-tensor inc/dl.sibilant:3:8 */

    var x = x_y$6[0],
        y = x_y$6[1],
        i = i_j$6[0],
        j = i_j$6[1];

    return dl.tidy((() => {

        return dl.tensor(_point([x, y], [i, j]));

    }));
});
var distanceMatrix = (function distanceMatrix$(p, plane) {
    /* distance-matrix inc/dl.sibilant:3:8 */

    return dl.tidy((() => {

        var _ = plane.shape[0],
            w = plane.shape[1],
            h = plane.shape[2],
            _ = plane.shape[3];
        var m = modTensor(plane.add(p), dl.tensor([w, h]));
        return m.norm("euclidean", 3);

    }));
});
var inverseSquareMatrix = (function inverseSquareMatrix$(I, c, p, plane) {
    /* inverse-square-matrix inc/dl.sibilant:3:8 */

    return dl.tidy((() => {

        return I.div(c.add(distanceMatrix(p, plane).square()));

    }));
});
var dim = [W, H];
var coords = coordinateGrid(dim);
var sunPos = {
    x: (W / 2),
    y: (H / 2)
};
var p = dl.variable(pointTensor([sunPos.y, sunPos.x], dim));
var I = dl.scalar(0.9),
    c = dl.scalar(1);
var state = dl.variable(inverseSquareMatrix(I, c, p, coords));
var move = (function move$() {
    /* move inc/dl.sibilant:3:8 */

    return dl.tidy((() => {

        sunPos.x = (sunPos.x + 1);
        return p.assign(pointTensor([sunPos.y, sunPos.x], dim));

    }));
});
var tick = (function tick$() {
    /* tick eval.sibilant:65:0 */

    return dl.nextFrame().then(((nil) => {

        dl.tidy((() => {

            move();
            return state.assign(inverseSquareMatrix(I, c, p, coords));

        }));
        field.render();
        return tick();

    }));
});
state.print();
var field = null;
window.onload = (function window$onload$() {
    /* window.onload eval.sibilant:75:0 */

    var white = rgb(255, 255, 255);
    var canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.height = H;
    canvas.width = W;
    field = colored(canvas, white, dim, state);
    tick();
    document.body.style.margin = 0;
    return document.body.style.padding = 0;
});