const menuBtn = document.getElementById("menuBtn");
const categorylist = document.getElementById("categorylist");
const overlay = document.querySelector(".overlay");
const sidebar = document.querySelector(".sidebar");

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

/*
    كل ملف بيانات (زي refrigerators.js) بيعرّف متغير عام واحد
    شكله: { name: "...", sections: [ { name:"...", products:[{name, price}, ...] } ] }

    عشان تضيف تصنيف جديد:
    1) اعمل ملف زي data/washers.js بنفس الشكل بالظبط، وسمّي المتغير مثلاً washers
    2) ضيف <script src="data/washers.js"></script> في index.html قبل botton.js
    3) ضيف المتغير هنا جوه المصفوفة
*/
const allCategories = [
    refrigerators,
    // washers,
    // airConditioners,
];

/* بناء الأكورديون بثلاث مستويات: تصنيف -> أقسام -> منتجات */
allCategories.forEach(category => {

    const catItem = document.createElement("div");
    catItem.className = "cat-item";

    const catBtn = document.createElement("button");
    catBtn.className = "cat-btn";
    catBtn.innerHTML = `<span>${category.name}</span><i class="fa-solid fa-chevron-down arrow"></i>`;

    const sectionsWrap = document.createElement("div");
    sectionsWrap.className = "sections-wrap";

    category.sections.forEach(section => {

        const secItem = document.createElement("div");
        secItem.className = "sec-item";

        const secBtn = document.createElement("button");
        secBtn.className = "sec-btn";
        secBtn.innerHTML = `<span>${section.name}</span><i class="fa-solid fa-chevron-down arrow"></i>`;

        const productsWrap = document.createElement("div");
        productsWrap.className = "products-wrap";

        if (section.products.length === 0) {
            productsWrap.innerHTML = `<p class="empty-note">لا توجد منتجات بعد</p>`;
        } else {
            section.products.forEach(product => {
                const prodBtn = document.createElement("button");
                prodBtn.className = "prod-btn";
                prodBtn.innerHTML = `<span>${product.name}</span><span class="prod-price">${product.price} EGP</span>`;

                /* دوس على المنتج -> يقفل السايدبار ويودّيك لكارت المنتج في الصفحة الرئيسية لو موجود */
                prodBtn.onclick = () => {
                    sidebar.classList.remove("active");
                    overlay.classList.remove("active");
                    menuBtn.classList.remove("open");
                };

                productsWrap.appendChild(prodBtn);
            });
        }

        secBtn.onclick = () => {
            secItem.classList.toggle("open");
        };

        secItem.appendChild(secBtn);
        secItem.appendChild(productsWrap);
        sectionsWrap.appendChild(secItem);
    });

    catBtn.onclick = () => {
        catItem.classList.toggle("open");
    };

    catItem.appendChild(catBtn);
    catItem.appendChild(sectionsWrap);
    categorylist.appendChild(catItem);
});
