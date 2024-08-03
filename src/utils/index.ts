export function checkValueType(variable: any, target: string) {
  const valueType = Object.prototype.toString
    .call(variable)
    .slice(8, -1)
    .toLowerCase();
  const targetType = target.toLowerCase();
  return valueType === targetType;
}
export function transFormData(originData: any, excludes: string[] = ['_id', '__v', 'createdAt', 'updatedAt']) {
  const data = originData
  if (!checkValueType(excludes, 'Array')) {
    throw Error('传入的 excludes 不是一个数组')
    return
  }
  const result: typeof originData = {}
  Object.keys(data).forEach(objKey => {
    console.log(objKey, 'objKey')
    if (!excludes.includes(objKey)) {
      result[objKey] = data[objKey]
    }
  })
  // 处理完的 data 进行赋值然后返回
  return result;
}
