
const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

const searchInput = document.getElementById("searchInput");
const searchbtn = document.getElementById("searchbtn");
const photosWrapper = document.getElementById("photosWrapper");
const showMoreBtn = document.getElementById("showMoreBtn");
const loadingIndicator = document.getElementById("loading");

let inputText = "";
let page = 1;
const searchImages = async () => {
  inputText = searchInput.value;

  try {
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputText}&client_id=${accessKey}`;
    loadingIndicator.classList.remove("hidden"); 
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if (results.length === 0) {
      photosWrapper.innerHTML = `<p class="text-warning text-center">No Image Found!</p>`;
    } else {
      displayImages(results);
      showMoreBtn.classList.remove("hidden");
    }
  } catch (err) {
    console.error(err);
    photosWrapper.innerHTML = `<p class="text-red-600 text-center">Something went wrong. Please try after some time!</p>`;
  } finally {
    loadingIndicator.classList.add("hidden"); 
  }
};


searchbtn.addEventListener("click", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
})


function displayImages(images) {
  const fragment = new DocumentFragment();
  images.forEach(item => {
    let div = document.createElement("div");
    div.classList.add("w-56", 'h-56', 'aspect-w-1', 'aspect-h-1', 'overflow-hidden');
    div.innerHTML = `<div class="w-full h-full">
                    <img alt=${item.alt_description} class="block w-full h-full rounded-lg object-cover object-center"
                        src=${item.urls.small} />
                </div>`;
    fragment.appendChild(div);
  })
  if (page == 1) {
    photosWrapper.innerHTML = "";
  }
  photosWrapper.appendChild(fragment);

}


showMoreBtn.addEventListener("click", (event) => {
  event.preventDefault();
  page++;
  searchImages();
})