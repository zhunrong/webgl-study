/**
 * 将原点从坐上角移动到画布中心
 */
import { createWebGLContext, createShaderProgram } from './utils.js'
import Matrix4 from './Matrix4.js'

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
    100, 0
])

gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
gl.vertexAttribPointer(pointLocation, 2, gl.FLOAT, false, 0, 0)
gl.enableVertexAttribArray(pointLocation)

gl.clearColor(0, 0, 0, 1)

gl.drawArrays(gl.TRIANGLES, 0, 3)

const matrixLocation = gl.getUniformLocation(program, 'u_Matrix')
const matrix = new Matrix4()
const rotation = Matrix4.rotationZ(Math.PI / 180 * 1)
const translation1 = Matrix4.translation(200, 200, 0)
const translation2 = Matrix4.translation(250, 250, 0)
const translation3 = Matrix4.translation(-250, -250, 0)
matrix.premultiply(translation1)

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT)
    // 将三角形旋转中心移至原点
    matrix.premultiply(translation3)
    // 旋转
    matrix.premultiply(rotation)
    // 再将旋转中心位置还原
    matrix.premultiply(translation2)
    gl.uniformMatrix4fv(matrixLocation, false, matrix.elements)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    requestAnimationFrame(render)
}

render()

