from picamera import PiCamera
from random import randint
camera = PiCamera()
camera.capture('/home/pi/Desktop/image'+str(randint(10000, 99999))+'.jpg')