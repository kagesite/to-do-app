const mainList = [];
const selectedListIndex = null;

const createNewListBtn = document.getElementById("createNewListBtn");

function createMainListItem() {
    const mainListName = document.getElementById("mainListsInput").value;
    const mainList = document.getElementById('mainList');
    const mainListItem = document.createElement('li');

    mainListItem.textContent = mainListName;
    mainListItem.classList.add('main-list-item');
    mainList.appendChild(mainListItem)


    console.log(mainListName);
    document.getElementById("mainListsInput").value = '';
}


createNewListBtn.addEventListener('click', createMainListItem);