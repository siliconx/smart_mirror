import os
import time
import RPi.GPIO as GPIO


pin = 24  # GPIO pin
GPIO.setmode(GPIO.BCM)
GPIO.setup(pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.wait_for_edge(pin, GPIO.FALLING)

try:
    # kill chromium before shutdown
    os.system('killall chromium-browser')
    time.sleep(2.5)
    os.system('shutdown -h now')
except Exceptioin as e:
    print(e)
