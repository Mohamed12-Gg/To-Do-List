// Initialize tasks array
let tasks = [];
// Load tasks from localStorage on page load
window.onload = () => {
    if (localStorage.getItem('tasks') !== null) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach(task => {
            addTaskToDOM(task.text, task.done);
        });
    }
};



// Save tasks to localStorage
function saveToLocalStorage() {
    const taskList = document.getElementById('taskList');
    const rows = taskList.getElementsByTagName('tr');
    tasks = [];

    
    for (let i = 0; i < rows.length; i++) {
        const checkbox = rows[i].querySelector('.done');
        const taskText = rows[i].children[1].textContent;
        const isDone = checkbox.checked;
        
        tasks.push({
            text: taskText,
            done: isDone
        });
    }
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add task button event
document.getElementById('addBtn').addEventListener('click', () => {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim(); 

    if (taskText === '') {
        alert('Please enter a task.');
        return; 
    }else {
        addTaskToDOM(taskText, false);
        saveToLocalStorage();
        taskInput.value = '';
    }
});




// Function to add task to DOM
function addTaskToDOM(text, isDone) {
    const taskList = document.getElementById('taskList');
    const newRow = document.createElement('tr'); 

    newRow.innerHTML = `
        
        <td><input type="checkbox" class="done" ${isDone ? 'checked' : ''}></td>
        <td>${text}</td>
        <td><button class="deleteBtn btn btn-danger">Delete</button></td>
        <td><button class="editBtn btn btn-primary">Edit</button></td>
        
    `;

    taskList.appendChild(newRow);

    const checkbox = newRow.querySelector('.done');

// Apply styles if task is done on load
    if (isDone) {
        newRow.style.textDecoration = 'line-through';
        newRow.style.opacity = '0.6';
    }
    
    checkbox.addEventListener('change', () => {
    const row = checkbox.closest('tr');

    if (checkbox.checked) {
        row.style.textDecoration = 'line-through';
        row.style.opacity = '0.6';
    } else {
        row.style.textDecoration = 'none';
        row.style.opacity = '1';
    }
    saveToLocalStorage();
});
}

// Delete btn
document.getElementById('taskList').addEventListener('click', (e) => {
// check if delete button is clicked
    if (e.target.classList.contains('deleteBtn')) {

        const row = e.target.closest('tr');

        if (confirm('Are you sure you want to delete this task?')) {
            row.remove();
            saveToLocalStorage();
        }
// Edit btn
// check if edit button is clicked
    } else if (e.target.classList.contains('editBtn')) {

        const row = e.target.closest('tr');
        const taskCell = row.children[1]; // task text
        const currentText = taskCell.textContent.trim();

        const newText = prompt('Enter the new task:', currentText);

        if (newText !== null && newText.trim() !== '') {
            taskCell.textContent = newText;
            saveToLocalStorage();
        }
    }
});