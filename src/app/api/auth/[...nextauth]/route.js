export { GET, POST } from '@/lib/auth';

/*
  1. next-auth v5설치
  2. .env에 환경변수 등록 (AUTH_SECRET, AUTH_URL)
  3. AUTH_URL에 등록된 주소로 서버인증요청을 보내야함 api/auth/[...nextauth]/route.js 작성
  4. lib> auth.config.js등록 (추후 auth.js에서 활용될 설정코드를 따로 파일로 분리)
  5. 위에서 만든 config내용을 auth.js에서 합침 -> GET, POST응답에 대한 함수를 api>auth -> route.js에 전달
  -----------인증을 위한 모든 설정 완료-----------------

  


*/
