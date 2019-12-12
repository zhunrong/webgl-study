/**
 * 将原点从左上角移动到画布中心
 */
import Matrix4 from '../math/Matrix4'
import Vector3 from '../math/Vector3'
import { createShaderProgram, createWebGLContext } from '../utils/webgl-utils'

const gl = createWebGLContext()

const VERTEX_SHADER_SOURCE = `
    precision mediump float;
    attribute vec2 a_Point;
    uniform mat4 u_Matrix;
    uniform vec2 u_Resolution;

    // 坐标系转换函数
    vec2 convert(vec2 origin) {
        return origin * 2.0 / u_Resolution;
    }

    void main() {
        vec2 xy = convert((u_Matrix * vec4(a_Point,0.0,1.0)).xy);
        gl_Position = vec4(xy,0.0,1.0);
    }
`

const FRAG_SHADER_SOURCE = `
    precision mediump float;
    uniform vec2 u_Resolution;

    void main() {
        gl_FragColor = vec4(gl_FragCoord.xy / u_Resolution,0.0,1.0);
    }
`

const program = createShaderProgram(gl, VERTEX_SHADER_SOURCE, FRAG_SHADER_SOURCE)
gl.useProgram(program)

const resolutionLocation = gl.getUniformLocation(program, 'u_Resolution')
gl.uniform2fv(resolutionLocation, new Float32Array([window.innerWidth, window.innerHeight]))

const pointLocation = gl.getAttribLocation(program, 'a_Point')
const buffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
const vertices = new Float32Array([
    0, 0,
    0, 100,
    100, 0,
])

gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
gl.vertexAttribPointer(pointLocation, 2, gl.FLOAT, false, 0, 0)
gl.enableVertexAttribArray(pointLocation)

gl.clearColor(0, 0, 0, 1)

gl.drawArrays(gl.TRIANGLES, 0, 3)

const matrixLocation = gl.getUniformLocation(program, 'u_Matrix')
const matrix = new Matrix4()
const rMatrix = Matrix4.rotationZ(Math.PI / 180 * 1)
const tMatrix1 = Matrix4.translation(new Vector3(200, 200, 0))
const tMatrix2 = Matrix4.translation(new Vector3(250, 250, 0))
const tMatrix3 = Matrix4.translation(new Vector3(-250, -250, 0))
matrix.premultiply(tMatrix1)

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT)
    // 将三角形旋转中心移至原点
    matrix.premultiply(tMatrix3)
    // 旋转
    matrix.premultiply(rMatrix)
    // 再将旋转中心位置还原
    matrix.premultiply(tMatrix2)
    gl.uniformMatrix4fv(matrixLocation, false, matrix.elements)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    requestAnimationFrame(render)
}

render()
