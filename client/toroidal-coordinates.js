var _point = (function _point$(x_y$179, i_j$183) {
    /* *point eval.sibilant:2:0 */

    var x = x_y$179[0],
        y = x_y$179[1],
        i = i_j$183[0],
        j = i_j$183[1];

    return [m.cos(((x / i) * tau)), m.sin(((y / j) * tau))];
});
var coordinateGrid = (function coordinateGrid$(j_i$40) {
    /* coordinate-grid inc/dl.sibilant:3:8 */

    var j = j_i$40[0],
        i = j_i$40[1];

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
var pointTensor = (function pointTensor$(x_y$180, i_j$184) {
    /* point-tensor inc/dl.sibilant:3:8 */

    var x = x_y$180[0],
        y = x_y$180[1],
        i = i_j$184[0],
        j = i_j$184[1];

    return dl.tidy((() => {

        return dl.tensor(_point([x, y], [i, j]));

    }));
});
var distanceMatrix = (function distanceMatrix$(p, plane) {
    /* distance-matrix inc/dl.sibilant:3:8 */

    return dl.tidy((() => {

        return plane.add(p).norm("euclidean", 3);

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
    /* tick eval.sibilant:50:0 */

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
    /* window.onload eval.sibilant:60:0 */

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