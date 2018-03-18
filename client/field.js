

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
  init( shape = [ 0, 0 ],state = dl.ones(shape) ){ 
    
      this.shape = shape;this.state = state;
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
  render( canvas = this.canvas,shape = this.shape,state = this.state ){ 
    
      if( !(running__QUERY) ){ 
        return false;
       };
      var ctx = canvas.getContext("2d"),
          height = shape[0],
          width = shape[1];
      return state.data().then(((d) => {
      	
        var imageData = (new ImageData(height, width));
        for (var i = 0;i < (width * height);++(i))
        {
        var j = (i * 4),
            k = i;;
        var a = d[i];;
        this._renderCell(a, j, imageData)
        }
        ;
        return ctx.putImageData(imageData, 0, 0);
      
      }));
    
   }
 });
var Colored = Field.define("Colored", { 
  init( color = this.color,shape = this.shape,state = this.state ){ 
    
      this.color = color;this.shape = shape;this.state = state;
      Field.init.call(this, shape, state);
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