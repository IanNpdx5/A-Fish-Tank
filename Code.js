$(function () {
  var numberoffish = 0;
  var canvas = document.getElementById("mycanvas");
    canvas.addEventListener("dblclick", function () {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (document.body.classList.contains("is-fullscreen")) {
      document.body.classList.remove("is-fullscreen");
      updateButtonLabel();
    }
  });


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

        while (n < numberoffish) {
          makeafish(
            random(0, width),
            random(0, height),
            random(0, 255),
            random(0, 255),
            random(0, 255)
          );
          n++;
        }
      };
    }
  };

  var processingInstance = new Processing(canvas, programCode);

  var resizeCanvas = function () {
    processingInstance.size(window.innerWidth, window.innerHeight);
  };

  document.getElementById("btn").addEventListener("click", function () {
    var input = prompt("Number of fish (1 - 500):");
    if (input !== null) {
      var parsed = parseInt(input, 10);
      if (!isNaN(parsed) && parsed >= 0) {
        numberoffish = Math.min(parsed, 500);
      }
    }
  });

  window.addEventListener("resize", resizeCanvas, false);

  // ---- Full Screen Toggle ----
  var fsBtn = document.getElementById("fullscreen-btn");

  function updateButtonLabel() {
    var isFull = document.fullscreenElement || document.body.classList.contains("is-fullscreen");
    fsBtn.textContent = isFull ? "Exit Full Screen" : "Full Screen";
    resizeCanvas();
  }

  fsBtn.onclick = function () {
    var isNativeFull = !!document.fullscreenElement;
    var isFallbackFull = document.body.classList.contains("is-fullscreen");

    if (isNativeFull) {
      document.exitFullscreen();
    } else if (isFallbackFull) {
      document.body.classList.remove("is-fullscreen");
      updateButtonLabel();
    } else if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(function () {
        document.body.classList.add("is-fullscreen");
        updateButtonLabel();
      });
    } else {
      document.body.classList.add("is-fullscreen");
      updateButtonLabel();
    }
  };

  document.addEventListener("fullscreenchange", function () {
    if (document.fullscreenElement) {
      document.body.classList.add("is-fullscreen");
    } else {
      document.body.classList.remove("is-fullscreen");
    }
    updateButtonLabel();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && document.body.classList.contains("is-fullscreen")) {
      document.body.classList.remove("is-fullscreen");
      updateButtonLabel();
    }
  });
});
