/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

// this is my own solution 
export var twoSum = function (nums, target) {
  const arrayMap = {};
  for (let i = 0; i < nums?.length; i++) {
    arrayMap[i] = nums[i];
  }
  let arrayInd = 0;

  function loopThrough(arrayInd) {
    if (arrayInd < nums?.length) {
      for (let i = arrayInd + 1; i < nums?.length; i++) {
        const sum = arrayMap[arrayInd] + nums[i];
        if (sum === target) {
          return [arrayInd, i];
        }

      }
      arrayInd = arrayInd + 1;
      return loopThrough(arrayInd);
    }
  }

  const answer = loopThrough(arrayInd);
  return answer;
}