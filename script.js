let input = document.querySelector('.inputbox input');
let tasksBox = document.querySelector('.tasksbox');
let clearBtn = document.querySelector('.clear');
let enterBtn = document.querySelector('.entericon');
let dateInput = document.querySelector('.dateinput');
let allCounter = document.querySelector('.num1');
let pendingCounter = document.querySelector('.num2');
let completedCounter = document.querySelector('.num3');
var click = document.getElementById("clicksound");
let tasksArray = [];

function clicksound() {
    click.play();
}

if (localStorage.getItem('tasks')) {
  
  tasksArray.push(...JSON.parse(localStorage.getItem('tasks')));
  
  showingData();
  
  tasksCounter();
};

enterBtn.addEventListener('click', () => {
  
  if (input.value && dateInput.value) {
    
    tasksArray.push({ id: new Date().getTime(), value: input.value, date: dateInput.value, pend: 'yes' });
    
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
    
    showingData();
    
    input.value = '';
    
    dateInput.value = '';
  };
  
  tasksCounter();
});

input.addEventListener('keyup', (key) => {
  
  if (key.key == 'Enter') {
    
    if (input.value && dateInput.value) {
      
      tasksArray.push({ id: new Date(), value: input.value, date: dateInput.value, pend: 'yes' });
      
      localStorage.setItem('tasks', JSON.stringify(tasksArray));
      
      showingData();
      
      input.value = '';
      
      dateInput.value = '';
    };
  };
  tasksCounter();
});

function showingData() {
  tasksBox.innerHTML = '';
  tasksArray.sort((task1, task2) => {
    if (task1.date > task2.date) return 1;
    else if (task2.date > task1.date) return -1;
    else return 0;
  });
  tasksArray.forEach((task) => {
      
    tasksBox.innerHTML += `
    <div class="task" task-id="${task.id}">
      <label for="${task.id}">
        <input type="checkbox" onclick="updateStatue(this)" class="check" id="${task.id}" ${task.pend == 'no' ? 'checked' : ''}>
        <span class="text">${task.value}</span>
        <div class="date">${task.date}</div>
      </label>
      <i class="uil uil-trash-alt del" onclick="deleteTask(this)"></i>
    </div>`;
  });
  document.querySelector('.filters span.active').classList.remove('active');
  document.querySelector('.all').classList.add('active');
};

function updateStatue(task) {
  
  for (let i = 0; i < tasksArray.length; i++) {
    if (tasksArray[i].id == task.parentElement.parentElement.getAttribute('task-id')) {
      tasksArray[i].pend == 'yes' ? tasksArray[i].pend = 'no' : tasksArray[i].pend = 'yes';
    };
    
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
  };
  
  tasksCounter();
};

function deleteTask(taskDel) {
  tasksArray = tasksArray.filter((task) => {
    return task.id != taskDel.parentElement.getAttribute('task-id');
  });
  taskDel.parentElement.remove();
  
  localStorage.setItem('tasks', JSON.stringify(tasksArray));
  
  tasksCounter();
};

clearBtn.addEventListener('click', () => {
  tasksArray = [];
  localStorage.removeItem('tasks');
  showingData();
  tasksCounter();
});


let pendingTasks = [];
let completedTasks = [];

function filter(filterArray, elementAddClass, statue) {
  document.querySelector('.filters span.active').classList.remove('active');

  elementAddClass.classList.add('active');

  filterArray = tasksArray.filter((task) => {
    return task.pend == statue;
  });
  tasksBox.innerHTML = '';
  
  filterArray.forEach((task) => {
    tasksBox.innerHTML += `
          <div class="task" task-id="${task.id}">
            <label for="${task.id}">
              <input type="checkbox" onclick="updateStatue(this)" class="check" id="${task.id}" ${task.pend == 'no' ? 'checked' : ''}>
              <span class="text">${task.value}</span>
              <div class="date">${task.date}</div>
            </label>
            <i class="uil uil-trash-alt del" onclick="deleteTask(this)"></i>
          </div>`;
  });
};

function tasksCounter() {
  let pendCounterArray = tasksArray.filter((task) => {
    return task.pend == 'yes';
  });
  let compCounterArray = tasksArray.filter((task) => {
    return task.pend != 'yes';
  });
  allCounter.innerHTML = tasksArray.length;
  pendingCounter.innerHTML = pendCounterArray.length;
  completedCounter.innerHTML = compCounterArray.length; 
  if (allCounter.innerHTML == 0) {
    allCounter.parentElement.style.color = '#D50808';
    allCounter.style.color = '#D50808';
  } else {
    allCounter.parentElement.style.color = 'green';
    allCounter.style.color = '#9000E4';
  };
  if (pendingCounter.innerHTML == 0) {
    pendingCounter.parentElement.style.color = '#D50808';
    pendingCounter.style.color = '#D50808';
  } else {
    pendingCounter.parentElement.style.color = 'green';
    pendingCounter.style.color = '#9000E4';
  };
  if (completedCounter.innerHTML == 0) {
    completedCounter.parentElement.style.color = '#D50808';
    completedCounter.style.color = '#D50808';
  } else {
    completedCounter.parentElement.style.color = 'red';
    completedCounter.style.color = 'red';
  };
};