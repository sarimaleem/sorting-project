export function quickSort(array) {
    let frames = [];
    let framesColors = [];
    sort(array, 0, array.length-1, frames, framesColors)
    frames.push(frames[frames.length-1]);
    framesColors.push(new Array(array.length).fill('powderBlue'))
    return [frames, framesColors];
}

function sort(array, low, high, frames, framesColors) {
    if(low < high) { 
        let pi = partition(array, low, high, frames, framesColors)
        sort(array, low, pi-1, frames, framesColors);
        sort(array, pi+1, high, frames, framesColors);
    }
}

function partition(array, low, high, frames, framesColors) {
    let i = low-1;
    let pivot = array[high];
    let n = array.length
    
    
    for(let j = low; j < high; j++) {
        if(array[j] < pivot) {

            frames.push(cloneArray(array));
            let currentColors = new Array(n).fill("powderBlue");
            currentColors[j] = "red";
            currentColors[i] = "red";  
            currentColors[high] = "yellow"  
            for(let k = 0; k < low; k++) {
                currentColors[k] = 'gray';
            }
            for(let k = high + 1; k < array.length; k++) {
                currentColors[k] = 'gray';
            }
            framesColors.push(currentColors);

            i++;
            [array[i], array[j]] = [array[j], array[i]];

            frames.push(cloneArray(array));
            currentColors = new Array(n).fill("powderBlue");
            currentColors[j] = "green";
            currentColors[i] = "green";
            currentColors[high] = "yellow"
            for(let k = 0; k < low; k++) {
                currentColors[k] = 'gray';
            }
            for(let k = high + 1; k < array.length; k++) {
                currentColors[k] = 'gray';
            }
            framesColors.push(currentColors);

        } else {
            frames.push(cloneArray(array));
            let currentColors = new Array(n).fill("powderBlue");
            currentColors[j] = "green";
            currentColors[high] = "yellow";
            for(let k = 0; k < low; k++) {
                currentColors[k] = 'gray';
            }
            for(let k = high + 1; k < array.length; k++) {
                currentColors[k] = 'gray';
            }
            framesColors.push(currentColors);
        }
    }

    [array[i+1], array[high]] = [array[high], array[i+1]]
    frames.push(cloneArray(array));
    let currentColors = new Array(n).fill("powderBlue");
    currentColors[high] = "green";
    currentColors[i] = "green";
    for(let k = 0; k < low; k++) {
        currentColors[k] = 'gray';
    }
    for(let k = high + 1; k < array.length; k++) {
        currentColors[k] = 'gray';
    }
    framesColors.push(currentColors);

    return i+1;
}

function cloneArray(array) {
    let clone = [];
    for (let i = 0; i < array.length; i++) {
      clone.push(array[i]);
    }
    return clone;
}

let array = [5, 36, 9, 100, 20, 9, 3, 5, 4, 8, 2];
console.log(quickSort(array))
