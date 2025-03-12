type Numeric = number

type CurvePoints = [Numeric, Numeric, Numeric, Numeric]

class Cubic {
  private curves: CurvePoints

  constructor(curves: CurvePoints) {
    this.curves = curves
  }

  getValue(time: Numeric): Numeric {
    let startGradient = 0.0,
      endGradient = 0.0
    let start = 0.0,
      mid = 0.0
    let end = 1.0

    if (time <= 0.0) {
      if (this.curves[0] > 0.0) {
        startGradient = this.curves[1] / this.curves[0]
      } else if (this.curves[1] === 0.0 && this.curves[2] > 0.0) {
        startGradient = this.curves[3] / this.curves[2]
      }
      return startGradient * time
    }

    if (time >= 1.0) {
      if (this.curves[2] < 1.0) {
        endGradient = (this.curves[3] - 1.0) / (this.curves[2] - 1.0)
      } else if (this.curves[2] === 1.0 && this.curves[0] < 1.0) {
        endGradient = (this.curves[1] - 1.0) / (this.curves[0] - 1.0)
      }
      return 1.0 + endGradient * (time - 1.0)
    }

    while (start < end) {
      mid = (start + end) / 2
      const xEst = Cubic.calculate(this.curves[0], this.curves[2], mid)
      if (Math.abs(time - xEst) < 0.00001) {
        return Cubic.calculate(this.curves[1], this.curves[3], mid)
      }
      if (xEst < time) {
        start = mid
      } else {
        end = mid
      }
    }
    return Cubic.calculate(this.curves[1], this.curves[3], mid)
  }

  static calculate(a: Numeric, b: Numeric, m: Numeric): Numeric {
    return 3.0 * a * (1 - m) * (1 - m) * m + 3.0 * b * (1 - m) * m * m + m * m * m
  }
}

// Example usage:
// const cubicInstance = new Cubic([0.1, 0.2, 0.3, 0.4]);
// const value = cubicInstance.getValue(0.5);
// console.log(value);

export default Cubic
