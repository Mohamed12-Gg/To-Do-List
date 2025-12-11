// عند الضغط على زر "Add Task"
document.getElementById('addBtn').addEventListener('click', function() {
    // جلب قيمة خانة الإدخال
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim(); // إزالة الفراغات من البداية والنهاية

    // التحقق من أن المستخدم كتب مهمة
    if (taskText === '') {
        alert('Please enter a task.');
        return; // الخروج من الدالة إذا لم يكتب شيء
    }

    // إضافة المهمة الجديدة للجدول
    addTask(taskText);

    // تفريغ خانة الإدخال بعد الإضافة
    taskInput.value = '';
});

// دالة لإضافة مهمة جديدة للجدول
function addTask(text) {
    const taskList = document.getElementById('taskList'); // جلب الجدول
    const newRow = document.createElement('tr'); // إنشاء صف جديد

    // وضع محتوى الصف: خانة checkbox + نص المهمة + زر حذف
    newRow.innerHTML = `
        <td><input type="checkbox" class="done"></td>
        <td>${text}</td>
        <td><button class="deleteBtn">Delete</button></td>
    `;

    // إضافة الصف الجديد للجدول
    taskList.appendChild(newRow);

    // جلب الـ checkbox داخل الصف الجديد
    const checkbox = newRow.querySelector('.done');

    // عند تغيير حالة الـ checkbox (تعليم أو إزالة تعليم)
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            // شطب نص المهمة إذا تم تعليمها
            this.parentNode.parentNode.style.textDecoration = 'line-through';
        } else {
            // إزالة الشطب إذا تم إلغاء التعليم
            this.parentNode.parentNode.style.textDecoration = 'none';
        }
    });
}

// حذف المهمة عند الضغط على زر Delete
document.getElementById('taskList').addEventListener('click', function(event) {
    // التحقق إذا الزر المضغوط هو زر الحذف
    if (event.target.classList.contains('deleteBtn')) {
        const row = event.target.parentNode.parentNode; // جلب الصف
        if (confirm('Are you sure you want to delete this task?')) {
            row.remove(); // حذف الصف
        }
    }
});
