/**
 * shader attribute
 */
import { createShaderProgram, createWebGLContext } from '../utils/webgl-utils'

const gl = createWebGLContext()

const VERTEX_SHADER_SOURCE = `
    attribute vec2 a_Point;

    void main() {
        gl_Position = vec4(a_Point.xy,0.0,1.0);
        gl_PointSize = 10.0;
    }
`

const FRAG_SHADER_SOURCE = `
    void main() {
        gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }
`

const program = createShaderProgram(gl, VERTEX_SHADER_SOURCE, FRAG_SHADER_SOURCE)
gl.useProgram(program)

const location = gl.getAttribLocation(program, 'a_Point')
gl.vertexAttrib2fv(location, new Float32Array([0.3, 0.3]))

gl.clearColor(0, 0, 0, 1)
gl.clear(gl.COLOR_BUFFER_BIT)

gl.drawArrays(gl.POINTS, 0, 1)
