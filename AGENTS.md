# AGENTS.md

이 문서는 AI agent가 이 저장소에서 GitHub issue, branch, pull request를 생성할 때 따라야 할 지침을 정의한다.

## 공통 작업 라벨

- issue, branch, pull request를 생성할 때 작업 유형에 맞는 라벨을 사용한다.
- branch 접두사와 issue/PR 제목의 작업 유형은 같은 작업 유형을 가리켜야 한다.

| 작업 유형 | GitHub label | branch 접두사 | issue 제목 라벨 |
| --- | --- | --- | --- |
| 기능 추가 | `feature` | `feat` | `[FEAT]` |
| 버그 수정 | `bug` | `fix` | `[FIX]` |
| 리팩터링 | `refactor` | `refactor` | `[REFACTOR]` |
| 문서 수정 | `docs` | `docs` | `[DOCS]` |
| 설정/빌드/기타 작업 | `chore` | `chore` | `[CHORE]` |
| 테스트 추가/수정 | `test` | `test` | `[TEST]` |

## 공통 작업 흐름

### 1. 기준 브랜치

- 새 작업 브랜치는 기본적으로 `origin/develop`에서 생성한다.
- 작업 브랜치를 생성하기 전에 `origin/develop`의 최신 상태를 가져온다.
- 사용자가 별도의 기준 브랜치를 명시한 경우에는 사용자 지시를 우선한다.

### 2. 중복 Issue 확인

- issue를 새로 생성하기 전에 동일하거나 유사한 open issue가 있는지 확인한다.
- 유사한 issue가 이미 있다면 새 issue를 만들기 전에 기존 issue 번호와 내용을 사용자에게 공유한다.
- 사용자가 새 issue 생성을 계속 요청한 경우에만 별도 issue를 생성한다.

### 3. 기본 진행 순서

- 새 작업은 기본적으로 `issue 생성 또는 확인 -> 작업 브랜치 생성 -> 작업 수행 -> 최종 검증 -> commit -> push -> pull request 생성` 순서로 진행한다.
- 이미 issue나 브랜치가 존재하는 경우에는 해당 단계를 재사용한다.
- 각 단계에서 사용자 지시와 저장소의 기존 규칙이 충돌하면 사용자에게 충돌 내용을 알리고 확인한다.

### 4. 작성 언어

- issue와 pull request 본문은 기본적으로 한국어로 작성한다.
- 저장소 템플릿의 섹션 제목과 구조는 유지한다.
- 사용자가 영어 또는 다른 언어를 명시한 경우에는 사용자 지시를 우선한다.

### 5. Commit 메시지

- commit 메시지는 작업 라벨과 일치하는 conventional commit 형식을 사용한다.

```text
작업라벨: 작업 요약
```

- 작업 라벨은 공통 작업 라벨 표의 `branch 접두사`를 따른다.
- 작업 요약은 실제 변경 사항을 간결하게 설명한다.
- 예시:

```text
feat: AGENTS.md 기반 작업 지침 추가
fix: 게시글 DTO 필드 수정
refactor: 인증 흐름 단순화
```

## Issue 생성 지침

### 1. 템플릿 선택

- 기능 추가 요청은 `.github/ISSUE_TEMPLATE/feature_request.md` 템플릿을 사용한다.
- 버그 수정 요청은 `.github/ISSUE_TEMPLATE/bug_report.md` 템플릿을 사용한다.
- 명확한 요청이 없으면 작업 유형에 가장 가까운 템플릿을 선택한다.

### 2. Issue 제목

- issue 제목은 다음 형식을 사용한다.

```text
[작업라벨] 작업 요약
```

- 작업 라벨은 공통 작업 라벨 표의 `issue 제목 라벨`을 따른다.
- 작업 요약은 issue에서 처리할 내용을 간결하게 드러내도록 작성한다.
- 예시:

```text
[FEAT] AGENTS.md 기반 AI Agent 작업 지침 추가
[FIX] 게시글 DTO 필드 수정
[REFACTOR] 인증 흐름 단순화
```

### 3. Feature Request 본문

기능 추가 issue는 `.github/ISSUE_TEMPLATE/feature_request.md`의 섹션을 유지하여 작성한다.

```md
# ✨ Feature Request

## 📝 Description

- 추가하려는 기능이나 작업 배경을 간단히 설명한다.

---

## 🛠️ To-Do

- [ ] 수행할 작업 1
- [ ] 수행할 작업 2
- [ ] 수행할 작업 3

---

## 📎 Additional Notes

- 참고할 문서, 링크, 맥락이 있다면 작성한다.
```

