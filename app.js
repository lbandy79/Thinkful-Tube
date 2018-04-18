const SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
//Not My Code
var RESULT_HTML_TEMPLATE = (
  '<div>' +
    '<a class="js-image-link" href=""><img class="js-image" src=""></a>' +
  '</div>'
);

function getDataFromApi(searchTerm, callback) {
  const query = {
    part: 'snippet',
    key: 'AIzaSyCl2ibdjYd7Mm8XCuSgmDv0fPdP0bOQF7M',
    q: searchTerm /*+ " in:name"*/,
  };
  $.getJSON(SEARCH_URL, query, callback);
}

//Not My Code. 
function renderResult(result) {
  var template = $(RESULT_HTML_TEMPLATE);
  template.find(".js-image").attr("src", result.snippet.thumbnails.medium.url);
  template.find(".js-image-link").attr("href", 
  'https://www.youtube.com/watch?v=' + result.id.videoId)
  console.log(result.name);
  return template;
}


function displayYouTubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);