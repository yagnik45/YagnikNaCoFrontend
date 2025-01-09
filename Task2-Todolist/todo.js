const todoList = document.getElementById('todoList');
const completeList = document.getElementById('completeList');
const moveToRight = document.getElementById('moveToRight');
const moveToLeft = document.getElementById('moveToLeft');
const newItemInput = document.getElementById('newItem');
const addItemButton = document.getElementById('addItem');
const removeItemButton = document.getElementById('removeItem');

// Save the current state of lists to localStorage
function saveLists() {
    const todoItems = Array.from(todoList.options).map(option => option.textContent);
    const completeItems = Array.from(completeList.options).map(option => option.textContent);

    localStorage.setItem('todoList', JSON.stringify(todoItems));
    localStorage.setItem('completeList', JSON.stringify(completeItems));
}

// Load the lists from localStorage
// Load the lists from localStorage
function loadLists() {
    const todoItems = JSON.parse(localStorage.getItem('todoList')) || [];
    const completeItems = JSON.parse(localStorage.getItem('completeList')) || [];

    // Clear current list content before loading
    todoList.innerHTML = '';
    completeList.innerHTML = '';

    // Repopulate the lists from localStorage
    todoItems.forEach(item => {
        const option = document.createElement('option');
        option.textContent = item;
        todoList.appendChild(option);
    });

    completeItems.forEach(item => {
        const option = document.createElement('option');
        option.textContent = item;
        completeList.appendChild(option);
    });
}

// Move items between lists
function moveItems(sourceList, targetList) {
    const selectedOptions = Array.from(sourceList.selectedOptions);
    selectedOptions.forEach(option => {
        option.selected = false; // Deselect before moving
        targetList.appendChild(option);
    });
    saveLists();
}

// Remove selected items from a list
function removeSelectedItems(list) {
    const selectedOptions = Array.from(list.selectedOptions);
    selectedOptions.forEach(option => option.remove());
    saveLists();
}

// Add a new item to the To-Do List
addItemButton.addEventListener('click', () => {
    const newItemValue = newItemInput.value.trim();

    if (!newItemValue) {
        alert('Please enter a valid item.');
        return;
    }

    // Prevent duplicates
    if (Array.from(todoList.options).some(option => option.textContent === newItemValue)) {
        alert('Item already exists in the To-Do List!');
        return;
    }

    const newOption = document.createElement('option');
    newOption.textContent = newItemValue;
    todoList.appendChild(newOption);
    newItemInput.value = '';
    saveLists();
});

// Remove selected items from both lists
removeItemButton.addEventListener('click', () => {
    removeSelectedItems(todoList);
    removeSelectedItems(completeList);
});

// Move selected items to the Complete List
moveToRight.addEventListener('click', () => {
    moveItems(todoList, completeList);
});

// Move selected items back to the To-Do List
moveToLeft.addEventListener('click', () => {
    moveItems(completeList, todoList);
});

// Toggle selection on click without interfering with move operations
[todoList, completeList].forEach(list => {
    list.addEventListener('click', event => {
        const option = event.target;
        if (!event.shiftKey && !event.ctrlKey) {
            // Toggle only if Shift/Ctrl are not pressed
            option.selected = !option.selected;
        }
    });
});

// Load the lists on page load
window.addEventListener('DOMContentLoaded', loadLists);
