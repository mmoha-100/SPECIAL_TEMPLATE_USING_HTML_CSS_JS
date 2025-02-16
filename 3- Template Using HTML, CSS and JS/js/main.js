// Not Its Place But To Change Its Color
const progressSpans = document.querySelectorAll(
    ".our-courses .courses .progress-container span"
);
const timelineBoxes = document.querySelectorAll(
    ".timeline .timeline-container .box "
);
const featBoxes = document.querySelectorAll(".our-features .feat-box");
const testimonials = document.querySelectorAll(
    ".testimonials-container .testimonial"
);
const contactUsForm = document.querySelector(".contact-us form");

// Start Scrolling Progress
window.onscroll = function () {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        backToTopBtn.style.opacity = "1";
    } else {
        backToTopBtn.style.opacity = "0";
    }
};
backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});
const imgProgress = document.querySelector(".progress");
let seconds = 0;
setInterval(() => {
    seconds++;
    imgProgress.style.width = `${seconds * 12}%`; // I Estimated It Without Any Equation
    if (seconds == 8) seconds = -1;
}, 1000);
// End Scrolling Progress

// Start Header
const dataColor = window.localStorage.getItem("bgColor");
const dataFont = window.localStorage.getItem("fontFamily");

const header = document.querySelector(".header");
const list = document.querySelector(".header > ul");
const showListBtn = document.querySelector(
    "body > div.header > i.fa-solid.fa-bars"
);

const settings = document.querySelector("body > div.header > div.settings");
const showSettingsBtn = document.querySelector(
    "body > div.header > i.fa-solid.fa-gear.fa-fw"
);

const colors = document.querySelectorAll(".settings li[data-color]");
const fonts = document.querySelectorAll(".settings li[data-font]");

colors.forEach((color) => {
    let c = color.dataset.color;
    color.style.backgroundColor = c;
    color.addEventListener("click", () => {
        noClasses(colors);
        color.className = "chosen-color";
        set("bgColor", c);
        changeColor(c);
    });
});
fonts.forEach((font) => {
    let f = font.dataset.font;
    font.style.fontFamily = f;
    font.addEventListener("click", () => {
        noClasses(fonts);
        font.className = "chosen-font";
        set("fontFamily", f);
        changeFont(f);
    });
});

document.body.addEventListener("click", (e) => {
    if (e.target == showListBtn) {
        list.style.left = `0`;
    } else if (e.target == showSettingsBtn && settings.style.opacity != "1") {
        showSettingsBtn.style.rotate = "-50deg";
        settings.style.opacity = "1";
        settings.style.zIndex = "10";
    } else {
        list.style.left = `-200px`;
        settings.style.opacity = "0";
        showSettingsBtn.style.rotate = "0deg";
    }
});
function changeColor(c) {
    header.style.backgroundColor = c;
    list.style.backgroundColor = c;
    settings.style.backgroundColor = c;
    backToTopBtn.style.backgroundColor = c;
    progressSpans.forEach((s) => {
        s.style.backgroundColor = c;
    });
    timelineBoxes.forEach((b) => {
        b.style.backgroundColor = c;
    });
    featBoxes.forEach((b) => {
        b.style.backgroundColor = c;
    });
    testimonials.forEach((t) => {
        t.style.backgroundColor = c;
    });
    contactUsForm.style.backgroundColor = c;
}
function changeFont(font) {
    document.body.style.fontFamily = font;
}
function set(item, value) {
    window.localStorage.setItem(item, value);
}
function applyLS() {
    let c = dataColor;
    let f = dataFont;
    changeColor(c);
    changeFont(f);
}

if (dataColor || dataFont) applyLS();

function ApplyBtnLS() {
    if (dataFont) {
        noClasses(fonts);
        fonts.forEach((btn) => {
            if (btn.dataset.font == dataFont) {
                btn.classList.add("chosen-font");
            }
        });
    }
    if (dataColor) {
        colors.forEach((btn) => {
            if (btn.dataset.color == dataColor) {
                noClasses(colors);
                btn.classList.add("chosen-color");
            }
        });
    }
}

ApplyBtnLS();

function noClasses(elements) {
    elements.forEach((ele) => ele.setAttribute("class", ""));
}
const resetBtn = document.querySelector(".reset");

resetBtn.addEventListener("click", () => {
    window.localStorage.clear();
    applyLS();
    location.reload();
});
// End Settings

// End Header

// Start Landing
const headerText = document.querySelector(".landing .intro-text");
const msgText = document.querySelector(".landing p");

