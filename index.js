import React, { memo } from "react";
import ReactDOM from "react-dom";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import "./index.css";
import { bubbleSort } from "./bubbleSort";
import { quickSort } from "./quickSort";
import { mergeSort } from "./mergeSort";

function Rectangle(height, color, width) {
  return (
    <div
      className="rectangle"
      style={{ height: height, background: color, width: width }}
    ></div>
  );
}

class CollectionOfRectangles extends React.Component {
  constructor(props) {
    super(props);
    let size = 50;
    let values = this.genValueArray(size);
    let rects = this.genRects(values, new Array(size).fill("powderBlue"));

    this.state = {
      values: values,
      rects: rects,
      buttonsOff: false,
      animate: true,
      size: 50,
      delay: 5
    };

    this.handleSortClick = this.handleSortClick.bind(this);
    this.animate = this.animate.bind(this);
    this.resetValues = this.resetValues.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleDelayChange = this.handleDelayChange.bind(this);
  }

  genValueArray(n) {
    let values = [];

    for (let i = 0; i < n; i++) {
      let value = Math.floor(Math.random() * 250 + 15);
      values.push(value);
    }

    return values;
  }

  genRects(heights, colors) {
    let rects = [];
    let size;

    if (this.state === undefined) {
      size = 50;
    } else {
      size = this.state.size;
    }

    for (var i = 0; i < heights.length; i++) {
      let height = heights[i];
      rects.push(Rectangle(height, colors[i], 100 / (size * 2.5) + "%"));
    }
    return rects;
  }

  animate(frames, framesColors, index) {
    if (frames.length === index || !this.state.animate) {
      return;
    }

    const currentHeights = frames[index];
    const currentColors = framesColors[index];
    let rectsArr = this.genRects(currentHeights, currentColors);
    this.setState({ rects: rectsArr, values: currentHeights });
    let delay = this.state.delay;
    setTimeout(() => this.animate(frames, framesColors, index + 1), delay);
  }

  resetValues() {
    let n = this.state.size;
    let array = this.genValueArray(n);
    let rects = this.genRects(array, new Array(n).fill("powderBlue"));
    this.setState(
      {
        values: array,
        rects: rects,
        buttonsOff: false,
        animate: false
      },
    );
  }

  handleSortClick(sortName) {
    let vals = this.state.values;
    let frames, framesColors;
    if (sortName === "bubblesort") {
      [frames, framesColors] = bubbleSort(vals);
    } else if (sortName === "quicksort") {
      [frames, framesColors] = quickSort(vals);
    } else {
      [frames, framesColors] = mergeSort(vals);
    }

    this.setState({ buttonsOff: true, animate: true }, () =>
      this.animate(frames, framesColors, 0)
    );
  }

  handleSizeChange(e) {
    this.setState(
      {
        size: Number(e.target.value)
      },
      () => this.resetValues()
    );
  }

  handleDelayChange(e) {
  this.setState({
      delay: 505 - Number(e.target.value)
    });
  }

  render() {
    return (
      <div>
        <div className="titleContainer">
          <h1>Sorting Visualizer</h1>
        </div>
        <div className="buttonContainer">
          <br />
          <button
            onClick={() => this.handleSortClick("bubblesort")}
            className="buttons"
            disabled={this.state.buttonsOff}
          >
            Bubble Sort
          </button>

          <button
            onClick={() => this.handleSortClick("quicksort")}
            className="buttons"
            disabled={this.state.buttonsOff}
          >
            Quick Sort
          </button>

          <button
            onClick={() => this.handleSortClick("mergesort")}
            className="buttons"
            disabled={this.state.buttonsOff}
          >
            Merge Sort
          </button>

          <button
            onClick={this.resetValues}
            className="buttons"
            id="specialButton"
          >
            Reset
          </button>

          <br />
        </div>
        <div className="rectangleContainer">
          <br />
          <br />
          <br />
          <br />
          {this.state.rects}
        </div>

        <br />
        <br />

        <div className="rangeContainer">
          <div className="descriptor"> Array Size </div>
          <input
            type="range"
            min={5}
            max={100}
            step={1}
            onChange={this.handleSizeChange}
            className="slider"
            disabled={this.state.buttonsOff}
          ></input>

          <div className="descriptor"> Sorting Speed </div>

          <input
            type="range"
            min={5}
            max={500}
            step={1}
            onChange={this.handleDelayChange}
            className="slider"
            value={505 - this.state.delay}
            disabled={this.state.buttonsOff}
          ></input>
        </div>

        {/* <div className="bottom">Created by Sarim Aleem</div> */}
      </div>
    );
  }
}

ReactDOM.render(
  <CollectionOfRectangles></CollectionOfRectangles>,
  document.getElementById("root")
);
