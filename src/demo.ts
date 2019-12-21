import Matrix4 from './math/Matrix4'
import Vector3 from './math/Vector3'
import './webgl/webgl19'
const mat4 = new Matrix4().set(
  1, 0, 0, 1,
  0, 1, 0, 2,
  0, 0, 1, 3,
  0, 0, 0, 1,
)
const inverse = Matrix4.invert(mat4)
console.log(mat4.toString())
console.log(inverse.toString())
console.log(Matrix4.multiply(mat4, inverse).toString())
