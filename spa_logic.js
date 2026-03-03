/*
  Trivia Fiesta - SPA Application Logic

  This file controls the core functionality of the application,
  including:

  - Global state management
  - View rendering and navigation
  - Timer control and timeout handling
  - Answer selection and validation
  - Score calculation and leaderboard storage (localStorage)
  - Language switching (English / Greek)
  - Sound and theme toggles

  The application follows a Single Page Application (SPA) model,
  where views are dynamically rendered inside the #app container
  without page reloads.
*/


const app = document.getElementById("app");
const themeBtn = document.getElementById("themeBtn");

/* Centralised application state object.
Stores quiz progress, UI state, and user preferences. */

const state = {
    language: "en",
    data: null,
    categoryId: null,
    difficulty: null,
    qIndex: 0,
    answers: [],
    answered: false,
    questions: [],
    timer: null,
    timeLeft: 15,
    timeout: false,
    soundOn: true
};

state.soundOn = JSON.parse(localStorage.getItem("soundOn") || "true");

/* ---------- Sound Effects ---------- */
const correctSound = new Audio("Sounds/Correct_Answer.mp3");
const wrongSound = new Audio("Sounds/Wrong_Answer.mp3");

/* ---------- Shuffle questions ---------- */
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}


function startTimer() {
    stopTimer();

    state.timeLeft = 15;
    updateTimerDisplay();

    state.timer = setInterval(() => {
        state.timeLeft--;
        updateTimerDisplay();

        if (state.timeLeft <= 0) {
            clearInterval(state.timer);
            handleTimeOut();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(state.timer);
}

function updateTimerDisplay() {
    const bar = document.querySelector(".timer-bar");
    const label = document.querySelector(".timer-label");

    if (!bar) return;

    const percentage = (state.timeLeft / 15) * 100;
    bar.style.width = percentage + "%";

    // Update label text
    if (label) {
        label.textContent =
            state.language === "gr"
                ? `Χρόνος: ${state.timeLeft}s`
                : `Time left: ${state.timeLeft}s`;
    }

    // Dynamic colour shift
    if (state.timeLeft > 10) {
        bar.style.background = "#3ddc84";
    } else if (state.timeLeft > 5) {
        bar.style.background = "#ffdd6b";
    } else {
        bar.style.background = "#ff5c5c";
    }
}
function handleTimeOut() {
    if (state.answered) return;

    state.answered = true;
    state.answers[state.qIndex] = null;
    state.timeout = true;   // ← mark timeout

    if (state.soundOn) {
        wrongSound.currentTime = 0;
        wrongSound.play();
    }

    renderQuestionView();
}


/* ---------- Save scores locally (JSON output) ---------- */
function saveScore(entry) {
    const existing = JSON.parse(localStorage.getItem("triviaScores") || "[]");

    existing.push(entry);

    // Sort by highest score first
    existing.sort((a, b) => b.score - a.score);

    // Keep only top 5
    const topFive = existing.slice(0, 5);

    localStorage.setItem("triviaScores", JSON.stringify(topFive, null, 2));
}

function getLeaderboard() {
    return JSON.parse(localStorage.getItem("triviaScores") || "[]");
}

function validateQuizStructure(data) {

    if (!data.categories || !Array.isArray(data.categories)) {
        throw new Error("Missing or invalid 'categories' array.");
    }

    data.categories.forEach((category, cIndex) => {

        if (!category.id || !category.name || !Array.isArray(category.questions)) {
            throw new Error(`Invalid structure in category ${cIndex + 1}.`);
        }

        category.questions.forEach((q, qIndex) => {

            if (typeof q.id === "undefined") {
                throw new Error(`Missing question id in category '${category.name}'.`);
            }

            if (!q.text || !Array.isArray(q.options)) {
                throw new Error(`Invalid question structure in '${category.name}', question ${qIndex + 1}.`);
            }

            if (q.options.length !== 4) {
                throw new Error(`Question ${qIndex + 1} in '${category.name}' must have exactly 4 options.`);
            }

            if (typeof q.answerIndex !== "number" || q.answerIndex < 0 || q.answerIndex > 3) {
                throw new Error(`Invalid answerIndex in '${category.name}', question ${qIndex + 1}. Must be 0–3.`);
            }

            if (!["easy", "medium", "hard"].includes(q.difficulty)) {
                throw new Error(`Invalid difficulty in '${category.name}', question ${qIndex + 1}. Must be easy, medium or hard.`);
            }

        });
    });

    return true;
}



/* ---------- Load custom quiz JSON ---------- */
function loadCustomQuiz(file) {
    const reader = new FileReader();

    reader.onload = function (event) {
        try {
            const parsed = JSON.parse(event.target.result);

            validateQuizStructure(parsed);

            state.data = parsed;
            state.categoryId = null;
            state.qIndex = 0;
            state.answers = [];
            state.answered = false;

            alert("Custom quiz loaded successfully!");
            renderCategoryView();

        } catch (err) {
            alert("Error parsing JSON file.\n\n" + err.message);
        }
    };

    reader.readAsText(file);
}


/* ---------- Download quiz template ---------- */
function downloadTemplate() {

    const template = {
        instructions: {
            note_1: "Do NOT change the main structure: { categories: [...] }",
            note_2: "Each category must have: id, name, and questions array.",
            note_3: "Each question must have: id, text, options (4), answerIndex (0-3), difficulty.",
            note_4: "answerIndex is the position of the correct answer in the options array.",
            note_5: "difficulty must be one of: easy, medium, hard.",
            note_6: "IDs must be unique within each category."
        },

        categories: [
            {
                id: "science",
                name: "Science",
                questions: [
                    {
                        id: 1,
                        text: "What planet is known as the Red Planet?",
                        options: [
                            "Earth",
                            "Mars",
                            "Jupiter",
                            "Saturn"
                        ],
                        answerIndex: 1,
                        difficulty: "easy"
                    },
                    {
                        id: 2,
                        text: "What gas do plants absorb during photosynthesis?",
                        options: [
                            "Oxygen",
                            "Carbon Dioxide",
                            "Nitrogen",
                            "Hydrogen"
                        ],
                        answerIndex: 1,
                        difficulty: "medium"
                    }
                ]
            },
            {
                id: "history",
                name: "History",
                questions: [
                    {
                        id: 1,
                        text: "In what year did World War II end?",
                        options: [
                            "1943",
                            "1944",
                            "1945",
                            "1946"
                        ],
                        answerIndex: 2,
                        difficulty: "easy"
                    }
                ]
            }
        ]
    };

    const blob = new Blob([JSON.stringify(template, null, 2)], {
        type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "quiz-template.json";
    a.click();

    URL.revokeObjectURL(url);
}

/* ---------- UI translations ---------- */
const UI_TEXT = {
    en: {
        chooseLanguage: "Choose Language",
        chooseCategory: "Select Category",
        chooseDifficulty: "Select Difficulty",
        easy: "Easy",
        medium: "Medium",
        hard: "Hard",
        allLevels: "All Levels",
        noQuestions: "No questions available for this difficulty.",
        questionOf: (i, total) => `Question ${i} of ${total}`,
        next: "Next",
        back: "Back",
        finish: "Finish",
        results: "Results",
        score: (s, total) => `Score: ${s} / ${total}`,
        playAgain: "Play Again",
        selectAnswerFirst: "Select an answer first.",
        saveScore: "Save Score",
        exportAll: "Export All Scores",
        enterName: "Your name...",
        nameAlert: "Please enter your name!",
        saved: "Score saved!"
    },
    gr: {
        chooseLanguage: "Επιλογη Γλωσσας",
        chooseCategory: "Επιλογή Κατηγορίας",
        chooseDifficulty: "Επιλογή Δυσκολίας",
        easy: "Εύκολο",
        medium: "Μεσαίο",
        hard: "Δύσκολο",
        allLevels: "Όλα τα Επίπεδα",
        noQuestions: "Δεν υπάρχουν ερωτήσεις για αυτό το επίπεδο.",
        questionOf: (i, total) => `Ερωτηση ${i} απο ${total}`,
        next: "Επομενο",
        back: "Πισω",
        finish: "Τελος",
        results: "Αποτελέσματα",
        score: (s, total) => `Σκορ: ${s} / ${total}`,
        playAgain: "Παιξε Ξανα",
        selectAnswerFirst: "Διάλεξε πρώτα μια απάντηση.",
        saveScore: "Αποθηκευση Σκορ",
        exportAll: "Εξαγωγη Ολων",
        enterName: "Ονομα...",
        nameAlert: "Συμπληρωσε ονομα!",
        saved: "Αποθηκευτηκε!"
    }
};

function t(key, ...args) {
    const dict = UI_TEXT[state.language] || UI_TEXT.en;
    const value = dict[key];
    return typeof value === "function" ? value(...args) : value;
}

/* ---------- Sound toggle ---------- */
if (soundBtn) {
    soundBtn.textContent = state.soundOn ? "🔊" : "🔇";

    soundBtn.addEventListener("click", () => {
        state.soundOn = !state.soundOn;
        localStorage.setItem("soundOn", state.soundOn);
        soundBtn.textContent = state.soundOn ? "🔊" : "🔇";
    });
}

/* ---------- Theme toggle ---------- */
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    themeBtn.textContent =
        document.body.classList.contains("light") ? "☀" : "☾";
});


/* ---------- Language view ---------- */
function renderLanguageView() {
    const fileInput = el("input", {
        type: "file",
        accept: ".json",
        style: "display:none"
    });

    fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            loadCustomQuiz(file);
        }
    });

    const view = el("div", { className: "card" }, [
        el("h2", {}, ["Choose Language / Επιλογή Γλώσσας"]),

        el("div", { className: "choice-row centered" }, [
            el("button", {
                className: "btn-choice",
                type: "button",
                onClick: () => startWithLanguage("en")
            }, ["English"]),

            el("button", {
                className: "btn-choice",
                type: "button",
                onClick: () => startWithLanguage("gr")
            }, ["Ελληνικα"])
        ]),

        el("hr"),

        el("div", { className: "choice-row centered" }, [

            el("button", {
                className: "btn-choice",
                type: "button",
                onClick: downloadTemplate
            }, ["Download Quiz Template"]),

            el("button", {
                className: "btn-choice",
                type: "button",
                onClick: () => fileInput.click()
            }, ["Upload Custom Quiz (JSON)"])
        ]),

        el("p", {
            className: "muted",
            style: "text-align:center; max-width:600px; margin:10px auto;"
        }, [
            "Download the template, edit it using any text editor, save as .json and upload it here."
        ]),

        fileInput
    ]);

    setView(app, view);
}


