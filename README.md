🎉🎉== Trivia Fiesta ==🎉🎉


|| Celebrate knowledge, one question at a time! ||

== Module : COMP1004 Computing Practice 2025-2026 ==
* Student: Aspa Theodorou
* Student number: 10911878
* Stand-up leader: Dr Lauren Ansell

== Notes ==
* this project was developed as part of a university module and follows specified constraints, including the use of front-end technologies only
* all data is stored locally using browser storage


== Project overview ==

Trivia Fiesta is a browser-based Single Page Application (SPA) quiz system developed using HTML, CSS and JavaScript.

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
* Accessibility-conscious design

== Technologies Used ==
* HTML
* CSS
* JavaScript
* LocalStorage
* JSON Data structures
* No external frameworks or libraries were used 

== Architecture ==

The application follows a Single Page Application (SPA) architecture, where all views are dynamically rendered without page reloads.

A custom DOM helper function is used to generate UI elements programmatically, providing a structured and reusable approach to rendering without relying on external frameworks.

The application state is centrally managed through a state object that controls:
* selected language
* selected category
* selected difficulty
* current question index
* user answers
* timer
* sound preference
* theme preference

== Data layer ==

Quiz data is stored in structured JSON format and loaded dynamically at runtime.

Each quiz file is validated before use to ensure:
* correct structure
* valid question format
* exactly four answer options
* valid answer indices
* supported difficulty levels

This validation ensures data integrity and prevents runtime errors when loading custom quizzes. 

== JSON Input & Output ==

The application supports both JSON input and output:
* users can upload custom quiz files in JSON format
* leaderboard scores can be exported as a JSON file

== How to run ==  

1. Download or clone the repository
2. Open index.html in a web browser
3. Have fun! 
