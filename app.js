// Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners(){

  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTask);

  // Add-Task event
  form.addEventListener('submit', addTask);

  // Remove-task event
  taskList.addEventListener('click', removeTask);

  // Clear-Task event
  clearBtn.addEventListener('click', clearTask);

  // Filter-task event
  filter.addEventListener('keyup', filterTasks);
};


// Get tasks from LS
function getTask(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create TextNode
    li.appendChild(document.createTextNode(task));
  
    // Create New Link Element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    // Add link to li
    li.appendChild(link);
  
    // Append li to ul
    taskList.appendChild(li);

  })
}


// AddTask
function addTask(e){

  if(taskInput.value === ''){
    alert('Add a Task');
  } 
  else{  
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create TextNode
    li.appendChild(document.createTextNode(taskInput.value));
  
    // Create New Link Element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    // Add link to li
    li.appendChild(link);
  
    // Append li to ul
    taskList.appendChild(li);

    // Store in LS
    storeTaskInLocalStorage(taskInput.value);
  
    // Clear Input 
    taskInput.value = '';
  }
  e.preventDefault();
}

// Store task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task); 
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Remove Task
function removeTask(e){ 
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are You Sure')){
      e.target.parentElement.parentElement.remove();
      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}


// Remove from LS
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  
  tasks.forEach(function(task, index){
    if(taskItem.firstChild.textContent === task){

      // tasks = tasks.filter(function(toBeRemoved){
      //   return toBeRemoved != task;
      // })

      tasks.splice(index, 1);

    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Clear task
function clearTask(e){
  if(confirm('Clear All Tasks?')){
    
    while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
    }
  }
  
  clearTasksFromLocalStorage()

  e.preventDefault();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage(){

  localStorage.clear();
  
  // let tasks = JSON.parse(localStorage.getItem('tasks'));
  //   tasks = [];
  //   localStorage.setItem('tasks', JSON.stringify(tasks));
}



// Filter Tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;

    if(item.toLocaleLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    }
    else{
      task.style.display = 'none';
    }
  });
}