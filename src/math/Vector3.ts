import { vec3 as Vec3 } from 'gl-matrix'

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
   * 获取当前矢量与vec3的夹角
   * @param vec3
   */
  public angle(vec3: Vector3) {
    return Vec3.angle(this.elements, vec3.elements)
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
   * 归一化
   */
  public normalize() {
    Vec3.normalize(this.elements, this.elements)
    return this
  }
}

export default Vector3
