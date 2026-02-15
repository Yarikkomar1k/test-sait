document.addEventListener("DOMContentLoaded", () => {

    const questions = [
    {
        question: "Сама культова карта CS?",
        answers: ["Mirage", "Inferno", "Dust II", "Nuke"],
        correct: 2,
        img: "https://scope.gg/guides/content/images/2024/01/kartinki-na-ks-68-1.webp"
    },
    {
        question: "Для еко частіше за все купують?",
        answers: ["P250", "Deagle", "USP-S", "Five-SeveN"],
        correct: 0,
        img: "https://i.pinimg.com/1200x/ee/ae/49/eeae4998c40d3becb294505806861d00.jpg"
    },
    {
        question: "Яка граната сліпить ворога?",
        answers: ["Смоук", "Флешка", "Хає", "Молотов"],
        correct: 1,
        img: "https://assets.lis-skins.com/blogfiles/peJKnhwv43EjWjDfW8PF5CbFTCSle9vYj803VDFT.png"
    },
    {
        question: "З чим найбільша швидкість (крім ножа)?",
        answers: ["C4", "Граната", "AWP", "Negev"],
        correct: 0,
        img: "https://i.pinimg.com/736x/7e/89/01/7e8901ca96b887bd12f9d3bf80229ac2.jpg"
    },
    {
        question: "Яка карта найчастіше використовується для тренування аіму?", 
        answers: ["Mirage", "Aim Botz", "Inferno", "Overpass"],
        correct: 1,
        img: "https://www.charlieintel.com/cdn-image/wp-content/uploads/2023/10/11/cs2-terrorist-firing-ak-47-asiimov-1.jpg?width=1200&quality=60&format=auto"
    },
    {
        question: "Яка зброя найдорожча в грі?",
        answers: ["AK-47", "AWP", "M249", "M4A4"],
        correct: 2,
        img: "https://cdn.esportfire-services.com/web/assets/images/article_images/04042025_Spring_Forward_Update_pic1-min.jpg"
    },
    {
        question: "Скільки раундів потрібно для перемоги у матчі?", 
        answers: ["13", "15", "16", "10"],
        correct: 0,
        img: "https://i.ytimg.com/vi/DvQnFosO2o0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD7cn41VyesurjZ9N9UdmJbl-4I1g"
    },
    {
        question: "Яка зброя доступна лише стороні CT?",
        answers: ["AK-47", "M4A1-S", "Galil", "MAC-10"],
        correct: 1,
        img: "https://community.skin.club/wp-content/uploads/2024/08/Seal-Team-6-Soldier.webp"
    },
    {
        question: "Яка зброя має режим черги (burst)?",
        answers: ["Glock-18", "USP-S", "P250", "Five-SeveN"],
        correct: 0,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvOCt_6a8JKmGjxqDmnML7GmAop1oOL0toFA&s"
    },
    {
        question: "Скільки секунд триває встановлення бомби?",
        answers: ["3", "4", "5", "7"],
        correct: 2,
        img: "https://i.imgflip.com/1ei1ob.jpg"
    },
    {
        question: "Яка карта НЕ входить до активного маппулу?",
        answers: ["Mirage", "Cache", "Ancient", "Inferno"],
        correct: 1,
        img: "https://prosettings.net/wp-content/uploads/20250304173716_1.webp"
    },
    {
        question: "Що показує радар?",
        answers: [
            "HP ворогів",
            "Кількість гранат",
            "КД гравців",
            "Позиції союзників"
        ],
        correct: 3,
        img: "https://dmarket.com/blog/cs2-radar-settings/thumb_hu_36dad2b110f2ffc8.webp"
    }
];


    const secretQuestion = {
        question: "🐓 ТАЄМНЕ ПИТАННЯ: який пароль на бомбі С4?",
        answers: ["4829157", "7355608", "0397264", "8571039"],
        correct: 1,
        img: "bomb.png"
    };

    const startScreen = document.getElementById("start-screen");
    const quizScreen = document.getElementById("quiz-screen");
    const resultScreen = document.getElementById("result-screen");
    const startBtn = document.getElementById("start-btn");
    const restartBtn = document.getElementById("restart-btn");
    const questionText = document.getElementById("question-text");
    const answersContainer = document.getElementById("answers-container");
    const scoreDisplay = document.getElementById("score-display");
    const resultText = document.getElementById("result-text");
    const timerDisplay = document.getElementById("timer");
    const secretBtn = document.getElementById("secret-btn");
    const chicken = document.getElementById("chicken");

    let questionIndex = 0;
    let score = 0;
    let interval;
    let timeLeft = 15;
    let currentQuestion = null;
    let secretUsed = false;

    function startGame() {
        secretUsed = false;
        chicken.style.display = "none";

        startScreen.classList.add("hide");
        resultScreen.classList.add("hide");
        quizScreen.classList.remove("hide");

        score = 0;
        questionIndex = 0;
        scoreDisplay.textContent = score;

        showQuestion(questions[questionIndex]);
    }

    function startTimer(duration = 15) {
        timeLeft = duration;
        timerDisplay.textContent = timeLeft;
        clearInterval(interval);

        interval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(interval);
                nextQuestion();
            }
        }, 1000);
    }

    function showQuestion(question) {
        currentQuestion = question;
        clearInterval(interval);

        if (question === secretQuestion) {
            startTimer(40);
        } else {
            startTimer(15);
        }

        questionText.textContent = question.question;
        answersContainer.innerHTML = "";

        const oldImg = document.getElementById("question-img");
        if (oldImg) oldImg.remove();

        if (question.img) {
            const img = document.createElement("img");
            img.id = "question-img";
            img.src = question.img;
            answersContainer.before(img);
        }

        question.answers.forEach((answer, index) => {
            const btn = document.createElement("button");
            btn.className = "answer-btn";
            btn.textContent = answer;
            btn.onclick = () => checkAnswer(btn, index);
            answersContainer.appendChild(btn);
        });
    }

    function checkAnswer(button, index) {
        clearInterval(interval);
        const buttons = document.querySelectorAll(".answer-btn");
        buttons.forEach(b => b.disabled = true);

        const correctIndex = currentQuestion.correct;

        if (index === correctIndex) {
            button.classList.add("correct");
            score++;
            scoreDisplay.textContent = score;
        } else {
            button.classList.add("wrong");
            buttons[correctIndex].classList.add("correct");
        }

        setTimeout(() => {
            if (currentQuestion === secretQuestion) {
                showResult();
            } else {
                nextQuestion();
            }
        }, 2000);
    }

    function nextQuestion() {
        questionIndex++;
        if (questionIndex < questions.length) {
            showQuestion(questions[questionIndex]);
        } else {
            showResult();
        }
    }

    function showResult() {
        clearInterval(interval);
        quizScreen.classList.add("hide");
        resultScreen.classList.remove("hide");

        let procent = (score / questions.length) * 100;
        let procentRounded = Math.round(procent);

        resultText.textContent = `result: ${score} / ${questions.length}, ${procentRounded}%`;
    }

    // Секретная кнопка
    secretBtn.addEventListener("click", () => {
        if (!secretUsed) {
            chicken.style.display = "block";
        }
    });

    chicken.addEventListener("click", () => {
        chicken.style.display = "none";
        secretUsed = true;

        startScreen.classList.add("hide");
        resultScreen.classList.add("hide");
        quizScreen.classList.remove("hide");

        showQuestion(secretQuestion);
    });

    startBtn.addEventListener("click", startGame);
    restartBtn.addEventListener("click", startGame);

  

    // Темна тема
    const themeToggle = document.getElementById("theme-toggle");
        document.body.classList.add("light");

    themeToggle.addEventListener("click", () => {
        if (document.body.classList.contains("light")) {
            document.body.classList.remove("light");
            document.body.classList.add("dark");
            themeToggle.textContent = "☀ Світла тема";
        } else {
            document.body.classList.remove("dark");
            document.body.classList.add("light");
            themeToggle.textContent = "🌙 Темна тема";
        }
    });

    // Модалка 
    const creatorBtn = document.getElementById("creator-btn");
    const creatorModal = document.getElementById("creator-modal");
    const closeModal = document.getElementById("close-modal");

    creatorBtn.addEventListener("click", () => {
    creatorModal.classList.remove("hide");
    });

    closeModal.addEventListener("click", () => {
        creatorModal.classList.add("hide");
    });

    creatorModal.addEventListener("click", (e) => {
        if (e.target === creatorModal) {
            creatorModal.classList.add("hide");
        }
});


});