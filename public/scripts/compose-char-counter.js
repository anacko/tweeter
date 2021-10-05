/**
 * Displays how many chars are left in a new tweet.
 */

$(() => {
  $( "#tweet-text" )
    .keydown(function() {
      let charsTyped = $( this ).val();
      const maxLength = 140; // $( this ).attr( 'maxlength' );
      const newTweetCounter = $(this).parent().find('.counter');
      $(newTweetCounter).text(maxLength - charsTyped.length);
    })

});