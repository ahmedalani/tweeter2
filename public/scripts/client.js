$(document).ready(function () {

  // takes a tweet object returns tweet element (html article)
  const createTweetElement = function (data) {
    const { user, content, created_at } = data;
    const $tweet = $(`
      <article class="tweet">
        <header>
          <div>
            <img src=${user.avatars} alt="profile-pic" height="45" width="45">
            <p>${user.name}</p>
          </div>
          <div>
            <a class="handle" href="./localhost:8080/yourname">${user.handle}</a>
          </div>
        </header>
        <p>${content.text}</p>
        <footer>
          <div>
            <time>${created_at}</time>
          </div>
          <div>
            <button>F</button>
            <button>S</button>
            <button>H</button>
          </div>
        </footer>
      </article>
    `);
    return $tweet;
  };

  // takes an array of tweet objects and append them to the tweet-container
  const renderTweets = function (data) {
    for (const tweet of data) {
      let $tweet = createTweetElement(tweet)
      $('#tweet-container').append($tweet);
    };
  };

  // handle new tweet submit form, create data and send it to server
  $('.new-tweet-form').submit(function (e) {
    e.preventDefault()
    let text = $('.new-tweet-form textarea').val();
    if (text === '' || text === null) {
      alert('type something, fool!')
    } else if (text.length > 140) {
      alert('tweet is too long, fool!')
    } else {
      console.log($('.new-tweet-form').serialize())
      $.ajax({
        url: '/',
        method: 'POST',
        data: $('.new-tweet-form').serialize()
      })
    }
    // let data = [];
    // let tweet = { user: {}, content: {}, created_at: 0 };
    // tweet.content.text = $('.new-tweet-form textarea').val();

    // .then(function (data) {
    //   loadTweets();
    // })
  });

  const loadTweets = function () {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    })
      .then(function (tweets) {
        renderTweets(tweets);
      });
  };
  loadTweets();
});  


  /*
  
  Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
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
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  */
 