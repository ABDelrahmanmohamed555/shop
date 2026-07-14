const menuBtn = document.getElementById("menuBtn");
const categorylist = document.getElementById("categorylist");
const overlay = document.querySelector(".overlay");
const sidebar = document.querySelector(".sidebar");
const productsContainer = document.getElementById("products");
const filterTitle = document.getElementById("filter-title");

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

/*
    كل ملف بيانات (زي refrigerators.js) بيعرّف متغير عام واحد شكله:
    {
        name: "...",
        sections: [
            { name: "...", products: [ { name, price, image, note } ] }
        ]
    }
*/
const allCategories = [
    refrigerators,
    washing_machine,
    
    // airConditioners,
];

/* ---------- تجميع المنتجات ---------- */

function getCategoryProducts(category) {
    return category.sections.reduce((acc, section) => acc.concat(section.products), []);
}

function getAllProducts(categories) {
    return categories.reduce((acc, category) => acc.concat(getCategoryProducts(category)), []);
}

/* ---------- عرض المنتجات ---------- */

function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <img src="${product.image || 'images/placeholder.png'}" alt="${product.name}">
        <h2>${product.name}</h2>
        ${product.note ? `<h5>${product.note}</h5>` : ""}
        <p class="price">price : ${product.price} EGP</p>
    `;
    return card;
}

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

function setActiveButton(btn) {
    document.querySelectorAll(".cat-name-btn.active, .sec-btn.active")
        .forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
}

/* ---------- بناء الأكورديون: تصنيف (اسم + سهم منفصلين) -> أقسام ---------- */

allCategories.forEach(category => {

    const catItem = document.createElement("div");
    catItem.className = "cat-item";

    const catHeader = document.createElement("div");
    catHeader.className = "cat-header";

    /* اسم التصنيف: بيفلتر كل منتجات كل أقسام التصنيف ده */
    const catNameBtn = document.createElement("button");
    catNameBtn.className = "cat-name-btn";
    catNameBtn.textContent = category.name;
    catNameBtn.onclick = () => {
        setActiveButton(catNameBtn);
        renderProducts(getCategoryProducts(category), category.name);
        closeSidebarAndScrollToProducts();
    };

    /* السهم: بس بيفتح/يقفل قائمة الأقسام، مالوش علاقة بالفلترة */
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

        /* دوسة على القسم: بتفلتر منتجات القسم ده بس */
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

/* ---------- عرض كل المنتجات افتراضيًا أول ما الصفحة تفتح ---------- */
renderProducts(getAllProducts(allCategories), null);
