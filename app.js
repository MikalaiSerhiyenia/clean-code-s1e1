//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput = document.getElementById("new-task");
var addButton = document.querySelector(".button--add");
var incompleteTaskHolder = document.querySelector(".task-list--todo");
var completedTasksHolder = document.querySelector(".task-list--completed");

//New task list item

var createNewTaskElement = function(taskString) {
  var listItem = document.createElement("li");
  listItem.className = "task-item";

  var checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.className = "task-item__checkbox";

  var label = document.createElement("label");
  label.className = "task-item__label";
  label.innerText = taskString;

  var editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "task-item__input";

  var editButton = document.createElement("button");
  editButton.className = "button button--edit";
  editButton.innerText = "Edit";

  var deleteButton = document.createElement("button");
  deleteButton.className = "button button--delete";

  var deleteButtonImg = document.createElement("img");
  deleteButtonImg.className = "button__icon";
  deleteButtonImg.src = "./remove.svg";

  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

//Add a new task.

var addTask = function() {
  if (!taskInput.value.trim()) return;
  var listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
};

//Edit an existing task.

var editTask = function() {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector(".task-item__input");
  var label = listItem.querySelector(".task-item__label");
  var editButton = listItem.querySelector(".button--edit");
  var isEditMode = listItem.classList.contains("task-item--edit-mode");

  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  listItem.classList.toggle("task-item--edit-mode");
};

//Delete task.

var deleteTask = function() {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
};

//Mark task completed.

var taskCompleted = function() {
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

//Mark task as incomplete.

var taskIncomplete = function() {
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

//Bind tasks

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  var checkBox = taskListItem.querySelector(".task-item__checkbox");
  var editButton = taskListItem.querySelector(".button--edit");
  var deleteButton = taskListItem.querySelector(".button--delete");

  if (!checkBox || !editButton || !deleteButton) {
    console.error("Missing elements in task item:", taskListItem);
    return;
  }

  checkBox.onchange = checkBoxEventHandler;
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
};

//Set the click handler to the addTask function.

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);

//Binding event handlers to task elements

Array.from(incompleteTaskHolder?.children || []).forEach(function(task) {
  bindTaskEvents(task, taskCompleted);
});

Array.from(completedTasksHolder?.children || []).forEach(function(task) {
  bindTaskEvents(task, taskIncomplete);
});

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.