import { vec3 as Vec3 } from 'gl-matrix'

export class Vector3 {
  public elements = Vec3.create()

  constructor(x = 0, y = 0, z = 0) {
    this.set(x, y, z)
  }

  public set(x: number, y: number, z: number) {
    Vec3.set(this.elements, x, y, z)
    return this
  }
}

export default Vector3
