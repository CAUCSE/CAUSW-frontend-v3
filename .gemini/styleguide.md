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
| File Names                         | **Component → Pascal / Folder → kebab-case** | `src/components/EmptyList.tsx`         |
| Type & Interface                   | **PascalCase (Interface-oriented)**     | `interface UserData { name: string; }` |

### **2. Function Writing Principles**

**Single Responsibility Principle (SRP)**

- Each function should **perform only one task**
- If a function becomes too long, **split it appropriately**

### **3. Project Architecture**

- Use FSD (Feature-Sliced Design) Architecture
- App, _Pages, Widget, Feature, Entity, Shared layers

```
** current project architecture **
.
└── src/
    ├── app: Next.js routing configuration (layout, page, api routes)/
    │   ├── (causw): Routing for pages after login
    │   └── auth: Routing for pages before login
    ├── _pages: Actual page-level components composing widgets and features/
    │   └── Each page name ex) home, auth, setting
    ├── widgets: Complex composite components combining features and entities/
    │   └── Each widget ex) board, navigation-layout/
    │       ├── ui: Reusable composite UI components
    │       └── config: Widget-level configurations
    ├── features: User interactions and business actions/
    │   └── Each feature name ex) auth, comment/
    │       ├── ui: Interactive UI components (e.g., login buttons, editors)
    │       ├── model: Business logic for actions (hooks, handlers)
    │       └── api: Action-specific API calls
    ├── entities: Business data, domain logic, and pure representation UI/
    │   └── Each domain name ex) board, user/
    │       ├── api: Asynchronous data fetching logic
    │       ├── model: Custom hooks, global state for the domain
    │       ├── ui: Pure UI elements representing the domain entity
    │       └── config: Constants, types, query keys
    └── shared: Core reusable elements service-wide/
        ├── ui: UI design system components
        ├── lib: Third-party library integrations
        ├── hooks: Service-wide hooks
        ├── utils: Service-wide utilities
        └── config: Global configurations
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

- Use @causw/cds components whenever possible.
- Use utility functions like mergeStyles, cn, clsx for conditional styling with tailwindcss.
