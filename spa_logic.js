const app = document.getElementById("app");
const themeBtn = document.getElementById("themeBtn");

const state = {
    language: "en",
    data: null,
    categoryId: null,
    qIndex: 0,
    answers: [],
    answered: false,
    questions: []
};

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/* ---------- UI translations ---------- */
const UI_TEXT = {
    en: {
        chooseLanguage: "Choose Language",
        chooseCategory: "Select Category",
        questionOf: (i, total) => `Question ${i} of ${total}`,
        next: "Next",
        back: "Back",
        finish: "Finish",
        results: "Results",
        score: (s, total) => `Score: ${s} / ${total}`,
        exportJson: "Export Results (JSON)",
        playAgain: "Play Again",
        selectAnswerFirst: "Select an answer first."
    },
    gr: {
        chooseLanguage: "Επιλογη Γλωσσας",
        chooseCategory: "Επιλογή Κατηγορίας",
        questionOf: (i, total) => `Ερωτηση ${i} απο ${total}`,
        next: "Επομενο",
        back: "Πισω",
        finish: "Τελος",
        results: "Αποτελέσματα",
        score: (s, total) => `Σκορ: ${s} / ${total}`,
        exportJson: "Εξαγωγη Αποτελεσματων (JSON)",
        playAgain: "Παιξε Ξανα",
        selectAnswerFirst: "Διάλεξε πρώτα μια απάντηση."
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

    if (document.body.classList.contains("light")) {
        themeBtn.textContent = "☀️";
    } else {
        themeBtn.textContent = "🌙";
    }
});


/* ---------- Language view ---------- */
function renderLanguageView() {
    const view = el("div", { className: "card" }, [
        el("h2", {}, ["Choose Language / Επιλογή Γλώσσας"]),
        el("div", { className: "choice-row centered" }, [
            el("button", { className: "btn-choice", type: "button", onClick: () => startWithLanguage("en") }, ["English"]),
            el("button", { className: "btn-choice", type: "button", onClick: () => startWithLanguage("gr") }, ["Ελληνικα"])
        ])
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
                        state.qIndex = 0;
                        state.answers = [];
                        state.answered = false;
                        const selectedCategory = state.data.categories.find(cat => cat.id === c.id);
                        state.questions = shuffleArray(selectedCategory.questions);
                        renderQuestionView();
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
                    if (state.qIndex === 0) return renderCategoryView();
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

    const resultObj = {
        project: "Trivia Fiesta",
        timestamp: new Date().toISOString(),
        language: state.language,
        categoryId: cat.id,
        totalQuestions: questions.length,
        score,
        answers: questions.map((q, i) => ({
            questionId: q.id,
            selectedIndex: state.answers[i] ?? null,
            correctIndex: q.answerIndex
        }))
    };

    const view = el("div", { className: "card" }, [
        el("h2", {}, [t("results")]),
        el("p", { className: "muted" }, [t("score", score, questions.length)]),
        el("div", { className: "choice-row centered" }, [
            el("button", {
                className: "btn-choice",
                type: "button",
                onClick: () => {
                    const blob = new Blob([JSON.stringify(resultObj, null, 2)], { type: "application/json" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "trivia-fiesta-results.json";
                    a.click();
                    URL.revokeObjectURL(url);
                }
            }, [t("exportJson")]),
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
