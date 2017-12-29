weather_config = {
    url: '/',
    type: 'GET',
    dataType: 'json',
    success: function(json) {
        render_weather(json);
    },
    error: function(resp) {
        error_handler(resp);
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

function error_handler(resp) {
    console.log("error: " + resp);

    window.setTimeout(function(){$.ajax(weather_config)}, 5000);  // 5s
}

function render_words() {
    array = ["如果有人追你，我会绊倒他", "命运不如你意，我如你意.", "我的每一支笔都知道你的名字", "去吧，皮卡丘"];
    index = Math.floor(Math.random() * array.length);
    words = array[index];
    $('#words').html(words);
}

$.ajax(weather_config);
render_words();
window.setInterval(render_words, 1000);
