# Connect to Firebase: Realtime Database
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

def init_db():
    # credentials
    cred = credentials.Certificate('json/AccountKey.json')

    # Init
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://oss24-9d001-default-rtdb.firebaseio.com/'
    })

    # Reference to the db
    ref = db.reference('/')

    return ref
