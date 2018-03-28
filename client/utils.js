/home/aaron / devel / apps / game - of -life / src / client;


(function(a, b, c) {
    /* ../../kit-lang/shell-utils/shell/node_modules/kit/inc/core/defs.sibilant:53:9 */

    return foo(this);
}).bind(this);





;
var R = require("ramda");
var {
    create,
    extend,
    mixin,
    conditional,
    cond,
    partiallyApplyAfter
} = require("kit/js/util");
var {
    Interface
} = require("kit-interface");;
Array.prototype.each = (function Array$prototype$each$(f) {
    /* Array.prototype.each inc/misc.sibilant:1:0 */

    this.forEach(f);
    return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
    /* Object.prototype.each inc/misc.sibilant:4:0 */

    return Object.keys(this).forEach(((k) => {

        return f(this[k], k);

    }));
});
var dl = require("deeplearn"),
    m = require("mathjs");
var running__QUERY = true;
var tau = (Math.PI * 2);
var W = window.innerWidth,
    H = window.innerHeight;
var rgb = (function rgb$(r, g, b) {
    /* rgb eval.sibilant:30:0 */

    return {
        r,
        g,
        b
    };
});
var field = (function field$(w_h$1) {
    /* field inc/dl.sibilant:3:8 */

    var w = w_h$1[0],
        h = w_h$1[1];

    return dl.tidy((() => {

        return dl.cast(dl.zeros([1, w, h, 1]), "float32");

    }));
});
var bitField = (function bitField$(t) {
    /* bit-field inc/dl.sibilant:3:8 */

    return dl.tidy((() => {

        return t.greater(dl.scalar(0.5, "float32"));

    }));
});
var randomBitField = (function randomBitField$(w, h) {
    /* random-bit-field inc/dl.sibilant:3:8 */

    return dl.tidy((() => {

        return bitField(dl.randomUniform([w, h]));

    }));
});
var coordTypes = Interface.define("coordTypes", {
    toroid([x, y], [i, j]) {

        return [m.cos(((x / i) * tau)), m.sin(((y / j) * tau))];

    },
    cartesian([x, y], [i, j]) {

        return [(x / i), (y / j)];

    }
});
var coordinateGrid = (function coordinateGrid$(j_i$1, _point) {
    /* coordinate-grid inc/dl.sibilant:3:8 */

    var j = j_i$1[0],
        i = j_i$1[1];

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
var pointTensor = (function pointTensor$(x_y$1, i_j$1, _point) {
    /* point-tensor inc/dl.sibilant:3:8 */

    var x = x_y$1[0],
        y = x_y$1[1],
        i = i_j$1[0],
        j = i_j$1[1];

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
var CoordinateSystem = Interface.define("CoordinateSystem", {
    grid(dim = this.dim, _type = this._type) {

        return coordinateGrid(dim, _type);

    },
    point(p = this.p, dim = this.dim, _type = this._type) {

        return pointTensor(p, dim, _type);

    }
});
var Toroid = CoordinateSystem.define("Toroid", {
    _type: coordTypes.toroid
});
var Cartesian = CoordinateSystem.define("Cartesian", {
    _type: coordTypes.cartesian
});
.;