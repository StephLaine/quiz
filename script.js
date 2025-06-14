const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');
const leaderboardNav = document.querySelector('#leaderboard-nav');
const leaderboardSection = document.querySelector('.leaderboard-section');
const backHomeBtn = document.querySelector('.back-home-btn');
const challengeBtn = document.querySelector('.challenge-btn');
const homeSection = document.querySelector('.home');

// Timer variables
let questionTimer;
let timeLeft = 5;
let timerElement;


// Game-like sound effects (you can add actual audio files later)
const playSound = (type) => {
    // For now, we'll use visual feedback instead of actual sounds
    // You can add actual audio files here later
    console.log(`Playing ${type} sound effect`);
};

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
    playSound('click');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    playSound('back');
}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
    startTimer();
    playSound('start');
}

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
    startTimer();
    playSound('restart');
}

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    clearInterval(questionTimer);
    playSound('home');
}

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');

// Function to move to next question or show results
function moveToNextQuestion() {
    if(questionCount < questions.length - 1){
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove('active');
        startTimer();
        playSound('next');
    }
    else{
        clearInterval(questionTimer);
        showResultBox();
        playSound('finish');
    }
}

nextBtn.onclick = moveToNextQuestion;

const optionList = document.querySelector('.option-list');

// Create timer element and add it to quiz header
function createTimer() {
    if (!timerElement) {
        timerElement = document.createElement('div');
        timerElement.className = 'timer-display';
        timerElement.innerHTML = `
            <div class="timer-circle">
                <div class="timer-number">5</div>
            </div>
            <div class="timer-text">Time Left</div>
        `;
        
        // Add timer styles
        const timerStyles = `
            .timer-display {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-left: 20px;
            }
            
            .timer-circle {
                width: 60px;
                height: 60px;
                border: 3px solid #309ea3;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                background: solid #309ea3;
                transition: all 0.3s ease;
            }
            
            .timer-circle.warning {
                border-color: #ff6600;
                background: #309ea3;
                animation: timerWarning 0.5s ease-in-out infinite alternate;
            }
            
            .timer-circle.critical {
                border-color: #ff0000;
                background: rgba(255, 0, 0, 0.2);
                animation: timerCritical 0.3s ease-in-out infinite alternate;
            }
            
            .timer-number {
                font-size: 24px;
                font-weight: bold;
                color: #fff;
                transition: color 0.3s ease;
            }
            
            .timer-circle.warning .timer-number {
                color: #ff6600;
            }
            
            .timer-circle.critical .timer-number {
                color: #ff0000;
            }
            
            .timer-text {
                font-size: 12px;
                margin-top: 5px;
                color: #fff;
                text-align: center;
            }
            
            @keyframes timerWarning {
                0% { transform: scale(1); }
                100% { transform: scale(1.05); }
            }
            
            @keyframes timerCritical {
                0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7); }
                100% { transform: scale(1.1); box-shadow: 0 0 10px 5px rgba(255, 0, 0, 0); }
            }
            
            @keyframes timeUp {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.2); }
            }
            
            .timer-circle.time-up {
                animation: timeUp 0.5s ease-in-out;
                border-color: #ff0000;
                background: #309ea3;
            }
            
            @media screen and (max-width: 768px) {
                .timer-display {
                    margin-left: 10px;
                }
                
                .timer-circle {
                    width: 50px;
                    height: 50px;
                }
                
                .timer-number {
                    font-size: 20px;
                }
                
                .timer-text {
                    font-size: 10px;
                }
            }
        `;
        
        if (!document.querySelector('#timer-styles')) {
            const timerStyleElement = document.createElement('style');
            timerStyleElement.id = 'timer-styles';
            timerStyleElement.textContent = timerStyles;
            document.head.appendChild(timerStyleElement);
        }
        
        document.querySelector('.quiz-header').appendChild(timerElement);
    }
}

// Start the 5-second timer
function startTimer() {
    clearInterval(questionTimer);
    timeLeft = 5;
    
    if (!timerElement) {
        createTimer();
    }
    
    updateTimerDisplay();
    
    questionTimer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(questionTimer);
            handleTimeUp();
        }
    }, 1000);
}

