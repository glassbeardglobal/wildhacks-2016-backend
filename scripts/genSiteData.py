import requests
from datetime import datetime, timedelta
import random

host = 'http://localhost:3000'
# host = 'sjback.herokuapp.com'

'''
payload = { 'name': 'Berty Denman', 'email': 'bdenman2@gmail.com', 'password': 'foobar' }
r = requests.post(host + '/api/users', data=payload)
'''

sites = ['reddit.com', 'stackoverflow.com', 'facebook.com', 'google.com', 'mongoosejs.com', 'yahoo.com', 'messenger.com',
  'github.com', 'mlh.io', 'leetcode.com']

uid = '583012dfba5a402a7db46495'

cur = datetime.today()

for i in range(100):
  elapsed = random.randint(5, 1200)
  inc = timedelta(seconds=elapsed)
  payload = { 'userid': uid, 'site': random.choice(sites), 'time': cur }
  requests.post(host + '/api/users/insertpage', data=payload)
  cur = cur + inc
  # print(cur)
