# Connect to Firebase: Realtime Database
import firebase_admin
from firebase_admin import credentials, db

def init_db(date=None):
    # credentials
    cred = credentials.Certificate('json/AccountKey.json')

    # Init
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://oss24-9d001-default-rtdb.firebaseio.com/'
    })

    # Reference to the db
    if date==None:
        ref = db.reference('news_data')
    else:
        ref = db.reference(f'news_data/{date}')

    print("Log-in complete")
    return ref

