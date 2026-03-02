// key listener for popup
const targetWord = "valentine"; // Change this to the word you want to detect
let typedWord = "";

const popup = document.getElementById('popup'); // Get the popup element
const popupText = document.getElementById('popup-text'); // Get the text inside the popup
const closeBtn = document.getElementById('close-btn'); // Get the close button
const imgElement = document.getElementById('popup-image');

// Event listener to close the popup when the close button is clicked
closeBtn.addEventListener('click', () => {
    popup.style.display = "none"; // Hide the popup when close button is clicked
});

document.addEventListener("keydown", (event) => {
    if (event.key.length === 1) { // Only consider printable characters
        typedWord += event.key;

        // Check if the typed sequence matches the target word
        if (typedWord === targetWord) {
            popup.style.display = "block"; // Show the popup

            const audio = new Audio("assets/audio/DWAS.mp3"); // Update path to relative
            audio.volume = 0.2;
            audio.play();
            
            setTimeout(() => {
                console.log("Changing image to flower.png"); // Debug message
                imgElement.src = "assets/img/valentine/flower.png"; // Change image source
            }, 4000); // delay, 1000 = 1 sec

            typedWord = ""; // Reset typed word
        } else if (!targetWord.startsWith(typedWord)) {
            typedWord = ""; // Reset if a wrong sequence is typed
        }
    }
});

// typewriter
window.onload = function() {
    const text = "Would you like to be my valentine?";
    const popupTextElement = document.getElementById("popup-text");
    let i = 0;

    // Function to simulate typing
    function typeWriter() {
        if (i < text.length) {
            popupTextElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100); // Adjust typing speed here
        }
    }
    typeWriter(); // Start the typing effect
};