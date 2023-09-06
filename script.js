const form = document.querySelector("#form");
const txtInput = document.querySelector("#textInput");
const container = document.querySelector("#container");
const main = document.querySelector("#main")

let todos = [];
let crossedOut = [];
let currentIndex = 0;

runEvents();

function runEvents() {
    form.addEventListener("submit", addTodo);
    container.addEventListener("click", removeToUI);
    document.addEventListener("DOMContentLoaded", pageLoaded);
}

function pageLoaded() {

    checkLocalStorage();
    todos.forEach(todo => {
        const styles = getStylesFromLocalStorage(todo);
        addTaskUI(todo, styles);
        // addTaskUI(todo)
    });
}

function findSameTodo() {
    let found = false;
    let inputValue = txtInput.value.trim();
    todos.forEach(todo => {
        if (todo === inputValue) {
            found = true;
        }
    });

    if (found) {
        return true;
    }
}

function addTodo(e) {
    let inputValue = txtInput.value.trim();
    if (findSameTodo()) {
        alert("Lütfen Aynı Değeri Girmeyin...");
    } else if (txtInput.value.trim() == "" || txtInput.value.trim() == null) {

        alert("Lütfen boş değer girmeyiniz");

    } else {
        addTaskUI(inputValue)
        addTodoToStorage(inputValue)
    }

    e.preventDefault();
}

function removeToUI(e) {
    if (e.target.classList.contains("fa-solid", "fa-xmark")) {
        let todo = e.target.parentElement.parentElement;
        todo.remove();

        removeTodoStorage(todo.textContent);
    }
}

function removeTodoStorage(removeTodo) {
    checkLocalStorage();
    todos.forEach((todo, index) => {
        if (removeTodo === todo) {
            console.log(todo, index)
            todos.splice(index, 1);
        }
    })

    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTaskUI(value, styles) {
    
    if (todos.length === 0) {
        let alertSucces = document.createElement("div");
        alertSucces.className = "alert alert-success";
        alertSucces.role = "alert";
        alertSucces.textContent = "Listenize başarıyla eklendi";
        container.appendChild(alertSucces);

        setTimeout(function () {
            alertSucces.style.display = "none";
        }, 3000);

        setTimeout(function () {
            alertSucces.classList.add("show");
        }, 100);
    }

    let taskDiv = document.createElement("div");
    let taskLabel = document.createElement("label");
    let taskRemove = document.createElement("div");
    let taskRemoveIcon = document.createElement("i");
    
    taskDiv.className = "tasks";
    taskRemove.className = "removeTask";
    taskRemoveIcon.className = "fa-solid fa-xmark";
    taskLabel.className = "taskLabels";

    container.appendChild(taskDiv);
    taskDiv.appendChild(taskRemove);
    taskDiv.appendChild(taskLabel);
    taskRemove.appendChild(taskRemoveIcon);
    taskLabel.textContent = value;

    if (styles) {
        taskLabel.style.textDecoration = styles.textDecoration;
    }

    checkLabels(taskLabel, taskDiv);
}


function checkLabels(label, task) {
    
    task.addEventListener("click", function () {
        checkboxClick(label)
    });
}

function checkboxClick(label) {
    

    if (label.style.textDecoration === "line-through") {
        label.style.textDecoration = "none";

    } else {
        label.style.textDecoration = "line-through";
    }

    const todo = label.textContent;
    const styles = {
        textDecoration: label.style.textDecoration,
    };
    saveStylesToLocalStorage(todo, styles);
}

function saveStylesToLocalStorage(todo, styles) {
    
    const key = `styles_${todo}`;
    localStorage.setItem(key, JSON.stringify(styles));
}


function getStylesFromLocalStorage(todo) {
    
    const key = `styles_${todo}`;
    const stylesJSON = localStorage.getItem(key);
    if (stylesJSON) {
        return JSON.parse(stylesJSON);
    }
    return null;
}


function addTodoToStorage(newTodo) {
    checkLocalStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function checkLocalStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}