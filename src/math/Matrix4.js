/**
 * 列主序4x4矩阵
 */
export class Matrix4 {
  /**
   * 以列主序存储
   */
  // prettier-ignore
  elements = new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ])

  /**
   * 以行主序设置元素
   * @param {number} m11
   * @param {number} m12
   * @param {number} m13
   * @param {number} m14
   * @param {number} m21
   * @param {number} m22
   * @param {number} m23
   * @param {number} m24
   * @param {number} m31
   * @param {number} m32
   * @param {number} m33
   * @param {number} m34
   * @param {number} m41
   * @param {number} m42
   * @param {number} m43
   * @param {number} m44
   */
  set(m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44) {
    this.elements[0] = m11
    this.elements[1] = m21
    this.elements[2] = m31
    this.elements[3] = m41
    this.elements[4] = m12
    this.elements[5] = m22
    this.elements[6] = m32
    this.elements[7] = m42
    this.elements[8] = m13
    this.elements[9] = m23
    this.elements[10] = m33
    this.elements[11] = m43
    this.elements[12] = m14
    this.elements[13] = m24
    this.elements[14] = m34
    this.elements[15] = m44
    return this
  }

  /**
   * 当前矩阵乘以目标矩阵
   * @param {Matrix4} matrix4
   * @return {this} this
   */
  multiply(matrix4) {
    return this.multiplyMatrices(this, matrix4)
  }

  /**
   * 将目标矩阵乘以当前矩阵
   * @param {Matrix4} matrix4
   */
  premultiply(matrix4) {
    return this.multiplyMatrices(matrix4, this)
  }

  /**
   * 将2个矩阵相乘结果赋给当前矩阵
   * @param {Matrix4} matA
   * @param {Matrix4} matB
   */
  multiplyMatrices(matA, matB) {
    /**
     * a11, a12, a13, a14,
     * a21, a22, a23, a24,
     * a31, a32, a33, a34,
     * a41, a42, a43, a44,
     */
    const [a11, a21, a31, a41, a12, a22, a32, a42, a13, a23, a33, a43, a14, a24, a34, a44] = matA.elements
    /**
     * b11, b12, b13, b14,
     * b21, b22, b23, b24,
     * b31, b32, b33, b34,
     * b41, b42, b43, b44,
     */
    const [b11, b21, b31, b41, b12, b22, b32, b42, b13, b23, b33, b43, b14, b24, b34, b44] = matB.elements

    const m11 = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41
    const m12 = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42
    const m13 = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43
    const m14 = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44
    const m21 = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41
    const m22 = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42
    const m23 = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43
    const m24 = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44
    const m31 = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41
    const m32 = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42
    const m33 = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43
    const m34 = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44
    const m41 = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41
    const m42 = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42
    const m43 = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43
    const m44 = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44
    // prettier-ignore
    return this.set(
            m11, m12, m13, m14,
            m21, m22, m23, m24,
            m31, m32, m33, m34,
            m41, m42, m43, m44,
        )
  }

  toString() {
    const [m11, m21, m31, m41, m12, m22, m32, m42, m13, m23, m33, m43, m14, m24, m34, m44] = this.elements
    return `${m11} ${m12} ${m13} ${m14}\n${m21} ${m22} ${m23} ${m24}\n${m31} ${m32} ${m33} ${m34}\n${m41} ${m42} ${m43} ${m44}`
  }

  /**
   * 平移
   * @param {number} tx
   * @param {number} ty
   * @param {number} tz
   */
  translate(tx, ty, tz) {
    const translation = Matrix4.translation(tx, ty, tz)
    return this.premultiply(translation)
  }

  /**
   * 转置
   */
  transpose() {}

  /**
   * 逆矩阵
   */
  inverse() {}

  /**
   * 平移矩阵
   * @param {number} tx
   * @param {number} ty
   * @param {number} tz
   */
  static translation(tx, ty, tz) {
    // prettier-ignore
    return new Matrix4().set(
            1, 0, 0, tx,
            0, 1, 0, ty,
            0, 0, 1, tz,
            0, 0, 0, 1,
        )
  }

  /**
   * 缩放矩阵
   * @param {number} sx
   * @param {number} sy
   * @param {number} sz
   */
  static scaling(sx, sy, sz) {
    // prettier-ignore
    return new Matrix4().set(
            sx, 0, 0, 0,
            0, sy, 0, 0,
            0, 0, sz, 0,
            0, 0, 0, 1
        )
  }

  /**
   * 绕X轴 - 旋转矩阵
   * @param {number} angle
   */
  static rotationX(angle) {
    const sin = Math.sin(angle)
    const cos = Math.cos(angle)
    // prettier-ignore
    return new Matrix4().set(
            1, 0, 0, 0,
            0, cos, -sin, 0,
            0, sin, cos, 0,
            0, 0, 0, 1
        )
  }

  /**
   * 绕Y轴 - 旋转矩阵
   * @param {number} angle
   */
  static rotationY(angle) {
    const sin = Math.sin(angle)
    const cos = Math.cos(angle)
    // prettier-ignore
    return new Matrix4().set(
            cos, 0, sin, 0,
            0, 1, 0, 0,
            -sin, 0, cos, 0,
            0, 0, 0, 1
        )
  }

  /**
   * 绕Z轴 - 旋转矩阵
   * @param {number} angle
   */
  static rotationZ(angle) {
    const sin = Math.sin(angle)
    const cos = Math.cos(angle)
    // prettier-ignore
    return new Matrix4().set(
            cos, -sin, 0, 0,
            sin, cos, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        )
  }

  /**
   * 投影矩阵
   * @param {number} width
   * @param {number} height
   * @param {number} depth
   */
  static projection(width, height, depth) {
    // prettier-ignore
    return new Matrix4().set(
            2 / width, 0, 0, 0,
            0, 2 / height, 0, 0,
            0, 0, 2 / depth, 0,
            0, 0, 0, 1
        )
  }

  /**
   * 视图矩阵
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} atX
   * @param {number} atY
   * @param {number} atZ
   * @param {number} upX
   * @param {number} upY
   * @param {number} upZ
   */
  static lookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
    let fx, fy, fz, rlf, sx, sy, sz, rls, ux, uy, uz

    fx = centerX - eyeX
    fy = centerY - eyeY
    fz = centerZ - eyeZ

    // Normalize f.
    rlf = 1 / Math.sqrt(fx * fx + fy * fy + fz * fz)
    fx *= rlf
    fy *= rlf
    fz *= rlf

    // Calculate cross product of f and up.
    sx = fy * upZ - fz * upY
    sy = fz * upX - fx * upZ
    sz = fx * upY - fy * upX

    // Normalize s.
    rls = 1 / Math.sqrt(sx * sx + sy * sy + sz * sz)
    sx *= rls
    sy *= rls
    sz *= rls

    // Calculate cross product of s and f.
    ux = sy * fz - sz * fy
    uy = sz * fx - sx * fz
    uz = sx * fy - sy * fx
    // prettier-ignore
    return new Matrix4().set(
            sx, sy, sz, 0,
            ux, uy, uz, 0,
            -fx, -fy, -fz, 0,
            0, 0, 0, 1,
        ).translate(-eyeX, -eyeY, -eyeZ)
  }

  /**
   * 透视投影
   * @param {number} fov
   * @param {number} aspect
   * @param {number} near
   * @param {number} far
   */
  static perspective(fov, aspect, near, far) {
    const t = Math.tan(fov / 2)
    const rangeInv = 1 / (near - far)
    // prettier-ignore
    return new Matrix4().set(
            1 / (aspect * t), 0, 0, 0,
            0, 1 / t, 0, 0,
            0, 0, (far + near) * rangeInv, 2 * far * near * rangeInv,
            0, 0, -1, 0
        )
  }

  /**
   * 正射投影
   * @param {number} left
   * @param {number} right
   * @param {number} top
   * @param {number} bottom
   * @param {number} near
   * @param {number} far
   */
  static orthographic(left, right, top, bottom, near, far) {
    const width = right - left
    const height = top - bottom
    const depth = far - near
    // prettier-ignore
    return new Matrix4().set(
            2 / width, 0, 0, -(left+right) / width,
            0, 2 / height, 0, -(top+bottom) / height,
            0, 0, -2 / depth, -(far+near) / depth,
            0, 0, 0, 1
        )
  }
}

export default Matrix4
