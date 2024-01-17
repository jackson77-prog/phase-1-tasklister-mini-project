document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("create-task-form");
  const taskList = document.getElementById("tasks");

  form.addEventListener("submit", function(event) {
    event.preventDefault(); 
   
    const taskInput = document.getElementById("new-task-description");
    const prioritySelect = document.getElementById("priority");
    const userInput = document.getElementById("user");
    const durationInput = document.getElementById("duration");
    const dateDueInput = document.getElementById("date-due");

    const taskDescription = taskInput.value;
    const priorityValue = prioritySelect.value;
    const userValue = userInput.value;
    const durationValue = durationInput.value;
    const dateDueValue = dateDueInput.value;

    const listItem = document.createElement("li");

    listItem.textContent = `Task: ${taskDescription}, Priority: ${priorityValue}, User: ${userValue}, Duration: ${durationValue}, Due Date: ${dateDueValue}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function() {
      listItem.remove();
    });

    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);

    // Clear the input fields
    taskInput.value = "";
    prioritySelect.value = "low";
    userInput.value = "";
    durationInput.value = "";
    dateDueInput.value = "";
  });

  // Implement sorting based on priority
  const sortButton = document.getElementById("sort-button");
  sortButton.addEventListener("click", function() {
    const tasks = Array.from(taskList.children);
    const sortedTasks = tasks.sort((a, b) => {
      const priorityA = a.textContent.split(", Priority: ")[1].trim();
      const priorityB = b.textContent.split(", Priority: ")[1].trim();
      return priorityA.localeCompare(priorityB);
    });

    taskList.innerHTML = ""; // Clear the current task list

    sortedTasks.forEach(task => {
      taskList.appendChild(task);
    });
  });

  // Implement task editing
  taskList.addEventListener("dblclick", function(event) {
    if (event.target.tagName === "LI") {
      const taskText = event.target.textContent.split(",");
      const taskDescription = taskText[0].split(":")[1].trim();
      const priorityValue = taskText[1].split(":")[1].trim();
      const userValue = taskText[2].split(":")[1].trim();
      const durationValue = taskText[3].split(":")[1].trim();
      const dateDueValue = taskText[4].split(":")[1].trim();

      
      taskInput.value = taskDescription;
      prioritySelect.value = priorityValue;
      userInput.value = userValue;
      durationInput.value = durationValue;
      dateDueInput.value = dateDueValue;

      
      event.target.remove();
    }
  });
});
