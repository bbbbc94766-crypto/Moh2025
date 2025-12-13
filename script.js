// قائمة بقوالب الروابط التي تريد استخدامها.
// !!isbn!! سيتم استبدالها برقم ISBN المدخل.
const isbnTemplates = [
    "http://images-eu.amazon.com/images/P/!!isbn!!.08.MZZZZZZZ.jpg",
    "https://pictures.abebooks.com/isbn/!!isbn!!-fr-300.jpg",
    "https://images-eu.ssl-images-amazon.com/images/P/!!isbn!!.08.MZZZZZZZ.jpg",
    "https://distrimage.pmbservices.fr/bnf/!!isbn!!",
    "https://github.com/bbbbc94766-crypto/Moh2025/blob/main/images/!!isbn!!.jpg"
    "https://github.com/bbbbc94766-crypto/Moh2025/blob/main/images/!!isbn!!.png"
    // يمكنك إضافة المزيد من الروابط هنا
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
        
        // 3. إضافة معالج للأخطاء (مهم جداً!)
        // إذا فشل تحميل الصورة (لأن الرابط غير صالح أو الصورة غير موجودة في هذا المصدر)، فسنعرض رسالة بدلاً من الصورة المكسورة.
        imageElement.onerror = function() {
            imageWrapper.innerHTML = `
                <p>المصدر ${index + 1} (فشل التحميل)</p>
                <small>الرابط: ${imageUrl}</small>
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
