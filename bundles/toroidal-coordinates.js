require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"toroidal-coordinates.js":[function(require,module,exports){
var dim = [W, H];
var coords = create(Toroid)(dim);
var sunPos = {
    x: (W / 2),
    y: (H / 2)
};
var p = dl.variable(coords.point([0, 0]));
var I = dl.scalar(0.9),
    c = dl.scalar(1);
var state = dl.variable(coords.inverseSquare(I, c, p));
var calculateState = (function calculateState$() {
    /* calculate-state eval.sibilant:15:0 */

    return coords.inverseSquare(I, c, p);
});
var move = (function move$() {
    /* move inc/dl.sibilant:3:8 */

    return dl.tidy((() => {

        sunPos.x = (sunPos.x - 1);
        sunPos.y = (sunPos.y - 1);
        return p.assign(coords.point([sunPos.x, sunPos.y]));

    }));
});
var tick = (function() {
    /* eval.sibilant:23:10 */

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
state.print();
var field = null;
window.onload = (function window$onload$() {
    /* window.onload eval.sibilant:31:0 */

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
},{}]},{},[]);
