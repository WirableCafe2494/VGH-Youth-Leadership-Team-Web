// Sidebar and Darkmode Functions //
const sidebar = document.querySelector(".sidebar");
const sidebarToggleBtn = document.querySelectorAll(".sidebar-toggle");
const themeToggleBtn = document.querySelector(".theme-toggle");
const themeIcon = themeToggleBtn.querySelector(".theme-icon");

const updateThemeIcon = () => {
    const isDark = document.body.classList.contains("dark-theme");
    themeIcon.textContent = sidebar.classList.contains("collapsed") ? (isDark ? "light_mode" : "dark_mode") : "dark_mode";
}
const savedTheme = localStorage.getItem("theme")
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const shouldUseDarkTheme = savedTheme === "dark" || (!savedTheme && systemPrefersDark);

document.body.classList.toggle("dark-theme", shouldUseDarkTheme);
updateThemeIcon();

// Toggle Sidebar Collapse //
sidebarToggleBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
        updateThemeIcon();
    })
});

themeToggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme")
    localStorage.setItem("theme", isDark ? "dark" : "light")
    updateThemeIcon()
});

// GALLERY SCRIPT //
const galleryItem = document.getElementsByClassName("gallery-item");
const lightBoxContainer = document.createElement("div");
const lightBoxContent = document.createElement("div");
const lightBoxImg = document.createElement("img");
const lightBoxPrev = document.createElement("div");
const lightBoxNext = document.createElement("div");

lightBoxContainer.classList.add("lightbox");
lightBoxContent.classList.add("lightbox-content");
lightBoxPrev.classList.add("material-symbols-outlined", "lightbox-prev");
lightBoxPrev.textContent = "chevron_left";
lightBoxNext.classList.add("material-symbols-outlined", "lightbox-next");
lightBoxNext.textContent = "chevron_right";

lightBoxContainer.appendChild(lightBoxContent);
lightBoxContent.appendChild(lightBoxImg);
lightBoxContent.appendChild(lightBoxPrev);
lightBoxContent.appendChild(lightBoxNext);
document.body.appendChild(lightBoxContainer);

let index = 1;

function showLightBox (n) {
    if (n > galleryItem.length) {
        index = 1;
    } else if(n < 1){
        index = galleryItem.length;
    }

    let imageLocation = galleryItem[index-1].children[0].getAttribute("src");
    lightBoxImg.setAttribute("src", imageLocation);
}

function currentImage (){
    lightBoxContainer.style.display="flex";

    let imageIndex = parseInt(this.getAttribute("data-index"));
    showLightBox(index = imageIndex);
}

for (let i=0; i<galleryItem.length; i++){
    galleryItem[i].addEventListener("click", currentImage);
}

function sliderImage(n){
    showLightBox(index += n);
}

function prevImage(){
    sliderImage(-1);
}

function nextImage(){
    sliderImage(1);
}

lightBoxPrev.addEventListener("click", prevImage);
lightBoxNext.addEventListener("click", nextImage);

function closeLightBox(){
    if(this === event.target){
        lightBoxContainer.style.display="none";
    }
}

lightBoxContainer.addEventListener("click", closeLightBox);

