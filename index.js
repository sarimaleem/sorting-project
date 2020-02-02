import React, { memo } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { bubbleSort } from "./bubbleSort";
import { quickSort } from "./quickSort";
import {mergeSort} from "./mergeSort"

function Rectangle(height, color) {
  return (
    <div
      className="rectangle"
      style={{ height: height, background: color }}
    ></div>
  );
}

class CollectionOfRectangles extends React.Component {
  constructor(props) {
    super(props);
    let size = 200 ;
    let values = this.genValueArray(size);
    let rects = this.genRects(values, new Array(size).fill("powderBlue"));

    this.state = { values: values, rects: rects };

    this.handleClickBubbleSort = this.handleClickBubbleSort.bind(this);
    this.handleClickQuickSort = this.handleClickQuickSort.bind(this);
    this.handleClickMergeSort = this.handleClickMergeSort.bind(this)
    this.animate = this.animate.bind(this);
    this.resetValues = this.resetValues.bind(this);
  }

  genValueArray(n) {
    let values = [];

    for (let i = 0; i < n; i++) {
      let value = Math.floor(Math.random() * 500);
      values.push(value);
    }

    return values;
  }

  genRects(heights, colors) {
    let rects = [];

    for (var i = 0; i < heights.length; i++) {
      let height = heights[i];
      rects.push(Rectangle(height, colors[i]));
    }
    return rects;
  }

  animate(frames, framesColors, index) {
    if (frames.length === index) {
      return;
    }

    const currentHeights = frames[index];
    const currentColors = framesColors[index];
    let rectsArr = this.genRects(currentHeights, currentColors);

    this.setState({ rects: rectsArr, values: currentHeights });

    let delay = 10;
    setTimeout(() => this.animate(frames, framesColors, index + 1), delay);
  }

  handleClickBubbleSort() {
    let vals = this.state.values;
    let [frames, framesColors] = bubbleSort(vals);
    this.animate(frames, framesColors, 0);
  }

  
  handleClickQuickSort() {
    let vals = this.state.values;
    let [frames, framesColors] = quickSort(vals);
    this.animate(frames, framesColors, 0);
  }

  resetValues() {
    let n = this.state.values.length;
    let array = this.genValueArray(n);
    let rects = this.genRects(array, new Array(n).fill("powderBlue"))
    this.setState({values: array, rects: rects})
  }

  handleClickMergeSort() {
      let vals = this.state.values;
      let [frames, framesColors] = mergeSort(vals);
      this.animate(frames, framesColors, 0);
  }

  render() {
    return (
      <div>
          <div className="titleContainer">
            <h1>Sorting Project</h1>

          </div>
      <div className="buttonContainer">
        <br/>
        <button onClick={this.handleClickBubbleSort} className="buttons">bubble sort</button>

        <button onClick = {this.handleClickQuickSort} className="buttons">quick sort</button>

        <button onClick = {this.handleClickMergeSort} className="buttons">merge sort</button>
        
        <button onClick = {this.resetValues} className="buttons" id="specialButton">randomize array</button>

        <br/>
        
      </div>
      <div className="rectangleContainer">
        <br/>
        <br/>
        <br/>
        <br/>
        {this.state.rects}
      </div>
      <div className="bottom">
        Created by Sarim Aleem
      </div>
      </div>
    );
  }
}

ReactDOM.render(
  <CollectionOfRectangles></CollectionOfRectangles>,
  document.getElementById("root")
);