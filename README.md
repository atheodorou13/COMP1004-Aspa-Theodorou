== Trivia Fiesta ==
|| Celebrate knowledge, one question at a time! ||

== Module : COMP1004 Computing Practice 2025-2026 ==
* Student: Aspa Theodorou
* Student number: 10911878
* Stand-up leader: Dr Lauren Ansell


== Project overview ==
Trivia Fiest is a browser-based Single Page Application (SPA) quiz system developed using vanilla HTML, CSS and JavaScript.

The application delivers a dynamic, bilingual quiz experience where users can:
* Select quiz categories
* Choose difficulty levels
* Switch between English and Greek
* Upload custom Quiz data via JSON
* Track high scores locally
* Toggle sound and theme preferences

The project demonstrates practical application of front-end development principles, structured data handling, and core software engineering concepts aligned with the Software Development Lifecycle (SDLC)

== Key Features ==
* Bilingual support (Greek/English)
* Dynamic question loading (JSON)
* Category & difficulty filtering
* Countdown timer with visual feedback
* Sound effects with toggle control
* Light / Dark mode toggle
* Local leaderboard 
* Custom quiz JSON upload
* Downloadable quiz template
* Responsive layout
* Accessibility-consious design

== Technologies Used ==
* HTML
* CSS
* JavaScript
* LocalStorage
* JSON Data structures
* Custom DOM Rendering Helper
* No external frameworks or libraries were used 

== Architecture ==
A single page application architecture was followed. A custom helper function is used to dynamically generate DOM elements, mimicking component-based rendering without using a framework.

The application state is centrally managed through a state object that controls:
* current language
* selected category
* difficulty
* questions index
* user answers
* timer
* sound preference
* theme preference

== Data layer ==
* questions are loaded dynamically from structured files
* each file follows input validation ensuring data integrity

