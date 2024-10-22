// Create variable to hold all the Main Lists in 
let mainLists = JSON.parse(localStorage.getItem('mainLists')) || [];
let selectedListIndex = null;

// Create a function to save data to localStorage
function saveToLocalStorage() {
    localStorage.setItem('mainLists', JSON.stringify(mainLists));
}

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
            // showSubTasksContainer(mainIndex)
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteMainList(mainIndex);

        mainListItem.appendChild(mainListName);
        mainListItem.appendChild(deleteButton);
        mainListElement.appendChild(mainListItem);
    })
}

// localStorage.clear();