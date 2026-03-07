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
            throw new Error(t("invalidCategoryStructure", cIndex + 1));
        }

        category.questions.forEach((q, qIndex) => {

            if (typeof q.id === "undefined") {
                throw new Error(t("missingQuestionId", qIndex + 1, category.name));
            }

            if (!q.text || !Array.isArray(q.options)) {
                throw new Error(t("invalidQuestionStructure", qIndex + 1, category.name));
            }

            if (q.options.length !== 4) {
                throw new Error(t("invalidOptions", qIndex + 1, category.name));
            }

            if (typeof q.answerIndex !== "number" || q.answerIndex < 0 || q.answerIndex > 3) {
                throw new Error(t("invalidAnswerIndex", qIndex + 1, category.name));
            }

            if (!["easy", "medium", "hard"].includes(q.difficulty)) {
                throw new Error(t("invalidDifficulty", qIndex + 1, category.name));
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

            // Detect quiz language from category name
            const firstCategory = parsed.categories[0]?.name || "";

            if (/[Α-Ωα-ω]/.test(firstCategory)) {
                state.language = "gr";
            } else {
                state.language = "en";
            }

            state.data = parsed;
            state.categoryId = null;
            state.qIndex = 0;
            state.answers = [];
            state.answered = false;

            alert(t("quizLoaded"));
            renderCategoryView();

        } catch (err) {
            console.error(err);
            alert(t("invalidQuiz") + "\n\n" + err.message);
        }
    };

    reader.readAsText(file);
}

/* ---------- Download quiz template English ---------- */
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


