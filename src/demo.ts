import Matrix4 from './math/Matrix4'
import Vector3 from './math/Vector3'
import './webgl/webgl18'
const mat4 = Matrix4.translation(new Vector3(1, 2, 3))
const inverse = Matrix4.invert(mat4)
console.log(mat4.toString())
console.log(inverse.toString())
console.log(Matrix4.multiply(mat4, inverse).toString())
