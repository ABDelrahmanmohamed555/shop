const slider = document.getElementById("horizontalSlider");
let activeBgIndex = 0;
let prevIndex = 0;
const clickSound = new Audio('click.mp3');
const label = document.querySelector(".label-text");

let currentIndex = 0;
let cards = [];

function buildHorizontalSlider() {

    slider.innerHTML = "";

    cards = [];

    allCategories.forEach((category, index) => {

        const card = document.createElement("div");
        card.className = "category-slide-h";

// [CHANGED] 3D Flip structure
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <img src="${category.image}">
                </div>
                <div class="card-back">
                    <div class="card-back-bg" style="background-image: url(${category.image})"></div>
                    <div class="section-list"></div>
                </div>
            </div>
        `;

// [CHANGED] unflip on click if flipped
        card.addEventListener("click", (e) => {
            if (card.classList.contains("flipped")) {
                card.classList.remove("flipped");
                return;
            }

            if (currentIndex !== index) {
                currentIndex = index;
                updateSlider();
                return;
            }

            renderProducts(
                getCategoryProducts(category),
                category.name
            );

            closeSidebarAndScrollToProducts();
        });

        slider.appendChild(card);

        cards.push(card);

    });

    updateSlider();
}

function showSections(index) {
    cards.forEach((c, i) => {
        if (i !== index) c.classList.remove("flipped");
    });
    cards[index].classList.toggle("flipped");

    const back = cards[index].querySelector(".card-back");
    const list = back.querySelector(".section-list");
    if (list.children.length > 0) return;

        const category = allCategories[index];
    category.sections.forEach(section => {
        const hasProducts = section.products && section.products.length > 0;
        const btn = document.createElement("div");
        btn.className = hasProducts ? "section-item" : "section-item section-empty";
        btn.textContent = hasProducts ? section.name : `${section.name}\nلا يوجد منتجات`;
        if (hasProducts) {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                renderProducts(section.products, section.name);
                closeSidebarAndScrollToProducts();
            });
        }
        list.appendChild(btn);
    });
} 

document.querySelector('.view-sections-btn').addEventListener('click', () => {
    showSections(currentIndex);
});

document.querySelector('.all-products-btn').addEventListener('click', () => {
    renderProducts(getAllProducts(allCategories), "");
    closeSidebarAndScrollToProducts();
});

function updateSlider() {

    cards.forEach((card, index) => {

        const offset = index - currentIndex;

        let x = offset * 200;

        let scale = 0.72;

        let opacity = .15;

        card.classList.remove(
            "active",
            "near",
            "far"
        );

        if (offset === 0) {

            scale = 1;

            opacity = 1;

            card.classList.add("active");

        }

        else if (Math.abs(offset) === 1) {

            scale = .82;

            opacity = .55;

            card.classList.add("near");

        }

        else {

            card.classList.add("far");

        }

        card.style.opacity = opacity;

        card.style.zIndex = 100 - Math.abs(offset);

        card.style.transform =

            `translate(-50%,-50%)
             translateX(${x}px)
             scale(${scale})`;

    });

    label.textContent =
        allCategories[currentIndex].name;

    const layers = document.querySelectorAll('.bg-layer');
    const nextIndex = (activeBgIndex + 1) % 2;
    layers[nextIndex].style.backgroundImage = `url(${allCategories[currentIndex].image})`;
    layers[nextIndex].classList.add('active');
    layers[activeBgIndex].classList.remove('active');
    activeBgIndex = nextIndex;
    if (currentIndex !== prevIndex) {
        clickSound.currentTime = 0;
        clickSound.play();
    }
    prevIndex = currentIndex;
        // expandLayer.style.setProperty('--bg-image', `url(${allCategories[currentIndex].image})`);

}

function nextCategory() {

    if (currentIndex >= allCategories.length - 1)
        return;

    currentIndex++;

    updateSlider();

}

function previousCategory() {

    if (currentIndex <= 0)
        return;

    currentIndex--;

    updateSlider();

}

document.addEventListener("keydown", e => {

    if (e.key === "ArrowRight")
        nextCategory();

    if (e.key === "ArrowLeft")
        previousCategory();

});

/* ==========================================
   Mouse + Touch Drag
========================================== */

let startX = 0;
let endX = 0;
let dragging = false;

slider.addEventListener("mousedown", e => {

    dragging = true;
    startX = e.clientX;

});

window.addEventListener("mouseup", e => {

    if (!dragging) return;

    dragging = false;

    endX = e.clientX;

    handleSwipe();

});

slider.addEventListener("touchstart", e => {

    startX = e.touches[0].clientX;

}, { passive:true });

slider.addEventListener("touchend", e => {

    endX = e.changedTouches[0].clientX;

    handleSwipe();

}, { passive:true });

function handleSwipe(){

    const distance = endX - startX;

    if(Math.abs(distance) < 50)
        return;

    if(distance < 0){

        nextCategory();

    }else{

        previousCategory();

    }

}

/* ==========================================
   Wheel
========================================== */

slider.addEventListener("wheel", e=>{

    e.preventDefault();

    if(e.deltaY>0 || e.deltaX>0){

        nextCategory();

    }else{

        previousCategory();

    }

},{passive:false});

/* ==========================================
   Buttons
========================================== */

const closeBtn=document.getElementById("closeExpandBtn");

if(closeBtn){

closeBtn.addEventListener("click",()=>{

    expandLayer.classList.remove("active");

    overlay.classList.remove("active");

    menuBtn.classList.remove("hidden");

});

}

/* ==========================================
   Auto Resize
========================================== */

window.addEventListener("resize",()=>{

    updateSlider();

});

/* ==========================================
   Helpers
========================================== */

function selectCurrentCategory(){

    const category=allCategories[currentIndex];

    renderProducts(

        getCategoryProducts(category),

        category.name

    );

    closeSidebarAndScrollToProducts();

}

document.addEventListener("keydown",e=>{

    if(e.key==="Enter"){

        selectCurrentCategory();

    }

});

/* ==========================================
   Click Active Card
========================================== */

slider.addEventListener("click",e=>{

    const card=e.target.closest(".category-slide-h");

    if(!card) return;

    const index=cards.indexOf(card);

    if(index===-1) return;

    if(card.classList.contains("flipped")) return;

    if(index!==currentIndex){

        currentIndex=index;

        updateSlider();

        return;

    }

    selectCurrentCategory();

});

/* ==========================================
   Init
========================================== */

buildHorizontalSlider();

document.querySelector('.bg-layer-a').style.backgroundImage = `url(${allCategories[0].image})`;
document.querySelector('.bg-layer-a').classList.add('active');