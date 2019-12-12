/**
 * 复合变换矩阵
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
        return origin * vec2(2.0,-2.0) / u_Resolution + vec2(-1.0,1.0);
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
const matrixLocation = gl.getUniformLocation(program, 'u_Matrix')

const rMatrix = Matrix4.rotationZ(Math.PI / 180 * 45)
const tMatrix = Matrix4.translation(new Vector3(200, 200, 0))
const matrix = new Matrix4()
// mat4(先旋转再平移)*vec4 = mat4(平移)*mat4(旋转)*vec4
matrix.multiplyMatrices(tMatrix, rMatrix)
gl.uniformMatrix4fv(matrixLocation, false, matrix.elements)

const pointLocation = gl.getAttribLocation(program, 'a_Point')
const buffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
const vertices = new Float32Array([
    0, 0,
    0, 200,
    200, 0,
])

gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
gl.vertexAttribPointer(pointLocation, 2, gl.FLOAT, false, 0, 0)
gl.enableVertexAttribArray(pointLocation)

gl.clearColor(0, 0, 0, 1)
gl.clear(gl.COLOR_BUFFER_BIT)

gl.drawArrays(gl.TRIANGLES, 0, 3)
