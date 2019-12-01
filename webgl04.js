import { createWebGLContext, createShaderProgram } from './utils.js'

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

const pointLocation = gl.getAttribLocation(program, 'a_Point')

const resolutionLocation = gl.getUniformLocation(program, 'u_Resolution')
gl.uniform2fv(resolutionLocation, new Float32Array([window.innerWidth, window.innerHeight]))

gl.clearColor(0, 0, 0, 1)
gl.clear(gl.COLOR_BUFFER_BIT)


const coords = []
gl.canvas.addEventListener('click', e => {
    const { clientX, clientY } = e
    coords.push(clientX, clientY)
    gl.clear(gl.COLOR_BUFFER_BIT)
    for (let index = 1; index < coords.length; index += 2) {
        gl.vertexAttrib2fv(pointLocation, new Float32Array([coords[index - 1], coords[index]]))
        gl.drawArrays(gl.POINTS, 0, 1)
    }
})