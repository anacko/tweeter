/**
 * Displays how many chars are left in a new tweet.
 */

$(() => {

  $("#tweet-text").on("input", function() {

    // Count the amount of chars typed and write the difference in the counter field
    let charsTyped = $(this).val();
    const maxLength = 140;
    const $newTweetCounter = $(this).parent().find('.counter');
    $newTweetCounter.text(maxLength - charsTyped.length);

    // If the user overtyped, the number will turn red.
    if (charsTyped.length > maxLength) {
      $newTweetCounter.addClass("red");
    } else {
      $newTweetCounter.removeClass("red");
    }
  });

});