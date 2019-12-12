import { vec2 as Vec2 } from 'gl-matrix'

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
   * 旋转
   * @param radian 旋转角度（弧度）
   * @param origin 旋转轴
   */
  public rotate(radian: number, origin = Vector2.origin) {
    Vec2.rotate(this.elements, this.elements, origin.elements, radian)
    return this
  }
}

export default Vector2
