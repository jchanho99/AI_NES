# Connect to Firebase: Realtime Database

import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# credentials
cred = credentials.Certificate('json/AccountKey.json')

# Init
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://oss24-9d001-default-rtdb.firebaseio.com/'
})

# Reference to the db
ref = db.reference('/')

# Reading from db
users_ref = ref.get('2024년05월22일 , 10시26분56초 네이버 기사 헤드라인')
print(type(users_ref[0]), users_ref[0].keys())
