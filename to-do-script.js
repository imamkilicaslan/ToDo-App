'use strict';
// variables
const d = document,
  ul = d.getElementById("Tasks-container"),
  addTaskBtn = d.getElementById("AddTaskBtn"),
  allTasksBtn = d.getElementById("AllTasks"),
  completedTasksBtn = d.getElementById("CompletedTasks"),
  noCompletedTasksBtn = d.getElementById("NoCompletedTasks"),
  inputText = d.getElementById("InputText");

var isEdit = false;
var checkedState=false;
var editId;
var filterState = "AllTasks";
var count=0;
let taskList = [];

displayTasks();

function displayTasks() {
  ul.innerHTML = "";
  let checked;
  if(filterState=="AllTasks"){

    for (let task of taskList) {
      checked= task.state=="completed"?"checked":"";
      var li = `<article class="col-2 task">  <li >
      <input ${checked}  onclick="checkboxChecked(this)" class="inputCheckbox" type="checkbox" id="${task.id}" /> <label class="${task.style}" for="${task.id}"> ${task.taskName}</label></li> <section>
      <span onclick='editTaskBtn(${task.id},"${task.taskName}")' class="material-symbols-outlined">
      edit_note
      </span>
      <span onclick="deleteTaskBtn(${task.id})" class=" material-symbols-outlined">
      delete
      </span>
      </section>
      </article>`;
      ul.insertAdjacentHTML('beforeend', li);
    }
  }
  if(filterState=="CompletedTasks"){
    for (let task of taskList) {
      if (task.state=="completed") {
        // task.id  tasklist object id-no    
        var li = `<article class="col-2 task">  <li >
        <input checked onclick="checkboxChecked(this)" class="inputCheckbox" type="checkbox" id="${task.id}" /> <label class="${task.style}" for="${task.id}">${task.taskName}</label></li> <section>
        <span onclick='editTaskBtn(${task.id},"${task.taskName}")' class="material-symbols-outlined">
        edit_note
        </span>
        <span onclick="deleteTaskBtn(${task.id})" class=" material-symbols-outlined">
        delete
        </span>
        </section>
        </article>`;
        ul.insertAdjacentHTML('beforeend', li);
      }
    } 
  } 
  if(filterState=="NoCompletedTasks"){
    for (let task of taskList) {
      if (task.state=="noCompleted") {
        var li = `<article class="col-2 task">  <li >
        <input ${checked}  onclick="checkboxChecked(this)" class="inputCheckbox" type="checkbox" id="${task.id}" /> <label class="${task.style}" for="${task.id}">${task.taskName}</label></li> <section>
        <span onclick='editTaskBtn(${task.id},"${task.taskName}")' class="material-symbols-outlined">
        edit_note
        </span>
        <span onclick="deleteTaskBtn(${task.id})" class=" material-symbols-outlined">
        delete
        </span>
        </section>
        </article>`;
        ul.insertAdjacentHTML('beforeend', li);
      } 
    }
  }  
}
//eventlisteners
addTaskBtn.addEventListener('click', newTask);
inputText.addEventListener('keypress', enterControl);
allTasksBtn.addEventListener('click', allTasks);
completedTasksBtn.addEventListener('click', completedTasks);
noCompletedTasksBtn.addEventListener('click', noCompletedTasks);

function enterControl(event) {
  if (event.key == "Enter") {
    addTaskBtn.click();
  }
}
function newTask() {
  filterState="AllTasks";
  if (isEdit == false) {//addtask done
    if (inputText.value != "" && inputText.value != " ") {
      taskList.push({ "id":count, "taskName": inputText.value, "state": "noCompleted","style":"none" })
    }
    else {
      alert("Boş görev girdiniz!");
    }
    inputText.focus();
  }
  else {//edit& before enter event  done
    for (let task of taskList) {
      if (task.id == editId) {
        task.taskName = inputText.value;
      }
    }
    isEdit = false;
  }
  inputText.value = "";
  displayTasks();
  count++;
}
function deleteTaskBtn(id) {
  for (const indexNo in taskList) {
    if (taskList[indexNo].id == id) {
      taskList.splice(indexNo, 1);
    }
  }
  displayTasks();
}
function editTaskBtn(id, taskName) {
  isEdit = true;
  for (let task of taskList) {
    if (task.id == id) {
      inputText.value = taskName;
      editId = id;
    }
  }
  inputText.focus();
}

function deleteAllTasksBtn() {
  taskList = [];
  displayTasks();
}

function checkboxChecked(element){
  if(element.checked){
    checkedState=true;
    for (let task of taskList) {
      if (element.id==task.id) {
        task.state="completed";
        task.style="lineThrough";
      }
    }
  }
  else{
    checkedState=false;
    for (let task of taskList) {
      if (element.id==task.id) {
        task.state="noCompleted";
        task.style="none";
      }
    }
  }
  displayTasks();//olmak zorunda
}

//filters event functions
function allTasks() {
  filterState="AllTasks";
  displayTasks();
}
function completedTasks() {
  filterState="CompletedTasks";
  displayTasks();
}
function noCompletedTasks() {
  filterState="NoCompletedTasks";
  displayTasks();
}


