const API = "https://api.bunken.tk/"

let ebookElement = document.createElement("div")
let ebookResultsElement
let relatedElement = document.querySelector('[id^="relatedWorks-"]')
let bookTitle = document
  .querySelector("[property='og:title']")
  .getAttribute("content")
let ISBNCode = document
  .querySelector("[property='books:isbn']")
  .getAttribute("content")
let authorName = document.getElementsByClassName("authorName")[0].innerText

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

function ebookElementInflator(results) {
  ebookResultsElement.innerHTML = ""
  results.forEach((book) => {
    let resultElement = document.createElement("div")
    resultElement.className = "elementList"
    let bookElement = document.createElement("div")
    let bookLinkElement = document.createElement("a")
    bookLinkElement.href = book.link
    bookLinkElement.textContent = book.title
    bookLinkElement.className = "actionLinkLite bookPageGenreLink"
    bookLinkElement.target = "_blank"
    bookElement.appendChild(bookLinkElement)
    resultElement.appendChild(bookElement)

    if (book.downloads != null) {
      book.downloads.forEach((download) => {
        let downloadElement = document.createElement("div")
        let downloadLinkElement = document.createElement("a")
        downloadLinkElement.href = download.link
        downloadLinkElement.textContent = download.format
        downloadLinkElement.style.color = "blue"
        downloadElement.appendChild(downloadLinkElement)
        resultElement.appendChild(downloadElement)
      })
    }

    let authorElement = document.createElement("div")
    authorElement.textContent = book.author
    resultElement.appendChild(authorElement)

    let clearElement = document.createElement("div")
    clearElement.className = "clear"
    resultElement.appendChild(clearElement)

    ebookResultsElement.appendChild(resultElement)
  })
}

function sourceSelect() {
  let e = document.getElementById("source")
  let value = e.options[e.selectedIndex].value
  search(value)
}

function setupUI() {
  ebookElement.innerHTML = `<div class="h2Container gradientHeaderContainer">
                        <h2 class="brownBackground">E-Books</h2>
                    </div>
                    <select id="source" onchange="sourceSelect()">
                    <option value="libgen">Source: LibGen</option>
                    <option value="motw">Source: Memory Of The World</option>
                    <option value="libgen/fiction">Source: LibGen Fiction</option>
                    <option value="audiobookbay">Source: AudioBookBay</option>
                    <option value="openlibrary">Source: OpenLibrary</option>
                    </select> 
                    <div id="ebookResults" class="bigBoxContent containerWithHeaderContent" style="overflow-y: auto; max-height: 300px;" id="resultsDiv">Searching...</div>`
  ebookElement.className = "bigBox"
  insertAfter(relatedElement, ebookElement)
  ebookResultsElement = document.getElementById("ebookResults")
}

function search(source) {
  ebookResultsElement.innerHTML = "Searching..."
  fetch(
    `${API}${source}?title=${encodeURIComponent(
      bookTitle
    )}&isbn=${encodeURIComponent(ISBNCode)}&author=${encodeURIComponent(
      authorName
    )}`
  ).then((response) => {
    response.json().then((res) => {
      ebookElementInflator(res)
    })
  })
}

setupUI()
search("libgen")
