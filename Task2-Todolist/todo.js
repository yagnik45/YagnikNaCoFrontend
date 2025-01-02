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
        targetList.appendChild(option);
    });
}

function removeSelectedItems(list) {
    const selectedOptions = Array.from(list.selectedOptions);
    selectedOptions.forEach(option => {
        option.remove();
    });
}

addItemButton.addEventListener('click', () => {
    const newItemValue = newItemInput.value.trim();
    if (newItemValue) {
        const newOption = document.createElement('option');
        newOption.textContent = newItemValue;
        todoList.appendChild(newOption);
        newItemInput.value = '';
    }
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
