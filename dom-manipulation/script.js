const quoteDisplay = document.querySelector("#quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const deleteBtn = document.createElement("button");
const exportBtn = document.querySelector(".exportBtn");
const deleteBtnText = document.createElement("span");
deleteBtnText.textContent = "Delete";
deleteBtn.classList.add("btn", "deleteBtn");
deleteBtn.appendChild(deleteBtnText);


// Load quotes from local-storage
let quotes;
const savedQuotes = JSON.parse(localStorage.getItem("myQuotes"));
function loadSavedQuotes() {

    // check if quote is present.
    if (savedQuotes) {
        quotes = savedQuotes;
    } else {
        quotes = [
            {
                text: "What a man can do a woman can do better.",
                category: "Local"
            },

            {
                text: "Nothing good comes easy.",
                category: "Global"
            },

            {
                text: "A journey of a thousand miles, begins with a single step.",
                category: "Global"
            },

            {
                text: "Fear woman wey like you, only if you have owo!!.",
                category: "Local"
            }
        ]

        localStorage.setItem("myQuotes", JSON.stringify(quotes));
    }
}

loadSavedQuotes();

// Check for last displayed qoute.
const lastDisplayedQuote = JSON.parse(sessionStorage.getItem("displayedQuote"));
if (lastDisplayedQuote) {
    quoteDisplay.innerHTML = lastDisplayedQuote;
}



function createAddQuoteForm() {
    const textInput = document.querySelector("#newQuoteText");
    const categoryInput = document.querySelector("#newQuoteCategory");

    if (textInput.value && categoryInput.value) {
        quotes.push({text : textInput.value, category:categoryInput.value})
        localStorage.setItem("myQuotes", JSON.stringify(quotes));
        quotes = JSON.parse(localStorage.getItem("myQuotes"));
        quoteDisplay.innerHTML = `<p>QUOTE : ${textInput.value}<p/> CATEGORY : ${categoryInput.value}`
        savedToSession();
        textInput.value = "";
        categoryInput.value = "";
    } else (
        alert("Both inputs needs to be filled first!!")
    )
}

function addQuote() {
   createAddQuoteForm()
}


function showRandomQuote() {
    loadSavedQuotes();
    const randomNumber = Math.floor(Math.random() * (quotes.length));
    const selectedQuote = quotes[randomNumber];
    return selectedQuote;
}


function displayRandomQuote(itemObject) {
    quoteDisplay.innerHTML = `<p>QUOTE : ${itemObject.text}<p/> CATEGORY : ${itemObject.category}`;
    savedToSession();
}

function savedToSession() {
    sessionStorage.setItem("displayedQuote", JSON.stringify(quoteDisplay.innerHTML));
}

newQuoteBtn.addEventListener("click", () => {
    const quote  = showRandomQuote();
    displayRandomQuote(quote);
})

// Export/Download Quotes.
exportBtn.addEventListener("click", (e) => {
    // Blob and Url
    const blob = new Blob([JSON.stringify(quotes, null, 2)], {type : "application/json"});
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "My Quotes.json";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url);
})

