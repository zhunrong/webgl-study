/**
 * 顶点着色器，批量传入顶点数据
 */
import { createShaderProgram, createWebGLContext } from '../utils/webgl-utils'

const gl = createWebGLContext()

const VERTEX_SHADER_SOURCE = `
    precision mediump float;
    attribute vec2 a_Point;
    uniform vec2 u_Resolution;

    // 坐标系转换函数
    vec2 convert(vec2 origin) {
        return origin * vec2(2.0,-2.0) / u_Resolution + vec2(-1.0,1.0);
    }

    void main() {
        gl_Position = vec4(convert(a_Point),0.0,1.0);
        gl_PointSize = 10.0;
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
    100, 100,
    200, 200,
    500, 500,
])
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
gl.vertexAttribPointer(pointLocation, 2, gl.FLOAT, false, 0, 0)
gl.enableVertexAttribArray(pointLocation)

gl.clearColor(0, 0, 0, 1)
gl.clear(gl.COLOR_BUFFER_BIT)

gl.drawArrays(gl.POINTS, 0, 3)