// Update timer display with visual feedback
function updateTimerDisplay() {
    if (timerElement) {
        const timerNumber = timerElement.querySelector('.timer-number');
        const timerCircle = timerElement.querySelector('.timer-circle');
        
        timerNumber.textContent = timeLeft;
        
        // Remove previous warning classes
        timerCircle.classList.remove('warning', 'critical', 'time-up');
        
        // Add appropriate warning class based on time left
        if (timeLeft <= 1) {
            timerCircle.classList.add('critical');
            playSound('tick-critical');
        } else if (timeLeft <= 2) {
            timerCircle.classList.add('warning');
            playSound('tick-warning');
        } else {
            playSound('tick');
        }
        
        // Visual progress indicator
        const progressPercentage = (timeLeft / 5) * 100;
        timerCircle.style.background = `conic-gradient(#00FF41 ${progressPercentage * 3.6}deg, rgba(170, 44, 134, 0.1) 0deg)`;
    }
}

// Handle what happens when time runs out - AUTO MOVE TO NEXT QUESTION
function handleTimeUp() {
    const timerCircle = timerElement.querySelector('.timer-circle');
    timerCircle.classList.add('time-up');
    
    playSound('timeup');
    
    // Disable all options
    const allOptions = optionList.children;
    for(let i = 0; i < allOptions.length; i++){
        allOptions[i].classList.add('disabled');
        allOptions[i].style.pointerEvents = 'none';
        allOptions[i].style.opacity = '0.5';
    }
    
    // Show correct answer
    const correctAnswer = questions[questionCount].answer;
    for(let i = 0; i < allOptions.length; i++){
        if(allOptions[i].textContent == correctAnswer){
            allOptions[i].classList.add('correct');
            allOptions[i].style.opacity = '1';
        }
    }
    
    // Add screen shake effect for time up
    document.body.style.animation = 'incorrectShake 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 500);
    
    // Update timer display to show 0
    const timerNumber = timerElement.querySelector('.timer-number');
    timerNumber.textContent = '0';
    
    // AUTO MOVE TO NEXT QUESTION after 2 seconds delay
    setTimeout(() => {
        moveToNextQuestion();
    }, 2000);
}

// Enhanced function to show questions with animations
function showQuestions(index){
    const questionText = document.querySelector('.question-text');
    
    // Add fade out animation before changing question
    questionText.style.opacity = '0';
    questionText.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;
        questionText.style.opacity = '1';
        questionText.style.transform = 'translateY(0)';
    }, 200);

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
        <div class="option"><span>${questions[index].options[1]}</span></div>
        <div class="option"><span>${questions[index].options[2]}</span></div>
        <div class="option"><span>${questions[index].options[3]}</span></div>`;
    
    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for(let i = 0; i < option.length; i++){
        option[i].setAttribute('onclick', 'optionSelected(this)');
        // Add staggered animation delay
        option[i].style.animationDelay = `${0.1 + (i * 0.1)}s`;
        // Reset opacity and pointer events
        option[i].style.opacity = '1';
        option[i].style.pointerEvents = 'auto';
    }
}

// Enhanced option selection with game-like feedback - AUTO MOVE TO NEXT QUESTION
function optionSelected(answer){
    // Clear the timer since user answered
    clearInterval(questionTimer);
    
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    // Disable all options immediately to prevent multiple clicks
    for(let i = 0; i < allOptions; i++){
        optionList.children[i].classList.add('disabled');
        optionList.children[i].style.pointerEvents = 'none';
    }

    if(userAnswer == correctAnswer){
        console.log("correct");
        answer.classList.add('correct');
        userScore++;
        headerScore();
        playSound('correct');
        
        // Add celebration effect
        createCelebrationEffect();
        
        // Animate score update
        const scoreElement = document.querySelector('.header-score');
        scoreElement.classList.add('score-update');
        setTimeout(() => {
            scoreElement.classList.remove('score-update');
        }, 500);
        
    } else {
        answer.classList.add('incorrect');
        playSound('incorrect');
        
        // Add screen shake effect for wrong answer
        document.body.style.animation = 'incorrectShake 0.5s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 500);

        // Show correct answer with delay for dramatic effect
        setTimeout(() => {
            for(let i = 0; i < allOptions; i++){
                if(optionList.children[i].textContent == correctAnswer){
                    optionList.children[i].classList.add('correct');
                }
            }
        }, 300);
    }

    // Update timer display to show completion
    if (timerElement) {
        const timerCircle = timerElement.querySelector('.timer-circle');
        const timerNumber = timerElement.querySelector('.timer-number');
        timerCircle.classList.remove('warning', 'critical');
        timerCircle.classList.add('completed');
        timerNumber.textContent = '✓';
        
        // Add completion style
        if (!document.querySelector('#completion-style')) {
            const completionStyle = document.createElement('style');
            completionStyle.id = 'completion-style';
            completionStyle.textContent = `
                .timer-circle.completed {
                    border-color: #00ff00;
                    background: rgba(0, 255, 0, 0.2);
                }
                .timer-circle.completed .timer-number {
                    color: #00ff00;
                }
            `;
            document.head.appendChild(completionStyle);
        }
    }

    // AUTO MOVE TO NEXT QUESTION after 1.5 seconds delay
    setTimeout(() => {
        moveToNextQuestion();
    }, 1500);
}

// Create celebration effect for correct answers
function createCelebrationEffect() {
    const colors = ['#00ff00', '#ffff00', '#00BFFF', '#00a63d', '#00FF41'];
    
    for(let i = 0; i < 15; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = '8px';
            confetti.style.height = '8px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.animation = `confettiFall ${2 + Math.random() * 2}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }, i * 50);
    }
}

