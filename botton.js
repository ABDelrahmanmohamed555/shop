// ====== عناصر الصفحة ======
const menuBtn = document.getElementById("menuBtn");
// ====== طبقة التعتيم خلف الكارت المتمدد ======
const cardBackdrop = document.createElement("div");
cardBackdrop.className = "card-backdrop";
document.body.appendChild(cardBackdrop);

cardBackdrop.addEventListener("click", () => {
    const open = document.querySelector(".card.expanded");
    if (open) toggleCardExpand(open);
});
const categorylist = document.getElementById("categorylist");
const overlay = document.querySelector(".overlay");
const sidebar = document.querySelector(".sidebar");
const productsContainer = document.getElementById("products");
const filterTitle = document.getElementById("filter-title");
const searchInput = document.getElementById("searchInput");

/* فتح وقفل الـ sidebar نفسه */
menuBtn.onclick = () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
    menuBtn.classList.toggle("open");
};

overlay.onclick = () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    menuBtn.classList.remove("open");
};

function closeSidebarAndScrollToProducts() {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    menuBtn.classList.remove("open");
    productsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ====== جميع التصنيفات ======
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
];

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
// ====== إنشاء كارت المنتج ======
function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "card";
 
    // ====== المواصفات (بتظهر في وضع التمدد بس - اكتبها لكل منتج زي ما تحب) ======
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
 
    // الدوسة على أي حتة في الكارت (غير زرار الإغلاق) = تبديل حالة التمدد
    card.querySelector(".card-content-inner").addEventListener("click", (e) => {
        e.stopPropagation();
        toggleCardExpand(card);
    });
 
    card.querySelector(".card-close-inline").addEventListener("click", (e) => {
        e.stopPropagation();
        if (card.classList.contains("expanded")) toggleCardExpand(card);
    });
 
    return card;
}
 
// ====== أنيميشن اتساع الكارت داخل مكانه في الصفحة (تقنية FLIP) ======
// المرحلة 1: الكارت يتمدد لعرض الصف كله بحركة سلسة (من غير ما يقفز مكانه)
// المرحلة 2 (بعد ما الاتساع يخلص): يتحول المحتوى لصف وتظهر التفاصيل بأنيميشن الكتابة
function toggleCardExpand(card) {
    // اقفل أي كارت تاني مفتوح قبل ما تفتح ده
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
 
    // نرجّعه بصريًا لشكله القديم فورًا (من غير أنيميشن) قبل ما نشغّل الحركة
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
            card.classList.add("show-details"); // المرحلة 2 تبدأ هنا بس
        }
    });
}
 
// إغلاق أي كارت مفتوح بزرار ESC
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        const open = document.querySelector(".card.expanded");
        if (open) toggleCardExpand(open);
    }
});
 
function setActiveButton(btn) {
    document.querySelectorAll(".cat-name-btn.active, .sec-btn.active")
        .forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
}

// ====== زر عرض كل المنتجات ======
const allProductsBtn = document.createElement("div");
allProductsBtn.className = "cat-item";

const allHeader = document.createElement("div");
allHeader.className = "cat-header";

const allNameBtn = document.createElement("button");
allNameBtn.className = "cat-name-btn";
allNameBtn.innerHTML = `<i class="fa-solid fa-grid-2" style="margin-left:8px;"></i> كل المنتجات`;
allNameBtn.onclick = () => {
    document.querySelectorAll(".cat-name-btn.active, .sec-btn.active")
        .forEach(b => b.classList.remove("active"));
    allNameBtn.classList.add("active");
    renderProducts(getAllProducts(allCategories), "");
    closeSidebarAndScrollToProducts();
};

allHeader.appendChild(allNameBtn);
allProductsBtn.appendChild(allHeader);
categorylist.appendChild(allProductsBtn);

// ====== بناء الأكورديون ======
allCategories.forEach(category => {

    const catItem = document.createElement("div");
    catItem.className = "cat-item";

    const catHeader = document.createElement("div");
    catHeader.className = "cat-header";

    const catNameBtn = document.createElement("button");
    catNameBtn.className = "cat-name-btn";
    catNameBtn.textContent = category.name;
    catNameBtn.onclick = () => {
        setActiveButton(catNameBtn);
        renderProducts(getCategoryProducts(category), category.name);
        closeSidebarAndScrollToProducts();
    };

    const catArrowBtn = document.createElement("button");
    catArrowBtn.className = "cat-arrow-btn";
    catArrowBtn.setAttribute("aria-label", "عرض الأقسام");
    catArrowBtn.innerHTML = `<i class="fa-solid fa-chevron-down arrow"></i>`;
    catArrowBtn.onclick = () => {
        catItem.classList.toggle("open");
    };

    catHeader.appendChild(catNameBtn);
    catHeader.appendChild(catArrowBtn);

    const sectionsWrap = document.createElement("div");
    sectionsWrap.className = "sections-wrap";

    category.sections.forEach(section => {

        const secBtn = document.createElement("button");
        secBtn.className = "sec-btn";
        secBtn.innerHTML = `<span>${section.name}</span><i class="fa-solid fa-arrow-left-long sec-arrow"></i>`;

        secBtn.onclick = () => {
            setActiveButton(secBtn);
            renderProducts(section.products, `${category.name} — ${section.name}`);
            closeSidebarAndScrollToProducts();
        };

        sectionsWrap.appendChild(secBtn);
    });

    catItem.appendChild(catHeader);
    catItem.appendChild(sectionsWrap);
    categorylist.appendChild(catItem);
});

// ====== عرض كل المنتجات عند التحميل ======
renderProducts(getAllProducts(allCategories), null);

// ====== وظيفة البحث ======
function filterProducts() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm === "") {
        renderProducts(getAllProducts(allCategories), "جميع المنتجات");
        return;
    }
    const allProds = getAllProducts(allCategories);
    const filtered = allProds.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
    );
    renderProducts(filtered, `نتائج البحث: "${searchInput.value}"`);
}

