/** Adds button that shows when user scrolls down and brings to top*/

$(() => {

  $('#big-round-red-button').hide();

  $(window).on('scroll', function() {
    const $redButton = $('#big-round-red-button');
    const $scrollFromTop = $(this).scrollTop();
  
    if ($scrollFromTop > 300) {
      $redButton.fadeIn(200);
    } else {
      $redButton.fadeOut(200);
    }
  });

});