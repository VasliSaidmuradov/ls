export default function createObjectFormArrayWithGivenPropAndValue(
  array: any[],
  {},
  data: { prop: string; value: any }
) {
  const res = {};
  const { prop, value } = data;
  const [arr] = array;

  console.log(prop, value, arr);
  return res;
}
