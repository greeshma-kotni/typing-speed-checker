document.addEventListener("DOMContentLoaded", function () {
    const textToType = document.getElementById("text-to-type").innerText.trim();
    const userInput = document.getElementById("user-input");
    const startButton = document.getElementById("start-button");
    const typeAgainButton = document.getElementById("type-again-button");
    const result = document.getElementById("result");
    let startTime, endTime;

    userInput.disabled = true;

    startButton.addEventListener("click", function () {
        if (startButton.innerText === "Start") {
            userInput.value = "";
            userInput.disabled = false;
            userInput.focus();
            startButton.innerText = "Done";
            startTime = new Date();
        } else if (startButton.innerText === "Done") {
            userInput.disabled = true;
            endTime = new Date();
            const userText = userInput.value.trim();
            const words = userText.split(" ");
            const timeTaken = (endTime - startTime) / 1000; // in seconds
            const typedWords = words.length;
            const wpm = Math.round((typedWords / timeTaken) * 60);
            const accuracy = calculateAccuracy(textToType, userText);

            result.innerHTML = `Typing Speed: ${wpm} WPM<br>Accuracy: ${accuracy}%`;

            startButton.style.display = "none";
            typeAgainButton.style.display = "inline";
        }
    });

    typeAgainButton.addEventListener("click", function () {
        userInput.value = "";
        startButton.innerText = "Start";
        result.innerHTML = "";
        startButton.style.display = "inline";
        typeAgainButton.style.display = "none";
    });

    function calculateAccuracy(original, typed) {
        const originalWords = original.split(" ");
        const typedWords = typed.split(" ");
        let correctWords = 0;

        for (let i = 0; i < originalWords.length; i++) {
            if (originalWords[i] === typedWords[i]) {
                correctWords++;
            }
        }

        return ((correctWords / originalWords.length) * 100).toFixed(2);
    }
});
