## 과제 배포 링크

https://hanbeulyou.github.io/front_5th_chapter2-3/

## 과제 체크포인트

### 기본과제

#### 목표 : 전역상태관리를 이용한 적절한 분리와 계층에 대한 이해를 통한 FSD 폴더 구조 적용하기

- 전역상태관리를 사용해서 상태를 분리하고 관리하는 방법에 대한 이해
- Context API, Jotai, Zustand 등 상태관리 라이브러리 사용하기
- FSD(Feature-Sliced Design)에 대한 이해
- FSD를 통한 관심사의 분리에 대한 이해
- 단일책임과 역할이란 무엇인가?
- 관심사를 하나만 가지고 있는가?
- 어디에 무엇을 넣어야 하는가?

#### 체크포인트

- [x] 전역상태관리를 사용해서 상태를 분리하고 관리했나요?
- [x] Props Drilling을 최소화했나요?
- [x] shared 공통 컴포넌트를 분리했나요?
- [x] shared 공통 로직을 분리했나요?
- [x] entities를 중심으로 type을 정의하고 model을 분리했나요?
- [x] entities를 중심으로 ui를 분리했나요?
- [x] entities를 중심으로 api를 분리했나요?
- [x] feature를 중심으로 사용자행동(이벤트 처리)를 분리했나요?
- [x] feature를 중심으로 ui를 분리했나요?
- [x] feature를 중심으로 api를 분리했나요?
- [x] widget을 중심으로 데이터를 재사용가능한 형태로 분리했나요?

### 심화과제

#### 목표: 서버상태관리 도구인 TanstackQuery를 이용하여 비동기코드를 선언적인 함수형 프로그래밍으로 작성하기

- TanstackQuery의 사용법에 대한 이해
- TanstackQuery를 이용한 비동기 코드 작성에 대한 이해
- 비동기 코드를 선언적인 함수형 프로그래밍으로 작성하는 방법에 대한 이해

#### 체크포인트

- [x] 모든 API 호출이 TanStack Query의 useQuery와 useMutation으로 대체되었는가?
- [x] 쿼리 키가 적절히 설정되었는가?
- [x] fetch와 useState가 아닌 선언적인 함수형 프로그래밍이 적절히 적용되었는가?
- [x] 캐싱과 리프레시 전략이 올바르게 구현되었는가?

## 과제 셀프회고

이번 과제에서는 FSD를 '멘탈모델'로 접근하려고 노력했다. 단순히 칼 같이 기준을 세워 나누기보다는, 피쳐 단위로 로직을 묶고, widget 단위로 UI를 추상화하며, entity 중심으로 관심사를 분리하는 데 초점을 뒀다.
결과적으로, 구조화된 폴더보다 중요한 것은 ‘어떻게 기능 단위를 응집력 있게 관리할 것인가’라는 관점이었다.

실제 리팩토링은 다음과 같은 순서로 진행했다:

> 타입 정의

API 응답 구조를 바탕으로 각 entity의 타입을 먼저 정의해두고 시작했다. 설계에 필요한 기준점이 되어주었고, 이후 로직 분리에 중요한 역할을 했다.

> API 분리

fetch 로직을 entity 중심으로 분리하되, POST 관련 기능이더라도 필터링된 요청(tag, search 등)은 feature 계층에서 분기 처리하는 방향으로 정리했다.

> 로직 분리

초반에는 customHook + zustand만으로 상태 관리와 비즈니스 로직을 분리했다. 각각의 관심사를 명확히 나누는 데 도움이 되었지만, 서버 상태 관리에서 동기화 비용이 커지는 문제가 있었다.

> UI 분리 중 상태 관리 문제 발생

UI를 분리하는 과정에서 props drilling 문제가 발생했고, 이로 인해 단순한 상태 하나, 로직 하나를 전달하기 위해 너무 많은 prop이 전달되는 구조가 되었다.

> React Query 도입

