export const convertRotationToMatrix = (rotation: number): number[] => {
  const rad = (rotation * Math.PI) / 180
  return [Math.cos(rad), -Math.sin(rad), Math.sin(rad), Math.cos(rad)]
}

export const convertRotationToMatrixExtended = (degrees: number): number[] => {
  const radians = (degrees * Math.PI) / 180
  const cos = Math.cos(radians)
  const sin = Math.sin(radians)
  return [cos, sin, -sin, cos, 0, 0]
}
