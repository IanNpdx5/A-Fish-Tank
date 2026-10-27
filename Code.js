$(function () {
  // Initialize with 0 fish so the canvas can render immediately
  var numberoffish = 0;

  var programCode = function(processingInstance) {
    with (processingInstance) {
      size(window.innerWidth, window.innerHeight); 
      frameRate(2);
        
      draw = function() {
        var n = 0;

        var makeafish = function(x, y, r, g, b) {
            fill(r, g, b);
            bezier(x-20, y-160, x+130, y, x+150, y-280, x-20, y-120);
            fill(0, 0, 0);
            ellipse(x+80, y-150, 10, 10);
            line(x+80, y-135, x+100, y-140);
        };

        background(0, 255, 208);

        // Dynamically reads the updated 'numberoffish' variable once prompt is filled
        while (n < numberoffish) { 
            makeafish(random(0, window.innerWidth), random(0, window.innerHeight), random(0, 255), random(0, 255), random(0,255));
            n++;
        }
      };
    }
  };

  // Get the canvas that ProcessingJS will use
  var canvas = document.getElementById("mycanvas");
  // Pass the function to ProcessingJS constructor
  var processingInstance = new Processing(canvas, programCode);
  
  document.getElementById("btn").addEventListener("click", () => {
    numberoffish = prompt("Number of fish:")
  });
})
