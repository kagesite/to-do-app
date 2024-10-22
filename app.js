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

    // displaySubTasks(mainIndex);
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



// localStorage.clear()