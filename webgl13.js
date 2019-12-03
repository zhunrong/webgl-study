/**
 * 图片纹理
 */
import { createWebGLContext, createShaderProgram, load } from './utils.js'
import Matrix4 from './Matrix4.js'

const gl = createWebGLContext()

const VERTEX_SHADER_SOURCE = `
    precision mediump float;
    attribute vec2 a_Position;
    attribute vec2 a_TexCoord;
    uniform mat4 u_Matrix;
    uniform vec2 u_Resolution;
    varying vec2 v_TexCoord;

    // 坐标系转换函数
    vec2 convert(vec2 origin) {
        return origin * 2.0 / u_Resolution;
    }

    void main() {
        vec2 xy = convert((u_Matrix * vec4(a_Position,0.0,1.0)).xy);
        gl_Position = vec4(xy,0.0,1.0);
        v_TexCoord = a_TexCoord;
    }
`

const FRAG_SHADER_SOURCE = `
    precision mediump float;
    uniform vec2 u_Resolution;
    uniform sampler2D u_Texture;
    varying vec2 v_TexCoord;

    void main() {
        gl_FragColor = texture2D(u_Texture,v_TexCoord);
        // gl_FragColor = vec4(1.0);
    }
`

const program = createShaderProgram(gl, VERTEX_SHADER_SOURCE, FRAG_SHADER_SOURCE)
gl.useProgram(program)

const resolutionLocation = gl.getUniformLocation(program, 'u_Resolution')
gl.uniform2fv(resolutionLocation, new Float32Array([window.innerWidth, window.innerHeight]))

const verticesAndColors = new Float32Array([
    0, 0, 0, 1, // 顶点坐标+纹理坐标
    0, 100, 0, 0,
    100, 0, 1, 1,
    100, 100, 1, 0,
])
const elementSize = verticesAndColors.BYTES_PER_ELEMENT

const buffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
gl.bufferData(gl.ARRAY_BUFFER, verticesAndColors, gl.STATIC_DRAW)

const positionLocation = gl.getAttribLocation(program, 'a_Position')
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 4 * elementSize, 0)
gl.enableVertexAttribArray(positionLocation)

const texCoordLocation = gl.getAttribLocation(program, 'a_TexCoord')
gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 4 * elementSize, 2 * elementSize)
gl.enableVertexAttribArray(texCoordLocation)

gl.clearColor(0, 0, 0, 1)

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
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    requestAnimationFrame(render)
}

(async () => {
    // 如果图片尺寸不是2的幂次，无法显示
    const image = await load('./textures/texture02.jpg')
    const textureLocation = gl.getUniformLocation(program, 'u_Texture')
    const texture = gl.createTexture()
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image)
    gl.uniform1i(textureLocation, 0)
    render()
})()


