// Create variable to hold all the Main Lists in 
let mainLists = JSON.parse(localStorage.getItem('mainLists')) || [];
let selectedListIndex = null;

// Create a function to save data to localStorage
function saveToLocalStorage() {
    localStorage.setItem('mainLists', JSON.stringify(mainLists));
}

// START OF MAIN LIST FUNCTIONS

// Create a function to add list to mainLists;
// addMainList() creates a newList object that takes a name, and a subTasks array.
// The name Key will hold the mainListName which is the #mainListInput.value;
// The subTasks Key will take an empty array as the value for now. 
// (addSubTasks() function will push a name & completed Key to this array for each taskItem).

function addMainList() {
    const mainListName = document.getElementById('mainListInput').value;

    if (mainListName) {
        const newList = {
            name: mainListName,
            subTasks: []
        }

        mainLists.push(newList)
        document.getElementById('mainListInput').value = '';
        saveToLocalStorage();
        displayMainLists();
    } else {
        alert("You need to add a list");
    }
}

// displayMainLists() function dispalys the mainList items to the window.
function displayMainLists() {
    const mainListElement = document.getElementById('mainLists');
    mainListElement.innerHTML = '';

    mainLists.forEach((mainList, mainIndex) => {
        const mainListItem = document.createElement('li')
        mainListItem.classList.add('main-list-item');
        mainListItem.onclick = () => {
            selectedListIndex = mainIndex;
            showSubTasksContainer(mainIndex)
        }
        
        const mainListName = document.createElement('span');
        mainListName.textContent = mainList.name;


        const deleteButton = document.createElement('i');
        deleteButton.classList.add('fa-regular', 'fa-trash-can')
        deleteButton.onclick = () => deleteMainList(mainIndex);

        mainListItem.appendChild(mainListName);
        mainListItem.appendChild(deleteButton);
        mainListElement.appendChild(mainListItem);
    })
}

// This function deletes a mainList and updates both the localStorage & the display
function deleteMainList(mainIndex) {
    if (confirm(`Are you sure you want to delete '${mainLists[mainIndex].name}' ?`)) {
        mainLists.splice(mainIndex, 1);
        if (mainIndex === selectedListIndex) {
            selectedListIndex = null;
        }
        saveToLocalStorage();
        displayMainLists();
    }
}


// END OF MAIN LIST FUNCTIONS




// START OF SUB TASK FUNCTIONS
function showSubTasksContainer(mainIndex) {
    const taskContainerElement = document.getElementById('taskContainer');
    taskContainerElement.classList.remove('hidden');

    const selectedListName = document.getElementById("selectedListName");
    selectedListName.textContent = mainLists[mainIndex].name;

    displaySubTasks(mainIndex);
}

// Create a function to add the subtasks
function addSubTask() {
    const subTaskInput = document.getElementById("subTaskInput").value;

    if (subTaskInput) {
        mainLists[selectedListIndex].subTasks.push({
            name: subTaskInput,
            completed: false
        })

        document.getElementById("subTaskInput").value = '';
        saveToLocalStorage();
        displaySubTasks(selectedListIndex);
    }
}

// Create a function to toggle the completion of a sub task
function toggleTaskCompletion(mainIndex, taskIndex) {
    mainLists[mainIndex].subTasks[taskIndex].completed = 
        !mainLists[mainIndex].subTasks[taskIndex].completed;

    saveToLocalStorage();
    displaySubTasks(mainIndex);
}

// Create a function to display the subTasks to the subTask List
function displaySubTasks(mainIndex) {
    const subTaskListElement = document.getElementById("subTaskList");
    subTaskListElement.innerHTML = '';

    mainLists[mainIndex].subTasks.forEach((subTask, taskIndex) => {
        const subTaskItem = document.createElement('li');
        subTaskItem.classList.add('sub-list-item');

        const checkbox = document.createElement('i');
        checkbox.innerHTML = '<i id="checkbox" class="fa-regular fa-circle-check"></i>';
        checkbox.onclick = () => {
            toggleTaskCompletion(mainIndex, taskIndex)
            checkbox.classList.add('completed')
        };

        const taskName = document.createElement('span');
        taskName.textContent = subTask.name;

        const deleteButton = document.createElement('i');
        deleteButton.classList.add('fa-regular', 'fa-trash-can')
        deleteButton.onclick = () => deleteSubTask(mainIndex);

        subTaskItem.appendChild(checkbox)
        subTaskItem.appendChild(taskName)
        subTaskItem.appendChild(deleteButton)
        subTaskListElement.appendChild(subTaskItem);
    })
}

// Create a function to delete a sub task
function deleteSubTask(mainIndex, taskIndex) {
    mainLists[mainIndex].subTasks.splice(taskIndex, 1)

    saveToLocalStorage();
    displaySubTasks(mainIndex);
}

displayMainLists();
// localStorage.clear()