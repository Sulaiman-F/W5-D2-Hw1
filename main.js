const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task-button");
const taskList = document.getElementById("task-list-items");
const deleteAll = document.getElementById("delete-all");

document.addEventListener("DOMContentLoaded", read());
function read() {
    fetch('https://68219a00259dad2655afc151.mockapi.io/Post')
        .then(response => response.json())
        .then(data => {
            data.forEach(curr => {
                const li = document.createElement("li");
                li.innerText = `${curr.task[0].toUpperCase()}${curr.task.slice(1)}`;
                li.id = curr.id; // Set the id attribute to the task's id
                taskList.appendChild(li);
                const btns = document.createElement("div");
                btns.classList.add("btns");
                li.appendChild(btns);
                const checkButton = document.createElement("button");
                checkButton.classList.add("check-task");
                const i = document.createElement("i");
                i.classList.add("fa-solid", "fa-minus", "fa-xl");
                checkButton.appendChild(i);
                btns.appendChild(checkButton);
                const editTask = document.createElement("button");
                editTask.classList.add("edit-task");
                const i1 = document.createElement("i");
                i1.classList.add("fa-solid", "fa-pen-to-square");
                editTask.appendChild(i1);
                btns.appendChild(editTask);
                const deleteButton = document.createElement("button");
                deleteButton.classList.add("delete-task");
                const i2 = document.createElement("i");
                i2.classList.add("fa-solid", "fa-xmark", "fa-xl");
                deleteButton.appendChild(i2);
                btns.appendChild(deleteButton);
                checkButton.addEventListener("click", () => {
                    if (li.classList.contains("mins")) {
                        li.classList.remove("mins");
                    } else {
                        li.classList.add("mins");
                    }
                });
                deleteButton.addEventListener("click", () => {
                    if (!confirm("Are you sure you want to delete this task?")) {
                        return;
                    }
                    fetch(`https://68219a00259dad2655afc151.mockapi.io/Post/${curr.id}`, {
                        method: 'DELETE',
                    })
                        .then(() => {
                            li.remove();
                        })
                        .catch(error => console.error('Error deleting task:', error));
                });
                editTask.addEventListener("click", () => {
                    let text = prompt("Edit your task", li.innerText);
                    if (text === null || text === "") {
                        return;
                    }
                    fetch(`https://68219a00259dad2655afc151.mockapi.io/Post/${curr.id}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            task: text,
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    })
                        .then(response => response.json())
                        .then(updatedTask => {
                            li.innerText = `${updatedTask.task[0].toUpperCase()}${updatedTask.task.slice(1)}`;
                            li.appendChild(btns); // Re-append the buttons to ensure they remain visible
                        })
                        .catch(error => console.error('Error updating task:', error));
                });
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));
}
function addTask() {
    if (taskInput.value === "") {
        alert("Please enter a task.");
        return;
    }

    fetch('https://68219a00259dad2655afc151.mockapi.io/Post', {
        method: 'POST',
        body: JSON.stringify({
            task: taskInput.value,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(response => response.json())
        .then(newTask => {
            const li = document.createElement("li");
            li.innerText = `${newTask.task[0].toUpperCase()}${newTask.task.slice(1)}`;
            li.id = newTask.id; // Set the id attribute to the task's id
            taskList.appendChild(li);
            const btns = document.createElement("div");
            btns.classList.add("btns");
            li.appendChild(btns);
            const checkButton = document.createElement("button");
            checkButton.classList.add("check-task");
            const i = document.createElement("i");
            i.classList.add("fa-solid", "fa-minus", "fa-xl");
            checkButton.appendChild(i);
            btns.appendChild(checkButton);
            const editTask = document.createElement("button");
            editTask.classList.add("edit-task");
            const i1 = document.createElement("i");
            i1.classList.add("fa-solid", "fa-pen-to-square");
            editTask.appendChild(i1);
            btns.appendChild(editTask);
            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete-task");
            const i2 = document.createElement("i");
            i2.classList.add("fa-solid", "fa-xmark", "fa-xl");
            deleteButton.appendChild(i2);
            btns.appendChild(deleteButton);
            checkButton.addEventListener("click", () => {
                if (li.classList.contains("mins")) {
                    li.classList.remove("mins");
                } else {
                    li.classList.add("mins");
                }
            });
            deleteButton.addEventListener("click", () => {
                if (!confirm("Are you sure you want to delete this task?")) {
                    return;
                }
                fetch(`https://68219a00259dad2655afc151.mockapi.io/Post/${newTask.id}`, {
                    method: 'DELETE',
                })
                    .then(() => {
                        li.remove();
                    })
                    .catch(error => console.error('Error deleting task:', error));
            });
            editTask.addEventListener("click", () => {
                let text = prompt("Edit your task", li.innerText);
                if (text === null || text === "") {
                    return;
                }
                fetch(`https://68219a00259dad2655afc151.mockapi.io/Post/${li.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        task: text,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .then(response => response.json())
                    .then(updatedTask => {
                        li.innerText = `${updatedTask.task[0].toUpperCase()}${updatedTask.task.slice(1)}`;
                    })
                    .catch(error => console.error('Error updating task:', error));
            });
            taskInput.value = "";

        })
        .catch(error => console.error('Error adding task:', error));
}



function toggleDeleteAllButton() {
    fetch('https://68219a00259dad2655afc151.mockapi.io/Post')
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                deleteAll.classList.add("hidden");
            } else {
                deleteAll.classList.remove("hidden");
            }
        })
        .catch(error => console.error('Error checking tasks:', error));
}

deleteAll.addEventListener("click", () => {
    if (!confirm("Are you sure you want to delete all tasks?")) {
        return;
    }
    fetch('https://68219a00259dad2655afc151.mockapi.io/Post')
        .then(response => response.json())
        .then(data => {
            data.forEach(task =>
                fetch(`https://68219a00259dad2655afc151.mockapi.io/Post/${task.id}`, {
                    method: 'DELETE',
                })
                    .then(() => {
                        location.reload();
                    })
                    .catch(error => console.error('Error deleting all tasks:', error)));
        })
        .catch(error => console.error('Error fetching tasks for deletion:', error));
    document.addEventListener("DOMContentLoaded", toggleDeleteAllButton);

});

document.addEventListener("DOMContentLoaded", toggleDeleteAllButton);
taskInput.addEventListener("input", toggleDeleteAllButton);