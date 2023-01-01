import React from 'react';

const RectangularComponent = (props) => {
  const { radius, top, color, width, height, right, left, bottom, gridC, gridR, children } = props;

  const style = {
    position: "relative",
    top: top,
    borderRadius: radius,
    backgroundColor: color,
    width: width,
    height: height,
    right: right,
    left: left,
    bottom: bottom,
    gridColumn: gridC,
    gridRow: gridR
  };

  return (
    <div style={style}>
    </div>
  );
};

export default RectangularComponent;
