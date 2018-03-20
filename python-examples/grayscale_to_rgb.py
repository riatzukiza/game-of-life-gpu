@tf_export('image.grayscale_to_rgb')
def grayscale_to_rgb(images, name=None):
  """Converts one or more images from Grayscale to RGB.
  Outputs a tensor of the same `DType` and rank as `images`.  The size of the
  last dimension of the output is 3, containing the RGB value of the pixels.
  Args:
    images: The Grayscale tensor to convert. Last dimension must be size 1.
    name: A name for the operation (optional).
  Returns:
    The converted grayscale image(s).
  """
  with ops.name_scope(name, 'grayscale_to_rgb', [images]) as name:
    images = ops.convert_to_tensor(images, name='images')
    rank_1 = array_ops.expand_dims(array_ops.rank(images) - 1, 0)
    shape_list = ([array_ops.ones(rank_1, dtype=dtypes.int32)] +
                  [array_ops.expand_dims(3, 0)])
    multiples = array_ops.concat(shape_list, 0)
    rgb = array_ops.tile(images, multiples, name=name)
    rgb.set_shape(images.get_shape()[:-1].concatenate([3]))
return rgb
