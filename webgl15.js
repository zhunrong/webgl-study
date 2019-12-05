/**
 * 透视投影
 */
import { createWebGLContext, createShaderProgram, cubeVerticesAndColors } from './utils.js'
import Matrix4 from './Matrix4.js'

const gl = createWebGLContext()

const VERTEX_SHADER_SOURCE = `
    precision mediump float;
    attribute vec4 a_Position;
    attribute vec3 a_Color;
    uniform mat4 u_Matrix;
    uniform mat4 u_Projection;
    varying vec3 v_Color;

    void main() {
        gl_Position = u_Projection * u_Matrix * a_Position;
        v_Color = a_Color;
    }
`

const FRAG_SHADER_SOURCE = `
    precision mediump float;
    varying vec3 v_Color;
    void main() {
        gl_FragColor = vec4(v_Color,1.0);
    }
`

const program = createShaderProgram(gl, VERTEX_SHADER_SOURCE, FRAG_SHADER_SOURCE)
gl.useProgram(program)

const verticesAndColors = cubeVerticesAndColors()

const elementSize = verticesAndColors.BYTES_PER_ELEMENT

const buffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
gl.bufferData(gl.ARRAY_BUFFER, verticesAndColors, gl.STATIC_DRAW)

const positionLocation = gl.getAttribLocation(program, 'a_Position')
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 6 * elementSize, 0)
gl.enableVertexAttribArray(positionLocation)

const colorLocation = gl.getAttribLocation(program, 'a_Color')
gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 6 * elementSize, 3 * elementSize)
gl.enableVertexAttribArray(colorLocation)

gl.clearColor(0, 0, 0, 1)
// 只绘制正面（逆时针的三角形）
gl.enable(gl.CULL_FACE)
// 开始深度测试
gl.enable(gl.DEPTH_TEST)

const matrixLocation = gl.getUniformLocation(program, 'u_Matrix')
const matrix = new Matrix4()
const rotationX = Matrix4.rotationX(Math.PI / 180 * 1)
const rotationY = Matrix4.rotationY(Math.PI / 180 * 1)
const rotationZ = Matrix4.rotationZ(Math.PI / 180 * 1)
const projection = Matrix4.orthographic(window.innerWidth, window.innerHeight, 1000)
const projectLocation = gl.getUniformLocation(program, 'u_Projection')
gl.uniformMatrix4fv(projectLocation, false, projection.elements)

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    // 旋转
    matrix.premultiply(rotationX)
    matrix.premultiply(rotationY)
    matrix.premultiply(rotationZ)
    gl.uniformMatrix4fv(matrixLocation, false, matrix.elements)
    gl.drawArrays(gl.TRIANGLES, 0, verticesAndColors.length / 6)
    requestAnimationFrame(render)
}

render()


