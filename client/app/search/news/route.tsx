// news test
import { NextResponse, type NextRequest } from 'next/server'

export function POST(request: NextRequest) {
    const token = request.headers.get('Authorization');
    console.log(token);
    if(!token) return Response.error();
    const response =
        {
            "lastBuildDate": "Sun, 26 May 2024 15:33:15 +0900",
            "total": 99025,
            "start": 1,
            "display": 10,
            "items": [
                {
                    "title": "<b>김호중</b> 학폭 의혹 제기한 유튜버에 '살인 예고' 글…&quot;도넘은 팬심&quot;",
                    "originallink": "https://view.asiae.co.kr/article/2024052615313092213",
                    "link": "https://n.news.naver.com/mnews/article/277/0005423294?sid=102",
                    "description": "음주 뺑소니 혐의로 구속된 가수 <b>김호중</b>의 학교 폭력 의혹을 제기한 유튜버가 자신에 대한 살인 예고 글을... 카라큘라 미디어에 따르면 지난 24일 오후 11시11분께 온라인 커뮤니티 '<b>김호중</b> 갤러리'에 '카라큘라 저 XX 내가... ",
                    "pubDate": "Sun, 26 May 2024 15:31:00 +0900"
                },
                {
                    "title": "[지평선] 증거가 뭐길래",
                    "originallink": "https://www.hankookilbo.com/News/Read/A2024052417350005150?did=NA",
                    "link": "https://n.news.naver.com/mnews/article/469/0000803308?sid=110",
                    "description": "□ 음주운전 치상 사고와 뺑소니 혐의로 구속된 가수 <b>김호중</b> 사건은 사법방해로 이름 붙여진 증거 훼손과... <b>김호중</b>은 사고 후 편의점에 들러 맥주를 샀다. 경찰조사에 대비한 방어전략이라면 ‘신박’하다. □ 대검찰청이... ",
                    "pubDate": "Sun, 26 May 2024 15:31:00 +0900"
                },
                {
                    "title": "&quot;<b>김호중</b> 소리길 치워라&quot;…김천시에 항의 민원 쏟아져",
                    "originallink": "https://www.newsis.com/view/?id=NISX20240526_0002748579&cID=10201&pID=10200",
                    "link": "https://n.news.naver.com/mnews/article/003/0012567586?sid=102",
                    "description": "이주영 인턴 기자 = 음주 뺑소니 혐의로 구속된 가수 <b>김호중</b>(33)을 상징물로 조성된 경북 김천의 '<b>김호중</b> 소리길'이 시민의 반대로 존폐 기로에 섰다. 경북 김천시 홈페이지 자유게시판에는 26일 오후 3시를 기준으로 약... ",
                    "pubDate": "Sun, 26 May 2024 15:16:00 +0900"
                },
                {
                    "title": "&quot;뺑소니 추모길이냐&quot;…김천시 '<b>김호중</b> 소리길 철거' 빗발쳐 고민",
                    "originallink": "https://www.news1.kr/articles/5427221",
                    "link": "https://n.news.naver.com/mnews/article/421/0007562211?sid=102",
                    "description": "'음주 뺑소니' 논란을 부인하며 여론의 공분을 산 트로트 가수 <b>김호중</b>이 결국 구속되자 그의 모교 옆 골목에 ‘<b>김호중</b> 소리길’을 조성한 경북 김천시의 고민이 깊어지고 있다. 김천시는 지난 2021년 <b>김호중</b>이 졸업한... ",
                    "pubDate": "Sun, 26 May 2024 15:16:00 +0900"
                },
                {
                    "title": "<b>김호중</b> 수사 '탄력'…'거짓말'이 자충수 됐나?",
                    "originallink": "https://news.tvchosun.com/site/data/html_dir/2024/05/26/2024052690036.html",
                    "link": "https://n.news.naver.com/mnews/article/448/0000459927?sid=102",
                    "description": "#<b>김호중</b> 수사 '탄력' - 경찰, 어제 <b>김호중</b> 구속 후 첫 소환조사 - <b>김호중</b>의 '음주운전 사고와 운전자 바꿔치기' 수사 - 경찰, <b>김호중</b> 구속 후 수사에 박차…전망은? #하늘빛으로 물들다 - 임영웅, 어제와 오늘 상암서 단독... ",
                    "pubDate": "Sun, 26 May 2024 15:12:00 +0900"
                },
                {
                    "title": "나락간 '트바로티' <b>김호중</b>, 음주운전 피하려다 구속까지[민경훈의 줌인]",
                    "originallink": "http://www.osen.co.kr/article/G1112343417",
                    "link": "https://m.entertain.naver.com/article/109/0005084283",
                    "description": "가수 <b>김호중</b>이 음주 뺑소니 혐의로 끝내 구속 기소됐다. 사고를 낸지 보름 만에, 음주 운전을 인정한지 닷새 만이다. <b>김호중</b>은 영화 '파파로티'의 모델로 잘 알려져 있다. 불우한 어린 시절을 극복하고 성악가에서 트로트... ",
                    "pubDate": "Sun, 26 May 2024 15:06:00 +0900"
                },
                {
                    "title": "‘미스터트롯 1’ 톱7, 무참히 갈린 운명[스경연예연구소]",
                    "originallink": "https://sports.khan.co.kr/news/sk_index.html?art_id=202405261500003&sec_id=540301&pt=nv",
                    "link": "https://m.entertain.naver.com/article/144/0000964027",
                    "description": "이후에도 ‘미스터트롯’ 시즌1 톱7(임영웅, 영탁, 이찬원, <b>김호중</b>, 정동원, 장민호, 김희재)의 팬덤은... 퇴출 수순 ‘구속 엔딩’ <b>김호중</b> 톱7 4위에 올랐던 <b>김호중</b>이 가장 최악의 상황을 맞았다. ‘미스터트롯’으로... ",
                    "pubDate": "Sun, 26 May 2024 15:01:00 +0900"
                },
                {
                    "title": "“도 넘은 팬심 어디까지”…<b>김호중</b> 학폭 폭로 유튜버에 살인 예고",
                    "originallink": "https://www.mk.co.kr/article/11024881",
                    "link": "https://n.news.naver.com/mnews/article/009/0005308864?sid=102",
                    "description": "음주운전 뺑소니 혐의로 구속된 가수 <b>김호중</b>(33)의 학교 폭력 의혹을 제기한 유튜버를 향한 살인 예고 글이... 카라큘라에 따르면 지난 24일 밤 11시11분께 온라인 커뮤니티 ‘<b>김호중</b> 갤러리’에는 ‘카라큘라 저 XX 내가... ",
                    "pubDate": "Sun, 26 May 2024 14:56:00 +0900"
                },
                {
                    "title": "음주 뺑소니로 구속된 <b>김호중</b> 의혹 제기 유튜버 살해 협박 받아",
                    "originallink": "https://www.gpkorea.com/news/articleView.html?idxno=114343",
                    "link": "https://www.gpkorea.com/news/articleView.html?idxno=114343",
                    "description": "음주운전 뺑소니 혐의로 구속된 가수 <b>김호중</b>의 학교폭력 의혹을 제기한 유튜버를 향한 살인 예고 글이... 한편 <b>김호중</b>은 5월 9일 밤 11시 40분쯤 서울 강남구 신사동에서 마주 오던 택시와 접촉사고를 낸 뒤 달아난 혐의를... ",
                    "pubDate": "Sun, 26 May 2024 14:52:00 +0900"
                },
                {
                    "title": "경찰, ‘구속’ <b>김호중</b> 강도 높은 수사…음주량·사건 은폐 의혹 추궁",
                    "originallink": "http://www.edaily.co.kr/news/newspath.asp?newsid=01764646638892856",
                    "link": "https://n.news.naver.com/mnews/article/018/0005748889?sid=102",
                    "description": "경찰이 ‘음주 뺑소니’ 혐의로 구속된 가수 <b>김호중</b>에 대한 강도 높은 수사를 이어가고 있다. 경찰은 구속... ‘음주 뺑소니’ 혐의를 받고 있는 트로트 가수 <b>김호중</b>이 지난 24일 서울 서초구 서울중앙지방법원에서... ",
                    "pubDate": "Sun, 26 May 2024 14:47:00 +0900"
                }
            ]
        };

        return new NextResponse(JSON.stringify(response), {status: 201});
}