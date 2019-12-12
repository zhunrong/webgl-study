/**
 * 创建webgl绘图上下文
 */
export function createWebGLContext() {
  const canvas = document.createElement('canvas')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  document.body.appendChild(canvas)
  const gl = canvas.getContext('webgl') as WebGLRenderingContext
  return gl
}

/**
 * 创建着色器
 * @param gl
 * @param type
 * @param source
 */
export function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type) as WebGLShader
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader
  }
  throw new Error(gl.getShaderInfoLog(shader) || '')
}

/**
 * 创建着色器程序
 * @param gl
 * @param vertexShaderSource
 * @param fragmentShaderSource
 */
export function createShaderProgram(gl: WebGLRenderingContext, vertexShaderSource: string, fragmentShaderSource: string) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
  const program = gl.createProgram() as WebGLProgram
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
    return program
  }
  throw new Error(gl.getProgramInfoLog(program) || '')
}

/**
 * 加载图片
 * @param url
 */
export function load(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = url
    image.onload = () => {
      resolve(image)
    }
    image.onerror = (error) => {
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
