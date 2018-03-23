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
var W = window.innerWidth,
    H = window.innerHeight;
var rgb = (function rgb$(r, g, b) {
    /* rgb eval.sibilant:25:0 */

    return {
        r,
        g,
        b
    };
});
var bitField = (function bitField$(w, h) {
    /* bit-field inc/dl.sibilant:2:8 */

    return dl.tidy((() => {

        return dl.randomUniform([w, h]).greater(dl.scalar(0.5, "float32"));

    }));
});
var createGrayscaleImage = (function createGrayscaleImage$(t) {
    /* create-grayscale-image inc/dl.sibilant:2:8 */

    return dl.tidy((() => {

        return dl.cast(dl.reshape(t, [1, W, H, 1]), "float32").mul(dl.scalar(255, "float32"));

    }));
});
var randomGrayscale = (function randomGrayscale$(w, h) {
    /* random-grayscale inc/dl.sibilant:2:8 */

    return dl.tidy((() => {

        return createGrayscaleImage(bitField(w, h));

    }));
});
var grayscaleImage = randomGrayscale(W, H);
var convert = (function convert$(imgs) {
    /* convert inc/dl.sibilant:2:8 */

    return dl.tidy((() => {

        return imgs.tile([1, 1, 1, 4]);

    }));
});
async function image(t) {

    var d = await t.data();
    return (new ImageData(Uint8ClampedArray.from(d), t.shape[1], t.shape[2]));

};
window.onload = async function onload() {

    var canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.height = H;
    canvas.width = W;
    var foreground = await image(convert(grayscaleImage)),
        background = await image(convert(createGrayscaleImage(dl.cast(dl.ones([1, W, H, 1]), "float32"))));
    (function() {
        /* eval.sibilant:28:8 */

        console.log("background", background);
        return background;
    }).call(this);
    var ctx = canvas.getContext("2d");
    return ctx.putImageData(background, 0, 0);

};
