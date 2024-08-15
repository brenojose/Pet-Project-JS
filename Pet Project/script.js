window.onload = function() {
    // Selecting necessary DOM elements
    var consoleElement = document.querySelector('.console');
    var startScreen = document.getElementById('start-screen');
    var petNameForm = document.getElementById('pet-name-form');
    var petNameInput = document.getElementById('pet-name');
    var petNameDisplay = document.querySelector('.name p');
    var instructions = document.querySelector('h2');
    var introduction = document.querySelector('.introduction');
    var happinessProgress = document.querySelector('.happiness-progress');
    var hungerProgress = document.querySelector('.hunger-progress');
    var sleepProgress = document.querySelector('.sleep-progress');
    var sleepButton = document.querySelector('.sleeping');
    
    // State variables
    var isSleeping = false;
    var sleepTimer = null;

    happinessProgress.style.width = '80%';
    hungerProgress.style.width = '85%';
    sleepProgress.style.width = '90%';

    updateColor(happinessProgress);
    updateColor(hungerProgress);
    updateColor(sleepProgress);

    // Event listener for submitting the pet name form
    petNameForm.addEventListener('submit', function(event) {
        event.preventDefault();
        var petName = petNameInput.value.trim();
        if (petName) {
            petNameDisplay.textContent = petName;
            startScreen.style.display = 'none';
            consoleElement.style.display = 'flex';
            instructions.style.display = 'block';
            introduction.style.display = 'block';
        } else {
            alert("Please enter a name for your pet.");
        }
    });

    // Event listeners for play and feed buttons
    document.querySelector('.play').addEventListener('click', function() {
        if (!isSleeping) {
            increaseProgress(happinessProgress, 10, "happiness");
        } else {
            alert("Your pet is sleeping! Wait until it wakes up to play.");
        }
    });

    document.querySelector('.feed').addEventListener('click', function() {
        if (!isSleeping) {
            increaseProgress(hungerProgress, 10, "hunger");
        } else {
            alert("Your pet is sleeping! Wait until it wakes up to feed.");
        }
    });

    // Event listener for the sleep/wake button
    sleepButton.addEventListener('click', function() {
        if (!isSleeping) {
            startSleeping();
        } else {
            stopSleeping();
        }
    });

    // Interval to decrease progress over time
    setInterval(() => {
        decreaseProgress(happinessProgress, 1, "happiness");
        decreaseProgress(hungerProgress, 1, "hunger");
        if (!isSleeping) {
            decreaseProgress(sleepProgress, 1, "sleep");
        }
        updateColor(happinessProgress);
        updateColor(hungerProgress);
        updateColor(sleepProgress);
    }, 1000);

    // Functions to increase and decrease progress
    function increaseProgress(progressBar, increase, type) {
        var currentProgress = parseInt(progressBar.style.width) || 0;
        progressBar.style.width = `${Math.min(currentProgress + increase, 100)}%`;
        if (parseInt(progressBar.style.width) === 100) {
            triggerFullAlert(type);
        }
    }

    function decreaseProgress(progressBar, decrease, type) {
        var currentProgress = parseInt(progressBar.style.width) || 0;
        if (currentProgress > 0) {
            progressBar.style.width = `${Math.max(currentProgress - decrease, 0)}%`;
            if (parseInt(progressBar.style.width) === 0) {
                triggerEmptyAlert(type);
            }
        }
    }

    // Function to update the color based on progress percentage
    function updateColor(progressBar) {
        var progress = parseInt(progressBar.style.width) || 0;
        if (progress < 30) {
            progressBar.style.backgroundColor = 'red';
        } else if (progress >= 30 && progress <= 70) {
            progressBar.style.backgroundColor = 'yellow';
        } else {
            progressBar.style.backgroundColor = 'green';
        }
    }

    // Functions to handle sleeping state
    function startSleeping() {
        isSleeping = true;
        sleepButton.querySelector('img').src = 'images/wakeup.png';
        sleepTimer = setInterval(() => {
            increaseProgress(sleepProgress, 1, "sleep");
        }, 1000);
    }

    function stopSleeping() {
        isSleeping = false;
        sleepButton.querySelector('img').src = 'images/sleep.png';
        clearInterval(sleepTimer);
        sleepTimer = null;
    }

    // Alert triggers based on full or empty progress
    function triggerFullAlert(type) {
        switch(type) {
            case "hunger":
                alert("Your pet is stuffed! Don't give him more food!");
                break;
            case "happiness":
                alert("Your pet is very happy! Let's maintain this mood!");
                break;
            case "sleep":
                alert("Your pet is fully rested! Time for activities!");
                break;
        }
    }

    function triggerEmptyAlert(type) {
        switch(type) {
            case "hunger":
                alert("Your pet is starving! Please feed it immediately!");
                break;
            case "happiness":
                alert("Your pet is feeling sad! Play with it to cheer it up!");
                break;
            case "sleep":
                alert("Your pet is exhausted! It needs some sleep now!");
                break;
        }
    }  
};