상태 관리의 일관성과 중복 fetch 해소, 로딩 상태 관리 등을 위해 react-query를 도입했다. 이를 계기로 서버 상태와 클라이언트 상태를 분리해 생각하게 되었고, 로직을 다시 정리하는 계기가 되었다.

> 로직 재정의 → UI 재분리

react-query를 중심으로 로직을 재구성하면서, UI 컴포넌트를 widget 단위로 쪼개는 작업도 동시에 진행했다. 서버 상태는 react-query, UI 상태는 zustand로 관리하는 구조로 작성했다.

## 과제중 질문 사항

### ❓하나의 usePostsQuery 훅 안에서 모든 게시물 조회 로직을 통합해도 괜찮을까요?

기존에는 검색, 태그 필터, 일반 게시물 조회를 각각 다른 쿼리 훅으로 나누어 처리했습니다. 하지만 이로 인해 각 UI 단에서 어떤 데이터를 사용할지에 대한 분기 처리가 복잡해졌고, 중복되는 상태 관리 로직도 생겼습니다.

이에 따라 다음과 같이 하나의 useQuery 내부에서 분기 처리하도록 통합하였습니다:

```tsx
if (searchQuery) {
  postsData = await fetchPostsBySearch({ searchQuery })
} else if (tag && tag !== "all") {
  postsData = await fetchPostsByTag({ tag })
} else {
  postsData = await fetchPosts({ limit, skip })
}
```

덕분에 하나의 쿼리 키로 모든 요청을 처리할 수 있어 캐싱이 간단해졌고, UI 단에서도 의존성이 줄어들었습니다. 하지만 조건 분기 로직이 훅 내부에 섞여 들어가면서 역할이 불명확해지는 부분이 있어 고민이 되었습니다.

👉 이러한 방식이 리액트 쿼리의 관점에서도 바람직한 구조일지, 혹은 더 나은 분리 방법이 있을지 궁금합니다.

### ❓상태와 URL 파라미터를 양방향으로 동기화하는 방식이 과한 구현은 아닐까요?

현재 전역 상태는 zustand를 통해 관리하고 있고, URL 파라미터와 동기화를 위해 아래와 같은 두 개의 useEffect를 사용하고 있습니다.

```ts
// URL → 상태
useEffect(() => {
  const params = new URLSearchParams(location.search)
  setFilter("skip", parseInt(params.get("skip") || "0"))
  ...
}, [location.search])

// 상태 → URL
useEffect(() => {
  const params = new URLSearchParams()
  params.set("skip", skip.toString())
  ...
  navigate(`?${params.toString()}`)
}, [skip, limit, sortBy, sortOrder, selectedTag, searchQuery])
```

처음에는 쿼리 파라미터 기반의 진입을 허용하면서도 내부 상태를 유지하기 위해 필요하다고 판단했습니다. 그러나 동기화 타이밍 문제나, 상태와 URL 사이의 중복 관리로 인해 코드의 복잡도가 증가했습니다.

👉 이러한 양방향 동기화 방식이 일반적인 구현인지, 혹은 다른 더 간결한 구조가 존재할지 궁금합니다.

### ❓Page 컴포넌트에 초기화용 훅을 직접 호출하는 것이 바람직한 구조일까요?

usePostQueryParams() 훅은 URL의 쿼리 파라미터를 zustand 전역 상태와 동기화하는 역할을 합니다. 이 훅은 단순한 유틸리티가 아니라, 해당 페이지에 진입할 때 반드시 한 번 실행되어야만 하는 초기화 로직을 포함하고 있습니다.
비록 내부 로직은 전역 상태를 조작하는 형태이지만, useLocation, useNavigate 등 react-router-dom에 의존하기 때문에 라우터 컨텍스트 하위에서만 사용 가능하며,
그 결과 실제 사용 위치는 자연스럽게 페이지 컴포넌트가 될 수밖에 없습니다.

