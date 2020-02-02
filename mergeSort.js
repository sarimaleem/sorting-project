export function mergeSort(array) { 
    let frames = [];
    let framesColors = [];
    sort(array, 0, array.length-1)
}

function merge(arr, l, m, r)
{
  // Find sizes of two subarrays to be merged
  let n1 = m - l + 1;
  let n2 = r - m;

  /* Create temp arrays */
  let L = [];
  let R = [];

  /*Copy data to temp arrays*/
  for (let i = 0; i < n1; ++i) L[i] = arr[l + i];
  for (let j = 0; j < n2; ++j) R[j] = arr[m + 1 + j];

  /* Merge the temp arrays */

  // Initial indexes of first and second subarrays
  let i = 0;
  let j = 0;

  // Initial index of merged subarry array
  let k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
  }

  /* Copy remaining elements of L[] if any */
  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }

  /* Copy remaining elements of R[] if any */
  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }
}

// Main function that sorts arr[l..r] using
// merge()
function sort(arr, l, r)
{
  if (l < r) {
    // Find the middle point
    let m = Math.floor((l + r) / 2);

    // Sort first and second halves
    sort(arr, l, m);
    sort(arr, m + 1, r);

    // Merge the sorted halves
    merge(arr, l, m, r);
  }
}

let array  = [12, 11, 13, 5, 6, 7]
console.log(array)
sort(array, 0, array.length-1)
console.log(array)

