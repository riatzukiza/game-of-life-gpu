var dim = [W, H];
var coords = Cartesian.grid(dim);
var feedingWeights = dl.variable(field(dim)),
    homeWeights = dl.variable(field(dim)),
    ants = dl.variable(field(dim));
var home = Cartesian.point([(W / 4), (H / 4)], dim),
    goal = Cartesian.point([(W / 2), (H / 2)], dim);
var kernelTensor = (function kernelTensor$(w_h$26, filter) {
    /* kernel-tensor eval.sibilant:13:0 */

    var w = w_h$26[0],
        h = w_h$26[1];

    return dl.reshape(dl.tensor2d(filter), [w, h, 1, 1]);
});
var randomizeKernel = (function randomizeKernel$(kernel) {
    /* randomize-kernel eval.sibilant:17:0 */

    return dl.randomUniform(kernel.shape).mul(kernel);
});
var avgKern = kernelTensor([3, 3], [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
]);
var deposit = (function deposit$() {
    /* deposit eval.sibilant:27:0 */


});
var decay = (function decay$() {
    /* decay eval.sibilant:28:0 */


});
var one = dl.scalar(1);
var move = (function move$() {
    /* move eval.sibilant:30:0 */

    var neighbors = dl.conv2d(ants, randomizeKernel(avgKern), "same");
    var max = undefined;
    return dl.logicalAnd(dl.equal(ants, one));
});
var spawn = (function spawn$(x_y$199) {
    /* spawn eval.sibilant:36:0 */

    var x = x_y$199[0],
        y = x_y$199[1];

    return ants.assign(ants.buffer().set(1, x, y, 1, 1).toTensor());
});
var tick = (function tick$() {
    /* tick eval.sibilant:42:0 */

    return dl.nextFrame().then(((nil) => {

        dl.tidy((() => {

            move();
            return state.assign();

        }));
        field.render();
        return tick();

    }));
});
var field = null;
var white = rgb(255, 255, 255),
    black = rgb(0, 0, 0),
    red = rgb(255, 0, 0),
    green = rgb(0, 255, 0),
    blue = rgb(0, 0, 255);
window.onload = (function window$onload$() {
    /* window.onload eval.sibilant:56:0 */

    var canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.height = H;
    canvas.width = W;
    antField = colored(canvas, white, dim, state);
    tick();
    document.body.style.margin = 0;
    return document.body.style.padding = 0;
});