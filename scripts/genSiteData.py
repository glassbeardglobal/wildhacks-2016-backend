#!usr/python3

import requests
from datetime import datetime, timedelta
import random

host = 'http://localhost:3000'
# host = 'sjback.herokuapp.com'

'''
payload = { 'name': 'Berty Denman', 'email': 'bdenman2@gmail.com', 'password': 'foobar' }
r = requests.post(host + '/api/users', data=payload)
'''

sites = ['reddit.com', 'reddit.com', 'stackoverflow.com', 'google.com', 'mongoosejs.com', 'yahoo.com', 'messenger.com',
  'mlh.io', 'leetcode.com', 'facebook.com', 'facebook.com', 'facebook.com', 'facebook.com', 'github.com', 'github.com',
  'github.com', 'amazon.com', 'npmjs.com']

uid = '58314b9aaeace126909de21a'

cur = datetime.today()

for i in range(150):
  elapsed = random.randint(5, 2000)
  inc = timedelta(seconds=elapsed)
  payload = { 'userid': uid, 'site': random.choice(sites), 'time': cur }
  requests.post(host + '/api/users/insertpage', data=payload)
  cur = cur + inc
  # print(cur)
