// ====== عناصر الصفحة ======
const menuBtn = document.getElementById("menuBtn");
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
function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <img src="${product.image || 'images/placeholder.png'}" alt="${product.name}">
        <h2>${product.name}</h2>
        ${product.note ? `<h5>${product.note}</h5>` : ""}
        <p class="price">price : ${product.price} EGP</p>
    `;

    // ====== تكبير الكارت عند الضغط ======
    card.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('expanded');

        if (this.classList.contains('expanded')) {
            overlayCard.classList.add('active');
            closeBtn.classList.add('visible');
            document.body.style.overflow = 'hidden';
        } else {
            overlayCard.classList.remove('active');
            closeBtn.classList.remove('visible');
            document.body.style.overflow = '';
        }
    });

    return card;
}

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

// =============================================
// ====== التحكم في تكبير الكارت ======
// =============================================

// إنشاء Overlay
const overlayCard = document.createElement('div');
overlayCard.className = 'card-overlay';
document.body.appendChild(overlayCard);

// إنشاء زر الإغلاق
const closeBtn = document.createElement('button');
closeBtn.className = 'card-close-btn';
closeBtn.innerHTML = '✕';
document.body.appendChild(closeBtn);

// دالة إغلاق الكارت
function closeExpandedCard() {
    const expanded = document.querySelector('.card.expanded');
    if (expanded) {
        expanded.classList.remove('expanded');
    }
    overlayCard.classList.remove('active');
    closeBtn.classList.remove('visible');
    document.body.style.overflow = '';
}

// إغلاق بالضغط على الـ Overlay
overlayCard.addEventListener('click', closeExpandedCard);

// إغلاق بالضغط على زر الإغلاق
closeBtn.addEventListener('click', closeExpandedCard);

// إغلاق بالضغط على ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeExpandedCard();
});

console.log('✅ نظام تكبير الكارت جاهز!');