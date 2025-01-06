const todoList = document.getElementById('todoList');
const completeList = document.getElementById('completeList');
const moveToRight = document.getElementById('moveToRight');
const moveToLeft = document.getElementById('moveToLeft');
const newItemInput = document.getElementById('newItem');
const addItemButton = document.getElementById('addItem');
const removeItemButton = document.getElementById('removeItem');

function moveItems(sourceList, targetList) {
    const selectedOptions = Array.from(sourceList.selectedOptions);
    selectedOptions.forEach(option => {
        option.selected = false; // Deselect before moving
        targetList.appendChild(option);
    });
}

function removeSelectedItems(list) {
    const selectedOptions = Array.from(list.selectedOptions);
    selectedOptions.forEach(option => option.remove());
}

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
});

removeItemButton.addEventListener('click', () => {
    removeSelectedItems(todoList);
    removeSelectedItems(completeList);
});

moveToRight.addEventListener('click', () => {
    moveItems(todoList, completeList);
});

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
