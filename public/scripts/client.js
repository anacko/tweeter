/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => { 

  // Function: Takes tweet object and returns the tweet in HTML
  const createTweetElement = function(tweetObj) {
    const $tweet = $(`
    <article class="tweet">
      <header>
        <span><img src=${tweetObj.user.avatars}>&nbsp${tweetObj.user.name}</span>
        <span class="user handle">${tweetObj.user.handle}</span>
      </header>
      <p>${tweetObj.content.text}</p>
      <footer>
        <span>${timeago.format(tweetObj.created_at)}</span>
        <span><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></span>
      </footer>
    </article>
    `);
    return $tweet;
  };
  
  // Function: Empties (due to new adds and subsequent requests)
  // then repopulates the container with each object in HTML form, in reverse order
  const renderTweets = function(tweetsArray) {
    $("#tweets-container")
      .empty()
      .append( tweetsArray.map(tweetObj => createTweetElement(tweetObj)).reverse() )
    return;
  }
  
  // Function (ajax): Renders the tweets in DB, async
  const fetchTweets = function() {
    $.ajax({
      url: "/tweets",
      success: (tweets) => {
        renderTweets(tweets);
      }
    })
  }

  // Initial setup: when the pages loads, render tweets:
  fetchTweets();

  // New tweets:
  $("#tweet-form").on("submit", function(event) {
    event.preventDefault();
    $.ajax({
        type: "POST",
        url: "/tweets",
        data: $(this).serialize(),
        success: () => {
          $("#tweet-text").val('')
          fetchTweets()
        }
      })
  });
});