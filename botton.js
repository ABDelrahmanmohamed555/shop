// ========================================
// ====== عناصر الصفحة ======
// ========================================

const menuBtn = document.getElementById("menuBtn");

const overlay = document.querySelector(".overlay");

const productsContainer = document.getElementById("products");
const filterTitle = document.getElementById("filter-title");
const searchInput = document.getElementById("searchInput");
const expandLayer = document.getElementById("expandLayer");

// ========== [CHANGED] Adaptive Quality (touch devices only) ==========
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
if (isTouchDevice) {
    let isLowEnd = false;
    if (navigator.deviceMemory && navigator.deviceMemory < 4) isLowEnd = true;
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) isLowEnd = true;
    document.documentElement.style.setProperty('--blur-main', isLowEnd ? '8px' : '30px');
    document.documentElement.style.setProperty('--blur-bg', isLowEnd ? '6px' : '30px');
    document.documentElement.style.setProperty('--blur-aurora', isLowEnd ? '40px' : '130px');
}



// ====== طبقة التعتيم خلف الكارت المتمدد ======
const cardBackdrop = document.createElement("div");
cardBackdrop.className = "card-backdrop";
document.body.appendChild(cardBackdrop);

// ========== [CHANGED] Lightbox للصورة ==========
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.innerHTML = `
    <button class="lightbox-close">✕</button>
    <img src="" alt="صورة المنتج">
`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector("img");
const lightboxClose = lightbox.querySelector(".lightbox-close");

// ====== Zoom ======
let zoomScale = 1;
let zoomTranslateX = 0;
let zoomTranslateY = 0;
let initialDistance = null;
let lastTap = 0;
let isPanning = false;
let panStartX, panStartY;
let initialTranslateX, initialTranslateY;

function applyZoomTransform() {
    if (zoomScale > 1) {
        lightboxImg.style.transform = `translate(${zoomTranslateX}px, ${zoomTranslateY}px) scale(${zoomScale})`;
    } else {
        zoomScale = 1;
        zoomTranslateX = 0;
        zoomTranslateY = 0;
        lightboxImg.style.transform = '';
    }
}

lightboxImg.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialDistance = Math.hypot(dx, dy);
        isPanning = false;
    } else if (e.touches.length === 1 && zoomScale > 1) {
        isPanning = true;
        panStartX = e.touches[0].clientX;
        panStartY = e.touches[0].clientY;
        initialTranslateX = zoomTranslateX;
        initialTranslateY = zoomTranslateY;
    }
}, { passive: false });

lightboxImg.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2 && initialDistance) {
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        zoomScale = Math.max(1, Math.min(5, zoomScale * (dist / initialDistance)));
        initialDistance = dist;
        applyZoomTransform();
    } else if (e.touches.length === 1 && isPanning) {
        zoomTranslateX = initialTranslateX + (e.touches[0].clientX - panStartX);
        zoomTranslateY = initialTranslateY + (e.touches[0].clientY - panStartY);
        applyZoomTransform();
    }
}, { passive: false });

lightboxImg.addEventListener('touchend', (e) => {
    initialDistance = null;
    isPanning = false;
    if (e.changedTouches.length === 1) {
        const now = Date.now();
        if (now - lastTap < 300) {
            if (zoomScale > 1) {
                zoomScale = 1; zoomTranslateX = 0; zoomTranslateY = 0;
                applyZoomTransform();
            } else {
                zoomScale = 2.5;
                applyZoomTransform();
            }
        }
        lastTap = now;
    }
});

function openLightbox(src) {
    zoomScale = 1;
    zoomTranslateX = 0;
    zoomTranslateY = 0;
    lightboxImg.style.transform = '';
    lightboxImg.src = src;
    lightbox.classList.add("active");
    history.pushState({ lightbox: true }, '');
}

function closeLightbox() {
    zoomScale = 1;
    zoomTranslateX = 0;
    zoomTranslateY = 0;
    lightboxImg.style.transform = '';
    lightbox.classList.remove("active");
}



window.addEventListener('popstate', (e) => {
    if (lightbox.classList.contains('active')) {
        closeLightbox();
    }
});



lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target === lightboxClose) {
        closeLightbox();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
});

cardBackdrop.addEventListener("click", () => {
    const open = document.querySelector(".card.expanded");
    if (open) toggleCardExpand(open);
});

// ====== الباقي من الكود... ======
// ========================================
// ====== جميع التصنيفات ======
// ========================================

const allCategories = [
    refrigerators,
    washing_machine,
    air_conditioner,
    fans,
    items,
    vacuum,
    mixer,
    ketel,
    dispenser,
    heaters,
    iron,
    microwave,
    capacitors,
];



/// =======================================


// ====== تجميع المنتجات ======
function getCategoryProducts(category) {
    return category.sections.reduce((acc, section) => acc.concat(section.products), []);
}

function getAllProducts(categories) {
    return categories.reduce((acc, category) => acc.concat(getCategoryProducts(category)), []);
}

// ====== عرض المنتجات ======
const PRODUCTS_PER_PAGE = 50;
const PRODUCTS_INCREMENT = 25;
let currentProducts = [];
let displayedCount = 0;

let loadMoreBtn = null;

function renderProducts(products, titleText) {
    productsContainer.innerHTML = "";
    currentProducts = products || [];
    displayedCount = 0;
    if (!titleText) shuffleArray(currentProducts);

    if (filterTitle) {
        filterTitle.textContent = titleText || "";
        filterTitle.style.display = titleText ? "block" : "none";
    }

    if (loadMoreBtn) loadMoreBtn.remove();
    loadMoreBtn = null;

    if (!currentProducts || currentProducts.length === 0) {
        productsContainer.innerHTML = `<p class="empty-note" style="padding:20px;">لا توجد منتجات هنا حاليًا</p>`;
        return;
    }

    loadNextProducts();
}

function loadNextProducts() {
    const batchSize = displayedCount === 0 ? PRODUCTS_PER_PAGE : PRODUCTS_INCREMENT;
    const end = Math.min(displayedCount + batchSize, currentProducts.length);
    for (let i = displayedCount; i < end; i++) {
        productsContainer.appendChild(createProductCard(currentProducts[i]));
    }
    displayedCount = end;

    if (loadMoreBtn) loadMoreBtn.remove();

    if (displayedCount < currentProducts.length) {
        loadMoreBtn = document.createElement("button");
        loadMoreBtn.className = "load-more-btn";
        loadMoreBtn.textContent = `عرض المزيد (${displayedCount} / ${currentProducts.length})`;
        loadMoreBtn.addEventListener("click", loadNextProducts);
        productsContainer.appendChild(loadMoreBtn);
    }
}
// ====== إنشاء كارت المنتج ======
function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "card";
 
    const specs = product.specs || [
        'ضمان 6 شهور',
        'قطع غيار أصلية',
        'تركيب مجاني',
        'جودة عالية'
    ];
 
    card.innerHTML = `
        <button class="card-close-inline" aria-label="إغلاق">✕</button>
        <div class="card-content-inner">
            <div class="card-image-wrapper">
                <img src="${product.image || 'images/placeholder.png'}" alt="${product.name}" loading="lazy">
            </div>
            <div class="card-details">
                <h2>${product.name}</h2>
                ${product.note ? `<h5>${product.note}</h5>` : ""}
                <ul class="product-specs">
                    ${specs.map(spec => `<li>${spec}</li>`).join('')}
                </ul>
                <div class="price-container">
                    <span class="new-price">${product.price} ج.م</span>
                </div>
            </div>
        </div>
    `;
 
        card.querySelector(".card-content-inner").addEventListener("click", (e) => {
        e.stopPropagation();
        toggleCardExpand(card);
    });

// [CHANGED] Lightbox على الصورة
    card.querySelector(".card-image-wrapper").addEventListener("click", (e) => {
        if (card.classList.contains("expanded")) {
            e.stopPropagation();
            const img = card.querySelector(".card-image-wrapper img");
            if (img && img.src) openLightbox(img.src);
        }
    });

    card.querySelector(".card-close-inline").addEventListener("click", (e) => {
        e.stopPropagation();
        if (card.classList.contains("expanded")) toggleCardExpand(card);
    });
 
    return card;
}
 
