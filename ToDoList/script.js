const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value;
    if (taskText !== '') {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="task-item">${taskText}</span>
            <div class="task-actions">
                <button class="complete-button">Complete</button>
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            </div>
        `;

        taskList.appendChild(listItem);
        taskInput.value = '';
    }
});

taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('complete-button')) {
        const listItem = event.target.parentElement.parentElement;
        const completeButton = listItem.querySelector('.complete-button');

        if (listItem.classList.contains('completed')) {
            listItem.classList.remove('completed');
            completeButton.textContent = "Complete";
        } else {
            listItem.classList.add('completed');
            completeButton.textContent = "Incomplete";
        }
    } else if (event.target.classList.contains('edit-button')) {
        const listItem = event.target.parentElement.parentElement;
        const taskItem = listItem.querySelector('.task-item');
        const newText = prompt('Edit the task:', taskItem.textContent);
        if (newText !== null) {
            taskItem.textContent = newText;
        }
    } else if (event.target.classList.contains('delete-button')) {
        const listItem = event.target.parentElement.parentElement;
        taskList.removeChild(listItem);
    }
});