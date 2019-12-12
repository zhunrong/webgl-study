import Matrix4 from './math/Matrix4'
import Vector3 from './math/Vector3'
import './webgl/webgl17'
const mat4 = Matrix4.translation(new Vector3(1, 2, 3))
console.log(mat4.toString())
