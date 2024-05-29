from connect import init_db

# Connect to db
ref = init_db()
users_ref = ref.get('2024년05월22일 , 10시26분56초 네이버 기사 헤드라인')
print(type(users_ref[0]), users_ref[0].keys())

# # Reading from db
# users_ref = ref.get('2024년05월22일 , 10시26분56초 네이버 기사 헤드라인')
# print(type(users_ref[0]), users_ref[0].keys())
# print(users_ref[0]['2024년05월22일 , 10시26분56초 네이버 기사 헤드라인'])