/* ---------- Load language ---------- */
function startWithLanguage(lang) {
    state.language = lang;
    state.data = loadQuestions(lang);
    state.categoryId = null;
    state.qIndex = 0;
    state.answers = [];
    state.answered = false;
    renderCategoryView();
}

/* ---------- Category view ---------- */
function renderCategoryView() {
    const categories = state.data.categories;

    const view = el("div", { className: "card" }, [
        el("h2", {}, [t("chooseCategory")]),
        el("div", { className: "choice-row centered" },
            categories.map(c =>
                el("button", {
                    className: "btn-choice",
                    type: "button",
                    onClick: () => {
                        state.categoryId = c.id;
                        state.difficulty = null;
                        renderDifficultyView();
                    }
                }, [c.name])
            )
        ),
        el("div", { className: "choice-row centered" }, [
            el("button", { className: "btn-secondary", type: "button", onClick: renderLanguageView }, [t("back")])

        ])
    ]);

    setView(app, view);
}


function renderDifficultyView() {

    const view = el("div", { className: "card" }, [

        el("h2", {}, [t("chooseDifficulty")]),

        el("div", { className: "choice-row centered" }, [

            el("button", {
                className: "btn-choice",
                type: "button",
                onClick: () => startQuizWithDifficulty("easy")
            }, [t("easy")]),

            el("button", {
                className: "btn-choice",
                type: "button",
                onClick: () => startQuizWithDifficulty("medium")
            }, [t("medium")]),

            el("button", {
                className: "btn-choice",
                type: "button",
                onClick: () => startQuizWithDifficulty("hard")
            }, [t("hard")]),

            el("button", {
                className: "btn-choice",
                type: "button",
                onClick: () => startQuizWithDifficulty("all")
            }, [t("allLevels")])

        ]),

        el("div", { className: "choice-row centered" }, [
            el("button", {
                className: "btn-secondary",
                type: "button",
                onClick: renderCategoryView
            }, [t("back")])
        ])
    ]);

    setView(app, view);
}


