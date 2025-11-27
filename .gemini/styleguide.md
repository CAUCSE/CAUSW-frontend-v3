# CAUSW Alumni Network Review Guide

# Review Style

- Avoid general feedback, summaries, explanations of changes, or praises.
- Provide specific, objective insights only, without making broad comments on system impact or questioning intentions.
- Write all comments in Korean (ko-KR).

## **📌 Code Convention**

### **1. Naming Convention**

| Type                               | Notation                                | Example                                |
| ---------------------------------- | --------------------------------------- | -------------------------------------- |
| Variables & Parameters & Functions | **camelCase**                           | `newUser`, `fetchData()`               |
| Classes & Components               | **PascalCase**                          | `User`, `EmptyList.tsx`                |
| Constants                          | **UPPER_SNAKE_CASE**                    | `const MAX_LIMIT = 100;`               |
| File Names                         | **Component → Pascal / Folder → camel** | `src/components/EmptyList.tsx`         |
| Type & Interface                   | **PascalCase (Interface-oriented)**     | `interface UserData { name: string; }` |

### **2. Function Writing Principles**

**Single Responsibility Principle (SRP)**

- Each function should **perform only one task**
- If a function becomes too long, **split it appropriately**

### **3. Project Architecture**

- Use FSD (feature slice design) Architecture
- App, Widget, Entity, Shared layers
  - Without Feature layer, Entity layer role includes Feature layer

```
** current project architecture **
.
└── src/
    ├── app ( app + pages )/
    │   ├── (causw): Pages after login (authentication & authorization applied)
    │   └── auth: Pages before login (authentication & authorization not applied)
    ├── entities: Business data, various logic, etc./
    │   └── Each domain name ex) board, comment/
    │       ├── **api: Asynchronous data fetching logic with axios, fetch/
    │       │   ├── get.ts
    │       │   ├── post.ts
    │       │   ├── put.ts
    │       │   └── delete.ts
    │       ├── **ui: UI elements that go inside **board/
    │       │   ├── boardContent.tsx
    │       │   └── boardHeader.tsx
    │       ├── **model: Custom hooks, global state, helper functions/
    │       │   ├── hooks: Custom hooks & store inside widget
    │       │   ├── store: Global state for board
    │       │   └── utils
    │       └── **config: Constants, types, query keys/
    │           ├── types: Types inside widget
    │           └── queryKey: Query keys
    ├── widgets: Collection of each entity's UIs or simple UI without logic/
    │   └── Each domain name ex: board/ui/boardList.tsx/
    │       ├── ui: UI elements that go inside board/
    │       │   └── borderList.tsx
    │       └── config: Types, constants/
    │           └── type
    └── shared/
        ├── @types: Service-wide types
        ├── hooks: Service-wide custom hooks & store
        ├── utils: Utility functions needed service-wide
        └── config: Constants used service-wide (ex. axiosInstance, etc.) /
            ├── axiosInstance.ts
            └── Constants
```

### **4. Import Convention**

- When referencing from upper layers to lower layers, only allow up to 2 depth.

**bad🚫**

```tsx
import { useCustomHook } from '@entity/board/model';
import { Component } from '@entity/board/ui';
```

**good👍**

```tsx
import { Component, useCustomHook } from '@entity/board';
```

- When referencing within the same slice, allow imports up to 2 depth using relative paths.

**bad🚫**

```tsx
// Within the same board slice
import { useCustomHook } from '@entity/board/model';
import { Component } from '@entity/board/ui';
```

**good👍**

```tsx
// Within the same board slice
import { useCustomHook } from '../model';
import { Component } from '../ui';
```

### **5. Design System**

- Use Shadcn UI components whenever possible if they are supported.
- Use utility functions like cn, clsx for conditional styling with tailwindcss.
