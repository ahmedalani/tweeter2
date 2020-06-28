$(document).ready(function () {

  // takes a tweet object returns tweet element (html article)
  const createTweetElement = function (data) {
    const { user, content, created_at } = data;
    const $tweet = $(safeTemplate`
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
  // escape injuctions (XSS)
  const safeTemplate = function (strings, ...replacement) {
    const result = strings.map((s, i) => {
      return s + safeText(replacement[i] || '');
    });
    return result.join('');
  }
  const safeText = function (text) {
    const div = document.createElement('div');
    const textNode = document.createTextNode(text);
    div.appendChild(textNode);
    return div.innerHTML;
  }


  // takes an array of tweet objects and append them to the tweet-container
  // in correct order (new first)
  const renderTweets = function (data) {
    $('#tweet-container')
      .empty()
      .append(data.map(createTweetElement).reverse());
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
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $('.new-tweet-form').serialize()
      })
        .then(function () {
          $('.new-tweet-form textarea').val('');
          loadTweets();
        });
    }

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