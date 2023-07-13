document.getElementById('task-form').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent form submission
  var taskInput = document.getElementById('task-input');
  var taskDescription = taskInput.value.trim();

  if (taskDescription !== '') {
    addTask(taskDescription);
    taskInput.value = ''; // Clear input field
  }
});

function addTask(description) {
  var task = createTaskElement(description);
  var pendingTasks = document.getElementById('pending-tasks');
  pendingTasks.querySelector('tbody').appendChild(task);
}

function createTaskElement(description) {
  var row = document.createElement('tr');

  var descriptionCell = document.createElement('td');
  descriptionCell.innerText = description;
  row.appendChild(descriptionCell);

  var actionsCell = document.createElement('td');
  var completeButton = document.createElement('button');
  completeButton.innerText = 'Complete';
  completeButton.addEventListener('click', function() {
    moveTask(row, 'completed-tasks');
  });
  actionsCell.appendChild(completeButton);

  var editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  editButton.addEventListener('click', function() {
    editTask(row, descriptionCell);
  });
  actionsCell.appendChild(editButton);

  var deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.addEventListener('click', function() {
    row.remove();
  });
  actionsCell.appendChild(deleteButton);

  row.appendChild(actionsCell);

  return row;
}

function moveTask(task, destinationId) {
  var destination = document.getElementById(destinationId);
  destination.querySelector('tbody').appendChild(task);
  task.lastChild.innerHTML = '<button>Delete</button>';
  task.classList.add('completed');
}

function editTask(row, descriptionCell) {
  var description = descriptionCell.innerText;
  var newDescription = prompt('Enter new task description:', description);
  if (newDescription !== null) {
    descriptionCell.innerText = newDescription;
  }
}

