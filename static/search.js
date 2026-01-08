// Debounce function to limit search frequency
function debounce(func, wait) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
}

// Create teaser/snippet from body content with highlighted terms
function makeTeaser(body, terms) {
  var TERM_WEIGHT = 40;
  var NORMAL_WORD_WEIGHT = 2;
  var FIRST_WORD_WEIGHT = 8;
  var TEASER_MAX_WORDS = 30;

  var stemmedTerms = terms.map(function (w) {
    return elasticlunr.stemmer(w.toLowerCase());
  });
  
  var termFound = false;
  var index = 0;
  var weighted = [];

  var sentences = body.toLowerCase().split(". ");

  for (var i in sentences) {
    var words = sentences[i].split(" ");
    var value = FIRST_WORD_WEIGHT;

    for (var j in words) {
      var word = words[j];

      if (word.length > 0) {
        for (var k in stemmedTerms) {
          if (elasticlunr.stemmer(word).startsWith(stemmedTerms[k])) {
            value = TERM_WEIGHT;
            termFound = true;
          }
        }
        weighted.push([word, value, index]);
        value = NORMAL_WORD_WEIGHT;
      }

      index += word.length;
      index += 1;
    }
    index += 1;
  }

  if (weighted.length === 0) {
    return body;
  }

  var windowWeights = [];
  var windowSize = Math.min(weighted.length, TEASER_MAX_WORDS);
  var curSum = 0;
  
  for (var i = 0; i < windowSize; i++) {
    curSum += weighted[i][1];
  }
  windowWeights.push(curSum);

  for (var i = 0; i < weighted.length - windowSize; i++) {
    curSum -= weighted[i][1];
    curSum += weighted[i + windowSize][1];
    windowWeights.push(curSum);
  }

  var maxSumIndex = 0;
  if (termFound) {
    var maxFound = 0;
    for (var i = windowWeights.length - 1; i >= 0; i--) {
      if (windowWeights[i] > maxFound) {
        maxFound = windowWeights[i];
        maxSumIndex = i;
      }
    }
  }

  var teaser = [];
  var startIndex = weighted[maxSumIndex][2];
  
  for (var i = maxSumIndex; i < maxSumIndex + windowSize; i++) {
    var word = weighted[i];
    if (startIndex < word[2]) {
      teaser.push(body.substring(startIndex, word[2]));
      startIndex = word[2];
    }

    if (word[1] === TERM_WEIGHT) {
      teaser.push("<mark>");
    }
    startIndex = word[2] + word[0].length;
    teaser.push(body.substring(word[2], startIndex));

    if (word[1] === TERM_WEIGHT) {
      teaser.push("</mark>");
    }
  }
  teaser.push("…");
  return teaser.join("");
}

// Format search result item
function formatSearchResultItem(item, terms) {
  return '<div class="search-result-item">'
    + '<h3 class="search-result-title"><a href="' + item.ref + '">' + item.doc.title + '</a></h3>'
    + '<div class="search-result-teaser">' + makeTeaser(item.doc.body, terms) + '</div>'
    + '</div>';
}

// Initialize search
function initSearch() {
  var $searchInput = document.getElementById("search");
  var $searchResults = document.querySelector(".search-results");
  var $searchResultsItems = document.querySelector(".search-results__items");
  var $searchInitial = document.querySelector(".search-initial");
  var MAX_ITEMS = 10;

  var options = {
    bool: "OR",
    fields: {
      title: {boost: 3},
      body: {boost: 1},
    }
  };
  
  var currentTerm = "";
  var index;

  var initIndex = async function () {
    if (index === undefined) {
      var url = "/search_index.en.js";
      if (window.location.origin.includes("127.0.0.1") || window.location.origin.includes("localhost")) {
        url = window.location.origin + url;
      }
      
      index = fetch(url)
        .then(async function(response) {
          return await response.text();
        })
        .then(function(text) {
          // The search_index.en.js file contains: window.searchIndex = {...}
          // We need to evaluate it and then load the index
          eval(text);
          return elasticlunr.Index.load(window.searchIndex);
        });
    }
    return await index;
  };

  $searchInput.addEventListener("keyup", debounce(async function() {
    var term = $searchInput.value.trim();
    
    if (term === currentTerm) {
      return;
    }
    
    currentTerm = term;
    
    if (term === "") {
      $searchResults.style.display = "none";
      $searchInitial.style.display = "block";
      $searchResultsItems.innerHTML = "";
      return;
    }

    $searchInitial.style.display = "none";
    $searchResults.style.display = "block";
    $searchResultsItems.innerHTML = '<li class="search-loading">Searching…</li>';

    var results = (await initIndex()).search(term, options);
    
    if (results.length === 0) {
      $searchResultsItems.innerHTML = '<li class="search-no-results">No results found for "' + term + '"</li>';
      return;
    }

    $searchResultsItems.innerHTML = "";
    for (var i = 0; i < Math.min(results.length, MAX_ITEMS); i++) {
      var item = document.createElement("li");
      item.innerHTML = formatSearchResultItem(results[i], term.split(" "));
      $searchResultsItems.appendChild(item);
    }
  }, 150));
}

if (document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)) {
  initSearch();
} else {
  document.addEventListener("DOMContentLoaded", initSearch);
}
