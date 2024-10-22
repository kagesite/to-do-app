// Create variable to hold all the Main Lists in 
let mainLists = JSON.parse(localStorage.getItem('mainLists')) || [];
let selectedListIndex = null;

// Create a function to save data to localStorage
function saveToLocalStorage() {
    localStorage.setItem('mainLists', JSON.stringify(mainLists));
}

// localStorage.clear();