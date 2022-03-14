const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

// Unsplash Api
const initialCount = 10;
const apiKey = '9W_0HlwpXyjr8bS70lqL7ToxjHZCPTquUmzlv5LGKR4';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

// Check if all images are loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages){
    ready = true;
    loader.hidden = true;
  }
}

function updateApiUrlCount(loadedCount) {
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${loadedCount}`;
}


// Helper Function to Set Attributes on DOM
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}


// Diplay Photos
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // Run function for each object
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener
    img.addEventListener('load', imageLoaded);
    // put <img> inside <a>, then put both in imageContainer
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}


// Get Photos from API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    if(initialLoad) {
      updateApiUrlCount(30);
      initialLoad = false;
    }
  } catch (error) {

  }
}

// Load more when reaching the bottom of the page
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();