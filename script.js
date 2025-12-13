// قائمة الامتدادات الشائعة التي سيحاول الكود تحميلها بالترتيب
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG'];
// الرابط الأساسي لمجلد الصور الخاص بمشروعك على GitHub Pages
// **يجب تغيير هذا المتغير ليعمل الموقع بشكل صحيح**
const BASE_URL = "https://bbbbc94766-crypto.github.io/Moh2025/images/"; 

/**
 * وظيفة رئيسية: تبدأ عملية البحث عن صور الكتب وعرضها.
 * يتم استدعاؤها بالنقر على زر "عرض الصور" في ملف index.html.
 */
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

    // إنشاء حاوية واحدة لنتائج البحث
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'book-image';
    resultsDiv.appendChild(imageWrapper);

    // بدء محاولة البحث عن الصورة باستخدام أول امتداد (المؤشر 0)
    tryLoadImage(cleanedIsbn, 0, imageWrapper);
}

/**
 * دالة متكررة (Recursive) تحاول تحميل صورة بالـ ISBN المعطى باستخدام الامتدادات المتاحة.
 * * @param {string} isbn - رقم ISBN النظيف.
 * @param {number} extIndex - مؤشر الامتداد الحالي في مصفوفة IMAGE_EXTENSIONS.
 * @param {HTMLElement} wrapper - الحاوية لعرض الصورة أو رسالة الخطأ.
 */
function tryLoadImage(isbn, extIndex, wrapper) {
    // 1. التحقق: هل وصلنا إلى نهاية قائمة الامتدادات؟
    if (extIndex >= IMAGE_EXTENSIONS.length) {
        // إذا وصلنا للنهاية ولم نجد أي صورة:
        wrapper.innerHTML = `<p>لم يتم العثور على صورة بهذا الـ ISBN (${isbn}) بأي من الامتدادات المدعومة.</p>`;
        wrapper.style.border = '1px dashed red';
        return;
    }

    const extension = IMAGE_EXTENSIONS[extIndex];
    // 2. بناء الرابط للمحاولة الحالية
    const imageUrl = `${BASE_URL}${isbn}${extension}`; 

    const imageElement = new Image(); // استخدام كائن الصورة
    
    // 3. تعريف دالة عند النجاح (onload)
    imageElement.onload = function() {
        // إذا تم تحميل الصورة بنجاح:
        wrapper.innerHTML = ''; // تنظيف رسائل الانتظار
        imageElement.alt = `غلاف الكتاب برقم ISBN ${isbn} (${extension})`;
        
        const sourceInfo = document.createElement('p');
        sourceInfo.innerHTML = `تم العثور على الصورة (${extension}) <br> (<a href="${imageUrl}" target="_blank">الرابط المباشر</a>)`;

        wrapper.appendChild(imageElement);
        wrapper.appendChild(sourceInfo);
        wrapper.style.border = '1px solid green';
        
        // نتوقف عن المحاولة
    };

    // 4. تعريف دالة عند الفشل (onerror)
    imageElement.onerror = function() {
        // إذا فشل تحميل الصورة، ننتقل إلى محاولة الامتداد التالي
        tryLoadImage(isbn, extIndex + 1, wrapper); 
    };

    // إضافة نص انتظار مؤقت قبل بدء التحميل
    if (extIndex === 0) {
        wrapper.innerHTML = `<p>جاري البحث عن الصورة... (محاولة: ${extension})</p>`;
    } else {
        wrapper.innerHTML = `<p>جاري البحث عن الصورة... (جاري محاولة: ${extension})</p>`;
    }
    
    // 5. بدء محاولة التحميل بتعيين مصدر الصورة
    imageElement.src = imageUrl;
}

