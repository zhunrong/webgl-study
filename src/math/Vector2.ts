import { vec2 as Vec2 } from 'gl-matrix'
import Matrix2 from './Matrix2'
import Matrix3 from './Matrix3'
import Matrix4 from './Matrix4'

export class Vector2 {

  public static origin = new Vector2()

  public elements = Vec2.create()

  get x() {
    return this.elements[0]
  }
  set x(value: number) {
    this.elements[0] = value
  }

  get y() {
    return this.elements[1]
  }
  set y(value: number) {
    this.elements[1] = value
  }

  constructor(x = 0, y = 0) {
    this.set(x, y)
  }

  /**
   * 设置[x,y]分量
   * @param x
   * @param y
   */
  public set(x: number, y: number) {
    Vec2.set(this.elements, x, y)
    return this
  }

  /**
   * 矢量加
   * @param vec2
   */
  public add(vec2: Vector2) {
    Vec2.add(this.elements, this.elements, vec2.elements)
    return this
  }

  /**
   * 矢量减
   * @param vec2
   */
  public subtract(vec2: Vector2) {
    Vec2.subtract(this.elements, this.elements, vec2.elements)
    return this
  }

  /**
   * 乘以vec2
   * @param vec2
   */
  public multiply(vec2: Vector2) {
    Vec2.multiply(this.elements, this.elements, vec2.elements)
    return this
  }

  // public cross(vec2: Vector2) { }

  /**
   * 与vec2的点积
   * @param vec2
   */
  public dot(vec2: Vector2) {
    return Vec2.dot(this.elements, vec2.elements)
  }

  /**
   * 获取当前矢量与vec2的夹角
   * @param vec2
   */
  public angle(vec2: Vector2) {
    return Vec2.angle(this.elements, vec2.elements)
  }

  /**
   * 与vec2的距离
   * @param vec2
   */
  public distance(vec2: Vector2) {
    return Vec2.distance(this.elements, vec2.elements)
  }

  /**
   * 与vec2的距离的平方
   * @param vec2
   */
  public squaredDistance(vec2: Vector2) {
    return Vec2.squaredDistance(this.elements, vec2.elements)
  }

  /**
   * 判断是否约等于vec2
   * @param vec2
   */
  public equals(vec2: Vector2) {
    return Vec2.equals(this.elements, vec2.elements)
  }

  /**
   * 判断是否等于vec2
   * @param vec2
   */
  public exactEquals(vec2: Vector2) {
    return Vec2.exactEquals(this.elements, vec2.elements)
  }

  /**
   * 将当前矢量的各分量向上取整
   */
  public ceil() {
    Vec2.ceil(this.elements, this.elements)
    return this
  }

  /**
   * 将当前矢量的各分量向下取整
   */
  public floor() {
    Vec2.floor(this.elements, this.elements)
    return this
  }

  /**
   * 将当前矢量的各分量取整
   */
  public round() {
    Vec2.round(this.elements, this.elements)
    return this
  }

  /**
   * 归一化
   */
  public normalize() {
    Vec2.normalize(this.elements, this.elements)
    return this
  }

  /**
   * 逆矢量
   */
  public inverse() {
    Vec2.inverse(this.elements, this.elements)
    return this
  }

  /**
   * 对各分量取反
   */
  public negate() {
    Vec2.negate(this.elements, this.elements)
    return this
  }

  /**
   * 获取当前矢量的模
   */
  public length() {
    return Vec2.length(this.elements)
  }

  /**
   * 获取当前矢量的模的平方
   */
  public squaredLength() {
    return Vec2.squaredLength(this.elements)
  }

  /**
   * 旋转
   * @param radian 旋转角度（弧度）
   * @param origin 旋转轴
   */
  public rotate(radian: number, origin = Vector2.origin) {
    Vec2.rotate(this.elements, this.elements, origin.elements, radian)
    return this
  }

  /**
   * 缩放
   * @param scalar
   */
  public scale(scalar: number) {
    Vec2.scale(this.elements, this.elements, scalar)
    return this
  }

  /**
   * 克隆
   */
  public clone() {
    return new Vector2().copy(this)
  }

  /**
   * 复制vec2
   * @param vec2
   */
  public copy(vec2: Vector2) {
    Vec2.copy(this.elements, vec2.elements)
    return this
  }

  /**
   * 随机矢量
   * @param scale
   */
  public random(scale = 1) {
    Vec2.random(this.elements, scale)
    return this
  }

  /**
   * 变换
   * @param m
   */
  public transform(m: Matrix2 | Matrix3 | Matrix4) {
    if (m instanceof Matrix2) {
      Vec2.transformMat2(this.elements, this.elements, m.elements)
    } else if (m instanceof Matrix3) {
      Vec2.transformMat3(this.elements, this.elements, m.elements)
    } else if (m instanceof Matrix4) {
      Vec2.transformMat4(this.elements, this.elements, m.elements)
    }
    return this
  }
}

export default Vector2
