// number add
const numberAddSum = (one: string, two: string, three: string) => {
  return (
    (one ? parseInt(one, 10) : 0) +
    (two ? parseInt(two, 10) : 0) +
    (three ? parseInt(three, 10) : 0)
  );
};

/**
 * 根据传过来的字符串 数值
 * 来展示当前内容
 * @param {String} val
 * @param {Number} num
 */
const accordingNumToShow = (val: string, num: number) => {
  if (val && val.length > num) {
    return val.substr(0, num) + "...";
  } else {
    return val;
  }
};

export { numberAddSum, accordingNumToShow };
