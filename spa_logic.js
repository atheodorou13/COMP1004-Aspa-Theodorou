const app = document.getElementById("app");
const themeBtn = document.getElementById("themeBtn");

const state = {
    language: "en",
    data: null,
    categoryId: null,
    difficulty: null,
    qIndex: 0,
    answers: [],
    answered: false,
    questions: []
};

/* ---------- Shuffle questions ---------- */
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/* ---------- Save scores locally (JSON output) ---------- */
function saveScore(entry) {
    const existing = JSON.parse(localStorage.getItem("triviaScores") || "[]");
    existing.push(entry);
    localStorage.setItem("triviaScores", JSON.stringify(existing, null, 2));
}

/* ---------- Load custom quiz JSON ---------- */
function loadCustomQuiz(file) {
    const reader = new FileReader();

    reader.onload = function (event) {
        try {
            const parsed = JSON.parse(event.target.result);

            if (!parsed.categories || !Array.isArray(parsed.categories)) {
                throw new Error("Invalid JSON structure. Expected { categories: [...] }");
            }

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
        categories: [
            {
                id: "category_1",
                name: "Category 1",
                questions: [
                    {
                        id: 1,
                        text: "",
                        options: ["", "", "", ""],
                        answerIndex: 0
                    },
                    {
                        id: 2,
                        text: "",
                        options: ["", "", "", ""],
                        answerIndex: 0
                    },
                    {
                        id: 3,
                        text: "",
                        options: ["", "", "", ""],
                        answerIndex: 0
                    }
                ]
            },
            {
                id: "category_2",
                name: "Category 2",
                questions: [
                    {
                        id: 1,
                        text: "",
                        options: ["", "", "", ""],
                        answerIndex: 0
                    },
                    {
                        id: 2,
                        text: "",
                        options: ["", "", "", ""],
                        answerIndex: 0
                    },
                    {
                        id: 3,
                        text: "",
                        options: ["", "", "", ""],
                        answerIndex: 0
                    }
                ]
            },
            {
                id: "category_3",
                name: "Category 3",
                questions: [
                    {
                        id: 1,
                        text: "",
                        options: ["", "", "", ""],
                        answerIndex: 0
                    },
                    {
                        id: 2,
                        text: "",
                        options: ["", "", "", ""],
                        answerIndex: 0
                    },
                    {
                        id: 3,
                        text: "",
                        options: ["", "", "", ""],
                        answerIndex: 0
                    }
                ]
            },
            {
                id: "category_4",
                name: "Category 4",
                questions: [
                    {
                        id: 1,
                        text: "",
                        options: ["", "", "", ""],
                        answerIndex: 0
                    },
                    {
                        id: 2,
                        text: "",
                        options: ["", "", "", ""],
                        answerIndex: 0
                    },
                    {
                        id: 3,
                        text: "",
                        options: ["", "", "", ""],
                        answerIndex: 0
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

/* ---------- Theme toggle ---------- */
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    themeBtn.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
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
async function startWithLanguage(lang) {
    state.language = lang;
    state.data = await loadQuestions(lang);
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
        el("h3", { className: "question-text" }, [q.text]),
        optionsList,
        el("div", { className: "nav-row" }, [
            el("button", {
                className: "btn-secondary",
                type: "button",
                onClick: () => {
                    state.answered = false;
                    if (state.qIndex === 0) return renderDifficultyView();
                    state.qIndex--;
                    renderQuestionView();
                }
            }, [t("back")]),
            el("button", {
                className: "btn-primary",
                type: "button",
                onClick: () => {
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

    setView(app, view);
}

/* ---------- Results view ---------- */
function renderResultsView() {
    const cat = getActiveCategory();
    const questions = state.questions;

    let score = 0;
    questions.forEach((q, i) => {
        if (state.answers[i] === q.answerIndex) score++;
    });

    const nameInput = el("input", {
        type: "text",
        placeholder: t("enterName"),
        className: "name-input"
    });

    const view = el("div", { className: "card" }, [
        el("h2", {}, [t("results")]),
        el("p", { className: "muted" }, [t("score", score, questions.length)]),

        el("div", { className: "choice-row centered" }, [nameInput]),

        el("div", { className: "choice-row centered" }, [

            el("button", {
                className: "btn-choice",
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
                    alert(t("saved"));
                }
            }, [t("saveScore")]),

            el("button", {
                className: "btn-choice",
                type: "button",
                onClick: () => {
                    const allScores = localStorage.getItem("triviaScores") || "[]";

                    const blob = new Blob([allScores], { type: "application/json" });
                    const url = URL.createObjectURL(blob);

                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "trivia-fiesta-all-scores.json";
                    a.click();

                    URL.revokeObjectURL(url);
                }
            }, [t("exportAll")]),

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
