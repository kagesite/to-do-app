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
        // displayMainLists();
    }
}

// localStorage.clear();