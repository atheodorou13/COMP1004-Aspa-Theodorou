// data.js
// Loads the question sets from local JSON files (JSON input requirement)

async function loadQuestions(lang) {
    // Update these filenames if yours are different
    const file = (lang === "gr") ? "Data/questions_gr.json" : "Data/questions_en.json";

    try {
        const res = await fetch(file, { cache: "no-store" });
        if (!res.ok) {
            throw new Error(`Could not load ${file} (HTTP ${res.status}).`);
        }

        const data = await res.json();

        // Basic structure check (helps debugging)
        if (!data || !Array.isArray(data.categories)) {
            throw new Error(`Invalid structure in ${file}. Expected { "categories": [...] }`);
        }

        return data;
    } catch (err) {
        console.error(err);
        alert(`Error loading questions.\n\n${err.message}`);
        throw err;
    }
}
