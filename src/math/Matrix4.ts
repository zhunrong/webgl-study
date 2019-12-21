import { mat4 as Mat4 } from 'gl-matrix'
import Vector3 from './Vector3'

export class Matrix4 {

  /**
   * 创建任意轴旋转矩阵
   * @param radian
   * @param axis
   */
  public static rotation(radian: number, axis: Vector3) {
    const mat4 = new Matrix4()
    Mat4.fromRotation(mat4.elements, radian, axis.elements)
    return mat4
  }

  /**
   * 创建x轴旋转矩阵
   * @param radian
   */
  public static rotationX(radian: number) {
    const mat4 = new Matrix4()
    Mat4.fromXRotation(mat4.elements, radian)
    return mat4
  }

  /**
   * 创建y轴旋转矩阵
   * @param radian
   */
  public static rotationY(radian: number) {
    const mat4 = new Matrix4()
    Mat4.fromYRotation(mat4.elements, radian)
    return mat4
  }

  /**
   * 创建z轴旋转矩阵
   * @param radian
   */
  public static rotationZ(radian: number) {
    const mat4 = new Matrix4()
    Mat4.fromZRotation(mat4.elements, radian)
    return mat4
  }

  /**
   * 创建平移矩阵
   * @param vec3
   */
  public static translation(vec3: Vector3) {
    const mat4 = new Matrix4()
    Mat4.fromTranslation(mat4.elements, vec3.elements)
    return mat4
  }

  /**
   * 创建缩放矩阵
   * @param vec3
   */
  public static scaling(vec3: Vector3) {
    const mat4 = new Matrix4()
    Mat4.fromScaling(mat4.elements, vec3.elements)
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

  /**
   * 求mat4的逆矩阵
   * @param mat4
   */
  public static invert(mat4: Matrix4) {
    const m = new Matrix4()
    Mat4.invert(m.elements, mat4.elements)
    return m
  }

  /**
   * 将a矩阵与b矩阵相乘，返回结果矩阵
   * @param a
   * @param b
   */
  public static multiply(a: Matrix4, b: Matrix4) {
    return new Matrix4().multiplyMatrices(a, b)
  }

  public elements = Mat4.create()

  /**
   * 以行主序设置矩阵元素
   * @param e11
   * @param e12
   * @param e13
   * @param e14
   * @param e21
   * @param e22
   * @param e23
   * @param e24
   * @param e31
   * @param e32
   * @param e33
   * @param e34
   * @param e41
   * @param e42
   * @param e43
   * @param e44
   */
  public set(e11: number, e12: number, e13: number, e14: number, e21: number, e22: number, e23: number, e24: number, e31: number, e32: number, e33: number, e34: number, e41: number, e42: number, e43: number, e44: number) {
    const elements = this.elements
    elements[0] = e11
    elements[1] = e21
    elements[2] = e31
    elements[3] = e41
    elements[4] = e12
    elements[5] = e22
    elements[6] = e32
    elements[7] = e42
    elements[8] = e13
    elements[9] = e23
    elements[10] = e33
    elements[11] = e43
    elements[12] = e14
    elements[13] = e24
    elements[14] = e34
    elements[15] = e44
    return this
  }

  /**
   * 将当前矩阵设为平移矩阵
   * @param vec3
   */
  public setTranslation(vec3: Vector3) {
    Mat4.fromTranslation(this.elements, vec3.elements)
    return this
  }

  /**
   * 平移
   * @param vec3
   */
  public translate(vec3: Vector3) {
    Mat4.translate(this.elements, this.elements, vec3.elements)
    return this
  }

  /**
   * 将当前矩阵设为旋转矩阵
   * @param radian
   * @param axis
   */
  public setRotation(radian: number, axis: Vector3) {
    Mat4.fromRotation(this.elements, radian, axis.elements)
    return this
  }

  /**
   * 旋转
   * @param radian
   * @param axis
   */
  public rotate(radian: number, axis: Vector3) {
    Mat4.rotate(this.elements, this.elements, radian, axis.elements)
    return this
  }

  /**
   * 将当前矩阵设为缩放矩阵
   * @param vec3
   */
  public setScaling(vec3: Vector3) {
    Mat4.fromScaling(this.elements, vec3.elements)
    return this
  }

  /**
   * 缩放
   * @param vec3
   */
  public scale(vec3: Vector3) {
    Mat4.scale(this.elements, this.elements, vec3.elements)
    return this
  }

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

  /**
   * 将当前矩阵设为单位矩阵
   */
  public identity() {
    Mat4.identity(this.elements)
    return this
  }

  /**
   * 转置
   */
  public transpose() {
    Mat4.transpose(this.elements, this.elements)
    return this
  }

  /**
   * 求逆矩阵
   */
  public invert() {
    Mat4.invert(this.elements, this.elements)
    return this
  }

  /**
   * 求mat4的逆矩阵并赋给当前矩阵
   * @param mat4
   */
  public setInverseOf(mat4: Matrix4) {
    Mat4.invert(this.elements, mat4.elements)
    return this
  }

  /**
   * 复制矩阵mat4
   * @param mat4
   */
  public copy(mat4: Matrix4) {
    Mat4.copy(this.elements, mat4.elements)
    return this
  }

  /**
   * 克隆
   */
  public clone() {
    const m = new Matrix4()
    return m.copy(this)
  }

  /**
   * 返回行列式字符串
   */
  public toString() {
    const [m11, m21, m31, m41, m12, m22, m32, m42, m13, m23, m33, m43, m14, m24, m34, m44] = this.elements
    return `${m11} ${m12} ${m13} ${m14}\n${m21} ${m22} ${m23} ${m24}\n${m31} ${m32} ${m33} ${m34}\n${m41} ${m42} ${m43} ${m44}`
  }
}

export default Matrix4
