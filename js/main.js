var distanceBetweenCircles = 20;
var distanceBetweenRows = 150;
var circleRadius = 10;
var circleRadius2 = circleRadius * 2;
var globalTop = 100;
var globalLeft = 100;

var rowsCfg = [5, 14, 10]; // number of circles in each row
var numCirclesInWidestRow = Math.max(...rowsCfg);

var widthOfWidestRow = rowWidth(numCirclesInWidestRow);

function main() {
  var canvas = this.__canvas = new fabric.StaticCanvas('c');
  canvas.renderOnAddRemove = false;

  var circleY = calculateFirstCircleY();
  var previousRowCircleXes = [];
  var previousRowCircleY = 0;
  rowsCfg.forEach(function(numCircles, rowIndex) {
	  var circleX = calculateFirstCircleX(numCircles);
      var thisRowCircleXes = [];
	  for(var circleIndex = 0; circleIndex < numCircles; ++circleIndex) {
		  thisRowCircleXes.push(circleX);
		  var circle = new fabric.Circle({
			  left: circleX,
			  top: circleY,
			  radius: circleRadius,
			  originX: 'center',
			  originY: 'center'
		  });
		  if(previousRowCircleXes.length > 0) {
			  previousRowCircleXes.forEach(function(previousRowCircleX) {
				  var line = new fabric.Line(
				  [previousRowCircleX, previousRowCircleY, circleX, circleY],
				  {
					  //left: previousRowCircleX,
					  //top: previousRowCircleY,
					  stroke: 'black'
				  });
				  canvas.add(line);
			  });
		  }
		  canvas.add(circle);
		  circleX += distanceBetweenCircles + circleRadius2;
	  }
	  previousRowCircleXes = thisRowCircleXes;
	  previousRowCircleY = circleY;
	  circleY += distanceBetweenRows + circleRadius2;
  });
  //canvas.add(new fabric.Rect({ left: 0, top: 0, width: globalLeft, height: globalTop }));
  canvas.renderAll();
}

function rowWidth(numCircles) {
	return numCircles * (circleRadius2 + distanceBetweenCircles - 1);
}

function calculateFirstCircleX(numCircles) {
	var w = rowWidth(numCircles);
	return (widthOfWidestRow - w) / 2 + globalLeft + circleRadius;
}

function calculateFirstCircleY() {
	return globalTop + circleRadius;
}
