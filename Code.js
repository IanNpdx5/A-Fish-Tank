$(function () {
  // Initialize with 0 fish so the canvas can render immediately
  var numberoffish = 0;

  var programCode = function (processingInstance) {
    with (processingInstance) {
      size(window.innerWidth, window.innerHeight);
      frameRate(2);

      draw = function () {
        var n = 0;

        var makeafish = function (x, y, r, g, b) {
          fill(r, g, b);
          bezier(x - 20, y - 160, x + 130, y, x + 150, y - 280, x - 20, y - 120);
          fill(0, 0, 0);
          ellipse(x + 80, y - 150, 10, 10);
          line(x + 80, y - 135, x + 100, y - 140);
        };

        background(0, 255, 208);

        // Dynamically reads the updated 'numberoffish' variable once prompt is filled
        while (n < numberoffish) {
          makeafish(random(0, window.innerWidth), random(0, window.innerHeight), random(0, 255), random(0, 255), random(0, 255));
          n++;
        }
      };
    }
  };

  // Get the canvas that ProcessingJS will use
  var canvas = document.getElementById("mycanvas");

  var resizeCanvas = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  // Pass the function to ProcessingJS constructor
  var processingInstance = new Processing(canvas, programCode);

  document.getElementById("btn").addEventListener("click", () => {
    numberoffish = prompt("Number of fish:");
  });
  window.addEventListener("resize", resizeCanvas, false);
   var fsBtn = document.getElementById('fullscreen-btn');
      var canvas = document.getElementById('mycanvas');

      function updateButtonLabel() {
        var isFull = document.fullscreenElement || document.body.classList.contains('is-fullscreen');
        fsBtn.textContent = isFull ? 'Exit Full Screen' : 'Full Screen';
      }

      fsBtn.onclick = function () {
        var isNativeFull = !!document.fullscreenElement;
        var isFallbackFull = document.body.classList.contains('is-fullscreen');

        if (isNativeFull) {
          document.exitFullscreen();
        } else if (isFallbackFull) {
          document.body.classList.remove('is-fullscreen');
          updateButtonLabel();
        } else if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen().catch(function () {
            document.body.classList.add('is-fullscreen');
            updateButtonLabel();
          });
        } else {
          document.body.classList.add('is-fullscreen');
          updateButtonLabel();
        }
      };

      document.addEventListener('fullscreenchange', function () {
        if (document.fullscreenElement) {
          document.body.classList.add('is-fullscreen');
        } else {
          document.body.classList.remove('is-fullscreen');
        }
        updateButtonLabel();
      });

      // Allow pressing Escape to exit fallback full-screen mode
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && document.body.classList.contains('is-fullscreen')) {
          document.body.classList.remove('is-fullscreen');
          updateButtonLabel();
        }
      });
    });
