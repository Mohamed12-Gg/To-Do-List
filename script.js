// Initialize tasks array
let tasks = [];
// Load tasks from localStorage on page load
window.onload = function() {
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
    tasks = [];  // clear array from old data
}
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
document.getElementById('addBtn').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim(); 

    if (taskText === '') {
        alert('Please enter a task.');
        return; 
    }

    addTaskToDOM(taskText, false);
    saveToLocalStorage();
    taskInput.value = '';
});

// Function to add task to DOM
function addTaskToDOM(text, isDone) {
    const taskList = document.getElementById('taskList');
    const newRow = document.createElement('tr'); 

    newRow.innerHTML = `
        
        <td><input type="checkbox" class="done" ${isDone ? 'checked' : ''}></td>
        <td>${text}</td>
        <td><button class="deleteBtn">Delete</button></td>
        <td><button class="editBtn">Edit</button></td>
        
    `;

    taskList.appendChild(newRow);

    const checkbox = newRow.querySelector('.done');

    if (isDone) {
        newRow.style.textDecoration = 'line-through';
        newRow.style.opacity = '0.6';
    }

    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            checkbox.parentNode.parentNode.style.textDecoration = 'line-through';
            checkbox.parentNode.parentNode.style.opacity = '0.6';
        } else {
            checkbox.parentNode.parentNode.style.textDecoration = 'none';
            checkbox.parentNode.parentNode.style.opacity = '1';
        }
        saveToLocalStorage();
    });
}

// Delete and Edit button events using event delegation
document.getElementById('taskList').addEventListener('click', function(event) {
    if (event.target.classList.contains('deleteBtn')) {
        const row = event.target.parentNode.parentNode; 
        if (confirm('Are you sure you want to delete this task?')) {
            row.remove(); 
            saveToLocalStorage();
        }
    } else if (event.target.classList.contains('editBtn')) {
        const row = event.target.parentNode.parentNode; 
        const taskCell = row.children[1]; 
        const currentText = taskCell.textContent; 
        const newText = prompt('Enter the new task:', currentText); 
        if (newText !== null) {
            taskCell.textContent = newText; 
            saveToLocalStorage();
        }
    }
});
