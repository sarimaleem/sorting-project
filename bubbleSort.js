export function bubbleSort(arr) {
  let n = arr.length;
  let memoized = [];
  let colors = [];

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        memoized.push(cloneArray(arr));
        let currentColors = new Array(n).fill("powderBlue");
        currentColors[j] = "red";
        currentColors[j + 1] = "red";
        colors.push(currentColors);

        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        memoized.push(cloneArray(arr));
        currentColors = new Array(n).fill("powderBlue");
        currentColors[j] = "green";
        currentColors[j + 1] = "green";
        colors.push(currentColors);
      } else {
        memoized.push(cloneArray(arr));
        let currentColors = new Array(n).fill("powderBlue");
        currentColors[j] = "yellow";
        currentColors[j + 1] = "yellow";
        colors.push(currentColors);
      }
    }
  }

  memoized.push(cloneArray(arr));
  let currentColors = new Array(n).fill("powderBlue");
  colors.push(currentColors);

  return [memoized, colors];
}

function cloneArray(array) {
  let clone = [];
  for (let i = 0; i < array.length; i++) {
    clone.push(array[i]);
  }
  return clone;
}

let array = [12, 345, 4, 234, 213];

console.log(array);
console.log(bubbleSort(array));
