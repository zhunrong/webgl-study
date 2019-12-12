import { mat4 as Mat4 } from 'gl-matrix'
import Vector3 from './Vector3'

export class Matrix4 {

  public static rotationX(radian: number) {
    const mat4 = new Matrix4()
    Mat4.fromXRotation(mat4.elements, radian)
    return mat4
  }

  public static rotationY(radian: number) {
    const mat4 = new Matrix4()
    Mat4.fromYRotation(mat4.elements, radian)
    return mat4
  }

  public static rotationZ(radian: number) {
    const mat4 = new Matrix4()
    Mat4.fromZRotation(mat4.elements, radian)
    return mat4
  }

  public static translation(vec3: Vector3) {
    const mat4 = new Matrix4()
    Mat4.fromTranslation(mat4.elements, vec3.elements)
    return mat4
  }

  /**
   * 创建正射投影矩阵
   * @param left
   * @param right
   * @param top
   * @param bottom
   * @param near
   * @param far
   */
  public static orthographic(left: number, right: number, top: number, bottom: number, near: number, far: number) {
    const mat4 = new Matrix4()
    Mat4.ortho(mat4.elements, left, right, bottom, top, near, far)
    return mat4
  }

  /**
   * 创建透视投影矩阵
   * @param fovy
   * @param aspect
   * @param near
   * @param far
   */
  public static perspective(fovy: number, aspect: number, near: number, far: number) {
    const mat4 = new Matrix4()
    Mat4.perspective(mat4.elements, fovy, aspect, near, far)
    return mat4
  }

  /**
   * 创建视图矩阵
   * @param eye
   * @param center
   * @param up
   */
  public static lookAt(eye: Vector3, center: Vector3, up: Vector3) {
    const mat4 = new Matrix4()
    Mat4.lookAt(mat4.elements, eye.elements, center.elements, up.elements)
    return mat4
  }

  public elements = Mat4.create()

  /**
   * 将a矩阵与b矩阵相乘，结果矩阵赋给当前矩阵
   * @param a
   * @param b
   */
  public multiplyMatrices(a: Matrix4, b: Matrix4) {
    Mat4.multiply(this.elements, a.elements, b.elements)
    return this
  }

  /**
   * 将mat4乘以当前矩阵，结果矩阵赋给当前矩阵
   * @param mat4
   */
  public premultiply(mat4: Matrix4) {
    return this.multiplyMatrices(mat4, this)
  }

  /**
   * 将当前矩阵乘以mat4，结果矩阵赋给当前矩阵
   * @param mat4
   */
  public multiply(mat4: Matrix4) {
    return this.multiplyMatrices(this, mat4)
  }

  public toString() {
    const [m11, m21, m31, m41, m12, m22, m32, m42, m13, m23, m33, m43, m14, m24, m34, m44] = this.elements
    return `${m11} ${m12} ${m13} ${m14}\n${m21} ${m22} ${m23} ${m24}\n${m31} ${m32} ${m33} ${m34}\n${m41} ${m42} ${m43} ${m44}`
  }
}

export default Matrix4
