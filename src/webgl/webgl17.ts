/**
 * 光照
 */
import Matrix4 from '../math/Matrix4'
import Vector3 from '../math/Vector3'
import { createShaderProgram, createWebGLContext, cubeVerticesAndColors24 } from '../utils/webgl-utils'

const gl = createWebGLContext()

const VERTEX_SHADER_SOURCE = `
    precision mediump float;
    attribute vec4 a_Position;
    attribute vec3 a_Color;
    attribute vec3 a_Normal;
    uniform mat4 u_ModelMatrix;
    uniform mat4 u_ProjMatrix;
    uniform mat4 u_ViewMatrix;
    varying vec3 v_Color;
    varying vec3 v_Normal;

    void main() {
        gl_Position = u_ProjMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;
        v_Color = a_Color;
        v_Normal = mat3(u_ModelMatrix) * a_Normal;
    }
`

const FRAG_SHADER_SOURCE = `
    precision mediump float;
    uniform vec3 u_LightDirection;
    uniform vec3 u_LightColor;
    uniform float u_LightIntensity;
    varying vec3 v_Color;
    varying vec3 v_Normal;
    void main() {
        vec3 ambientLightColor = vec3(1.0,1.0,1.0);
        float ambientLightIntensity = 0.2;
        vec3 lightDirection = normalize(u_LightDirection);
        vec3 color = v_Color * u_LightColor * max(dot(v_Normal,lightDirection),0.0) * u_LightIntensity;
        color += v_Color * ambientLightColor * ambientLightIntensity;
        gl_FragColor = vec4(color,1.0);
    }
`

const program = createShaderProgram(gl, VERTEX_SHADER_SOURCE, FRAG_SHADER_SOURCE)
gl.useProgram(program)

const verticesAndColors = cubeVerticesAndColors24()
// prettier-ignore
const indices = new Int8Array([
  // 正面
  0, 1, 2, 2, 3, 0,
  // 右侧
  4, 5, 6, 6, 7, 4,
  // 上侧
  8, 9, 10, 10, 9, 11,
  // 下侧
  12, 13, 14, 14, 13, 15,
  // 左侧
  16, 17, 18, 18, 19, 16,
  // 背面
  20, 21, 22, 22, 23, 20,
])
// prettier-ignore
const normals = new Float32Array([
  // 正
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
  // 右
  1, 0, 0,
  1, 0, 0,
  1, 0, 0,
  1, 0, 0,
  // 上
  0, 1, 0,
  0, 1, 0,
  0, 1, 0,
  0, 1, 0,
  // 下
  0, -1, 0,
  0, -1, 0,
  0, -1, 0,
  0, -1, 0,
  // 左
  -1, 0, 0,
  -1, 0, 0,
  -1, 0, 0,
  -1, 0, 0,
  // 背
  0, 0, -1,
  0, 0, -1,
  0, 0, -1,
  0, 0, -1,
])

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

const normalBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer)
gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW)
const normalLocation = gl.getAttribLocation(program, 'a_Normal')
gl.vertexAttribPointer(normalLocation, 3, gl.FLOAT, false, normals.BYTES_PER_ELEMENT * 3, 0)
gl.enableVertexAttribArray(normalLocation)

const indicesBuffer = gl.createBuffer()
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)

gl.clearColor(0, 0, 0, 1)
// 只绘制正面（逆时针的三角形）
gl.enable(gl.CULL_FACE)
// 开始深度测试
gl.enable(gl.DEPTH_TEST)

// 平行光
const directionalLight = {
  color: [1, 1, 1],
  direction: [1, 0, 1],
  intensity: 1,
}
const lightDirectionLocation = gl.getUniformLocation(program, 'u_LightDirection')
const lightColorLocation = gl.getUniformLocation(program, 'u_LightColor')
const lightIntensity = gl.getUniformLocation(program, 'u_LightIntensity')
gl.uniform3fv(lightDirectionLocation, directionalLight.direction)
gl.uniform3fv(lightColorLocation, directionalLight.color)
gl.uniform1f(lightIntensity, directionalLight.intensity)

const modelMatrixLocation = gl.getUniformLocation(program, 'u_ModelMatrix')
const modelMatrix = new Matrix4()
const viewMatrix = Matrix4.lookAt(new Vector3(0, 0, 500), new Vector3(0, 0, 0), new Vector3(0, 1, 0))
const rotationX = Matrix4.rotationX((Math.PI / 180) * 1)
const rotationY = Matrix4.rotationY((Math.PI / 180) * 1)
const rotationZ = Matrix4.rotationZ((Math.PI / 180) * 1)
const projectionMatrix = Matrix4.perspective((45 / 180) * Math.PI, window.innerWidth / window.innerHeight, 1, 2000)
const projMatrixLocation = gl.getUniformLocation(program, 'u_ProjMatrix')
gl.uniformMatrix4fv(projMatrixLocation, false, projectionMatrix.elements)
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
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_BYTE, 0)
  requestAnimationFrame(render)
}

render()
