/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => { 

  // Function: Takes tweet object and returns the tweet in HTML
  const createTweetElement = function(tweetObj) {

    // Safe space for the user input - prevents Cross-Site-Scripting (XSS)
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const $tweet = $(`
    <article class="tweet">
      <header>
        <span><img src=${tweetObj.user.avatars}>&nbsp${tweetObj.user.name}</span>
        <span class="user handle">${tweetObj.user.handle}</span>
      </header>
      <p>${escape(tweetObj.content.text)}</p>
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
    $('#tweets-container')
      .empty()
      .append( tweetsArray.map(tweetObj => createTweetElement(tweetObj)).reverse() )
    return;
  }
  
  // Function (ajax): Renders the tweets in DB, async
  const fetchTweets = function() {
    $.ajax({
      url: '/tweets',
      success: (tweets) => {
        renderTweets(tweets);
      }
    })
  }

  // Initial setup: when the pages loads, render tweets:
  fetchTweets();


  // Show/hide feature to add new tweets
  $('.nav-right').on('click', function(event) {
    const $newTweet = $('.new-tweet')
    if ($newTweet.is(':hidden')) {
      $newTweet.slideDown(600)
      $('#tweet-text').focus()
    } else {
      $newTweet.slideUp(600)
    }
  });

  

  // Posting new tweets:
  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();
    const tweetSize = $('#tweet-text').val().length
    if (tweetSize === 0) {
      $(".new-tweet .error-msg")
        .empty()
        .append("Nothing typed! Did you mean to post an empty tweet?")
        .fadeIn(1000)
    } else if (tweetSize > 140) {
      $(".new-tweet .error-msg")
      .empty()
      .append("This tweet is too long. Remember! <em>Brevity is the Soul of Wit.<em>")
      .fadeIn(1000)
    } else {
      $(".new-tweet .error-msg")
        .fadeOut(600)
      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: $(this).serialize(),
        success: () => {
          $(this).find('.counter').val(140);
          $('#tweet-text').val('');
          fetchTweets();
        }
      })
    }
  });

  // Animates the jumping double-arrows
  $('.fa-angle-double-down').animate({left: "+=5"}.always())
});