// ====== أنيميشن اتساع الكارت ======
function toggleCardExpand(card) {
    document.querySelectorAll(".card.expanded").forEach(other => {
        if (other !== card) toggleCardExpand(other);
    });
 
    const first = card.getBoundingClientRect();
    const willExpand = !card.classList.contains("expanded");

    if (!willExpand) card.classList.remove("show-details");
    card.classList.toggle("expanded");

    cardBackdrop.classList.toggle("active", willExpand);
 
    const last = card.getBoundingClientRect();
 
    const dx = first.left - last.left;
    const dy = first.top - last.top;
    const sx = first.width / last.width;
    const sy = first.height / last.height;
 
    card.style.transition = "none";
    card.style.transformOrigin = "top right";
    card.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
 
    requestAnimationFrame(() => {
        card.style.transition = "transform .5s cubic-bezier(.22,.61,.36,1)";
        card.style.transform = "none";
    });
 
    card.addEventListener("transitionend", function handler(e) {
        if (e.propertyName !== "transform") return;
        card.removeEventListener("transitionend", handler);
        card.style.transition = "";
        if (card.classList.contains("expanded")) {
            card.classList.add("show-details");
        }
    });
}
 
// ====== إغلاق الكارت بزرار ESC ======
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        const open = document.querySelector(".card.expanded");
        if (open) toggleCardExpand(open);
    }
});
 


// ====== Shuffle ======
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}




// ====== عرض كل المنتجات عند التحميل ======
renderProducts(getAllProducts(allCategories), null);

// ====== وظيفة البحث ======
function filterProducts() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm === "") {
        renderProducts(getAllProducts(allCategories), "");
        return;
    }
    const allProds = getAllProducts(allCategories);
    const filtered = allProds.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
    );
    renderProducts(filtered, `نتائج البحث: "${searchInput.value}"`);
}

searchInput.addEventListener('keyup', filterProducts);

// ========== [CHANGED] إغلاق مع reset isMenuOpen واخفاء العنوان ==========
function closeSidebarAndScrollToProducts() {
    document.querySelector('.slider-title').classList.remove('visible');

    expandLayer.classList.remove("active");
    overlay.classList.remove("active");

    menuBtn.classList.remove("hidden");
    menuBtn.textContent = "☰";
    isMenuOpen = false;

    productsContainer.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}

// ========================================
// ====== زر القائمة: حركة 60 FPS ======
// ========================================

// ====== ننتظر تحميل الصفحة ======
let isMenuOpen = false;
document.addEventListener('DOMContentLoaded', function() {
    
    // ====== نعيد تعريف العناصر جوه الـ event عشان نتأكد إنها موجودة ======
    const menuBtn = document.getElementById("menuBtn");
    const expandLayer = document.getElementById("expandLayer");
    const overlay = document.querySelector(".overlay");
   
    
    if (!menuBtn || !expandLayer || !overlay ) {
        console.error("❌ بعض العناصر غير موجودة!");
        return;
    }
    
    
    
    
    
    
        menuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (!isMenuOpen) {
            isMenuOpen = true;
            menuBtn.textContent = '✕';
            expandLayer.classList.add("active");
            overlay.classList.add("active");
            menuBtn.classList.add("hidden");
            buildHorizontalSlider();
            document.querySelector('.slider-title').classList.add('visible');
        } else {
            document.querySelector('.slider-title').classList.remove('visible');
            isMenuOpen = false;
            menuBtn.textContent = '☰';
            expandLayer.classList.remove('active');
            overlay.classList.remove('active');
            menuBtn.classList.remove('hidden');
        }
    });
    
    overlay.addEventListener('click', function() {
        if (isMenuOpen) {
            document.querySelector('.slider-title').classList.remove('visible');
            isMenuOpen = false;
            menuBtn.textContent = '☰';
            expandLayer.classList.remove('active');
            overlay.classList.remove('active');
            menuBtn.classList.remove('hidden');
        }
    });
    
    console.log("✅ تم تفعيل زر القائمة بنجاح!");
    
});






