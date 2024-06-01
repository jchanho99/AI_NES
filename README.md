# AI_News_Thumbnail_Webpage
뉴스 헤드라인/링크를 스크래핑
스크래핑한 link들을 타고 뉴스 원문을 trafilatura를 사용하여, 기사내용들을 가져옴.
trafilatura를 사용하여 가져온 뉴스기사 원문을 openai-API 활용하여 프롬프트 엔지니어링을 거친 템플릿을 사용, 요약문을 생성하고 유저에게 제공할 데이터를 json 형태로 firebase에 추가.
위 과정을 AWS를 통하여 서버리스 클라우드 환경에서 자동화
