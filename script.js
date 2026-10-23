// ==========================================
// 1. בסיס הנתונים - מערך של אובייקטים
// ==========================================
let peopleDatabase = [
    { id: 1, name: "ישראל", age: 30, gender: "זכר", country: "Israel" },
    { id: 2, name: "דנה", age: 25, gender: "נקבה", country: "US" }
];

// משתנים לעקב אחרי מצב התצוגה והטופס
let isListVisible = false;

// ==========================================
// 2. ניהול כפתור Show / Hide
// ==========================================
function togglePeopleList() {
    let listContainer = document.getElementById("people-list-container");
    let toggleBtn = document.getElementById("toggle-list-btn");

    if (isListVisible === false) {
        // מצב Show: מציגים את הרשימה ומעדכנים את הכפתור
        renderPeopleList(); // מרענן ובונה את הרשימה מחדש
        listContainer.classList.remove("hidden");
        toggleBtn.innerHTML = "Hide";
        isListVisible = true;
    } else {
        // מצב Hide: מסתירים את הרשימה
        listContainer.classList.add("hidden");
        toggleBtn.innerHTML = "Show";
        isListVisible = false;
    }
}

// ==========================================
// 3. הצגת הרשימה ומחיקת אדם בודד
// ==========================================
function renderPeopleList() {
    let listElement = document.getElementById("people-list");
    listElement.innerHTML = ""; // מרוקנים את הרשימה הישנה לפני יצירה מחדש

    if (peopleDatabase.length === 0) {
        listElement.innerHTML = "<p>אין אנשים ברשימה כרגע.</p>";
        return;
    }

    // עוברים על כל אדם במערך ויוצרים עבורו כרטיסייה ב-HTML
    peopleDatabase.forEach(function(person) {
        let card = document.createElement("div");
        card.className = "person-card";

        card.innerHTML = `
            <div class="person-info">
                <strong>${person.name}</strong> | גיל: ${person.age} | מין: ${person.gender} | מדינה: ${person.country}
            </div>
            <button class="delete-btn" onclick="deletePerson(${person.id})">Delete</button>
        `;

        listElement.appendChild(card);
    });
}

// פונקציית מחיקת אדם לפי ה-ID הייחודי שלו
function deletePerson(personId) {
    // מסננים את המערך ושומרים רק את האנשים שה-ID שלהם שונה מזה שמוחקים
    peopleDatabase = peopleDatabase.filter(function(person) {
        return person.id !== personId;
    });

    // מרעננים את התצוגה שעל המסך
    renderPeopleList();
}

// ==========================================
// 4. ניהול טופס הוספת אדם חדש (Add / Send)
// ==========================================
function showAddForm() {
    document.getElementById("add-form-container").classList.remove("hidden");
}

function hideAddForm() {
    document.getElementById("add-form-container").classList.add("hidden");
    clearFormFields();
}

function clearFormFields() {
    document.getElementById("person-name").value = "";
    document.getElementById("person-age").value = "";
}

// פונקציית Send: אימות נתונים והוספה למערך
function sendNewPerson() {
    let nameInput = document.getElementById("person-name").value.trim();
    let ageInput = document.getElementById("person-age").value.trim();
    let countryInput = document.getElementById("person-country").value;
    
    // שליפת המין שנבחר מתוך ה-Radio buttons
    let genderInput = document.querySelector('input[name="gender"]:checked').value;

    // --- ולדיציות (בדיקת תקינות) ---

    // 1. בדיקת שם: בדיקה שהשם מכיל רק אותיות (בעברית או באנגלית) ואינו ריק
    let nameRegex = /^[a-zA-Zא-ת\s]+$/;
    if (!nameInput || !nameRegex.test(nameInput)) {
        alert("אנא הכנס שם תקין (אותיות בלבד, ללא מספרים).");
        return;
    }

    // 2. בדיקת גיל: בין 0 ל-100
    let ageNumber = Number(ageInput);
    if (ageInput === "" || isNaN(ageNumber) || ageNumber < 0 || ageNumber > 100) {
        alert("אנא הכנס גיל תקין בין 0 ל-100.");
        return;
    }

    // --- הוספה לבסיס הנתונים ---

    // יצירת אובייקט אדם חדש
    let newPerson = {
        id: Date.now(), // מזהה ייחודי מבוסס זמן
        name: nameInput,
        age: ageNumber,
        gender: genderInput,
        country: countryInput
    };

    // דחיפת האובייקט למערך
    peopleDatabase.push(newPerson);

    // הסתרת הטופס וניקוי השדות
    hideAddForm();

    // אם הרשימה פתוחה באותו רגע, נרענן אותה מיד כדי לראות את האדם החדש
    if (isListVisible) {
        renderPeopleList();
    }

    alert("האדם נשמר בהצלחה!");
}