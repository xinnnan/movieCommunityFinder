var tosearchInput = document.querySelector("#tosearch-text");
var tosearchForm = document.querySelector("#tosearch-form");
var tosearchList = document.querySelector("#tosearch-list");
var tosearchCountSpan = document.querySelector("#tosearch-count");

var tosearchs = [];


function rendertosearchs() {

  tosearchList.innerHTML = "";
  tosearchCountSpan.textContent = tosearchs.length;

  // Render a new li for each tosearch
  for (var i = 0; i < tosearchs.length; i++) {
    var tosearch = tosearchs[i];

    var li = document.createElement("li");
    li.textContent = tosearch;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "❌";

    li.appendChild(button);
    tosearchList.appendChild(li);
  }
}


function init() {
  // Get stored tosearchs from localStorage
  var storedtosearchs = JSON.parse(localStorage.getItem("tosearchs"));

  // If tosearchs were retrieved from localStorage, update the tosearchs array to it
  if (storedtosearchs !== null) {
    tosearchs = storedtosearchs;
  }

  rendertosearchs();
}

function storetosearchs() {
  localStorage.setItem("tosearchs", JSON.stringify(tosearchs));
}

// Add submit event to form
tosearchForm.addEventListener("submit", function(event) {
  event.preventDefault();

  var tosearchText = tosearchInput.value.trim();

  if (tosearchText === "") {
    return;
  }

  // Add new tosearchText to tosearchs array, clear the input
  tosearchs.push(tosearchText);
  tosearchInput.value = "";

  // Store updated tosearchs in localStorage, re-render the list
  storetosearchs();
  rendertosearchs();
});

// Add click event to tosearchList element
tosearchList.addEventListener("click", function(event) {
  var element = event.target;

  // Checks if element is a button
  if (element.matches("button") === true) {
    // Get its data-index value and remove the tosearch element from the list
    var index = element.parentElement.getAttribute("data-index");
    tosearchs.splice(index, 1);

    // Store updated tosearchs in localStorage, re-render the list
    storetosearchs();
    rendertosearchs();
  }
});

// Calls init to retrieve data and render it to the page on load
init()


// Beggining of js for imbeded table
// $('[data-open-details]').click(function (e) {
//   e.preventDefault();
//   $(this).next().toggleClass('is-active');
//   $(this).toggleClass('is-active');
// });
// End of js for imbeded table