type Numeric = number

type NumericArray = Numeric[]

function interpolate(fromList: NumericArray, toList: NumericArray, f: Numeric): NumericArray {
  if (fromList.length !== toList.length) {
    throw new Error(`Mismatched interpolation arguments ${fromList}: ${toList}`)
  }
  return fromList.map((fromVal, i) => interpolateNum(fromVal, toList[i], f))
}

function interpolateNum(fromVal: Numeric, toVal: Numeric, f: Numeric): Numeric {
  if (typeof fromVal === 'number' && typeof toVal === 'number') {
    return fromVal * (1 - f) + toVal * f
  }
  throw new Error('Invalid input types for interpolation')
}

export { interpolate, interpolateNum }
