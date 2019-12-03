/**
 * gl.vertexAttribPointer()方法的高级用法
 */
import { createWebGLContext, createShaderProgram } from './utils.js'
import Matrix4 from './Matrix4.js'

const gl = createWebGLContext()

const VERTEX_SHADER_SOURCE = `
    precision mediump float;
    attribute vec2 a_Point;
    attribute vec3 a_Color;
    uniform mat4 u_Matrix;
    uniform vec2 u_Resolution;
    varying vec3 v_Color;

    // 坐标系转换函数
    vec2 convert(vec2 origin) {
        return origin * 2.0 / u_Resolution;
    }

    void main() {
        vec2 xy = convert((u_Matrix * vec4(a_Point,0.0,1.0)).xy);
        gl_Position = vec4(xy,0.0,1.0);
        v_Color = a_Color;
    }
`

const FRAG_SHADER_SOURCE = `
    precision mediump float;
    uniform vec2 u_Resolution;
    varying vec3 v_Color;

    void main() {
        gl_FragColor = vec4(v_Color,1.0);
    }
`

const program = createShaderProgram(gl, VERTEX_SHADER_SOURCE, FRAG_SHADER_SOURCE)
gl.useProgram(program)

const resolutionLocation = gl.getUniformLocation(program, 'u_Resolution')
gl.uniform2fv(resolutionLocation, new Float32Array([window.innerWidth, window.innerHeight]))

const verticesAndColors = new Float32Array([
    0, 0, 1, 0, 0, // 坐标+色值
    0, 100, 0, 1, 0, // 坐标+色值
    100, 0, 0, 0, 1 // 坐标+色值
])
const elementSize = verticesAndColors.BYTES_PER_ELEMENT

const buffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
gl.bufferData(gl.ARRAY_BUFFER, verticesAndColors, gl.STATIC_DRAW)

const pointLocation = gl.getAttribLocation(program, 'a_Point')
gl.vertexAttribPointer(pointLocation, 2, gl.FLOAT, false, 5 * elementSize, 0)
gl.enableVertexAttribArray(pointLocation)

const colorLocation = gl.getAttribLocation(program, 'a_Color')
gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 5 * elementSize, 2 * elementSize)
gl.enableVertexAttribArray(colorLocation)

gl.clearColor(0, 0, 0, 1)
// gl.drawArrays(gl.TRIANGLES, 0, 3)

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
    gl.drawArrays(gl.LINE_LOOP, 0, 3)
    requestAnimationFrame(render)
}

render()

