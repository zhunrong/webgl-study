export function createWebGLContext() {
    const canvas = document.createElement('canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    document.body.appendChild(canvas)
    const gl = canvas.getContext('webgl')
    window.gl = gl
    return gl
}

// const gl = createWebGLContext()

export function createShader(gl, type, source) {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        return shader
    }
    throw new Error(gl.getShaderInfoLog(shader))
}

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