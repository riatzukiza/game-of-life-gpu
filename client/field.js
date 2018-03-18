

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
 } = require("kit-interface");
var Field = Interface.define("Field", { 
  init( canvas = this.canvas,shape = [ 0, 0 ],state = dl.ones(shape),imageData = (new ImageData(shape[1], shape[0])),ctx = canvas.getContext("2d") ){ 
    
      this.canvas = canvas;this.shape = shape;this.state = state;this.imageData = imageData;this.ctx = ctx;
      return this;
    
   },
  set( [ x, y ],v ){ 
    
      return this.state.data().then(((d) => {
      	
        return d[((y * this.shape[0]) + x)] = v;
      
      }));
    
   },
  get( [ x, y ] ){ 
    
      return this.state.data().then(((d) => {
      	
        return d[((y * this.shape[0]) + x)];
      
      }));
    
   },
  render( canvas = this.canvas,shape = this.shape,state = this.state,imageData = this.imageData,ctx = this.ctx ){ 
    
      if( !(running__QUERY) ){ 
        return false;
       };
      var height = shape[0],
          width = shape[1];
      var d = state.buffer();
      return state.data().then(((d) => {
      	
        var j = 0,
            k = 0;
        for (var i = 0;i < (width * height);++(i))
        {
        j = (i * 4);;
        this._renderCell(d[i], j, imageData)
        }
        ;
        return ctx.putImageData(imageData, 0, 0);
      
      }));
    
   }
 });
var Colored = Field.define("Colored", { 
  init( canvas = this.canvas,color = this.color,shape = this.shape,state = this.state ){ 
    
      this.canvas = canvas;this.color = color;this.shape = shape;this.state = state;
      Field.init.call(this, canvas, shape, state);
      return this;
    
   },
  _renderCell( a,j,imageData ){ 
    
      imageData.data[j] = Math.round((this.color.r * a));
      imageData.data[(j + 1)] = Math.round((this.color.g * a));
      imageData.data[(j + 2)] = Math.round((this.color.b * a));
      return imageData.data[(j + 3)] = 255;
    
   }
 });
var colored = create(Colored);