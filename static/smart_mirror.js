config = {
    url: '/',
    type: 'GET',
    dataType: 'json',
    success: function(json) {
        render(json);
    },
    error: function(resp) {
        error_handler(resp);
    }
};

function render(json) {
    $("#loading").hide();
    $("#box_day").empty();  // clear

    days = {
        0: '今',
        1: '明',
        2: '后'
    }

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
          <h3 id="date"><b>${date}</b> <em>${days[i]}天</em></h3>
          <ul>
            <li class="img"><img src=${pic_url} /></li>
            <li><p>${weather}</p></li>
            <li><p><b>${temp}</b></p></li>
            <li id="wind"><p>${wind}</p></li>
          </ul>
        </div>`;
        $("#box_day").append(template);
    }

    window.setTimeout(function(){$.ajax(config)}, 300000);  // 5min
}

function error_handler(resp) {
    console.log("error: " + resp);

    window.setTimeout(function(){$.ajax(config)}, 5000);  // 5s
}

$.ajax(config);
