export { GET, POST } from '@/lib/auth';

/*
  next-auth with Server action 인증작업 순서 파일
  lib > auth.js
  lib > auth.config.js 
  app > api > auth > [...nextauth]/route.js
  middleware.js
  .env : AUTH_URL, AUTH_SECRET등록

  전반적인 인증 흐름
  1.컴포넌트에서 로그인 요청시 환경변수에 AUTH_URL에 등록한 API end point로 서버요청 보냄
  2.api router의 전용 next_auth 라우터의 GET, POST함수를 통해서 클라이언트로 서버응답 처리
  3.api router가 응답해주는 GET, POST응답 함수를 lib>auth.js가 반환
  4.auth.js에는 기본적으로 인증성공 로직 작성후 해당 인증이 성공했을때 이동할 route경로와 인증정보객체 반환
  5.추후 middleware.js에서 필요한 auth객체 반환함수만 따로 auth.config.js에 분리한 뒤, auth.js에 병합
  6.auth에 등록한 로그인 인증이 성공하면 바로 라우터이동하는 것이 아닌 middleware.js가 중간에 개입
  7.middleware.js를 통해서 auth의 authorize메서드의 반환값이 true면 무조건 /로 이동처리하도록 보안 라우터 설정
*/
