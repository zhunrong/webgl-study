import { vec3 as Vec3 } from 'gl-matrix'
import Matrix3 from './Matrix3'
import Matrix4 from './Matrix4'
import Quaternion from './Quaternion'

export class Vector3 {

  public static readonly xAxis = new Vector3(1, 0, 0)

  public static readonly yAxis = new Vector3(0, 1, 0)

  public static readonly zAxis = new Vector3(0, 0, 1)

  public elements = Vec3.create()

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

  get z() {
    return this.elements[2]
  }

  set z(value: number) {
    this.elements[2] = value
  }

  constructor(x = 0, y = 0, z = 0) {
    this.set(x, y, z)
  }

  /**
   * 设置分量
   * @param x
   * @param y
   * @param z
   */
  public set(x: number, y: number, z: number) {
    Vec3.set(this.elements, x, y, z)
    return this
  }

  /**
   * 矢量加
   * @param vec3
   */
  public add(vec3: Vector3) {
    Vec3.add(this.elements, this.elements, vec3.elements)
    return this
  }

  /**
   * 矢量减
   * @param vec3
   */
  public subtract(vec3: Vector3) {
    Vec3.subtract(this.elements, this.elements, vec3.elements)
    return this
  }

  /**
   * 与vec3的叉积
   * @param vec3
   */
  public cross(vec3: Vector3) {
    Vec3.cross(this.elements, this.elements, vec3.elements)
    return this
  }

  /**
   * 与vec3的点积
   * @param vec3
   */
  public dot(vec3: Vector3) {
    return Vec3.dot(this.elements, vec3.elements)
  }

  /**
   * 乘以vec3
   * @param vec3
   */
  public multiply(vec3: Vector3) {
    Vec3.multiply(this.elements, this.elements, vec3.elements)
    return this
  }

  /**
   * 缩放
   * @param scalar
   */
  public scale(scalar: number) {
    Vec3.scale(this.elements, this.elements, scalar)
    return this
  }

  /**
   * 判断是否约等于vec3
   * @param vec3
   */
  public equals(vec3: Vector3) {
    return Vec3.equals(this.elements, vec3.elements)
  }

  /**
   * 判断是否等于vec3
   * @param vec3
   */
  public exactEquals(vec3: Vector3) {
    return Vec3.exactEquals(this.elements, vec3.elements)
  }

  /**
   * 获取当前矢量与vec3的夹角
   * @param vec3
   */
  public angle(vec3: Vector3) {
    return Vec3.angle(this.elements, vec3.elements)
  }

  /**
   * 与vec3的距离
   * @param vec3
   */
  public distance(vec3: Vector3) {
    return Vec3.distance(this.elements, vec3.elements)
  }

  /**
   * 与vec3的距离的平方
   * @param vec3
   */
  public squaredDistance(vec3: Vector3) {
    return Vec3.squaredDistance(this.elements, vec3.elements)
  }

  /**
   * 绕x轴旋转
   * @param origin
   * @param radian
   */
  public rotateX(origin: Vector3, radian: number) {
    Vec3.rotateX(this.elements, this.elements, origin.elements, radian)
    return this
  }

  /**
   * 绕y轴旋转
   * @param origin
   * @param radian
   */
  public rotateY(origin: Vector3, radian: number) {
    Vec3.rotateY(this.elements, this.elements, origin.elements, radian)
    return this
  }

  /**
   * 绕z轴旋转
   * @param origin
   * @param radian
   */
  public rotateZ(origin: Vector3, radian: number) {
    Vec3.rotateZ(this.elements, this.elements, origin.elements, radian)
    return this
  }

  /**
   * 将当前矢量的各分量向上取整
   */
  public ceil() {
    Vec3.ceil(this.elements, this.elements)
    return this
  }

  /**
   * 将当前矢量的各分量向下取整
   */
  public floor() {
    Vec3.floor(this.elements, this.elements)
    return this
  }

  /**
   * 将当前矢量的各分量取整
   */
  public round() {
    Vec3.round(this.elements, this.elements)
    return this
  }

  /**
   * 克隆
   */
  public clone() {
    return new Vector3().copy(this)
  }

  /**
   * 复制vec3
   * @param vec3
   */
  public copy(vec3: Vector3) {
    Vec3.copy(this.elements, vec3.elements)
    return this
  }

  /**
   * 获取当前矢量的模
   */
  public length() {
    return Vec3.length(this.elements)
  }

  /**
   * 获取当前矢量的模的平方
   */
  public squaredLength() {
    return Vec3.squaredLength(this.elements)
  }

  /**
   * 归一化
   */
  public normalize() {
    Vec3.normalize(this.elements, this.elements)
    return this
  }

  /**
   * 逆矢量
   */
  public inverse() {
    Vec3.inverse(this.elements, this.elements)
    return this
  }

  /**
   * 对各分量取反
   */
  public negate() {
    Vec3.negate(this.elements, this.elements)
    return this
  }

  /**
   * 随机矢量
   * @param scale
   */
  public random(scale = 1) {
    Vec3.random(this.elements, scale)
    return this
  }

  /**
   * 变换
   * @param params
   */
  public transform(params: Matrix3 | Matrix4 | Quaternion) {
    if (params instanceof Matrix3) {
      Vec3.transformMat3(this.elements, this.elements, params.elements)
    } else if (params instanceof Matrix4) {
      Vec3.transformMat4(this.elements, this.elements, params.elements)
    } else if (params instanceof Quaternion) {
      Vec3.transformQuat(this.elements, this.elements, params.elements)
    }
    return this
  }
}

export default Vector3