function startQuizWithDifficulty(level) {

    state.difficulty = level;
    state.qIndex = 0;
    state.answers = [];
    state.answered = false;

    const selectedCategory = state.data.categories.find(
        cat => cat.id === state.categoryId
    );

    let finalQuestions = [];

    if (level === "all") {

        const easy = selectedCategory.questions.filter(q => q.difficulty === "easy");
        const medium = selectedCategory.questions.filter(q => q.difficulty === "medium");
        const hard = selectedCategory.questions.filter(q => q.difficulty === "hard");

        finalQuestions = [
            ...shuffleArray(easy).slice(0, 3),
            ...shuffleArray(medium).slice(0, 4),
            ...shuffleArray(hard).slice(0, 3)
        ];

    } else {

        const filtered = selectedCategory.questions.filter(
            q => q.difficulty === level
        );

        if (filtered.length === 0) {
            alert(t("noQuestions"));
            return;
        }

        finalQuestions = shuffleArray(filtered).slice(0, 10);
    }

    state.questions = shuffleArray(finalQuestions);

    renderQuestionView();
}


function getActiveCategory() {
    return state.data.categories.find(c => c.id === state.categoryId);
}

/* ---------- Question view ---------- */
function renderQuestionView() {

    const questions = state.questions;
    const q = questions[state.qIndex];

    const labels = state.language === "gr"
        ? ["Α", "Β", "Γ", "Δ"]
        : ["A", "B", "C", "D"];

    const optionsList = el("div", { className: "answers" },
        q.options.map((opt, idx) => {
            const isSelected = state.answers[state.qIndex] === idx;
            const isCorrect = idx === q.answerIndex;

            let cls = "answer";
            if (state.answered) {
                if (isCorrect) cls += " correct";
                else if (isSelected) cls += " wrong";
                else cls += " disabled";
            }

            return el("button", {
                className: cls,
                type: "button",
                onClick: () => {
                    if (state.answered) return;

                    state.answers[state.qIndex] = idx;
                    state.answered = true;

                    if (state.soundOn) {
                        if (idx === q.answerIndex) {
                            correctSound.currentTime = 0;
                            correctSound.play();
                        } else {
                            wrongSound.currentTime = 0;
                            wrongSound.play();
                        }
                    }

                    renderQuestionView();
                }
            }, [
                el("span", { className: "answer-label" }, [labels[idx]]),
                el("span", { className: "answer-text" }, [opt])
            ]);
        })
    );


    const view = el("div", { className: "card" }, [
        el("p", { className: "question-meta" }, [t("questionOf", state.qIndex + 1, questions.length)]),
        el("div", { className: "timer-wrapper" }, [
            el("div", { className: "timer-label" }, [
                state.language === "gr"
                    ? `Χρόνος: ${state.timeLeft}s`
                    : `Time left: ${state.timeLeft}s`
            ]),
            el("div", { className: "timer-bar-container" }, [
                el("div", {
                    className: "timer-bar",
                    style: `width: ${(state.timeLeft / 15) * 100}%`
                })
            ])
        ]),

        state.timeout
            ? el("div", { className: "timeout-message" }, [
                state.language === "gr"
                    ? "Τέλος χρόνου! Δεν πήρες πόντο για αυτή την ερώτηση."
                    : "Time's up! You scored 0 for this question."
            ])
            : null,

        el("h3", { className: "question-text" }, [q.text]),
        optionsList,
        el("div", { className: "nav-row" }, [
            el("button", {
                className: "btn-secondary",
                type: "button",
                onClick: () => {
                    stopTimer();

                    if (state.qIndex === 0) {
                        renderDifficultyView();
                        return;
                    }

                    state.qIndex--;

                    // Restore answered state properly
                    state.answered = state.answers[state.qIndex] !== undefined;

                    renderQuestionView();
                }
            }, [t("back")]),
            el("button", {
                className: "btn-primary",
                type: "button",
                onClick: () => {
                    stopTimer();
                    state.timeout = false;
                    if (!state.answered) return alert(t("selectAnswerFirst"));
                    state.answered = false;
                    if (state.qIndex < questions.length - 1) {
                        state.qIndex++;
                        renderQuestionView();
                    } else {
                        renderResultsView();
                    }
                }
            }, [state.qIndex < questions.length - 1 ? t("next") : t("finish")])
        ])
    ]);
    stopTimer();

    setView(app, view);

    if (!state.answered) {
        startTimer();
    }
}