// Add confetti animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

function questionCounter(index){
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
    
    // Add progress bar effect
    const progressPercentage = (index / questions.length) * 100;
    updateProgressBar(progressPercentage);
}

// Add progress bar to quiz header
function updateProgressBar(percentage) {
    let progressBar = document.querySelector('.progress-bar');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.innerHTML = '<div class="progress-fill"></div>';
        
        const progressBarStyles = `
            .progress-bar {
                width: 100%;
                height: 4px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 2px;
                margin: 10px 0;
                overflow: hidden;
            }
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #00FF41, #00BFFF);
                border-radius: 2px;
                transition: width 0.5s ease;
                width: 0%;
            }
        `;
        
        if (!document.querySelector('#progress-styles')) {
            const progressStyle = document.createElement('style');
            progressStyle.id = 'progress-styles';
            progressStyle.textContent = progressBarStyles;
            document.head.appendChild(progressStyle);
        }
        
        document.querySelector('.quiz-header').appendChild(progressBar);
    }
    
    const progressFill = progressBar.querySelector('.progress-fill');
    progressFill.style.width = percentage + '%';
}

function headerScore(){
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / 5`;
}

// Enhanced result box with dramatic entrance
function showResultBox(){
    quizBox.classList.remove('active');
    
    // Add delay for dramatic effect
    setTimeout(() => {
        resultBox.classList.add('active');
        
        const scoreText = document.querySelector('.score-text');
        scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

        const circularProgress = document.querySelector('.circular-progress');
        const progressValue = document.querySelector('.progress-value');
        let progressStartValue = -1;
        let progressEndValue = (userScore / questions.length) * 100;
        let speed = 20;

        // Add result-based effects
        if (progressEndValue >= 80) {
            // Excellent score - celebration
            createMegaCelebrationEffect();
            playSound('excellent');
        } else if (progressEndValue >= 60) {
            // Good score
            playSound('good');
        } else {
            // Need improvement
            playSound('tryagain');
        }

        let progress = setInterval(() => {
            progressStartValue++;
            progressValue.textContent = `${progressStartValue}%`;
            
            // Dynamic color based on score
            let color = '#00FF41';
            if (progressStartValue >= 80) color = '#00ff00';
            else if (progressStartValue >= 60) color = '#ffaa00';
            else if (progressStartValue >= 40) color = '#ff6600';
            else color = '#ff0000';
            
            circularProgress.style.background = `conic-gradient(${color} ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;
            
            if(progressStartValue == progressEndValue){
                clearInterval(progress);
            }
        }, speed);
    }, 500);
}

// Create mega celebration for excellent scores
function createMegaCelebrationEffect() {
    const colors = ['#00ff00', '#ffff00', '#00BFFF', '#00a63d', '#00FF41', '#ffffff'];
    
    for(let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = (5 + Math.random() * 10) + 'px';
            confetti.style.height = (5 + Math.random() * 10) + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.animation = `confettiFall ${3 + Math.random() * 3}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 6000);
        }, i * 30);
    }
}

// Add hover sound effects to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button, .info-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => playSound('hover'));
    });
});

// Leaderboard navigation
leaderboardNav.onclick = () => {
    leaderboardSection.classList.add('active');
    main.classList.add('active');
    playSound('click');
}

// Back to home from leaderboard
backHomeBtn.onclick = () => {
    leaderboardSection.classList.remove('active');
    main.classList.remove('active');
    playSound('back');
}

// Challenge button - starts quiz from leaderboard
challengeBtn.onclick = () => {
    leaderboardSection.classList.remove('active');
    popupInfo.classList.add('active');
    playSound('click');
}

const menuToggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('show');
});

