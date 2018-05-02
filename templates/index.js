var titleString = (function() {
    /* eval.sibilant:8:18 */

    return arguments[0].replace((new RegExp("-", "g")), " ");
});
var portfolioPiece = (function portfolioPiece$(name) {
    /* portfolio-piece eval.sibilant:10:0 */

    return create(HtmlElement)("article", {}, [create(HtmlElement)("iframe", {
        'height': 256,
        'width': 256,
        'src': ("./" + name + ".html"),
        'style': "display:block;"
    }, []), create(HtmlElement)("section", {
        'style': "text-align:center;width:256px"
    }, [create(HtmlElement)("a", {
        'href': ("/html/" + name + ".html")
    }, [titleString(name)])])]);
});
var centerHeader = (function centerHeader$(text) {
    /* center-header eval.sibilant:19:0 */

    return create(HtmlElement)("header", {
        'style': "text-align:center;"
    }, [create(HtmlElement)("h1", {}, [text])]);
});
var cssAttributes = (function cssAttributes$(obj) {
    /* css-attributes eval.sibilant:22:0 */

    return Object.keys(obj).reduce(((css, key) => {

        return (css + key + ":" + obj[key] + ";");

    }), "");
});
create(HtmlElement)("html", {}, [create(HtmlElement)("head", {}, [create(HtmlElement)("title", {}, ["Welcome to the Error Log"]), create(HtmlElement)("script", {
    'src': "/js/bundle.js"
}, [])]), create(HtmlElement)("body", {}, [centerHeader("Error Log"), create(HtmlElement)("section", {
    'style': " display:flex; flex-wrap:wrap; margin:auto; width:80%;"
}, [create(HtmlElement)("article", {}, ["I am Error. The prototypical mistake, the flaw from which\n" + "all others derive their primary attributes. This may sound bad, but usually\n" + "I am not the one being thrown. Writing code with out the concept of an\n" + "error would be a tedious task,we'd never know what was going wrong, where\n" + "it was going wrong, or why we care."]), create(HtmlElement)("article", {}, ["I am Error, and this is the Error Log. Where bugs go\n" + "to be squashed."]), portfolioPiece("game-of-life"), portfolioPiece("simple-sun"), portfolioPiece("toroidal-coordinates")])])]);