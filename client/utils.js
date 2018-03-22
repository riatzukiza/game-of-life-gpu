var rgb = (function rgb$(r, g, b) {
    /* rgb eval.sibilant:6:0 */

    return {
        r,
        g,
        b
    };
});
var field = (function field$(t) {
    /* field inc/dl.sibilant:2:8 */

    return dl.tidy((() => {

        return dl.cast(dl.reshape(t, [1, W, H, 1]), "float32");

    }));
});
var bitField = (function bitField$(t) {
    /* bit-field inc/dl.sibilant:2:8 */

    return dl.tidy((() => {

        return t.greater(dl.scalar(0.5, "float32"));

    }));
});
var randomBitField = (function randomBitField$(w, h) {
    /* random-bit-field inc/dl.sibilant:2:8 */

    return dl.tidy((() => {

        return bitField(dl.randomUniform([w, h]));

    }));
});
var createGrayscaleImage = (function createGrayscaleImage$(t) {
    /* create-grayscale-image inc/dl.sibilant:2:8 */

    return dl.tidy((() => {

        return field(t).mul(dl.scalar(255, "float32"));

    }));
});
var randomGrayscale = (function randomGrayscale$(w, h) {
    /* random-grayscale inc/dl.sibilant:2:8 */

    return dl.tidy((() => {

        return createGrayscaleImage(bitField(w, h));

    }));
});
var grayscaleToRgba = (function grayscaleToRgba$(imgs) {
    /* grayscale-to-rgba inc/dl.sibilant:2:8 */

    return dl.tidy((() => {

        return imgs.tile([1, 1, 1, 4]);

    }));
});
var grayscaleToRgb = (function grayscaleToRgb$(imgs) {
    /* grayscale-to-rgb inc/dl.sibilant:2:8 */

    return dl.tidy((() => {

        return imgs.tile([1, 1, 1, 3]);

    }));
});

function uint8c(arr) {

    return Uint8ClampedArray.from(arr);

};
async function image(t) {

    return (new ImageData(uint8c(await t.data()), t.shape[1], t.shape[2]));

};