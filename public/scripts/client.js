/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => { 

  // Function: Takes tweet object and returns a tweet <article> in HTML
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
  
  // Empty and repopulate the container with each object 
  const renderTweets = function(tweets) {
    $("#tweets-container")
      .empty()
      .append( tweets.map(elem => createTweetElement(elem)) )
    return;
  }

  // Temporary hardcode for testing purposes:
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  renderTweets(data);
});