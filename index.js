import React, { memo } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { bubbleSort } from "./bubbleSort";

function Rectangle(height, color) {
  return (
    <div
      className="rectangle"
      style = {{height: height, background: color}}>
    </div>
  );
}




class CollectionOfRectangles extends React.Component {
  constructor(props) {
    super(props);

    let size = 80
    let values = this.genValueArray(size);
    let rects = this.genRects(values, new Array(size).fill("powderBlue"));

    this.state = { values: values, rects: rects };

    this.handleClick = this.handleClick.bind(this);
    this.animate = this.animate.bind(this);
  }
  
  genValueArray(n) {
    let values = [];

    for (let i = 0; i < n; i++) {
      let value = Math.floor(Math.random() * 300);
      values.push(value);
    }

    return values;
  }

  genRects(heights, colors) {
    let rects = [];

    for (var i = 0; i < heights.length; i++) {
      let height = heights[i];
      rects.push(Rectangle(height, colors[i]))
    }
    return rects;
  }
  

  animate(memoized, memoizedColors, index) {

    if(memoized.length === index) {
      return;
    }
    
    const currentHeights = memoized[index]
    const currentColors = memoizedColors[index]
    let rectsArr = this.genRects(currentHeights, currentColors)

    this.setState({ rects: rectsArr, values: currentHeights});

    let delay = 1;
    setTimeout(() => this.animate(memoized, memoizedColors ,index + 1), delay);
  }

  handleClick() {
    let vals = this.state.values;
    let [memoized, memoizedColors] = bubbleSort(vals)
    this.animate(memoized, memoizedColors, 0)
  }

  render() {
    return (
      <div className = "rectangleContainer">
        {this.state.rects}
        <br />
        <button onClick={this.handleClick}>animation</button>
      </div>
    );
  }
}

ReactDOM.render(
  <CollectionOfRectangles></CollectionOfRectangles>,
  document.getElementById("root")
);
