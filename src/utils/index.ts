export function checkValueType(variable: any, target: string) {
  const valueType = Object.prototype.toString
    .call(variable)
    .slice(8, -1)
    .toLowerCase();
  const targetType = target.toLowerCase();
  return valueType === targetType;
}
export function getResponseData<T>(data: any, target: any): T {
  // TODO 过滤不需要的字段
  console.log(data, 'data');
  console.log(target, 'target');
  return data;
}
