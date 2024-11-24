document.addEventListener("DOMContentLoaded", function () {
    let level = 1;
    let points = 0;
    let progress = 0;

    const gameArea = document.getElementById('game-area');
    const gameStatus = document.getElementById('game-status');
    const startBtn = document.getElementById('start-game');
    const nextLevelBtn = document.getElementById('next-level');
    const endGameBtn = document.getElementById('end-game');
    const progressBar = document.getElementById('progress-bar');
    const levelDisplay = document.getElementById('level');
    const pointsDisplay = document.getElementById('points');

    // Load chapter content dynamically from JSON or an external file
    function loadGameContent(level) {
        // This should be fetched from the chapter data (which you can format to fit this structure)
        const gameContent = {
            1: {
                type: 'quiz',
                questions: [
                    { question: "What is Work?", options: ["Force x Distance", "Mass x Acceleration", "Speed x Time"], answer: "Force x Distance" },
                    { question: "What is Energy?", options: ["Work done", "Force", "Motion"], answer: "Work done" }
                ]
            },
            2: {
                type: 'flashcards',
                flashcards: [
                    { front: "What is the formula for Force?", back: "F = m * a" },
                    { front: "What is the unit of Energy?", back: "Joule" }
                ]
            }
        };

        const content = gameContent[level];
        if (content.type === 'quiz') {
            renderQuiz(content.questions);
        } else if (content.type === 'flashcards') {
            renderFlashcards(content.flashcards);
        }
    }

    // Render Quiz Content
    function renderQuiz(questions) {
        gameArea.innerHTML = '';
        questions.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');
            questionDiv.innerHTML = `
                <h3>${index + 1}. ${question.question}</h3>
                <div class="options">
                    ${question.options.map(option => `
                        <button class="option-btn" data-answer="${option}">
                            ${option}
                        </button>
                    `).join('')}
                </div>
            `;
            gameArea.appendChild(questionDiv);

            // Handle Option Click
            questionDiv.querySelectorAll('.option-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const selectedAnswer = button.getAttribute('data-answer');
                    if (selectedAnswer === question.answer) {
                        points += 10;
                        progress += 10;
                    }
                    updateGameStatus();
                });
            });
        });
    }

    // Render Flashcards Content
    function renderFlashcards(flashcards) {
        gameArea.innerHTML = '';
        flashcards.forEach(card => {
            const flashcardDiv = document.createElement('div');
            flashcardDiv.classList.add('flashcard');
            flashcardDiv.innerHTML = `
                <div class="flashcard-front">
                    <h3>${card.front}</h3>
                    <button class="reveal-btn">Reveal Answer</button>
                </div>
                <div class="flashcard-back">
                    <h3>${card.back}</h3>
                    <button class="close-btn">Close</button>
                </div>
            `;
            gameArea.appendChild(flashcardDiv);

            // Handle Reveal and Close buttons
            const revealBtn = flashcardDiv.querySelector('.reveal-btn');
            const closeBtn = flashcardDiv.querySelector('.close-btn');
            const front = flashcardDiv.querySelector('.flashcard-front');
            const back = flashcardDiv.querySelector('.flashcard-back');
            closeBtn.style.display = 'none';

            revealBtn.addEventListener('click', () => {
                front.style.display = 'none';
                back.style.display = 'block';
                points += 5;
                updateGameStatus();
            });

            closeBtn.addEventListener('click', () => {
                front.style.display = 'block';
                back.style.display = 'none';
            });
        });
    }

    // Update the Game Status (Level, Points, Progress)
    function updateGameStatus() {
        levelDisplay.textContent = `Level: ${level}`;
        pointsDisplay.textContent = `Points: ${points}`;
        progressBar.style.width = `${progress}%`;
    }

    // Start Game
    startBtn.addEventListener('click', function () {
        loadGameContent(level);
        startBtn.style.display = 'none';
        nextLevelBtn.style.display = 'inline-block';
        endGameBtn.style.display = 'inline-block';
    });

    // Next Level
    nextLevelBtn.addEventListener('click', function () {
        level++;
        loadGameContent(level);
    });

    // End Game
    endGameBtn.addEventListener('click', function () {
        alert(`Game Over! You scored ${points} points.`);
        location.reload();
    });

    nextLevelBtn.style.display = 'none';
    endGameBtn.style.display = 'none';
});
