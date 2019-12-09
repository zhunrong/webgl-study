export function createWebGLContext() {
    const canvas = document.createElement('canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    document.body.appendChild(canvas)
    const gl = canvas.getContext('webgl')
    window.gl = gl
    return gl
}


/**
 * 创建着色器
 * @param {WebGLRenderingContext} gl 
 * @param {string} type 
 * @param {string} source 
 */
export function createShader(gl, type, source) {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        return shader
    }
    throw new Error(gl.getShaderInfoLog(shader))
}

/**
 * 创建着色器程序
 * @param {WebGLRenderingContext} gl 
 * @param {string} vertexShaderSource 
 * @param {string} fragmentShaderSource 
 */
export function createShaderProgram(gl, vertexShaderSource, fragmentShaderSource) {
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
        return program
    }
    throw new Error(gl.getProgramInfoLog(program))
}

export function rotate([x, y], angle) {
    const sin = Math.sin(-angle)
    const cos = Math.cos(-angle)
    return [
        x * cos - y * sin,
        x * sin + y * cos
    ]
}

/**
 * 加载图片
 * @param {string} url
 * @return {Promise<HTMLImageElement>} 
 */
export function load(url) {
    return new Promise((resolve, reject) => {
        const image = new Image()
        image.src = url
        image.onload = () => {
            resolve(image)
        }
        image.onerror = error => {
            reject(error)
        }
    })
}

/**
 * 立方体顶点及颜色 36个顶点
 */
export function cubeVerticesAndColors() {
    return new Float32Array([
        // 正面（红）
        50, -50, 50, 1, 0, 0,
        50, 50, 50, 1, 0, 0,
        -50, 50, 50, 1, 0, 0,
        -50, 50, 50, 1, 0, 0,
        -50, -50, 50, 1, 0, 0,
        50, -50, 50, 1, 0, 0,
        // 右侧（绿）
        50, -50, 50, 0, 1, 0,
        50, -50, -50, 0, 1, 0,
        50, 50, -50, 0, 1, 0,
        50, 50, -50, 0, 1, 0,
        50, 50, 50, 0, 1, 0,
        50, -50, 50, 0, 1, 0,
        // 上侧（蓝）
        -50, 50, 50, 0, 0, 1,
        50, 50, 50, 0, 0, 1,
        -50, 50, -50, 0, 0, 1,
        -50, 50, -50, 0, 0, 1,
        50, 50, 50, 0, 0, 1,
        50, 50, -50, 0, 0, 1,
        // 下侧（黄）
        50, -50, -50, 1, 1, 0,
        50, -50, 50, 1, 1, 0,
        -50, -50, -50, 1, 1, 0,
        -50, -50, -50, 1, 1, 0,
        50, -50, 50, 1, 1, 0,
        -50, -50, 50, 1, 1, 0,
        // 左侧（兰）
        -50, -50, -50, 0, 1, 1,
        -50, -50, 50, 0, 1, 1,
        -50, 50, 50, 0, 1, 1,
        -50, 50, 50, 0, 1, 1,
        -50, 50, -50, 0, 1, 1,
        -50, -50, -50, 0, 1, 1,
        // 背面（紫）
        50, -50, -50, 1, 0, 1,
        -50, -50, -50, 1, 0, 1,
        -50, 50, -50, 1, 0, 1,
        -50, 50, -50, 1, 0, 1,
        50, 50, -50, 1, 0, 1,
        50, -50, -50, 1, 0, 1,
    ])
}

/**
 * 立方体顶点及颜色 24个顶点
 */
export function cubeVerticesAndColors24() {
    return new Float32Array([
        // 正面（红）
        50, -50, 50, 1, 0, 0,
        50, 50, 50, 1, 0, 0,
        -50, 50, 50, 1, 0, 0,
        -50, -50, 50, 1, 0, 0,
        // 右侧（绿）
        50, -50, 50, 0, 1, 0,
        50, -50, -50, 0, 1, 0,
        50, 50, -50, 0, 1, 0,
        50, 50, 50, 0, 1, 0,
        // 上侧（蓝）
        -50, 50, 50, 0, 0, 1,
        50, 50, 50, 0, 0, 1,
        -50, 50, -50, 0, 0, 1,
        50, 50, -50, 0, 0, 1,
        // 下侧（黄）
        50, -50, -50, 1, 1, 0,
        50, -50, 50, 1, 1, 0,
        -50, -50, -50, 1, 1, 0,
        -50, -50, 50, 1, 1, 0,
        // 左侧（兰）
        -50, -50, -50, 0, 1, 1,
        -50, -50, 50, 0, 1, 1,
        -50, 50, 50, 0, 1, 1,
        -50, 50, -50, 0, 1, 1,
        // 背面（紫）
        50, -50, -50, 1, 0, 1,
        -50, -50, -50, 1, 0, 1,
        -50, 50, -50, 1, 0, 1,
        50, 50, -50, 1, 0, 1,
    ])
}