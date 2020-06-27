$(document).ready(function () {
  $('.new-tweet-form').on('keyup', function () {
    let tweetLength = $(this).children('#tweet-text').val().length;
    let counterValue = 140 - tweetLength;
    if (counterValue < 0) {
      $(this).find('.counter').text(counterValue).addClass('tweet-too-long');
    } else {
      $(this).find('.counter').text(counterValue).removeClass('tweet-too-long');
    }
  });
});