// ====== Easter Egg: Franchise Eyes ======
const secretEye = document.getElementById("secretEye");
const allIris = document.querySelectorAll(".iris");
const SECRET_WORD = "eye";
let eyeActive = false;

searchInput.addEventListener("input", () => {
    const val = searchInput.value.trim().toLowerCase();
    if (val === SECRET_WORD && !eyeActive) {
        eyeActive = true;
        secretEye.classList.add("active");
        searchInput.value = "";
    }
});

// Mouse tracking
document.addEventListener("mousemove", (e) => {
    if (!eyeActive) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 12;
    const y = (e.clientY / window.innerHeight - 0.5) * 8;
    allIris.forEach(iris => {
        iris.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
});


// Touch tracking
document.addEventListener("touchmove", (e) => {
    if (!eyeActive) return;
    const touch = e.touches[0];
    const x = (touch.clientX / window.innerWidth - 0.5) * 12;
    const y = (touch.clientY / window.innerHeight - 0.5) * 8;
    allIris.forEach(iris => {
        iris.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
}, { passive: true });

// Flicker on outerGlow
let flickerInterval = null;
function startFlicker() {
    flickerInterval = setInterval(() => {
        if (!eyeActive) return;
        document.querySelectorAll(".outerGlow").forEach(glow => {
            glow.style.opacity = 0.7 + Math.random() * 0.4;
            glow.style.filter = `blur(${35 + Math.random() * 20}px)`;
        });
    }, 80);
}

// IrisGlow scale
let irisGlowInterval = null;
function startIrisGlow() {
    irisGlowInterval = setInterval(() => {
        if (!eyeActive) return;
        document.querySelectorAll(".irisGlow").forEach(glow => {
            glow.style.transform = `translate(-50%, -50%) scale(${1 + Math.random() * 0.08})`;
        });
    }, 120);
}

// Mist random movement
let mistInterval = null;
function startMist() {
    mistInterval = setInterval(() => {
        if (!eyeActive) return;
        document.querySelectorAll(".mist").forEach(m => {
            let x = (Math.random() - 0.5) * 20;
            let y = (Math.random() - 0.5) * 20;
            m.style.transform = `translate(${x}px, ${y}px)`;
        });
    }, 400);
}

// Pulse with requestAnimationFrame
let pulseFrame = null;
let t = 0;
function animatePulse() {
    if (!eyeActive) return;
    t += 0.02;
    allIris.forEach(i => {
        i.style.scale = 1 + Math.sin(t) * 0.015;
    });
    pulseFrame = requestAnimationFrame(animatePulse);
}

// Open
function openEyeEasterEgg() {
    eyeActive = true;
    secretEye.classList.add("active");
    startFlicker();
    startIrisGlow();
    startMist();
    animatePulse();
}

// Close
function closeEyeEasterEgg() {
    eyeActive = false;
    secretEye.classList.remove("active");
    allIris.forEach(iris => {
        iris.style.transform = "";
        iris.style.scale = "";
    });
    document.querySelectorAll(".outerGlow").forEach(g => {
        g.style.opacity = "";
        g.style.filter = "";
    });
    document.querySelectorAll(".irisGlow").forEach(g => {
        g.style.transform = "";
    });
    document.querySelectorAll(".mist").forEach(m => {
        m.style.transform = "";
    });
    clearInterval(flickerInterval);
    clearInterval(irisGlowInterval);
    clearInterval(mistInterval);
    cancelAnimationFrame(pulseFrame);
}

// Trigger
searchInput.addEventListener("input", () => {
    const val = searchInput.value.trim().toLowerCase();
    if (val === SECRET_WORD && !eyeActive) {
        openEyeEasterEgg();
        searchInput.value = "";
    }
});

secretEye.addEventListener("click", () => {
    closeEyeEasterEgg();
});


// ====== Cat Easter Egg ======
const catOverlay = document.getElementById("catOverlay");

searchInput.addEventListener("input", () => {
    const val = searchInput.value.trim().toLowerCase();
    if (val === "cat") {
        catOverlay.classList.add("active");
        searchInput.value = "";
    }
});

catOverlay.addEventListener("click", () => {
    catOverlay.classList.remove("active");
});