export function bubbleSort(array) {
    let n = array.length;
    let frames = [];
    let framesColors = [];
  
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          frames.push(cloneArray(array));
          let currentColors = new Array(n).fill("powderBlue");
          currentColors[j] = "red";
          currentColors[j + 1] = "red";
          framesColors.push(currentColors);
  
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
  
          frames.push(cloneArray(array));
          currentColors = new Array(n).fill("powderBlue");
          currentColors[j] = "green";
          currentColors[j + 1] = "green";
          framesColors.push(currentColors);
        } else {
          frames.push(cloneArray(array));
          let currentColors = new Array(n).fill("powderBlue");
          currentColors[j] = "green";
          currentColors[j + 1] = "green";
          framesColors.push(currentColors);
        }
      }
    }
  
    frames.push(cloneArray(array));
    let currentColors = new Array(n).fill("powderBlue");
    framesColors.push(currentColors);
  
    return [frames, framesColors];
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