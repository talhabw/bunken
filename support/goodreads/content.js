let s = document.createElement("script")

s.src = browser.runtime.getURL("support/goodreads/script.js")

s.onload = function () {
  this.remove()
}

let a = document.head || document.documentElement

a.appendChild(s)
