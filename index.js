// Get a reference to the input field
const inputField = document.getElementById('textInput');

// Add an event listener to the input field
inputField.addEventListener('input', function() {
    // This function will be called when the user types in the input field
    const text = inputField.value;
    alert('You typed: ' + text);
});