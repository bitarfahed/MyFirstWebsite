// משתנה מעקב (Flag) למצב הכפתור
let isChanged = false;

function changeTextAction() {
    let element = document.getElementById("action-output");
    
    if (isChanged === false) {
        element.innerHTML = "כל הכבוד! ה-JavaScript הפרדתי עובד מושלם!";
        element.style.color = "blue";
        isChanged = true; 
    } else {
        element.innerHTML = "הטקסט הזה יושפע מה-JS.";
        element.style.color = "black";
        isChanged = false; 
    }
}