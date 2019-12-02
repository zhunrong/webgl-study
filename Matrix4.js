/**
 * 列主序4x4矩阵
 */
export class Matrix4 {
    elements = new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ])

    /**
     * @param {number} m11 
     * @param {number} m21 
     * @param {number} m31 
     * @param {number} m41 
     * @param {number} m12 
     * @param {number} m22 
     * @param {number} m32 
     * @param {number} m42 
     * @param {number} m13 
     * @param {number} m23 
     * @param {number} m33 
     * @param {number} m43 
     * @param {number} m14 
     * @param {number} m24 
     * @param {number} m34 
     * @param {number} m44 
     */
    set(m11, m21, m31, m41, m12, m22, m32, m42, m13, m23, m33, m43, m14, m24, m34, m44) {
        this.elements[0] = m11
        this.elements[1] = m12
        this.elements[2] = m13
        this.elements[3] = m14
        this.elements[4] = m21
        this.elements[5] = m22
        this.elements[6] = m23
        this.elements[7] = m24
        this.elements[8] = m31
        this.elements[9] = m32
        this.elements[10] = m33
        this.elements[11] = m34
        this.elements[12] = m41
        this.elements[13] = m42
        this.elements[14] = m43
        this.elements[15] = m44
        return this
    }

    /**
     * 平移矩阵
     * @param {number} tx 
     * @param {number} ty 
     * @param {number} tz 
     */
    static translation(tx, ty, tz) {
        return new Matrix4().set(
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            tx, ty, tz, 1
        )
    }

    /**
     * 缩放矩阵
     * @param {number} sx 
     * @param {number} sy 
     * @param {number} sz 
     */
    static scaling(sx, sy, sz) {
        return new Matrix4().set(
            sx, 0, 0, 0,
            0, sy, 0, 0,
            0, 0, sz, 0,
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
        return new Matrix4().set(
            cos, sin, 0, 0,
            -sin, cos, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        )
    }
}

export default Matrix4