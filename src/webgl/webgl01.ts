/**
 * 初识着色器
 */
import { createShaderProgram, createWebGLContext } from '../utils/webgl-utils'

const gl = createWebGLContext()

const VERTEX_SHADER_SOURCE = `
    void main() {
        float x = 0.0;
        float y = 0.0;
        gl_Position = vec4(x,y,0.0,1.0);
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

gl.clearColor(0, 0, 0, 1)
gl.clear(gl.COLOR_BUFFER_BIT)

gl.drawArrays(gl.POINTS, 0, 1)