```tsx
const PostsManager = () => {
  // 이거 진짜 아닌거 같은데, 이거 빼면 url로 쿼리 접근시 받아올 수가 없습니다.
  // 이거 때문에 해당 page 구성을 feature로 내리거나(widget으로도 어차피 못내린다고 생각), 각 feature에 이 훅을 부르는건 더 아닌거같아서 눈물을 머금고 여기에 적었습니다.
  usePostQueryParams()

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <PostAdminHeader />
      <PostAdminBody />
      <Dialogs />
    </Card>
  )
}

export default PostsManager
```

하지만 이처럼 feature나 widget이 아닌 page에서 직접 호출되는 훅은,
결국 페이지가 특정 로직을 직접 관리하게 되며 구조적으로 역할이 애매해질 수 있습니다.

👉 진입 시점에서 실행해야하는 초기화 훅은 페이지 컴포넌트에서 직접 호출해도 괜찮은 선택인지,
아니면 별도의 초기화 컨테이너 혹은 다른 구조로 분리하는 방식이 더 나은 설계인지 궁금합니다.
이러한 초기화 책임을 어디에 두는 것이 더 바람직할까요?

### ❓검색어와 태그 필터가 동시에 존재할 경우, 어떤 쪽을 우선시하는 것이 옳을까요?

현재 게시글 목록을 가져오는 API는 다음과 같이 서로 다른 요청 경로를 사용합니다:

- 일반 목록: GET /posts?limit=10&skip=0
- 검색 필터: GET /posts/search?q={query}
- 태그 필터: GET /posts/tag/{tag}

즉, 검색어 필터는 쿼리 파라미터로, 태그 필터는 path 파라미터로 정의되어 있으며,
이 둘은 동시에 사용할 수 없도록 설계되어 있습니다.

하지만 클라이언트 측에서는 이 둘을 각각 searchQuery, selectedTag라는 전역 상태로 관리하고 있으며,
사용자가 검색어 입력과 태그 선택을 동시에 할 수 있는 UI도 존재합니다.
이러한 상황에서 아래와 같은 질문이 생겼습니다:

> 만약 searchQuery와 selectedTag가 동시에 존재할 경우, 어떤 조건을 기준으로 데이터를 가져와야 할까?

백엔드에(MSW)서 이 상황을 지원하지 않기 때문에, 클라이언트가 단일 기준을 우선 적용해야 합니다.

결국 저는 오지리널 로직처럼 "검색어가 존재할 경우, 태그보다 검색어 필터를 우선한다"는 기준을 세우고 코드를 작성했습니다:

```tsx
if (searchQuery) {
  return fetchPostsBySearch({ searchQuery })
} else if (tag && tag !== "all") {
  return fetchPostsByTag({ tag })
} else {
  return fetchPosts({ limit, skip })
}
```

이 방식은 기능적으로 동작은 하지만, 구조적으로는 몇 가지 의문이 남았습니다.

- 원래 동시에 적용 가능한 설계를 고려해야 하는 것이었을까?
- 아니면 서버 API 구조에 맞춰 프론트에서 직관적인 우선순위를 강제하는 것이 맞는 방향일까?

👉 검색 필터와 태그 필터가 동시에 존재할 때, 어떤 조건을 우선 적용해야 하는지, 그리고 그 책임이 프론트엔드의 UX 설계에 있는지, 혹은 백엔드 API의 유연성 확보에 있는지에 대해 더 고민이 필요하다고 느꼈습니다. 이와 같은 조건 분기에 있어 더 좋은 판단 기준이 있을지 궁금합니다.

+ 추가적으로, 오리지널 코드에서도 필터 중 `sortBy`, `sortOrder`가 실제로 동작하지 않고 변동 없이 API 요청을 보내는 것으로 확인했습니다. 따라서 실제 API 모델이 어떻게 생겼는지 확인할 방법이 없어, 리팩토링 시에도 QueryKey에 해당 데이터를 제외하여 해당 필터가 변경되는 경우에도 새로운 값을 fetch 하지 않도록 설계했습니다.
