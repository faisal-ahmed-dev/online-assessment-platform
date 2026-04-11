# Online Assessment Platform

A full-featured Online Assessment Platform built with Next.js, featuring an **Employer Panel** for creating and managing exams and a **Candidate Panel** for taking exams with real-time proctoring.

---

## Live Demo

| Panel | URL |
|-------|-----|
| Employer | [https://online-assessment-platform-eta.vercel.app/employer/signin](https://online-assessment-platform-eta.vercel.app/employer/signin) |
| Candidate | [https://online-assessment-platform-eta.vercel.app/candidate/signin](https://online-assessment-platform-eta.vercel.app/candidate/signin) |

---


## Feature Coverage

### Employer Panel

| Feature | Status | Notes |
|---------|--------|-------|
| Login page (email + password) | ✅ | Mock auth with role-based redirect |
| Dashboard — exam cards | ✅ | |
| Card: Exam Name | ✅ | |
| Card: Candidates | ✅ | |
| Card: Question Sets | ✅ | |
| Card: Exam Slots | ✅ | |
| Card: "View Candidates" button | ✅ | |
| Create exam — Step 1: Basic Info | ✅ | Title, Total Candidates, Total Slots, Question Sets, Question Type, Start Time, End Time, Duration |
| Create exam — Step 2: Question Sets | ✅ | Add / Edit / Delete via modal |
| Question types: Radio, Checkbox, Text | ✅ | |

### Candidate Panel

| Feature | Status | Notes |
|---------|--------|-------|
| Login page (email + password) | ✅ | Mock auth with role-based redirect |
| Dashboard — exam cards | ✅ | |
| Card: Duration | ✅ | |
| Card: Questions | ✅ | |
| Card: "Start" button | ✅ | |
| Exam screen — display questions | ✅ | Radio, Checkbox, and Text question types |
| Timer countdown | ✅ | Color-coded urgency (red < 1 min, amber < 5 min) |
| Auto-submit on timeout | ✅ | |
| Manual submit with confirmation | ✅ | |
| Behavioral tracking: tab switch | ✅ | 3-switch limit, toast warnings |
| Behavioral tracking: fullscreen exit | ✅ | |
| Question navigator (jump to any question) | ✅ | Grid showing answered / skipped state |

### Bonus

| Feature | Status | Notes |
|---------|--------|-------|
| Mock backend / API layer | ✅ | Repository pattern with dependency injection |

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript 5 |
| State Management | Zustand 5 (with localStorage persistence) |
| Server State | TanStack React Query 5 |
| Forms | React Hook Form 7 |
| Validation | Zod 3 |
| UI Components | shadcn/ui (Radix UI primitives) |
| Styling | Tailwind CSS 4 |
| Icons | Lucide React |
| Skeletons | boneyard-js |

---

## Getting Started

### Prerequisites

- **Node.js** 18+
- **pnpm** (recommended) — install with `npm install -g pnpm`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/faisal-ahmed-dev/online-assessment-platform
cd online-assessment-platform

# 2. Install dependencies
pnpm install

# 3. Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other Scripts

```bash
pnpm build       # Production build
pnpm start       # Start production server
pnpm lint        # Run ESLint
pnpm format      # Run Prettier
pnpm typecheck   # TypeScript type checking
```

> **No environment variables are required.** All data is mocked client-side.

---

## Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Employer | `employer@akij.work` | `password123` |
| Candidate | `candidate@akij.work` | `password123` |

---

## App Walkthrough

### Employer Flow

1. **Sign In** → `/employer/signin`
   - Enter employer credentials above and click Sign In.

2. **Dashboard** → `/employer/dashboard`
   - View all created exams as cards showing name, candidates, question sets, and slots.
   - Click **"Create Exam"** to start a new exam.
   - Click **"View Candidates"** on any card to see results.

3. **Create Exam** → `/employer/exams/create`
   - **Step 1 — Basic Info**: Fill in title, total candidates, total slots, number of question sets, question type (Radio / Checkbox / Text), start time, end time. Duration is calculated automatically.
   - **Review**: Confirm basic info before moving on.
   - **Step 2 — Question Sets**: Add questions via modal. Each question has a title, type, options (for Radio/Checkbox), and point value. Edit or delete questions inline.
   - Submit to save the exam.

4. **Exam Candidates** → `/employer/exams/[id]/candidates`
   - View a table of candidates who took the exam with their score, status, and submission time.

---

### Candidate Flow

1. **Sign In** → `/candidate/signin`
   - Enter candidate credentials above and click Sign In.

2. **Dashboard** → `/candidate/dashboard`
   - View available exams as cards showing duration, question count, and status (Upcoming / Active / Completed).
   - Click **"Start"** on an active exam to begin.

3. **Take Exam** → `/candidate/exam/[id]`
   - The exam opens with a countdown timer in the navbar.
   - Answer questions using radio buttons, checkboxes, or text input depending on the question type.
   - Use the **Question Navigator** sidebar to jump between questions and track answered / skipped status.
   - **Behavioral Tracking** is active: switching tabs or exiting fullscreen triggers a toast warning. After 3 tab switches the session is flagged.
   - Click **"Submit Exam"** to finish manually, or wait for auto-submit on timeout.

4. **Completed** → `/candidate/exam/[id]/completed`
   - View your results after submission.

5. **Timeout** → `/candidate/exam/[id]/timeout`
   - Shown if the exam duration expired and the session was auto-submitted.

---

## Architecture

The project follows a **clean layered architecture** entirely on the frontend (no external backend required).

```
app/
├── (pages)/                  # Next.js route groups
│   ├── employer/             # Employer panel (signin + protected routes)
│   └── candidate/            # Candidate panel (signin + protected routes)
├── components/               # Shared & feature UI components
├── lib/
│   ├── infrastructure/
│   │   ├── repositories/     # Repository interfaces (IExamRepository, etc.)
│   │   └── mock/             # Mock implementations (in-memory data)
│   ├── services/             # Business logic (AuthService, ExamService, CandidateService)
│   ├── stores/               # Zustand stores (auth, exam draft, exam session)
│   ├── hooks/                # Custom React hooks (useAuth, useExams, useExamSession, …)
│   ├── models/               # TypeScript interfaces (Exam, Question, User, Candidate)
│   └── validators/           # Zod schemas for forms
└── data/                     # Seed data for mock repositories
```

### Key Patterns

- **Repository Pattern** — services depend on repository interfaces, not concrete implementations. Swap mock repos for real API calls without touching business logic.
- **Zustand Stores** — `useAuthStore` (auth state), `useExamStore` (exam creation draft across steps), `useExamSessionStore` (live exam answers + behavior events). All persisted to `localStorage`.
- **React Query** — wraps repository calls for caching, background refetch, and loading/error state.
- **Custom Hooks** — each feature has a dedicated hook (`useExamTimer`, `useBehaviorTracker`, `useMultiStepForm`, etc.) to keep pages thin and logic reusable.
- **Route Protection** — `proxy.ts` middleware checks the `oap_auth_token` cookie on every navigation and redirects unauthenticated or wrong-role users.

---

## Additional Questions

### MCP Integration

**Yes** — this project was developed using **Claude Code** (Anthropic's CLI agent) with the **Figma MCP** server integrated directly into the editor.

The Figma MCP allowed real-time design inspection without leaving the terminal: reading component node IDs, layout structure, spacing values, and color tokens straight from the Figma file. This eliminated the back-and-forth of manually measuring designs and ensured visual fidelity to the provided spec. Component code was generated with the exact Tailwind classes and shadcn/ui primitives that matched the design, then refined in context.

**What was accomplished with MCP:**
- Mapped Figma components (Exam Card, Question Modal, Navbar, Step indicators) directly to shadcn/ui components in the codebase.
- Extracted design tokens (colors, border-radius, spacing) from Figma variables and applied them as Tailwind utility classes.
- Reduced design-implementation iteration cycles significantly — a full page could go from Figma node to working component in a single session.

---

### AI Tools for Development

**Claude Code** (Anthropic's CLI agent) was the primary AI tool used throughout this project.

Specific uses:
- **Component scaffolding** — generating typed React components with props from a brief description.
- **Zod schema writing** — producing validated form schemas (exam creation, question modal) with correct refinements (e.g. end time must be after start time).
- **Custom hook generation** — `useBehaviorTracker`, `useExamTimer`, `useMultiStepForm` were all drafted with Claude Code and then refined.
- **Debugging** — tracing complex state interactions between the multi-step form store and the exam session store.
- **Code review** — identifying re-render issues and suggesting memoization opportunities.

**Recommendation:** Claude Code + Figma MCP is a highly effective combination for frontend development. The tight feedback loop between design inspection, code generation, and live preview dramatically reduces the time from spec to working UI.

---

### Offline Mode

If a candidate loses internet during an exam, the following strategy would keep their progress safe and the exam running:

1. **Answer auto-save (already implemented)** — every answer change is written to Zustand's `useExamSessionStore`, which persists to `localStorage` via the persist middleware. Answers survive page refreshes and browser restarts without any additional work.

2. **Service Worker exam cache** — on exam start, a Service Worker pre-caches the exam payload (questions, config, timing) so the exam page loads fully offline.

3. **Offline banner** — listen to the browser's `online`/`offline` events and display a persistent banner when connectivity is lost, so the candidate knows their answers are still being saved locally.

4. **Client-side timer continues** — the countdown timer is driven by `Date.now()` against the stored `startedAt` timestamp, so it keeps running correctly even without a network connection.

5. **Auto-submit fires client-side on timeout** — if the timer expires offline, the session is marked as submitted in `localStorage`. When connectivity returns, a sync queue flushes the session data to the server.

6. **Reconnect sync** — a background hook watches the `online` event and POSTs any locally queued submissions/events to the API, with exponential back-off on failure.

This approach requires no changes to the current Zustand + localStorage foundation — only the Service Worker and sync queue are additions.

---

## Bonus: Mock Backend

The project implements a full **repository pattern** as a mock API layer:

- **Interfaces** (`app/lib/infrastructure/repositories/`) define contracts: `IExamRepository`, `IUserRepository`, `ICandidateRepository`.
- **Mock implementations** (`app/lib/infrastructure/mock/`) fulfill those contracts using in-memory data with simulated async delays (`app/lib/constants/mock-delay.ts`).
- **Services** (`app/lib/services/`) contain business logic and depend only on the interfaces — not the mock implementations.

To connect a real backend, replace the mock implementations with classes that call actual API endpoints. No service or hook code needs to change.
