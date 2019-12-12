/**
 * 正射投影
 */
import Matrix4 from '../math/Matrix4'
import Vector3 from '../math/Vector3'
import { createShaderProgram, createWebGLContext, cubeVerticesAndColors } from '../utils/webgl-utils'

const gl = createWebGLContext()

const VERTEX_SHADER_SOURCE = `
    precision mediump float;
    attribute vec4 a_Position;
    attribute vec3 a_Color;
    uniform mat4 u_ModelMatrix;
    uniform mat4 u_ProjMatrix;
    uniform mat4 u_ViewMatrix;
    varying vec3 v_Color;

    void main() {
        gl_Position = u_ProjMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;
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

const modelMatrixLocation = gl.getUniformLocation(program, 'u_ModelMatrix')
const modelMatrix = new Matrix4()
const rotationX = Matrix4.rotationX((Math.PI / 180) * 1)
const rotationY = Matrix4.rotationY((Math.PI / 180) * 1)
const rotationZ = Matrix4.rotationZ((Math.PI / 180) * 1)
const projectionMatrix = Matrix4.orthographic(-window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, 1, 2000)
const projMatrixLocation = gl.getUniformLocation(program, 'u_ProjMatrix')
gl.uniformMatrix4fv(projMatrixLocation, false, projectionMatrix.elements)
const viewMatrix = Matrix4.lookAt(new Vector3(0, 0, 1000), new Vector3(0, 0, 0), new Vector3(0, 1, 0))
const viewMatrixLocation = gl.getUniformLocation(program, 'u_ViewMatrix')
gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix.elements)

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.clear(gl.DEPTH_BUFFER_BIT)
    // 旋转
    modelMatrix.premultiply(rotationX)
    modelMatrix.premultiply(rotationY)
    modelMatrix.premultiply(rotationZ)
    gl.uniformMatrix4fv(modelMatrixLocation, false, modelMatrix.elements)
    gl.drawArrays(gl.TRIANGLES, 0, verticesAndColors.length / 6)
    requestAnimationFrame(render)
}

render()