### 4. Issue 생성 후 확인

- 생성된 issue URL과 번호를 사용자에게 공유한다.
- issue에 적용할 GitHub label이 있다면 공통 작업 라벨 표의 `GitHub label`을 우선 사용한다.
- 사용자가 제목 형식이나 본문 방향을 정정하면 즉시 issue를 수정한다.

## Pull Request 생성 지침

### 1. 사전 확인

- PR을 생성하기 전에 관련 GitHub issue 번호를 확인한다.
- 작업 브랜치는 관련 issue를 기준으로 생성한다.
- 새 작업 브랜치는 기본적으로 `origin/develop`에서 생성한다.
- 현재 작업 브랜치가 PR 대상 작업과 일치하는지 확인한다.
- PR 본문은 `.github/PULL_REQUEST_TEMPLATE.md` 형식을 따른다.

### 2. 브랜치 이름

- 작업 브랜치는 다음 형식을 사용한다.

```text
작업라벨/#이슈번호-작업요약(영어로)
```

- 예시:

```text
feat/#313-add-agents-md-guidelines
fix/#306-update-post-dto
refactor/#320-simplify-auth-flow
```

### 3. PR 제목

- PR 제목은 다음 형식을 사용한다.

```text
[작업종류/#브랜치번호] 작업 요약
```

- 작업종류는 공통 작업 라벨 표를 따르며, 브랜치 접두사와 일치하는 유형을 사용한다.
- 브랜치번호는 관련 issue 번호를 사용하며, 작업 브랜치에 포함된 번호와 일치해야 한다.
- 작업 요약은 관련 issue 제목과 의미가 일치하도록 작성한다.
- 예시:

```text
[FEAT/#313] AGENTS.md 기반 AI Agent 작업 지침 추가
[FIX/#306] 게시글 DTO 필드 수정
[REFACTOR/#320] 인증 흐름 단순화
```

### 4. PR 본문

PR 본문은 `.github/PULL_REQUEST_TEMPLATE.md`의 섹션을 유지하여 작성한다.

```md
# 🚀 Pull Request

## Issue

- Closes #이슈번호

## ✨ Summary

- 이번 PR의 핵심 변경 사항을 한 줄로 요약한다.

## 📚 Details of Changes

- 주요 변경 사항을 bullet로 정리한다.

## 🎯 Key points to review

- 리뷰어가 중점적으로 확인해야 할 부분을 작성한다.

## 🧪 Test & Verification

- [ ] Storybook UI 확인
- [ ] Storybook test (pnpm test-storybook) 완료

## 📎 Additional Notes

-
```

### 5. 테스트 및 검증

- 작업 내용에 따라 가능한 검증을 수행하고 PR 본문에 결과를 남긴다.
- Storybook 확인이나 `pnpm test-storybook`을 수행하지 못했다면 체크하지 않고 사유를 적는다.
- 문서만 수정한 PR처럼 Storybook 검증이 직접 관련 없는 경우에도, 수행 여부와 생략 사유를 명확히 적는다.
- PR 생성 전 최종 검증에서 중요한 결함이 발견되면 PR을 생성하지 않는다.
- 중요한 결함이 발견된 경우에는 결함 내용, 영향 범위, 재현 또는 확인 방법을 사용자에게 먼저 안내한다.

### 6. PR 생성 전 최종 확인

- `git status`로 변경 파일 목록과 현재 브랜치를 확인한다.
- diff를 검토하여 의도한 변경만 포함되었는지 확인한다.
- 불필요한 파일, 임시 파일, 민감 정보, unrelated change가 포함되지 않았는지 확인한다.
- 관련 issue 번호가 PR 제목, 본문, 브랜치 이름에 일관되게 반영되었는지 확인한다.
- 실행한 테스트와 실행하지 못한 테스트를 PR 본문의 `Test & Verification`에 반영한다.

### 7. 생성 후 확인

- PR 생성 후 URL을 사용자에게 공유한다.
- PR이 어떤 issue를 닫는지 `Closes #이슈번호`로 연결되어 있는지 확인한다.
- PR은 기본적으로 ready for review 상태로 생성한다.
- 사용자가 draft PR 생성을 명시한 경우에만 draft PR로 생성한다.
