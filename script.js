// **روابط GitHub Pages الصحيحة**
const isbnTemplates = [
    "https://bbbbc94766-crypto.github.io/Moh2025/images/!!isbn!!.jpg",
    "https://bbbbc94766-crypto.github.io/Moh2025/images/!!isbn!!.png",
    "https://bbbbc94766-crypto.github.io/Moh2025/images/!!isbn!!.jpeg",
    "https://bbbbc94766-crypto.github.io/Moh2025/images/!!isbn!!.bmp"
];

function displayBookImages() {
    const isbnInput = document.getElementById('isbnInput').value.trim();
    const resultsDiv = document.getElementById('results');
    
    // تنظيف النتائج السابقة
    resultsDiv.innerHTML = ''; 

    if (!isbnInput) {
        resultsDiv.innerHTML = '<p>الرجاء إدخال رقم ISBN.</p>';
        return;
    }

    // تجهيز رقم الـ ISBN (إزالة الفراغات والواصلات إن وجدت)
    const cleanedIsbn = isbnInput.replace(/[-\s]/g, '');

    // إنشاء وعرض كل صورة بناءً على القوالب
    isbnTemplates.forEach((template, index) => {
        // 1. بناء الرابط
        const imageUrl = template.replace('!!isbn!!', cleanedIsbn);

        // 2. إنشاء عناصر HTML
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'book-image';

        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.alt = `صورة كتاب برقم ISBN: ${cleanedIsbn} (المصدر ${index + 1})`;
        
        // 3. إضافة معالج للأخطاء
        imageElement.onerror = function() {
            // يتم استخدام هذا للتعامل مع الصور غير الموجودة
            imageWrapper.innerHTML = `
                <p>المصدر ${index + 1} (فشل التحميل أو الصورة غير موجودة)</p>
                <small>رابط البحث: ${imageUrl}</small>
            `;
            imageWrapper.style.border = '1px dashed red';
        };
        
        // 4. عرض الرابط بجانب الصورة (للتوثيق)
        const sourceInfo = document.createElement('p');
        sourceInfo.innerHTML = `المصدر ${index + 1} <br> (<a href="${imageUrl}" target="_blank">الرابط المباشر</a>)`;

        // 5. تجميع العناصر وعرضها
        imageWrapper.appendChild(imageElement);
        imageWrapper.appendChild(sourceInfo);
        resultsDiv.appendChild(imageWrapper);
    });
}

