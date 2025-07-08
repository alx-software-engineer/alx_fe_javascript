const quoteDisplay = document.querySelector("#quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const deleteBtn = document.createElement("button");
const deleteBtnText = document.createElement("span");
deleteBtnText.textContent = "Delete";
deleteBtn.classList.add("btn", "deleteBtn");
deleteBtn.appendChild(deleteBtnText);


let quotes = [];
// Load quotes from local-storage
const savedQuotes = JSON.parse(localStorage.getItem("myQoutes"));

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
}



function createAddQuoteForm() {
    const textInput = document.querySelector("#newQuoteText");
    const categoryInput = document.querySelector("#newQuoteCategory");

    if (textInput.value && categoryInput.value) {
        quotes.push({text : textInput.value, category:categoryInput.value})
        localStorage.setItem("myQoutes", JSON.stringify(quotes));
        quotes = JSON.parse(localStorage.getItem("myQoutes"));
        quoteDisplay.innerHTML = `<p>QUOTE : ${textInput.value}<p/> CATEGORY : ${categoryInput.value}`
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
    const randomNumber = Math.floor(Math.random() * (quotes.length));
    const selectedQuote = quotes[randomNumber];
    return selectedQuote;
}


function displayRandomQuote(itemObject) {
    quoteDisplay.innerHTML = `<p>QUOTE : ${itemObject.text}<p/> CATEGORY : ${itemObject.category}`;
}

newQuoteBtn.addEventListener("click", () => {
    const quote  = showRandomQuote();
    displayRandomQuote(quote);
})

