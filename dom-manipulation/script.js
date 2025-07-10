const quoteDisplay = document.querySelector("#quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const deleteBtn = document.createElement("button");
const exportBtn = document.querySelector(".exportBtn");
const deleteBtnText = document.createElement("span");
const categoryFilter = document.getElementById("categoryFilter");
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
populateCategories(quotes);
let quotesTodisplayed = [];

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
        populateCategories(quotes);
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
    if (categoryFilter.value === "all") {
        loadSavedQuotes();
        const randomNumber = Math.floor(Math.random() * (quotes.length));
        const selectedQuote = quotes[randomNumber];
        return selectedQuote;
    } else {
        const randomNumber = Math.floor(Math.random() * (quotesTodisplayed.length));
        return randomNumber;
    }
    
}

function displayRandomQuote(itemObject) {
    quoteDisplay.innerHTML = `<p>QUOTE : ${itemObject.text}<p/> CATEGORY : ${itemObject.category}`;
    savedToSession();
}

function savedToSession() {
    sessionStorage.setItem("displayedQuote", JSON.stringify(quoteDisplay.innerHTML));
}

newQuoteBtn.addEventListener("click", () => {
    const result  = showRandomQuote();

    if (categoryFilter.value === "all") {
        displayRandomQuote(result);
    } else {
         quoteDisplay.innerHTML = `<p>QUOTE : ${quotesTodisplayed[result].text}<p/> CATEGORY : ${quotesTodisplayed[result].category}`;
    }
   
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

// Verify Quote file uploaded.
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }

  // Populate categories
  function populateCategories(myArray) {
    let presentCategory = myArray.map(item => item.category.toUpperCase());
    const uniqueCategories = [...new Set(presentCategory)];
    const categoryLength = uniqueCategories.length
    for (let i = 0; i < categoryLength; i++) {
        const option = document.createElement("option");
        option.value = uniqueCategories[i];
        option.textContent = uniqueCategories[i];

        categoryFilter.appendChild(option); 
    }
    
  }

  // Filter categories
  function filterQuotes() {
    const selectedCategory = categoryFilter.value;
    const selectedCategoryQuotes = [];

    if (selectedCategory !== "all") {
        quotes.forEach((item) => {
        if (item.category.toUpperCase() === selectedCategory) {
            selectedCategoryQuotes.push(item);
        }  
    })
    quotesTodisplayed = selectedCategoryQuotes;
    } else {
        return quotes;
    }
  }

  async function fetchQuotesFromServer() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

        if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get the server's response
    const responseData = await response.json();
    return responseData;

    } catch (error) {
         return `Server Error ${error}`;
    }
  }

  function syncQuotes() {
    const serverData = fetchQuotesFromServer()
    localStorage.setItem("myQuotes", JSON.stringify(serverData));
  }