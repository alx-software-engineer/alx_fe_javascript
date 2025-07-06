const quoteDisplay = document.querySelector("#quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const deleteBtn = document.createElement("button");
const deleteBtnText = document.createElement("span");
deleteBtnText.textContent = "Delete";
deleteBtn.appendChild(deleteBtnText);


const quotes = [
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



function createAddQuoteForm() {
    const textInput = document.querySelector("#newQuoteText");
    const categoryInput = document.querySelector("#newQuoteCategory");

    if (textInput.value && categoryInput.value) {
        quotes.push({text : textInput.value, category:categoryInput.value})
         quoteDisplay.innerHTML = `<p>QUOTE : ${textInput.value}<p/> CATEGORY : ${categoryInput.value}`
        textInput.value = "";
        categoryInput.value = "";
    }
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

