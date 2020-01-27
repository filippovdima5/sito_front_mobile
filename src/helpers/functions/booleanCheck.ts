export const booleanCheck = function booleanCheck(value: any): boolean {
  if (typeof value !== 'object') return !!value
  return Object.values(value).length > 0
}