const arrHeaders = [
    "The Beginners Are Always Ambitious.",
    "The Base Will Make Changing The Field Easier.",
    "HTMl, CSS, JavaScript and PHP.",
    "Verified Certificates After Each Course",
    "We Have 70% Discount For The First 100 Learners This Year.",
];
const arrMsgs = [
    "From Scratch We'll Provide The Assistance To You.",
    "We Have Many Courses To Make You Professional In Web Development And Programming In General.",
    "A Professionally Crafted Full Stack Roadmap Will Definitely Boost Your Skills.",
    "It Is Adventure Not Only Courses; You'll Be Surprised About Your Skills.",
    "Don't Miss This Opportunity!.",
];

let currentImg = 1;

headerText.innerHTML = arrHeaders[currentImg - 1];
msgText.innerHTML = arrMsgs[currentImg - 1];

const landingPage = document.querySelector(".landing");
landingPage.style.backgroundImage = "url('imgs/landing/1.jpg')";

const nextBtn = document.createElement("button");
const prevBtn = document.createElement("button");
const containerForBullets = document.createElement("div");

containerForBullets.className = "bullets-container";
nextBtn.className = "btn controlling right";
prevBtn.className = "btn controlling left";

for (let i = 0; i < 5; i++) {
    const bullet = document.createElement("div");
    bullet.className = "bullet";
    containerForBullets.append(bullet);
    i == 0 ? bullet.classList.add("active") : "";
}
nextBtn.innerHTML = `<i class="fa-solid fa-chevron-right fa-fw"></i>`;
prevBtn.innerHTML = `<i class="fa-solid fa-chevron-left fa-fw"></i>`;

landingPage.append(containerForBullets);
landingPage.append(prevBtn);
landingPage.append(nextBtn);

const bullets = document.querySelectorAll(".bullet");

prevBtn.addEventListener("click", () => {
    if (currentImg > 1) currentImg--;
    else currentImg = 5;
    changeImage(currentImg);
});
nextBtn.addEventListener("click", () => {
    if (currentImg < 5) currentImg++;
    else currentImg = 1;
    changeImage(currentImg);
});
function fillBullet(currentImg) {
    bullets.forEach((b) => b.classList.remove("active"));
    bullets[currentImg - 1].classList.add("active");
}
setInterval(() => {
    if (currentImg < 5) currentImg++;
    else currentImg = 1;
    changeImage(currentImg);
}, 9000);
function changeImage(currentImg) {
    landingPage.style.backgroundImage = `url('imgs/landing/${currentImg}.jpg')`;
    headerText.innerHTML = arrHeaders[currentImg - 1];
    msgText.innerHTML = arrMsgs[currentImg - 1];
    fillBullet(currentImg);
}
// End Landing

// Start Our Courses
const ourCoursesSection = document.querySelector(".our-courses");

window.addEventListener("scroll", () => {
    if (window.scrollY >= ourCoursesSection.offsetTop) {
        progressSpans.forEach((c) => {
            c.style.width = c.dataset.progress;
        });
    }
});
// End Our Courses

// Start Our Gallery
const imgsNum = 13;
const imgsContainer = document.querySelector(".our-gallery .imgs-container");

for (let i = 1; i <= imgsNum; i++) {
    let imgBox = document.createElement("div");
    imgBox.className = "img-box";
    let img = document.createElement("img");
    img.setAttribute("src", `imgs/gallery/${i}.jpg`);
    img.setAttribute("loading", "lazy");
    imgBox.append(img);
    imgsContainer.append(imgBox);
}
const imgs = document.querySelectorAll(".img-box");
const activeImgContainer = document.querySelector(".active-img");
const closeImg = document.createElement("span");
const popUp = document.querySelector(".pop-up");

closeImg.className = "close-img";
closeImg.innerHTML = "Close Image";

document.body.addEventListener("click", (e) => {
    if (
        e.target.parentElement.className == "img-box" ||
        e.target.className == "img-box"
    ) {
        focusOnImg(e, true);
    } else {
        focusOnImg(e, false);
    }
});
function focusOnImg(e, bool) {
    activeImgContainer.innerHTML = "";
    if (bool) {
        popUp.style.display = "initial";
        document.body.style.overflow = "hidden";
        let clonedImg = e.target.cloneNode(true);
        activeImgContainer.append(clonedImg);
        activeImgContainer.append(closeImg);
    } else {
        popUp.style.display = "none";
        document.body.style.overflow = "auto";
    }
    Array.from(imgs).forEach((element) => {
        element.style.pointerEvents = bool ? "none" : "all";
    });
}
// End Our Gallery
