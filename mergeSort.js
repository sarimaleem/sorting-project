export function mergeSort(array) {
  let frames = [];
  let framesColors = [];
  sort(array, 0, array.length - 1, frames, framesColors);
  frames.push(array);
  framesColors.push(new Array(array.length).fill("powderBlue"));
  return [frames, framesColors];
}

function merge(array, l, m, r, frames, framesColors) {
  // Find sizes of two subarrays to be merged
  let n1 = m - l + 1;
  let n2 = r - m;

  /* Create temp arrays */
  let L = [];
  let R = [];

  /*Copy data to temp arrays*/
  for (let i = 0; i < n1; ++i) {
    L[i] = array[l + i];

    let clone = cloneArray(array);
    clone = clone.concat(L);
    clone = clone.concat(R);
    frames.push(clone);

    let currentColors = new Array(array.length).fill("powderBlue");
    currentColors = currentColors.concat(new Array(L.length).fill("black"));
    currentColors = currentColors.concat(new Array(R.length).fill("black"));
    framesColors.push(currentColors);
  }
  for (let j = 0; j < n2; ++j) {
    R[j] = array[m + 1 + j];

    let clone = cloneArray(array);
    clone = clone.concat(L);
    clone = clone.concat(R);
    frames.push(clone);

    let currentColors = new Array(array.length).fill("powderBlue");
    currentColors = currentColors.concat(new Array(L.length).fill("black"));
    currentColors = currentColors.concat(new Array(R.length).fill("black"));
    framesColors.push(currentColors);
  }

  /* Merge the temp arrays */

  // Initial indexes of first and second subarrays
  let i = 0;
  let j = 0;

  // Initial index of merged subarry array
  let k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      array[k] = L[i];
      i++;

      let clone = cloneArray(array);
      clone = clone.concat(L);
      clone = clone.concat(R);
      frames.push(clone);

      let currentColors = new Array(array.length).fill("powderBlue");
      currentColors[k] = "green";

      let LColors = new Array(L.length).fill("black");
      LColors[i - 1] = "green";
      let RColors = new Array(R.length).fill("black");
      RColors[j] = "red";

      currentColors = currentColors.concat(LColors);
      currentColors = currentColors.concat(RColors);
      framesColors.push(currentColors);
    } else {
      array[k] = R[j];
      j++;

      let clone = cloneArray(array);
      clone = clone.concat(L);
      clone = clone.concat(R);
      frames.push(clone);

      let currentColors = new Array(array.length).fill("powderBlue");
      currentColors[k] = "green";
      let LColors = new Array(L.length).fill("black");
      LColors[i] = "red";
      let RColors = new Array(R.length).fill("black");
      RColors[j - 1] = "green";
      currentColors = currentColors.concat(LColors);
      currentColors = currentColors.concat(RColors);
      framesColors.push(currentColors);
    }
    k++;
  }

  /* Copy remaining elements of L[] if any */
  while (i < n1) {
    array[k] = L[i];
    i++;
    k++;

    let clone = cloneArray(array);
    clone = clone.concat(L);
    clone = clone.concat(R);
    frames.push(clone);

    let currentColors = new Array(array.length).fill("powderBlue");
    currentColors[k - 1] = "green";
    let LColors = new Array(L.length).fill("black");
    LColors[i - 1] = "green";
    let RColors = new Array(R.length).fill("black");
    currentColors = currentColors.concat(LColors);
    currentColors = currentColors.concat(RColors);
    framesColors.push(currentColors);
  }

  /* Copy remaining elements of R[] if any */
  while (j < n2) {
    array[k] = R[j];
    j++;
    k++;

    let clone = cloneArray(array);
    clone = clone.concat(L);
    clone = clone.concat(R);
    frames.push(clone);

    let currentColors = new Array(array.length).fill("powderBlue");
    currentColors[k - 1] = "green";
    let LColors = new Array(L.length).fill("black");
    let RColors = new Array(R.length).fill("black");
    RColors[j - 1] = "green";
    currentColors = currentColors.concat(LColors);
    currentColors = currentColors.concat(RColors);
    framesColors.push(currentColors);
  }
}

// Main function that sorts arr[l..r] using
// merge()
function sort(arr, l, r, frames, framesColors) {
  if (l < r) {
    // Find the middle point
    let m = Math.floor((l + r) / 2);

    // Sort first and second halves
    sort(arr, l, m, frames, framesColors);
    sort(arr, m + 1, r, frames, framesColors);

    // Merge the sorted halves
    merge(arr, l, m, r, frames, framesColors);
  }
}

function cloneArray(array) {
  let clone = [];
  for (let i = 0; i < array.length; i++) {
    clone.push(array[i]);
  }
  return clone;
}

// let array = [12, 11, 13, 5, 6, 7];
// console.log(array);
// sort(array, 0, array.length - 1);
// console.log(array);
