weather_config = {
    url: '/',
    type: 'GET',
    dataType: 'json',
    success: function(json) {
        render_weather(json);
    },
    error: function(resp) {
        weather_error_handler(resp);
    }
};

words_config = {
    url: '/static/words.json',
    type: 'GET',
    dataType: 'json',
    success: function(json) {
        render_words(json);
    }
};

function render_weather(json) {
    $("#loading").hide();
    $("#box_day").empty();  // clear

    for (i = 0; i < json.rows.length; ++i) {
        date_weather = json.rows[i].dateWeather.split(" ");
        date = date_weather[0];
        weather = date_weather[1];
        preweather = weather.split("转")[0];
        pic_url = "imgs/" + preweather + ".png";
        temp = json.rows[i].temp;
        wind = json.rows[i].wind;

        template = `
        <div class="table_day div${i}">
          <h2 id="date"><b>${date}</b></h2>
          <ul>
            <li class="img"><img src=${pic_url} /></li>
            <li><p>${weather}</p></li>
            <li><p><b>${temp}</b></p></li>
            <li id="wind"><p>${wind}</p></li>
          </ul>
        </div>`;
        $("#box_day").append(template);
    }

    clear_float = `
      <div class="clear_float"></div>
      `;
    $('#box_day').append(clear_float);

    window.setTimeout(function(){$.ajax(weather_config)}, 300000);  // 5min
}

function weather_error_handler(resp) {
    console.log("error: " + resp);

    window.setTimeout(function(){$.ajax(weather_config)}, 5000);  // 5s
}

function render_words(json) {
    index = Math.floor(Math.random() * json.array.length);
    words = json.array[index];
    $('#words').html(words);
}

$.ajax(weather_config);
$.ajax(words_config)

window.setInterval(function(){$.ajax(words_config)}, 3600000);