/* ---------- Results view ---------- */
function renderResultsView() {
    stopTimer();

    const cat = getActiveCategory();
    const questions = state.questions;

    let score = 0;
    questions.forEach((q, i) => {
        if (state.answers[i] === q.answerIndex) score++;
    });

    const nameInput = el("input", {
        type: "text",
        placeholder: t("enterName"),
        className: "name-input-modern"
    });

    const leaderboard = getLeaderboard();

    const view = el("div", { className: "card results-card" }, [

        el("h2", { className: "results-title" }, [t("results")]),

        el("div", { className: "score-display" }, [
            el("span", { className: "score-number" }, [`${score}`]),
            el("span", { className: "score-total" }, [` / ${questions.length}`])
        ]),

        el("div", { className: "save-section" }, [
            nameInput,
            el("button", {
                className: "btn-primary",
                type: "button",
                onClick: () => {
                    const playerName = nameInput.value.trim();
                    if (!playerName) return alert(t("nameAlert"));

                    const scoreEntry = {
                        name: playerName,
                        score,
                        totalQuestions: questions.length,
                        category: cat.id,
                        language: state.language,
                        timestamp: new Date().toISOString()
                    };

                    saveScore(scoreEntry);
                    renderResultsView();
                }
            }, [t("saveScore")])
        ]),

        el("h3", { className: "leaderboard-title" }, ["🏆 Leaderboard (Top 5)"]),

        el("div", { className: "leaderboard" },
            leaderboard.length === 0
                ? [el("p", { className: "muted" }, ["No scores yet"])]
                : leaderboard.map((entry, index) =>
                    el("div", { className: "leaderboard-row" }, [
                        el("span", {}, [`${index + 1}. ${entry.name}`]),
                        el("span", {}, [`${entry.score}/${entry.totalQuestions}`])
                    ])
                )
        ),

        el("div", { className: "nav-row" }, [
            el("button", {
                className: "btn-secondary",
                type: "button",
                onClick: renderCategoryView
            }, [t("playAgain")])
        ])
    ]);

    setView(app, view);
}

/* ---------- Start ---------- */
renderLanguageView();
