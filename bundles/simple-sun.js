require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"simple-sun.js":[function(require,module,exports){
var dim = [W, H];
var coords = create(Cartesian)(dim);
var sunPos = {
    x: (0.5 * W),
    y: (0.5 * H)
};
var p = dl.variable(coords.point([(0.5 * W), (0.5 * H)]));
var I = dl.scalar(0.1),
    c = dl.scalar(0);
var calculateState = (function calculateState$() {
    /* calculate-state eval.sibilant:18:0 */

    return coords.inverseSquare(I, c, p);
});
var state = dl.variable(calculateState());
var move = (function move$() {
    /* move inc/dl.sibilant:3:8 */

    return dl.tidy((() => {

        sunPos.x = (sunPos.x - 1);
        sunPos.y = (sunPos.y - 1);
        return p.assign(coords.point([sunPos.x, sunPos.y]));

    }));
});
var tick = (function() {
    /* eval.sibilant:28:10 */

    return dl.nextFrame(arguments[0]).then(((nil) => {

        dl.tidy(((keep) => {

            move();
            return state.assign(calculateState());

        }));
        console.log("tick");
        field.render();
        return tick();

    }));
});
var field = null;
window.onload = (function window$onload$() {
    /* window.onload eval.sibilant:36:0 */

    var white = rgb(255, 255, 255);
    var canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.height = H;
    canvas.width = W;
    field = colored(canvas, white, [W, H], state);
    document.body.style.margin = 0;
    document.body.style.padding = 0;
    return start();
});
},{}]},{},[]);
