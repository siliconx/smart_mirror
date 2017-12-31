import re
import requests

def get_weather():
    """Get weather."""

    login_url = 'https://cas.ncu.edu.cn:8443/cas/login'
    weather_url = 'http://my.ncu.edu.cn/we_loadWeatherJson.action'

    try:
        response = requests.get(login_url, timeout=10)  # get login page and session cookie
    except Exception as e:
        return ""

    cookie = "JSESSIONID=%s" % response.cookies.get('JSESSIONID')  # session cookie

    # get hidden item 'lt' of form by re
    lt = re.search(r'name="lt" value="(.*)"', response.text)
    if lt:
        lt = lt.group(1)
    else:
        return

    # get hidden item 'execution' of form by re
    execution = re.search(r'name="execution" value="(.*)"', response.text)
    if execution:
        execution = execution.group(1)
    else:
        return

    form = {  # form be sent
        "username": "6103******",
        "password": "***",
        "lt": lt,
        "execution": execution,
        "_eventId": "submit",
    }

    response = requests.post(login_url, data=form, headers={'Cookie': cookie})

    # get authenticated cookie
    if len(response.history) == 4:
        # new cookie set on the last rediction
        cookie = response.history[-1].headers['Set-Cookie']
    else:
        return

    # get weather by new cookie
    weather = requests.get(weather_url, headers={'Cookie': cookie})

    return weather.text

if __name__ == '__main__':
    print(get_weather())