/* ---------- Download quiz template Greek ---------- */
function downloadTemplateGR() {

    const template = {
        instructions: {
            note_1: "Μην αλλάξετε την βασική δομή: { categories: [...] }",
            note_2: "Κάθε κατηγορία πρέπει να έχει: id, name, και questions array.",
            note_3: "Κάθε ερώτηση πρέπει να έχει: id, text, options (4), answerIndex (0-3), difficulty.",
            note_4: "Το answerIndex είναι η θέση της σωστής απάντησης μέσα στο options array.",
            note_5: "Η δυσκολια (difficulty) πρέπει να είναι: easy (εύκολο), medium (μεσαίο), hard (δύσκολο).",
            note_6: "Τα IDs πρέπει να είναι μοναδικά σε κάθε κατηγορία."
        },

        categories: [
            {
                id: "general",
                name: "Γενικες Γνωσεις",
                questions: [
                    {
                        "id": 1,
                        "text": "Ποιος πλανήτης είναι γνωστός ως 'Ο Κόκκινος Πλανήτης';",
                        "options": [
                            "Αφροδίτη",
                            "Άρης",
                            "Δίας",
                            "Κρόνος"
                        ],
                        "answerIndex": 1,
                        "difficulty": "easy"
                    },
                    {
                        "id": 2,
                        "text": "Ποιο αέριο απορροφούν τα φυτά κατά τη φωτοσύνθεση;",
                        "options": [
                            "Οξυγόνο",
                            "Υδρογόνο",
                            "Άζωτο",
                            "Διοξείδιο του Άνθρακα"
                        ],
                        "answerIndex": 3,
                        "difficulty": "medium"
                    }
                ]
            },
            {
                id: "history",
                name: "Ιστορια",
                questions: [
                    {
                        id: 1,
                        "text": "Ποια χρονιά τελείωσε ο Β' Παγκόσμιος Πόλεμος;",
                        "options": [
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
    a.download = "quiz-template-gr.json";
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
        saved: "Score saved!",
        quizLoaded: "Custom quiz loaded successfully!",
        invalidQuiz: "Error parsing JSON file.",
        invalidCategoryStructure: (c) => `Invalid structure in category ${c}.`,
        missingQuestionId: (q, cat) => `Missing question id in category '${cat}'.`,
        invalidQuestionStructure: (q, cat) => `Invalid question structure in '${cat}', question ${q}.`,
        invalidOptions: (q, cat) => `Question ${q} in '${cat}' must have exactly 4 options.`,
        invalidAnswerIndex: (q, cat) => `Invalid answerIndex in '${cat}', question ${q}. Must be 0–3.`,
        invalidDifficulty: (q, cat) => `Invalid difficulty in '${cat}', question ${q}. Must be easy, medium or hard.`,
    },
    gr: {
        chooseLanguage: "Επιλογη Γλωσσας",
        chooseCategory: "Επιλογη Κατηγοριας",
        chooseDifficulty: "Επιλογη Δυσκολιας",
        easy: "Ευκολο",
        medium: "Μεσαιο",
        hard: "Δυσκολο",
        allLevels: "Όλα τα Επιπεδα",
        noQuestions: "Δεν υπαρχουν ερωτησεις για αυτο το επιπεδο.",
        questionOf: (i, total) => `Ερωτηση ${i} απο ${total}`,
        next: "Επομενο",
        back: "ΠΙΣΩ",
        finish: "Τελος",
        results: "Αποτελεσματα",
        score: (s, total) => `Σκορ: ${s} / ${total}`,
        playAgain: "Παιξε Ξανα",
        selectAnswerFirst: "Διάλεξε πρώτα μια απάντηση.",
        saveScore: "Αποθηκευση Σκορ",
        exportAll: "Εξαγωγη Ολων",
        enterName: "Ονομα...",
        nameAlert: "Συμπληρωσε ονομα!",
        saved: "Αποθηκευτηκε!",
        quizLoaded: "Το quiz φορτώθηκε επιτυχώς!",
        invalidQuiz: "Σφάλμα στο αρχείο JSON.",
        invalidCategoryStructure: (c) => `Μη έγκυρη δομή στην κατηγορία ${c}.`,
        missingQuestionId: (q, cat) => `Λείπει το id της ερώτησης στην κατηγορία '${cat}'.`,
        invalidQuestionStructure: (q, cat) => `Μη έγκυρη δομή ερώτησης στην κατηγορία '${cat}', ερώτηση ${q}.`,
        invalidOptions: (q, cat) => `Η ερώτηση ${q} στην κατηγορία '${cat}' πρέπει να έχει ακριβώς 4 επιλογές.`,
        invalidAnswerIndex: (q, cat) => `Μη έγκυρο answerIndex στην κατηγορία '${cat}', ερώτηση ${q}. Πρέπει να είναι 0–3.`,
        invalidDifficulty: (q, cat) => `Μη έγκυρη δυσκολία στην κατηγορία '${cat}', ερώτηση ${q}.`
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
            }, ["Download Quiz Template (English)"]),

            el("button", {
                className: "btn-choice",
                type: "button",
                onClick: () => fileInput.click()
            }, ["Upload Custom Quiz (JSON)"])

        ]),

        /* English explanation */
        el("p", {
            className: "muted",
            style: "text-align:center; max-width:600px; margin:10px auto;"
        }, [
            "Download the template, edit in any text editor to create your own quiz using the structure provided, save it as a .json file and upload it here."
        ]),

        el("hr"),

        el("div", { className: "choice-row centered" }, [

            el("button", {
                className: "btn-choice",
                type: "button",
                onClick: downloadTemplateGR
            }, ["Κατεβασε αδειο προτυπο quiz"]),

            el("button", {
                className: "btn-choice",
                type: "button",
                onClick: () => fileInput.click()
            }, ["Ανεβασε το Quiz σου (JSON)"])

        ]),


        /* Greek explanation */
        el("p", {
            className: "muted",
            style: "text-align:center; max-width:600px; margin:10px auto;"
        }, [
            "Κατέβασε το άδειο πρότυπο quiz, δημιούργησε το δικό σου quiz με βάση τις οδηγίες, αποθήκευσέ το ως .json αρχείο και ανέβασέ το εδώ."
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

/* ---------- Export leaderboard as JSON ---------- */
function exportScores() {

    const scores = JSON.parse(localStorage.getItem("triviaScores") || "[]");

    if (scores.length === 0) {
        alert("No scores available to export.");
        return;
    }

    const blob = new Blob([JSON.stringify(scores, null, 2)], {
        type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "trivia-scores.json";
    a.click();

    URL.revokeObjectURL(url);
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

        el("div", { className: "choice-row centered" }, [
            el("button", {
                className: "btn-primary",
                type: "button",
                onClick: exportScores
            }, [t("exportAll")])
        ]),

        el("div", {
            style: "display:flex; justify-content:center; margin-top:20px;"
        }, [
            el("button", {
                className: "btn-primary",
                type: "button",
                onClick: renderCategoryView
            }, [t("playAgain")])
        ])
    ]);

    setView(app, view);
}

/* ---------- Start ---------- */
renderLanguageView();
