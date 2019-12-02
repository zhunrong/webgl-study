import { createWebGLContext, createShaderProgram, rotate } from './utils.js'

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
        vec2 xy = convert(a_Point);
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
    0, 200,
    200, 0
])

for (let i = 0; i < vertices.length; i += 2) {
    const [x1, y1] = rotate([vertices[i], vertices[i + 1]], Math.PI / 4)
    vertices[i] = x1
    vertices[i + 1] = y1
}

gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
gl.vertexAttribPointer(pointLocation, 2, gl.FLOAT, false, 0, 0)
gl.enableVertexAttribArray(pointLocation)

gl.clearColor(0, 0, 0, 1)
gl.clear(gl.COLOR_BUFFER_BIT)

gl.drawArrays(gl.TRIANGLES, 0, 3)

