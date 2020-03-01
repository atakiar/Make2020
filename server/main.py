import time
import serial
import threading
from requests import get
from typing import Any, Tuple
from flask import Flask, jsonify

# Weather
WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?id=4513057&appid=20479d1b73eacd0ef1c2bf44c8a36635&units=imperial'

# AIO
AIO_URL = 'https://io.adafruit.com/api/v2/takav29050/feeds/'
AIO_KEY = 'aio_EjyW27l6g1QAuaZjm1c0Z444MNK6'
AIO_SHOULD_SIMULATE = 'shouldsimulate'
AIO_WEATHER_CODE = 'weathercode'
AIO_EFFICIENCY = 'efficiency'

# Serial Setup
ser = serial.Serial('/dev/ttyACM0', 9600)
time.sleep(2)

# Flask Setup
app = Flask(__name__)
ambientTemperature = 74


# Data Helpers
def getAIOAddress(feedKey: str) -> str:
    return f'{AIO_URL}{feedKey}?x-aio-key={AIO_KEY}'


def getDashboadData(feedKey: str) -> str:
    return get(getAIOAddress(feedKey)).json()['last_value']


def getWeatherData() -> Tuple[str, str]:
    data = get(WEATHER_URL).json()
    temperature = data['main']['temp']

    if getDashboadData(AIO_SHOULD_SIMULATE) == 'TRUE':
        weatherCode = getDashboadData(AIO_WEATHER_CODE)
    else:
        weatherCode = data['weather'][0]['id']

    temperature = f'{int(temperature):02d}'
    weatherCode = f'{int(weatherCode):03d}'

    return (temperature, weatherCode)


def getEfficencyData() -> str:
    efficency = getDashboadData(AIO_EFFICIENCY)
    efficency = f'{int(efficency):03d}'
    return efficency


# Arduino Helpers
def readFromArduino() -> int:
    message = ser.readline()
    message = message.decode()
    message = message.strip()
    print(message)
    return message


def writeToArduino(message) -> None:
    print(message)
    ser.write(message.encode('utf-8'))


def getArduinoData():
    threading.Timer(3.0, getArduinoData).start()
    message = readFromArduino()
    if message and message != '' and message.replace(" ", "") != '':
        global ambientTemperature
        ambientTemperature = int(message)


def sendArduinoData() -> None:
    threading.Timer(3.0, sendArduinoData).start()
    weather = getWeatherData()
    efficency = getEfficencyData()
    message = f'${weather[0]},{weather[1]},{efficency}'
    writeToArduino(message)


# Flask Helpers
@app.route('/')
def root():
    data = {'success': True, 'ambientTemperature': ambientTemperature}
    return jsonify(data)


# Main
def main():
    sendArduinoData()
    getArduinoData()
    app.run(host='0.0.0.0')


if __name__ == "__main__":
    main()
