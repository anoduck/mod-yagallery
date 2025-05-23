const html = document.querySelector("html");
html.setAttribute("data-bs-theme", "dark");

document.addEventListener("DOMContentLoaded", () => {
  // --- Create LightBox
  const galleryGrid = document.querySelector(".gallery-grid");
  const links = galleryGrid.querySelectorAll("a");
  const imgs = galleryGrid.querySelectorAll("img");
  const lightboxModal = document.getElementById("lightbox-modal");
  const bsModal = new bootstrap.Modal(lightboxModal);
  const modalBody = lightboxModal.querySelector(".lightbox-content");

  function debug(msg) {
    var galTitle = document.getElementById('yagallery');
    var debugvar = galTitle.dataset.debug;
    if (debugvar === 'true') {
      console.log(msg);
    }
  }

  function createCaption(caption) {
    return `<div class="carousel-caption d-none d-md-block">
        <h4 class="m-0">${caption}</h4>
      </div>`;
  }

  function createIndicators(img) {
    let markup = "",
      i,
      len;

    const countSlides = links.length;
    const parentCol = img.closest(".col");
    const curIndex = [...parentCol.parentElement.children].indexOf(parentCol);

    for (i = 0, len = countSlides; i < len; i++) {
      markup += `
        <button type="button" data-bs-target="#lightboxCarousel"
          data-bs-slide-to="${i}"
          ${i === curIndex ? 'class="active" aria-current="true"' : ""}
          aria-label="Slide ${i + 1}">
        </button>`;
    }

    return markup;
  }

  function testCanvas() {
    var elem = document.createElement("canvas");
    var supported = !!(elem.getContext && elem.getContext("2d"));
    debug("Is canvas supported: " + supported);
    return supported;
  }

  function resizeImage(link) {
    var imgSrc = link.getAttribute('href');
    debug('Image Source: ' + imgSrc)
    var widthPercent = 0.8; //Percent of screen coverage
    var heightPercent = 0.8; // Percent of Screen coverage
    var imgId = truncName(imgSrc);
    var canimg = new Image();
    canimg.src = imgSrc;
    var canvas = document.getElementById(imgId);
    var ctx = canvas.getContext("2d");
    var scrHeight = window.screen.availHeight;
    var scrWidth = window.screen.availWidth;
    var maxWidth = Math.trunc(scrWidth * widthPercent); // Define the maximum width of the image as a decimal
    debug("Max width: " + maxWidth);
    var maxHeight = Math.trunc(scrHeight * heightPercent); // Define the maximum height of the image as a decimal
    debug("Max Height: " + maxHeight);
    var width = canimg.width;
    debug("Image width: " + width);
    var height = canimg.height;
    debug("Image height: " + height);

    // Calculate the new dimensions, maintaining the aspect ratio
    if (width > height) {
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }
    }

    debug('Calculated width = ' + width);
    debug("Calculated height = " + height);

    // Set the canvas dimensions to the new dimensions
    canvas.width = width;
    canvas.height = height;

    // Draw the resized image on the canvas
    ctx.drawImage(canimg, 0, 0, width, height);
  }

  function truncName(imgString) {
    var nameLength = -8;
    var lessExt = imgString.substring(0, imgString.lastIndexOf(".")) || imgString;
    truncId = lessExt.slice(nameLength);
    return truncId;
  }

  function generateCanvases(link) {
    for (const link of links) {
      resizeImage(link);
    }
  }

  function createSlides(img) {
    let markup = "";
    const currentImgSrc = img.closest(".gallery-item").getAttribute("href");

    for (const img of imgs) {
      const imgSrc = img.closest(".gallery-item").getAttribute("href");
      const imgAlt = img.getAttribute("alt");
      var canvasCheck = testCanvas();
      if (canvasCheck) {
        debug('Running canvas generation.')
        var imgId = truncName(img.src);
        markup += `
          <div class="carousel-item${currentImgSrc === imgSrc ? " active" : ""}">
            <canvas id="${imgId}"></canvas>
            ${imgAlt ? createCaption(imgAlt) : ""}
          </div>`;
      } else {
        debug('No Canvas used.')
        markup += `
          <div class="carousel-item${currentImgSrc === imgSrc ? " active" : ""}">
            <img class="d-block img-fluid w-100" src=${img} alt="${imgAlt}">
            ${imgAlt ? createCaption(imgAlt) : ""}
          </div>`;
      }
    }

    return markup;
  }

  function createCarousel(img) {
    const markup = `
      <!-- Lightbox Carousel -->
      <div id="lightboxCarousel" class="carousel slide carousel-fade" data-bs-ride="true">
        <!-- Indicators/dots -->
        <div class="carousel-indicators">
          ${createIndicators(img)}
        </div>
        <!-- Wrapper for Slides -->
        <div class="carousel-inner justify-content-center mx-auto">
          ${createSlides(img)}
        </div>
        <!-- Controls/icons -->
        <button class="carousel-control-prev" type="button" data-bs-target="#lightboxCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#lightboxCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      `;

    modalBody.innerHTML = markup;
  }

  for (const link of links) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const currentImg = link.querySelector("img");
      const lightboxCarousel = document.getElementById("lightboxCarousel");

      if (lightboxCarousel) {
        const parentCol = link.closest(".col");
        const index = [...parentCol.parentElement.children].indexOf(parentCol);

        const bsCarousel = new bootstrap.Carousel(lightboxCarousel);
        bsCarousel.to(index);
      } else {
        createCarousel(currentImg);
        generateCanvases(link);
      }

      bsModal.handleUpdate();
      bsModal.show();
    });
  }

  // --- Support Fullscreen
  const fsEnlarge = document.querySelector(".btn-fullscreen-enlarge");
  const fsExit = document.querySelector(".btn-fullscreen-exit");

  function enterFS() {
    lightboxModal
      .requestFullscreen()
      .then({})
      .catch((err) => {
        alert(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`,
        );
      });
    fsEnlarge.classList.toggle("d-none");
    fsExit.classList.toggle("d-none");
  }

  function exitFS() {
    document.exitFullscreen();
    fsExit.classList.toggle("d-none");
    fsEnlarge.classList.toggle("d-none");
  }

  fsEnlarge.addEventListener("click", (e) => {
    e.preventDefault();
    enterFS();
  });

  fsExit.addEventListener("click", (e) => {
    e.preventDefault();
    exitFS();
  });
});
