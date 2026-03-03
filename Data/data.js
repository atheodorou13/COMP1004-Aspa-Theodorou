// Returns the appropriate question dataset based on the selected language.
// Uses preloaded constants instead of fetch to allow the app to run directly in the browser.

function loadQuestions(lang) {
    return lang === "gr" ? QUESTIONS_GR : QUESTIONS_EN;
}