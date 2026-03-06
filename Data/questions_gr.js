/*  This file stores structured quiz data as JavaScript constants
  (QUESTIONS_EN and QUESTIONS_GR).

  The data follows a strict JSON-like structure:
  {
      categories: [
          {
              id,
              name,
              questions: [
                  { id, text, options[4], answerIndex, difficulty }
              ]
          }
      ]
  }

  Keeping the data separate from the application logic
  improves maintainability and modularity.
*/



const QUESTIONS_GR =
{
    "categories": [
        {
            "id": "general",
            "name": "Γενικες Γνωσεις",
            "questions": [
                {
                    "id": 1,
                    "text": "Ποια είναι η πρωτεύουσα του Καναδά;",
                    "options": [
                        "Οτάβα",
                        "Τορόντο",
                        "Βανκούβερ",
                        "Μόντρεαλ"
                    ],
                    "answerIndex": 0,
                    "difficulty": "easy"
                },
                {
                    "id": 2,
                    "text": "Πόσες ήπειροι υπάρχουν στη Γη;",
                    "options": [
                        "5",
                        "6",
                        "7",
                        "8"
                    ],
                    "answerIndex": 2,
                    "difficulty": "easy"
                },
                {
                    "id": 3,
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
                    "id": 4,
                    "text": "Ποιος είναι ο μεγαλύτερος ωκεανός της Γης;",
                    "options": [
                        "Ατλαντικός",
                        "Ινδικός",
                        "Ειρηνικός",
                        "Αρκτικός"
                    ],
                    "answerIndex": 2,
                    "difficulty": "easy"
                },
                {
                    "id": 5,
                    "text": "Ποιο στοιχείο έχει το χημικό σύμβολο 'O';",
                    "options": [
                        "Χρυσός",
                        "Σίδηρος",
                        "Όσμιο",
                        "Οξυγόνο"
                    ],
                    "answerIndex": 3,
                    "difficulty": "easy"
                },
                {
                    "id": 6,
                    "text": "Πόσες ημέρες έχει ένα δίσεκτο έτος;",
                    "options": [
                        "364",
                        "365",
                        "366",
                        "367"
                    ],
                    "answerIndex": 2,
                    "difficulty": "easy"
                },
                {
                    "id": 7,
                    "text": "Ποιο είναι το νόμισμα της Ιαπωνίας;",
                    "options": [
                        "Γουόν",
                        "Γιουάν",
                        "Γιεν",
                        "Δολάριο"
                    ],
                    "answerIndex": 2,
                    "difficulty": "easy"
                },
                {
                    "id": 8,
                    "text": "Ποιο ζώο είναι γνωστό ως 'Ο βασιλιάς της ζούγκλας';",
                    "options": [
                        "Λιοντάρι",
                        "Ελέφαντας",
                        "Τίγρης",
                        "Λεοπάρδαλη"
                    ],
                    "answerIndex": 0,
                    "difficulty": "medium"
                },
                {
                    "id": 9,
                    "text": "Ποια χώρα φιλοξενεί τον Μεγάλο Κοραλλιογενή Ύφαλο;",
                    "options": [
                        "ΗΠΑ",
                        "Αυστραλία",
                        "Βραζιλία",
                        "Νότια Αφρική"
                    ],
                    "answerIndex": 1,
                    "difficulty": "medium"
                },
                {
                    "id": 10,
                    "text": "Ποιο είναι το σημείο βρασμού του νερού στο επίπεδο της θάλασσας;",
                    "options": [
                        "90°C",
                        "95°C",
                        "100°C",
                        "110°C"
                    ],
                    "answerIndex": 2,
                    "difficulty": "medium"
                },
                {
                    "id": 11,
                    "text": "Ποια χώρα έχει τον μεγαλύτερο πληθυσμό στον κόσμο;",
                    "options": [
                        "Ινδία",
                        "ΗΠΑ",
                        "Κίνα",
                        "Ινδονησία"
                    ],
                    "answerIndex": 0,
                    "difficulty": "medium"
                },
                {
                    "id": 12,
                    "text": "Ποιος έγραψε το έργο 'Ρωμαίος και Ιουλιέτα';",
                    "options": [
                        "Τσαρλς Ντίκενς",
                        "Ουίλιαμ Σαίξπηρ",
                        "Τζέιν Όστεν",
                        "Μαρκ Τουέιν"
                    ],
                    "answerIndex": 1,
                    "difficulty": "medium"
                },
                {
                    "id": 13,
                    "text": "Ποιο αέριο απορροφούν τα φυτά κατά τη φωτοσύνθεση;",
                    "options": [
                        "Οξυγόνο",
                        "Υδρογόνο",
                        "Άζωτο",
                        "Διοξείδιο του Άνθρακα"
                    ],
                    "answerIndex": 3,
                    "difficulty": "medium"
                },
                {
                    "id": 14,
                    "text": "Ποια είναι η τετραγωνική ρίζα του 144;",
                    "options": [
                        "10",
                        "11",
                        "12",
                        "14"
                    ],
                    "answerIndex": 2,
                    "difficulty": "medium"
                },
                {
                    "id": 15,
                    "text": "Ποια είναι η μεγαλύτερη έρημος στον κόσμο σε έκταση;",
                    "options": [
                        "Σαχάρα",
                        "Γκόμπι",
                        "Ανταρκτική Έρημος",
                        "Αραβική"
                    ],
                    "answerIndex": 2,
                    "difficulty": "hard"
                },
                {
                    "id": 16,
                    "text": "Ποιο στοιχείο έχει ατομικό αριθμό 79;",
                    "options": [
                        "Χρυσός",
                        "Πλατίνα",
                        "Αργυρός",
                        "Υδράργυρος"
                    ],
                    "answerIndex": 0,
                    "difficulty": "hard"
                },
                {
                    "id": 17,
                    "text": "Ποια είναι η πρωτεύουσα της Μογγολίας;",
                    "options": [
                        "Αστάνα",
                        "Ουλάν Μπατόρ",
                        "Τασκένδη",
                        "Μπισκέκ"
                    ],
                    "answerIndex": 1,
                    "difficulty": "hard"
                },
                {
                    "id": 18,
                    "text": "Ποια χώρα έχει τις περισσότερες φυσικές λίμνες;",
                    "options": [
                        "ΗΠΑ",
                        "Καναδάς",
                        "Ρωσία",
                        "Φινλανδία"
                    ],
                    "answerIndex": 1,
                    "difficulty": "hard"
                },
                {
                    "id": 19,
                    "text": "Ποιος είναι ο μικρότερος πρώτος αριθμός μεγαλύτερος του 100;",
                    "options": [
                        "101",
                        "103",
                        "107",
                        "109"
                    ],
                    "answerIndex": 0,
                    "difficulty": "hard"
                },
                {
                    "id": 20,
                    "text": "Ποιος επιστήμονας διατύπωσε τη θεωρία της γενικής σχετικότητας;",
                    "options": [
                        "Νεύτων",
                        "Τέσλα",
                        "Μπορ",
                        "Αϊνστάιν"
                    ],
                    "answerIndex": 3,
                    "difficulty": "hard"
                }
            ]
        },
        {
            "id": "history",
            "name": "Ιστορια",
            "questions": [
                {
                    "id": 1,
                    "text": "Ποιος ήταν ο πρώτος Πρόεδρος των Ηνωμένων Πολιτειών;",
                    "options": [
                        "Τζορτζ Ουάσινγκτον",
                        "Τόμας Τζέφερσον",
                        "Αβραάμ Λίνκολν",
                        "Τζον Άνταμς"
                    ],
                    "answerIndex": 0,
                    "difficulty": "easy"
                },
                {
                    "id": 2,
                    "text": "Ποια χρονιά τελείωσε ο Β' Παγκόσμιος Πόλεμος;",
                    "options": [
                        "1943",
                        "1944",
                        "1945",
                        "1946"
                    ],
                    "answerIndex": 2,
                    "difficulty": "easy"
                },
                {
                    "id": 3,
                    "text": "Ποιος αρχαίος πολιτισμός κατασκεύασε τις πυραμίδες;",
                    "options": [
                        "Ρωμαίοι",
                        "Έλληνες",
                        "Αζτέκοι",
                        "Αιγύπτιοι"
                    ],
                    "answerIndex": 3,
                    "difficulty": "easy"
                },
                {
                    "id": 4,
                    "text": "Ποια ήταν γνωστή ως η «Σιδηρά Κυρία»;",
                    "options": [
                        "Βασίλισσα Ελισάβετ Β'",
                        "Μάργκαρετ Θάτσερ",
                        "Άνγκελα Μέρκελ",
                        "Ίντιρα Γκάντι"
                    ],
                    "answerIndex": 1,
                    "difficulty": "easy"
                },
                {
                    "id": 5,
                    "text": "Ποια χρονιά έπεσε το Τείχος του Βερολίνου;",
                    "options": [
                        "1987",
                        "1988",
                        "1989",
                        "1990"
                    ],
                    "answerIndex": 2,
                    "difficulty": "easy"
                },
                {
                    "id": 6,
                    "text": "Ποιος ανακάλυψε την Αμερική το 1492;",
                    "options": [
                        "Χριστόφορος Κολόμβος",
                        "Μάρκο Πόλο",
                        "Βάσκο ντα Γκάμα",
                        "Φερδινάνδος Μαγγελάνος"
                    ],
                    "answerIndex": 0,
                    "difficulty": "easy"
                },
                {
                    "id": 7,
                    "text": "Ποιος ήταν ο πρώτος άνθρωπος που περπάτησε στη Σελήνη;",
                    "options": [
                        "Μπαζ Όλντριν",
                        "Γιούρι Γκαγκάριν",
                        "Νιλ Άρμστρονγκ",
                        "Μάικλ Κόλινς"
                    ],
                    "answerIndex": 2,
                    "difficulty": "easy"
                },
                {
                    "id": 8,
                    "text": "Ποιος πόλεμος διεξήχθη μεταξύ Βορρά και Νότου στις ΗΠΑ;",
                    "options": [
                        "Α' Παγκόσμιος",
                        "Εμφύλιος Πόλεμος",
                        "Πόλεμος Ανεξαρτησίας",
                        "Ψυχρός Πόλεμος"
                    ],
                    "answerIndex": 1,
                    "difficulty": "medium"
                },
                {
                    "id": 9,
                    "text": "Ποια αυτοκρατορία κυβερνούσε ο Ιούλιος Καίσαρας;",
                    "options": [
                        "Ελληνική",
                        "Βρετανική",
                        "Οθωμανική",
                        "Ρωμαϊκή"
                    ],
                    "answerIndex": 3,
                    "difficulty": "medium"
                },
                {
                    "id": 10,
                    "text": "Ποια χρονιά βυθίστηκε ο Τιτανικός;",
                    "options": [
                        "1905",
                        "1912",
                        "1918",
                        "1923"
                    ],
                    "answerIndex": 1,
                    "difficulty": "medium"
                },
                {
                    "id": 11,
                    "text": "Ποια επανάσταση ξεκίνησε το 1789;",
                    "options": [
                        "Γαλλική",
                        "Αμερικανική",
                        "Ρωσική",
                        "Βιομηχανική"
                    ],
                    "answerIndex": 0,
                    "difficulty": "medium"
                },
                {
                    "id": 12,
                    "text": "Ποιος ήταν ο ηγέτης της Ναζιστικής Γερμανίας;",
                    "options": [
                        "Στάλιν",
                        "Χίτλερ",
                        "Μουσολίνι",
                        "Φράνκο"
                    ],
                    "answerIndex": 1,
                    "difficulty": "medium"
                },
                {
                    "id": 13,
                    "text": "Ποια αυτοκρατορία κατασκεύασε το Κολοσσαίο;",
                    "options": [
                        "Ελληνική",
                        "Περσική",
                        "Ρωμαϊκή",
                        "Βυζαντινή"
                    ],
                    "answerIndex": 2,
                    "difficulty": "medium"
                },
                {
                    "id": 14,
                    "text": "Ποια χρονιά έληξε επίσημα ο Ψυχρός Πόλεμος;",
                    "options": [
                        "1989",
                        "1991",
                        "1993",
                        "1995"
                    ],
                    "answerIndex": 1,
                    "difficulty": "medium"
                },
                {
                    "id": 15,
                    "text": "Ποια συνθήκη έληξε τον Α' Παγκόσμιο Πόλεμο;",
                    "options": [
                        "Συνθήκη των Βερσαλλιών",
                        "Συνθήκη των Παρισίων",
                        "Συνθήκη της Ρώμης",
                        "Συνθήκη του Βερολίνου"
                    ],
                    "answerIndex": 0,
                    "difficulty": "hard"
                },
                {
                    "id": 16,
                    "text": "Ποιος ήταν Πρωθυπουργός του Ηνωμένου Βασιλείου κατά το μεγαλύτερο μέρος του Β' Παγκοσμίου Πολέμου;",
                    "options": [
                        "Τσόρτσιλ",
                        "Τσάμπερλεν",
                        "Άτλι",
                        "Μπλερ"
                    ],
                    "answerIndex": 0,
                    "difficulty": "hard"
                },
                {
                    "id": 17,
                    "text": "Ποια δυναστεία κατασκεύασε το Σινικό Τείχος στη σημερινή γνωστή μορφή του;",
                    "options": [
                        "Χαν",
                        "Τσινγκ",
                        "Μινγκ",
                        "Τανγκ"
                    ],
                    "answerIndex": 2,
                    "difficulty": "hard"
                },
                {
                    "id": 18,
                    "text": "Ποια μάχη σήμανε την ήττα του Ναπολέοντα το 1815;",
                    "options": [
                        "Τραφάλγκαρ",
                        "Βατερλώ",
                        "Άουστερλιτς",
                        "Λειψία"
                    ],
                    "answerIndex": 1,
                    "difficulty": "hard"
                },
                {
                    "id": 19,
                    "text": "Ποια ήταν η πρώτη γυναίκα Πρωθυπουργός του Ηνωμένου Βασιλείου;",
                    "options": [
                        "Τερέζα Μέι",
                        "Μάργκαρετ Θάτσερ",
                        "Άνγκελα Μέρκελ",
                        "Ίντιρα Γκάντι"
                    ],
                    "answerIndex": 1,
                    "difficulty": "hard"
                },
                {
                    "id": 20,
                    "text": "Ποια αυτοκρατορία είχε ως κέντρο την Κωνσταντινούπολη;",
                    "options": [
                        "Οθωμανική",
                        "Ρωμαϊκή",
                        "Βυζαντινή",
                        "Περσική"
                    ],
                    "answerIndex": 2,
                    "difficulty": "hard"
                }
            ]
        },
        {
            "id": "sports",
            "name": "Αθλητισμος",
            "questions": [
                {
                    "id": 1,
                    "text": "Πόσοι παίκτες βρίσκονται στο γήπεδο σε μια ομάδα ποδοσφαίρου;",
                    "options": [
                        "11",
                        "10",
                        "9",
                        "12"
                    ],
                    "answerIndex": 0,
                    "difficulty": "easy"
                },
                {
                    "id": 2,
                    "text": "Ποια χώρα κατέκτησε το Παγκόσμιο Κύπελλο ποδοσφαίρου το 2018;",
                    "options": [
                        "Γερμανία",
                        "Βραζιλία",
                        "Γαλλία",
                        "Αργεντινή"
                    ],
                    "answerIndex": 2,
                    "difficulty": "easy"
                },
                {
                    "id": 3,
                    "text": "Στο τένις, ποιος είναι ο όρος για το μηδέν;",
                    "options": [
                        "Νιλ",
                        "Μηδέν",
                        "Love",
                        "Blank"
                    ],
                    "answerIndex": 2,
                    "difficulty": "easy"
                },
                {
                    "id": 4,
                    "text": "Σε ποιο άθλημα χρησιμοποιείται το φτερό (shuttlecock);",
                    "options": [
                        "Τένις",
                        "Μπάντμιντον",
                        "Σκουός",
                        "Πινγκ-πονγκ"
                    ],
                    "answerIndex": 1,
                    "difficulty": "easy"
                },
                {
                    "id": 5,
                    "text": "Πόσοι κρίκοι υπάρχουν στη σημαία των Ολυμπιακών Αγώνων;",
                    "options": [
                        "4",
                        "7",
                        "6",
                        "5"
                    ],
                    "answerIndex": 3,
                    "difficulty": "easy"
                },
                {
                    "id": 6,
                    "text": "Σε ποιο άθλημα εκτελείται ένα slam dunk;",
                    "options": [
                        "Βόλεϊ",
                        "Μπάσκετ",
                        "Χάντμπολ",
                        "Ράγκμπι"
                    ],
                    "answerIndex": 1,
                    "difficulty": "easy"
                },
                {
                    "id": 7,
                    "text": "Με ποιο άθλημα συνδέεται το Wimbledon;",
                    "options": [
                        "Γκολφ",
                        "Ράγκμπι",
                        "Κρίκετ",
                        "Τένις"
                    ],
                    "answerIndex": 3,
                    "difficulty": "easy"
                },
                {
                    "id": 8,
                    "text": "Ποια χώρα είναι γνωστή για το κρίκετ;",
                    "options": [
                        "ΗΠΑ",
                        "Ινδία",
                        "Ιαπωνία",
                        "Ισπανία"
                    ],
                    "answerIndex": 1,
                    "difficulty": "medium"
                },
                {
                    "id": 9,
                    "text": "Πόσο μήκος έχει μια ολυμπιακή πισίνα;",
                    "options": [
                        "25μ",
                        "50μ",
                        "75μ",
                        "100μ"
                    ],
                    "answerIndex": 1,
                    "difficulty": "medium"
                },
                {
                    "id": 10,
                    "text": "Ποιος αθλητής είναι γνωστός ως ο πιο γρήγορος άνθρωπος στον κόσμο;",
                    "options": [
                        "Γιουσέιν Μπολτ",
                        "Μο Φάρα",
                        "Κριστιάνο Ρονάλντο",
                        "Λιονέλ Μέσι"
                    ],
                    "answerIndex": 0,
                    "difficulty": "medium"
                },
                {
                    "id": 11,
                    "text": "Σε ποιο άθλημα διεξάγεται το Ryder Cup;",
                    "options": [
                        "Γκολφ",
                        "Τένις",
                        "Κρίκετ",
                        "Χόκεϊ"
                    ],
                    "answerIndex": 0,
                    "difficulty": "medium"
                },
                {
                    "id": 12,
                    "text": "Ποια χώρα φιλοξένησε τους πρώτους σύγχρονους Ολυμπιακούς Αγώνες το 1896;",
                    "options": [
                        "ΗΠΑ",
                        "Ισπανία",
                        "Ελλάδα",
                        "Κίνα"
                    ],
                    "answerIndex": 2,
                    "difficulty": "medium"
                },
                {
                    "id": 13,
                    "text": "Σε ποιο άθλημα πετυχαίνεται ένα hat-trick;",
                    "options": [
                        "Ράγκμπι",
                        "Μπάσκετ",
                        "Μπέιζμπολ",
                        "Ποδόσφαιρο"
                    ],
                    "answerIndex": 3,
                    "difficulty": "medium"
                },
                {
                    "id": 14,
                    "text": "Πόσα σετ παίζονται σε έναν τελικό Grand Slam ανδρών, στο τένις;",
                    "options": [
                        "3",
                        "4",
                        "5",
                        "6"
                    ],
                    "answerIndex": 2,
                    "difficulty": "medium"
                },
                {
                    "id": 15,
                    "text": "Ποια χώρα κατέκτησε το πρώτο Παγκόσμιο Κύπελλο ποδοσφαίρου το 1930;",
                    "options": [
                        "Βραζιλία",
                        "Ιταλία",
                        "Ουρουγουάη",
                        "Γερμανία"
                    ],
                    "answerIndex": 2,
                    "difficulty": "hard"
                },
                {
                    "id": 16,
                    "text": "Στη Formula 1, τι σημαίνει DRS;",
                    "options": [
                        "Dynamic Racing System",
                        "Drag Reduction System",
                        "Drive Response Setup",
                        "Dynamic Rotation Speed"
                    ],
                    "answerIndex": 1,
                    "difficulty": "hard"
                },
                {
                    "id": 17,
                    "text": "Ποιος πυγμάχος ήταν γνωστός ως «Ο Μεγαλύτερος» (The Greatest);",
                    "options": [
                        "Τάισον",
                        "Άλι",
                        "Μέιγουεδερ",
                        "Φρέιζερ"
                    ],
                    "answerIndex": 1,
                    "difficulty": "hard"
                },
                {
                    "id": 18,
                    "text": "Πόσοι παίκτες βρίσκονται στο γήπεδο σε μια ομάδα μπέιζμπολ;",
                    "options": [
                        "7",
                        "8",
                        "9",
                        "10"
                    ],
                    "answerIndex": 2,
                    "difficulty": "hard"
                },
                {
                    "id": 19,
                    "text": "Ποια χώρα έχει κερδίσει τα περισσότερα Ολυμπιακά μετάλλια συνολικά;",
                    "options": [
                        "Κίνα",
                        "ΗΠΑ",
                        "Ρωσία",
                        "Ηνωμένο Βασίλειο"
                    ],
                    "answerIndex": 1,
                    "difficulty": "hard"
                },
                {
                    "id": 20,
                    "text": "Ποιος τενίστας έχει κερδίσει τους περισσότερους τίτλους Grand Slam (μονά ανδρών);",
                    "options": [
                        "Φέντερερ",
                        "Ναδάλ",
                        "Σάμπρας",
                        "Ντζόκοβιτς"
                    ],
                    "answerIndex": 3,
                    "difficulty": "hard"
                }
            ]
        },
        {
            "id": "tv_movies",
            "name": "Τηλεοραση & Ταινιες",
            "questions": [
                {
                    "id": 1,
                    "text": "Ποιος σκηνοθέτησε την ταινία 'Τιτανικός';",
                    "options": [
                        "Στίβεν Σπίλμπεργκ",
                        "Τζέιμς Κάμερον",
                        "Κρίστοφερ Νόλαν",
                        "Μάρτιν Σκορσέζε"
                    ],
                    "answerIndex": 1,
                    "difficulty": "easy"
                },
                {
                    "id": 2,
                    "text": "Ποια τηλεοπτική σειρά περιλαμβάνει την οικογένεια Σταρκ;",
                    "options": [
                        "Breaking Bad",
                        "Game of Thrones",
                        "The Witcher",
                        "Vikings"
                    ],
                    "answerIndex": 1,
                    "difficulty": "easy"
                },
                {
                    "id": 3,
                    "text": "Ποιος υποδύθηκε τον Iron Man στο κινηματογραφικό Σύμπαν της Marvel;",
                    "options": [
                        "Κρις Έβανς",
                        "Κρις Χέμσγουορθ",
                        "Ρόμπερτ Ντάουνι Τζ.",
                        "Μαρκ Ράφαλο"
                    ],
                    "answerIndex": 2,
                    "difficulty": "easy"
                },
                {
                    "id": 4,
                    "text": "Ποιο είναι το όνομα της κύριας σχολής μαγείας στο Harry Potter;",
                    "options": [
                        "Ντάρμστρανγκ",
                        "Μπομπατόν",
                        "Χόγκουαρτς",
                        "Ιλβερμόρνι"
                    ],
                    "answerIndex": 2,
                    "difficulty": "easy"
                },
                {
                    "id": 5,
                    "text": "Ποια ταινία κινουμένων σχεδίων περιλαμβάνει τον χαρακτήρα Έλσα;",
                    "options": [
                        "Moana",
                        "Brave",
                        "Tangled",
                        "Frozen"
                    ],
                    "answerIndex": 3,
                    "difficulty": "easy"
                },
                {
                    "id": 6,
                    "text": "Σε ποια ταινία ακούγεται η φράση 'I'll be back';",
                    "options": [
                        "Rambo",
                        "The Terminator",
                        "Rocky",
                        "Die Hard"
                    ],
                    "answerIndex": 1,
                    "difficulty": "easy"
                },
                {
                    "id": 7,
                    "text": "Ποια πλατφόρμα streaming παρήγαγε το 'Stranger Things';",
                    "options": [
                        "Amazon Prime",
                        "Disney+",
                        "Netflix",
                        "Hulu"
                    ],
                    "answerIndex": 2,
                    "difficulty": "easy"
                },
                {
                    "id": 8,
                    "text": "Ποιος υποδύθηκε τον Τζακ Σπάροου στους Πειρατές της Καραϊβικής;",
                    "options": [
                        "Ορλάντο Μπλουμ",
                        "Τζόνι Ντεπ",
                        "Λεονάρντο Ντι Κάπριο",
                        "Μπραντ Πιτ"
                    ],
                    "answerIndex": 1,
                    "difficulty": "medium"
                },
                {
                    "id": 9,
                    "text": "Ποια ταινία κέρδισε Όσκαρ Καλύτερης Ταινίας το 2020;",
                    "options": [
                        "1917",
                        "Joker",
                        "Parasite",
                        "Ford v Ferrari"
                    ],
                    "answerIndex": 2,
                    "difficulty": "medium"
                },
                {
                    "id": 10,
                    "text": "Ποιος ηθοποιός υποδύθηκε τον Τζόκερ στο 'The Dark Knight';",
                    "options": [
                        "Χοακίν Φίνιξ",
                        "Κρίστιαν Μπέιλ",
                        "Τζάρεντ Λέτο",
                        "Χιθ Λέτζερ"
                    ],
                    "answerIndex": 3,
                    "difficulty": "medium"
                },
                {
                    "id": 11,
                    "text": "Ποια κινηματογραφική σειρά περιλαμβάνει τον χαρακτήρα Dominic Toretto;",
                    "options": [
                        "Mission Impossible",
                        "Fast & Furious",
                        "James Bond",
                        "Transformers"
                    ],
                    "answerIndex": 1,
                    "difficulty": "medium"
                },
                {
                    "id": 12,
                    "text": "Ποια σειρά διαδραματίζεται στο Χόκινς της Ιντιάνα;",
                    "options": [
                        "Lost",
                        "Stranger Things",
                        "Dark",
                        "The X-Files"
                    ],
                    "answerIndex": 1,
                    "difficulty": "medium"
                },
                {
                    "id": 13,
                    "text": "Ποιος δημιούργησε την τηλεοπτική σειρά 'Breaking Bad';",
                    "options": [
                        "Vince Gilligan",
                        "David Chase",
                        "Ryan Murphy",
                        "Shonda Rhimes"
                    ],
                    "answerIndex": 0,
                    "difficulty": "medium"
                },
                {
                    "id": 14,
                    "text": "Σε ποια ταινία εμφανίζεται ο χαρακτήρας Neo;",
                    "options": [
                        "Inception",
                        "The Matrix",
                        "Avatar",
                        "Blade Runner"
                    ],
                    "answerIndex": 1,
                    "difficulty": "medium"
                },
                {
                    "id": 15,
                    "text": "Ποιος σκηνοθέτης είναι γνωστός για την ταινία 'Pulp Fiction';",
                    "options": [
                        "Ταραντίνο",
                        "Σκορσέζε",
                        "Κιούμπρικ",
                        "Νόλαν"
                    ],
                    "answerIndex": 0,
                    "difficulty": "hard"
                },
                {
                    "id": 16,
                    "text": "Ποια ταινία κέρδισε Όσκαρ Καλύτερης Ταινίας το 1994;",
                    "options": [
                        "Pulp Fiction",
                        "Forrest Gump",
                        "The Shawshank Redemption",
                        "Four Weddings and a Funeral"
                    ],
                    "answerIndex": 1,
                    "difficulty": "hard"
                },
                {
                    "id": 17,
                    "text": "Ποιος ηθοποιός υποδύθηκε τον Βίτο Κορλεόνε στο 'The Godfather';",
                    "options": [
                        "Αλ Πατσίνο",
                        "Ρόμπερτ Ντε Νίρο",
                        "Μάρλον Μπράντο",
                        "Τζέιμς Κάαν"
                    ],
                    "answerIndex": 2,
                    "difficulty": "hard"
                },
                {
                    "id": 18,
                    "text": "Ποιο στούντιο κινουμένων σχεδίων παρήγαγε το 'Spirited Away';",
                    "options": [
                        "Pixar",
                        "DreamWorks",
                        "Disney",
                        "Studio Ghibli"
                    ],
                    "answerIndex": 3,
                    "difficulty": "hard"
                },
                {
                    "id": 19,
                    "text": "Ποια σειρά δημιουργήθηκε από τους David Benioff και D.B. Weiss;",
                    "options": [
                        "The Witcher",
                        "Game of Thrones",
                        "Westworld",
                        "House of Cards"
                    ],
                    "answerIndex": 1,
                    "difficulty": "hard"
                },
                {
                    "id": 20,
                    "text": "Ποιος ηθοποιός είχε τον πρωταγωνιστικό ρόλο στην ταινία 'Gladiator';",
                    "options": [
                        "Μπραντ Πιτ",
                        "Ράσελ Κρόου",
                        "Μελ Γκίμπσον",
                        "Τομ Χάρντι"
                    ],
                    "answerIndex": 1,
                    "difficulty": "hard"
                }
            ]
        }
    ]
}; 