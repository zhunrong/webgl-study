export class Vector3 {
  elements = new Float32Array([0.0, 0.0, 0.0])

  get x() {
    return this.elements[0]
  }
  set x(value) {
    this.elements[0] = value
  }

  get y() {
    return this.elements[1]
  }
  set y(value) {
    this.elements[1] = value
  }

  get z() {
    return this.elements[2]
  }
  set z(value) {
    this.elements[2] = value
  }

  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2)
  }
}

export default Vector3
