# A08 팔좀주물러조 뉴스피드프로젝트 : 털뭉치들

<br><br>

## 🐈 목차

|             [🐈 프로젝트 소개 🐈](#cat-프로젝트-소개)             |
| :---------------------------------------------------------------: |
|            [🏠 프로젝트 구조 🏠](#home-사용-기술-스택)            |
|           [🍡 사용 기술 스택 🍡](#dango-사용-기술-스택)           |
| [🍵 기술적 고민과 트러블 슈팅 🍵](#tea-기술적-고민과-트러블-슈팅) |
|             [🥕 만든 사람들 🥕](#carrot-만든-사람들)              |

<br><br>

---

<br><br>

# 🐈 프로젝트 소개

### [🌕YouTube](https://www.youtube.com/watch?v=SmS-ahp5Ipo)

### [🌾Team Notion](https://www.notion.so/teamsparta/A08-e7e56bff62184a6180a77040da2a084a)

<br><br>

### 🐈🐕여러분의 털뭉치들을 자랑해보세요!😻🐶

|    블로그명     |                         털뭉치들                          |
| :-------------: | :-------------------------------------------------------: |
|      분류       |                      반려동물 블로그                      |
|    개발 환경    |                    React 18, supabase                     |
| 사용 라이브러리 | react-router-dom, redux-toolkit, styled-components, Quill |
|    개발 기간    |                  2024.05.31 ~ 2024.06.07                  |

<br><br>

[🌙 목차로 돌아가기](#cat-목차)

<br><br>

---

<br><br>

## 🏠 프로젝트 구조

```
📦src
 ┣ 📂assets
 ┃ ┗ 📜react.svg
 ┣ 📂components
 ┃ ┣ 📂Auth
 ┃ ┃ ┗ 📜LogInModal.jsx
 ┃ ┣ 📂Detail
 ┃ ┃ ┗ 📜Detail.jsx
 ┃ ┣ 📂Elements
 ┃ ┃ ┣ 📜Backdrop.jsx
 ┃ ┃ ┣ 📜Button.jsx
 ┃ ┃ ┣ 📜CustomImage.jsx
 ┃ ┃ ┣ 📜InputField.jsx
 ┃ ┃ ┣ 📜JoinInput.jsx
 ┃ ┃ ┣ 📜LikeButton.jsx
 ┃ ┃ ┣ 📜Likes.jsx
 ┃ ┃ ┗ 📜Loader.jsx
 ┃ ┣ 📂Footer
 ┃ ┃ ┗ 📜Footer.jsx
 ┃ ┣ 📂Header
 ┃ ┃ ┗ 📜Header.jsx
 ┃ ┣ 📂Join
 ┃ ┃ ┗ 📜Join.jsx
 ┃ ┣ 📂List
 ┃ ┃ ┣ 📜Card.jsx
 ┃ ┃ ┗ 📜MyWritingList.jsx
 ┃ ┣ 📂Main
 ┃ ┃ ┗ 📜Main.jsx
 ┃ ┣ 📂My
 ┃ ┃ ┗ 📜MyPage.jsx
 ┃ ┣ 📂MyList
 ┃ ┃ ┗ 📜MyList.jsx
 ┃ ┣ 📂Write
 ┃ ┃ ┣ 📜Editor.jsx
 ┃ ┃ ┗ 📜WriteForm.jsx
 ┃ ┗ 📜Layout.jsx
 ┣ 📂contexts
 ┃ ┗ 📜modal.context.jsx
 ┣ 📂hooks
 ┃ ┣ 📜useAuth.js
 ┃ ┗ 📜useBlogs.js
 ┣ 📂pages
 ┃ ┣ 📜DetailPage.jsx
 ┃ ┣ 📜HomePage.jsx
 ┃ ┣ 📜JoinPage.jsx
 ┃ ┣ 📜MyListPage.jsx
 ┃ ┣ 📜PersonalPage.jsx
 ┃ ┗ 📜WritePage.jsx
 ┣ 📂redux
 ┃ ┣ 📜auth.slice.js
 ┃ ┣ 📜blogs.slice.js
 ┃ ┗ 📜store.js
 ┣ 📂routes
 ┃ ┣ 📜ProtectedRoute.jsx
 ┃ ┗ 📜Router.jsx
 ┣ 📂supabase
 ┃ ┗ 📜supabaseClient.js
 ┣ 📂utils
 ┃ ┣ 📜base64ToFile.js
 ┃ ┣ 📜getDataUrl.js
 ┃ ┣ 📜resizeAndConvertImg.js
 ┃ ┗ 📜uploadFilesAndReplaceImageSrc.js
 ┣ 📜App.jsx
 ┗ 📜main.jsx
```

<br><br>

[🌙 목차로 돌아가기](#cat-목차)

<br><br>

---

<br><br>

# 🍡 사용 기술 스택

![vite](https://img.shields.io/badge/vite-5.2.12-646CFF?style=for-the-badge&logo=vite&logoColor=white)<br />
![supabase](https://img.shields.io/badge/@supabase/supabase--js-2.43.4-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white) <br />
![quill](https://img.shields.io/badge/quill-2.0.2-1D1D1D?style=for-the-badge&logo=quill&logoColor=white)<br />
![react](https://img.shields.io/badge/react-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)<br />
![react-dom](https://img.shields.io/badge/react--dom-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)<br />
![react-router-dom](https://img.shields.io/badge/react--router--dom-6.23.1-CA4245?style=for-the-badge&logo=react-router&logoColor=white)<br />
![styled-components](https://img.shields.io/badge/styled--components-6.1.11-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)<br />

<br><br>

[🌙 목차로 돌아가기](#cat-목차)

<br><br>

---

<br><br>

# 🍵 트러블 슈팅

### 트러블 슈팅

1. 중앙집중형 상태 관리의 어려움 해결:
      - 프로젝트 초기에는 상태 관리를 중앙집중형으로 구현하지 않아 관리에 어려움을 겪었습니다.
      - 이를 해결하기 위해 리덕스의 `createAsyncThunk`와 `extraReducers`를 활용하여 상태 관리를 중앙집중형으로 전환하였습니다.
      - 이로 인해 상태 관리가 더 체계적이고 일관성 있게 이루어졌습니다.

2. 복잡한 디스패치 구조 개선:
      - 중앙집중형 상태 관리로 전환했으나, 모든 컴포넌트에서 `dispatch`를 사용하는 것이 복잡하고 코드 중복이 발생하였습니다.
      - 이를 해결하기 위해 custom Hoioks를 구현하여 상태 관리와 dispatch를 간소화하고, 코드의 재사용성을 높였습니다.

3. 데이터 필터링의 서버 사이드 처리:
      - 처음에는 Supabase에서 모든 데이터를 받아온 후 클라이언트에서 필터링을 수행했으나, 성능 저하와 복잡성이 증가하는 문제가 있었습니다.
      - 이를 해결하기 위해 Supabase의 `eq()` 메서드를 사용하여 필요한 데이터만 서버에서 받아오도록 수정하였습니다. 이로 인해 데이터 처리 속도가 향상되고, 클라이언트 측의 부담이 줄어들었습니다.

4. Quill 에디터의 이미지 처리 방식 개선:
      - Quill 에디터에서 기본적으로 제공하는 Base64 인코딩 방식을 사용하였더니 이미지 데이터가 지나치게 커지는 문제가 발생했습니다.
      - 이를 해결하기 위해 `imageHandler` 함수를 추가하여, 이미지를 업로드할 때 Supabase Storage에 저장하고, 저장된 이미지의 `publicUrl`을 받아와 에디터에 적용하도록 처리하였습니다.
      - 이로써 이미지 처리 속도가 향상되고, 데이터 크기 문제를 해결할 수 있었습니다.

<br><br>

[🌙 목차로 돌아가기](#cat-목차)

<br><br>

---

<br><br>

## 🥕 팀원별 WBS

-   오 은 : Supabase 관련 로직 및 db 관리, redux-toolkit 관련 로직, customHooks 관련 로직, 디테일페이지 컴포넌트 제작
-   유인수 : 메인페이지 컴포넌트 및 카드, 버튼, 인풋, 개인별 페이지 컴포넌트 제작, 전체적인 스타일링
-   손지훈 : 회원가입 페이지 컴포넌트, 유효성 검사 로직, 회원가입 기능 연결, 전체적인 스타일링
-   곽현정 : 개인정보 관리 페이지 컴포넌트, 유효성 검사 로직, 개인정보 수정 기능 연결, 전체적인 스타일링
-   김도희 : 개인사정으로 불참

<br><br>

[🌙 목차로 돌아가기](#cat-목차)

<br><br>
