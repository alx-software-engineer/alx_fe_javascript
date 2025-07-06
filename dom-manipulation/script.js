const quoteDisplay = document.querySelector("#quoteDisplay");
const newQuoteBtn = document.querySelector("#newQuote");


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

function addQuote() {
   
}


function showRandomQuote() {
    const randomNumber = Math.floor(Math.random() * (quotes.length));
    const selectedQuote = quotes[randomNumber];
    return selectedQuote;
}


function displayRandomQuote(itemObject) {
    const newQuoteContainer = document.createElement("div");
    const newQuoteText = document.createElement("p");
    const newQuoteCategory = document.createElement("p");

    newQuoteContainer.classList.add("newQuoteContainer");
    newQuoteText.classList.add("text")
    newQuoteCategory.classList.add("category")
    newQuoteText.textContent = `QUOTE : ${itemObject.text}`;
    newQuoteCategory.textContent = `CATEGORY : ${itemObject.category}`;

    // Add to container.
    newQuoteContainer.appendChild(newQuoteText);
    newQuoteContainer.appendChild(newQuoteCategory);
    quoteDisplay.appendChild(newQuoteContainer);
}

newQuoteBtn.addEventListener("click", () => {
    const quote  = showRandomQuote();
    displayRandomQuote(quote);
})

