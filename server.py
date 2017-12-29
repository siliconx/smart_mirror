from flask import Flask
from spider import get_weather

app = Flask(__name__)

@app.route('/')
def weather():
    try:
        resp = get_weather()
    except Exception as e:
        return ""

    return resp

if __name__ == '__main__':
    app.run(debug=True)