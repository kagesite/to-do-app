// Create variable to hold all the Main Lists in 
let mainLists = JSON.parse(localStorage.getItem('mainLists')) || [];
let selectedListIndex = null;

// Create a function to save data to localStorage
function saveToLocalStorage() {
    localStorage.setItem('mainLists', JSON.stringify(mainLists));
}

// START OF MAIN LIST FUNCTIONS

// Create a function to add list to mainLists;
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
    }
}

// Create a function to display the main list(s)
function displayMainLists() {
    const mainListElement = document.getElementById('mainLists');
    mainListElement.innerHTML = '';

    mainLists.forEach((mainList, mainIndex) => {
        const mainListItem = document.createElement('li');
        
        const mainListName = document.createElement('span');
        mainListName.textContent = mainList.name;
        mainListName.onclick = () => {
            selectedListIndex = mainIndex;
            showSubTasksContainer(mainIndex)
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteMainList(mainIndex);

        mainListItem.appendChild(mainListName);
        mainListItem.appendChild(deleteButton);
        mainListElement.appendChild(mainListItem);
    })
}

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

// Create a function to display the subTasks to the subTask List
function displaySubTasks(mainIndex) {
    const subTaskListElement = document.getElementById("subTaskList");
    subTaskListElement.innerHTML = '';

    mainLists[mainIndex].subTasks.forEach((subTask, taskIndex) => {
        const subTaskItem = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = subTask.completed;
        checkbox.onclick = () => toggleTaskCompletion(mainIndex, taskIndex);

        const taskName = document.createElement('span');
        taskName.textContent = subTask.name;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteSubTask(mainIndex, taskIndex)

        subTaskItem.appendChild(checkbox)
        subTaskItem.appendChild(taskName)
        subTaskItem.appendChild(deleteButton)
        subTaskListElement.appendChild(subTaskItem);
    })
}

// Create a function to toggle the completion of a sub task
function toggleTaskCompletion(mainIndex, taskIndex) {
    mainLists[mainIndex].subTasks[taskIndex].completed = 
        !mainLists[mainIndex].subTasks[taskIndex].completed;

    saveToLocalStorage()
    displaySubTasks(mainIndex);
}

// Create a function to delete a sub task
function deleteSubTask(mainIndex, taskIndex) {
    mainLists[mainIndex].subTasks.splice(taskIndex, 1)

    saveToLocalStorage();
    displaySubTasks(mainIndex);
}



// localStorage.clear()