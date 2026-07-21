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
function renderProducts(products, titleText) {
    productsContainer.innerHTML = "";

    if (filterTitle) {
        filterTitle.textContent = titleText || "";
        filterTitle.style.display = titleText ? "block" : "none";
    }

    if (!products || products.length === 0) {
        productsContainer.innerHTML = `<p class="empty-note" style="padding:20px;">لا توجد منتجات هنا حاليًا</p>`;
        return;
    }

    products.forEach(product => {
        productsContainer.appendChild(createProductCard(product));
    });
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