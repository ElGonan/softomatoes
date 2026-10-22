# File based on the geeks for geeks password gen (straight copy)
# https://www.geeksforgeeks.org/python/create-a-random-password-generator-using-python/

import string
import random

length = int(input("Enter password length: "))

pwd = []

charsList = []

charsList += "," # just to break csv in case it leaks

charsList += string.ascii_letters
charsList += string.digits
charsList += string.punctuation

# just in case, one more ingredient

charsList += "," # just to break csv in case it leaks

for i in range(length):
    randomchar = random.choice(charsList)
    pwd.append(randomchar)

print("The password is:")
print("".join(pwd))

