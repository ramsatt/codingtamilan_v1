# 🎓 AI Courses Redesign Plan
## LLM · AI · Prompt Engineering · Context Engineering

---

## 🔍 Sample Analysis — [course.html](file:///Users/sathishkumarramalingam/projects/codingtamilan/sample/course.html) (Git Masterclass)

### Layout Architecture
| Element | Pattern Used |
|---|---|
| **Shell** | Full-viewport flex: fixed sidebar + main content area |
| **Sidebar** | 280px fixed; per-topic items with active/completed state; bottom progress bar |
| **Progress** | Dual tracking — top thin progress bar (current slide position) + sidebar overall bar |
| **Slide Container** | Centred `max-w-900px` slide with `slideIn` animation on transition |
| **Controls** | Fixed footer with Prev / Slide counter / Next; fullscreen toggle in header |
| **Keyboard Nav** | `ArrowRight / Space → next`, `ArrowLeft → prev` |

### Content Block Patterns
| Block Type | Visual Treatment |
|---|---|
| **Terminal** | `#1e1e1e` dark bg + macOS traffic light dots + `Fira Code` mono |
| **Visual Demo** | Dashed border canvas for SVG/DOM interactive animations |
| **Comparison Cards** | 2-column grid with coloured left-border cards |
| **Flow Steps** | Horizontal flex boxes with arrow connectors (3-stage workflow) |
| **Icon Hero** | Full-centre slide with large FontAwesome icon + headline |
| **Code Inline** | Orange-tinted `<code>` tag (`#F05032` brand colour) |

### Interactive Elements
- **Live Commit Demo** — dynamically appends DOM nodes to simulate git history
- **Merge Visualizer** — SVG lines drawn between branch nodes step-by-step
- **Sidebar completion** — `completedSlides` Set; green checkmark per finished topic

### Design Tokens (Git course)
```
Brand: #F05032 (orange) / #24292e (dark)
Font: Inter (body), Fira Code (mono)
Slide bg: white, App bg: #f6f8fa
Border radius: 8–12px; Shadow: subtle 10px
```

---

## 🧭 Current State — Angular Courses

### What exists
- **[ai-lab.ts](file:///Users/sathishkumarramalingam/projects/codingtamilan/src/app/features/ai/ai-lab/ai-lab.ts)** — JSON-driven block renderer (`ai-course.json` / `ai-course-ta.json`)
  - Brand color: `cyan-500` / `cyan-600`
  - Block types: `header, paragraph, intro, list, example, code, note, image, table`
  - Navigation: prev/next section footer buttons
- **[context-lab.ts](file:///Users/sathishkumarramalingam/projects/codingtamilan/src/app/features/context/context-lab/context-lab.ts)** — identical renderer, `emerald-500`
- **`prompt` + `llm`** — assumed to follow same pattern (separate lab files referenced in [navigation.ts](file:///Users/sathishkumarramalingam/projects/codingtamilan/src/app/services/navigation.ts))
- **Navigation** — all 4 courses fully registered with complete section lists (20–25 topics each)

### What's Missing vs. Sample
| Feature | Sample | Current |
|---|---|---|
| Slideshow / presentation mode | ✅ | ❌ |
| Per-topic visual animations | ✅ | ❌ |
| Progress bar (top + sidebar) | ✅ | ❌ |
| Keyboard navigation | ✅ | ❌ |
| Interactive playgrounds | ✅ | ❌ |
| Comparison card block | ✅ | ❌ |
| Flow diagram block | ✅ | ❌ |
| Terminal block (styled) | Standalone HTML | Basic dark div |
| Completion checkmarks | ✅ | Gamification only |

---

## 🎨 Design System — AI Courses

Each course gets its own accent color from a distinct palette:

| Course | Accent Color | Hex | Icon |
|---|---|---|---|
| **AI** | Cyan | `#06b6d4` | `fa-brain` |
| **LLM** | Violet | `#7c3aed` | `fa-microchip` |
| **Prompt Engineering** | Amber | `#f59e0b` | `fa-pen-nib` |
| **Context Engineering** | Emerald | `#10b981` | `fa-layer-group` |

**Shared tokens:**
- Font: `Inter` (body) + `Fira Code` (mono)
- Dark terminal bg: `#0f172a` (slate-900)
- Slide bg: `#ffffff`; App bg: `#f8fafc` (slate-50)
- Border radius: `12px`; Shadow: `0 4px 24px rgba(0,0,0,0.07)`
- Animation: `slideIn 0.4s cubic-bezier(0.16,1,0.3,1)`

---

## 📋 New Content Block Types to Add

Beyond the existing `header / paragraph / intro / list / example / code / note / image / table`, add:

| Block Type (JSON key) | Description |
|---|---|
| `comparison` | Side-by-side colored comparison cards (like Merge vs Rebase) |
| [flow](file:///Users/sathishkumarramalingam/projects/codingtamilan/src/app/features/control-flow) | Horizontal step-flow with arrow connectors |
| `mindmap` | Central concept bubble with radial connections |
| `terminal` | macOS-styled dark terminal with traffic-light dots |
| `callout` | Colored callout with icon (warning, tip, danger, info) |
| `quiz` | Single MCQ widget with reveal-on-click answer |
| `highlight` | Bold stat or key takeaway in large text |
| `interactive` | Named interactive demo (tokenizer, attention heatmap, etc.) |
| `diagram` | Pre-rendered SVG diagram embedded in content |

---

## 🗓️ Iteratable Plan

> Each iteration is self-contained and shippable. Start with Iteration 0 and proceed sequentially.

---

### 🔁 Iteration 0 — Design System Foundation
**Goal:** Establish shared styles and tokens. No content changes yet.

- [ ] Create `/src/styles/course-tokens.css` with CSS custom properties for all 4 accent colors
- [ ] Add `Inter` + `Fira Code` Google Fonts to [index.html](file:///Users/sathishkumarramalingam/projects/codingtamilan/src/index.html)  
- [ ] Add shared `@keyframes slideIn` and `popIn` to global styles
- [ ] Create a shared `CourseShell` component (`course-shell.component.ts`) with:
  - Top progress bar slot
  - Topic header label slot
  - Slide area slot
  - Keyboard event listener (`ArrowRight → next, ArrowLeft → prev`)
- [ ] Add course accent color as a CSS variable injected at runtime per course

**Acceptance Criteria:**
- All 4 course pages render with correct accent colors
- `Inter` font is active everywhere
- No visual regressions on existing content

---

### 🔁 Iteration 1 — Block Component Upgrade
**Goal:** Upgrade all existing block types to match sample quality.

**Files to modify:** [ai-lab.ts](file:///Users/sathishkumarramalingam/projects/codingtamilan/src/app/features/ai/ai-lab/ai-lab.ts), `llm-lab.ts`, `prompt-lab.ts`, [context-lab.ts](file:///Users/sathishkumarramalingam/projects/codingtamilan/src/app/features/context/context-lab/context-lab.ts)

#### Block upgrades (per course lab template):
- [ ] **`terminal` block** — add macOS `● ● ●` dots header, `#0f172a` background, syntax-colored output lines
- [ ] **`note` block** — upgrade to 4 variants: `info 💡`, `warning ⚠️`, `tip ✅`, `danger 🚫` — driven by `variant` field in JSON
- [ ] **`example` block** — add copy-to-clipboard button with animated tick confirmation
- [ ] **`list` block** — support both bulleted and numbered (already has `ordered` flag); add icon prefix per item via `icon` field
- [ ] **`table` block** — make headers sticky when table overflows; add zebra striping
- [ ] **`intro` block** — add left gradient accent bar replacing plain border
- [ ] **Headers** — `h2` gets a subtle underline animation on load; `h3` gets accent-colored left pip

**Acceptance Criteria:**
- Each block type renders with upgraded styling
- Copy button works on all `example` and `code` blocks
- Dark/light mode legibility verified on all blocks

---

### 🔁 Iteration 2 — New Visual Block Types
**Goal:** Add new JSON block types that enable richer interactive content.

**Files to modify:** All 4 lab [.ts](file:///Users/sathishkumarramalingam/projects/codingtamilan/src/app/services/navigation.ts) files (add `ngSwitch` cases)
**Files to create:** Optional standalone block components if complexity grows

#### New blocks to implement:

- [ ] **`comparison` block** — renders `items[]` as 2-col grid cards. Each item has `title`, `color`, `icon`, [text](file:///Users/sathishkumarramalingam/projects/codingtamilan/src/app/features/context)
  ```json
  { "type": "comparison", "items": [
    { "title": "Zero-Shot", "color": "blue", "icon": "fa-bolt", "text": "No examples given..." },
    { "title": "Few-Shot", "color": "green", "icon": "fa-list", "text": "Examples provided..." }
  ]}
  ```
- [ ] **[flow](file:///Users/sathishkumarramalingam/projects/codingtamilan/src/app/features/control-flow) block** — renders horizontal step pipeline. Each step has `label`, `icon`, optional `command`
  ```json
  { "type": "flow", "steps": [
    { "label": "Input Tokens", "icon": "fa-keyboard" },
    { "label": "Embedding", "icon": "fa-project-diagram" },
    { "label": "Attention", "icon": "fa-eye" },
    { "label": "Output", "icon": "fa-paper-plane" }
  ]}
  ```
- [ ] **`callout` block** — styled panels with `variant: "info" | "warning" | "danger" | "tip"`
- [ ] **`quiz` block** — multiple choice with options, correct answer index, and explanation reveal
- [ ] **`highlight` block** — large bold stat or phrase with accent color
- [ ] **`diagram` block** — renders inline SVG string from JSON (pre-authored diagrams)

**Acceptance Criteria:**
- JSON for at least one topic in each course updated to use new block types
- All blocks render and are mobile-responsive
- `quiz` block reveal animation works correctly

---

### 🔁 Iteration 3 — Presentation / Slideshow Mode
**Goal:** Add a "Presentation Mode" toggle that mimics the sample course.html slideshow experience.

**New file:** `src/app/components/presentation-mode/presentation-mode.component.ts`

- [ ] **Mode Toggle Button** — floating button in course header (`fa-presentation-screen` icon)
- [ ] **Presentation Shell** — when active:
  - Sidebar collapses or becomes slide-dot navigator
  - Content renders one "slide" at a time (each slide = one logical heading group from JSON)
  - Prev/Next controls at bottom
  - Slide counter display: "Slide 3 of 12"
  - Fullscreen API support
- [ ] **Slide grouping logic** — Auto-group blocks by `h2` headers into slides
- [ ] **Keyboard navigation** — Arrow keys navigate slides; Escape exits presentation mode
- [ ] **Transition animation** — `slideIn` on each new slide
- [ ] **Progress bar** — thin colored bar at top tracks slide position

**Acceptance criteria:**
- Presentation mode works on all 4 courses
- Sidebar is hidden in fullscreen
- Keyboard `←` `→` `Escape` work correctly

---

### 🔁 Iteration 4 — Content Depth (JSON Data Updates)
**Goal:** Enrich the JSON content for all 4 courses using new block types.

> This is the largest iteration — divide sub-tasks by course.

#### 4a — AI Course (`ai-course.json` / `ai-course-ta.json`)
25 topics · Priority upgrades:
- [ ] `intro` — add hero `highlight` block + [flow](file:///Users/sathishkumarramalingam/projects/codingtamilan/src/app/features/control-flow) block (perception → reason → act)
- [ ] `machine-learning` — add `comparison` (Supervised vs Unsupervised vs RL)
- [ ] `transformers` — add [flow](file:///Users/sathishkumarramalingam/projects/codingtamilan/src/app/features/control-flow) block (Encoder → Attention → Decoder)
- [ ] `neural-networks` — add `diagram` (SVG neuron layer diagram)
- [ ] `generative-ai` — add `comparison` (Text / Image / Audio / Code)
- [ ] `ai-agents` — add [flow](file:///Users/sathishkumarramalingam/projects/codingtamilan/src/app/features/control-flow) (Perceive → Plan → Act → Observe loop)
- [ ] Add `quiz` to: `types-of-ai`, `supervised-learning`, `deep-learning`

#### 4b — LLM Course (`llm-course.json` / `llm-course-ta.json`)
25 topics · Priority upgrades:
- [ ] `tokenization` — add **interactive tokenizer demo** (`interactive` block): textarea input that shows live token count + color-coded tokens
- [ ] `attention` — add **attention heatmap diagram** (`diagram` block)
- [ ] `embeddings` — add [flow](file:///Users/sathishkumarramalingam/projects/codingtamilan/src/app/features/control-flow) (word → vector → similarity)
- [ ] `transformer-deep-dive` — add [flow](file:///Users/sathishkumarramalingam/projects/codingtamilan/src/app/features/control-flow) (multi-head attention pipeline)
- [ ] `model-parameters` — add `comparison` (Temperature: low vs high)
- [ ] `chat-completions` — add `comparison` (system / user / assistant roles)
- [ ] `rag` — add [flow](file:///Users/sathishkumarramalingam/projects/codingtamilan/src/app/features/control-flow) (Query → Embed → Retrieve → Augment → Generate)
- [ ] `fine-tuning` — add `comparison` (Full Fine-Tune vs LoRA vs Prompt)
- [ ] Add `quiz` to: `tokenization`, `model-parameters`, `rag`

#### 4c — Prompt Engineering (`prompt-course.json` / `prompt-course-ta.json`)
20 topics · Priority upgrades:
- [ ] `intro` — hero `highlight` + definition callout
- [ ] `zero-shot` vs `few-shot` — side-by-side `comparison` with live examples
- [ ] `chain-of-thought` — [flow](file:///Users/sathishkumarramalingam/projects/codingtamilan/src/app/features/control-flow) (Think → Reason → Answer)
- [ ] `tree-of-thought` — `diagram` (branching SVG tree)
- [ ] `react` — [flow](file:///Users/sathishkumarramalingam/projects/codingtamilan/src/app/features/control-flow) (Reason → Act → Observe cycle)
- [ ] `prompt-injection` — `callout` variant `danger` for security notes
- [ ] `hallucination` — `callout` variant `warning` + `quiz`
- [ ] `best-practices` — `comparison` (Do vs Don't columns)
- [ ] Add `quiz` to: `zero-shot`, `chain-of-thought`, `prompt-injection`

#### 4d — Context Engineering (`context-course.json` / `context-course-ta.json`)
22 topics · Priority upgrades:
- [ ] `context-window` — `highlight` block (token limit numbers per model)
- [ ] `context-anatomy` — [flow](file:///Users/sathishkumarramalingam/projects/codingtamilan/src/app/features/control-flow) (System Prompt → History → Retrieved Docs → User Query)
- [ ] `system-prompts` — `comparison` (Good vs Bad system prompt examples)
- [ ] `memory-architecture` — `comparison` (Short-term vs Long-term vs External)
- [ ] `dynamic-assembly` — [flow](file:///Users/sathishkumarramalingam/projects/codingtamilan/src/app/features/control-flow) + `diagram` (assembly pipeline)
- [ ] `compression` — `comparison` (Summarize vs Truncate vs Semantic)
- [ ] `token-budgeting` — [flow](file:///Users/sathishkumarramalingam/projects/codingtamilan/src/app/features/control-flow) (allocate → monitor → trim)
- [ ] `security` — `callout` variant `danger` for injection risks
- [ ] Add `quiz` to: `context-window`, `system-prompts`, `token-budgeting`

---

### 🔁 Iteration 5 — Gamification & Assessment
**Goal:** Add quiz scoring, progress milestones, and completion badges per course.

- [ ] **Quiz Service** — track answered questions in `GamificationService`, award XP per correct answer
- [ ] **Topic Completion Badge** — overlay badge when a topic is fully "engaged" (scrolled + quiz answered if present)
- [ ] **Course Progress Dashboard** — small widget at sidebar bottom showing % topics done per course
- [ ] **Course Completion Certificate** — final topic slide has a "You've completed X course!" card with shareable message
- [ ] **Streak Tracker** — "Read 3 topics today" streak indicator

**Acceptance Criteria:**
- Quiz XP is persisted across sessions (uses existing gamification storage)
- Completion badge renders without layout overflow
- Progress widget shows correct % per course

---

### 🔁 Iteration 6 — Tamil Language Polish
**Goal:** Ensure every new block type and UI string is fully bilingual.

- [ ] Audit all new block types in Tamil JSON files (`*-ta.json`) for completeness
- [ ] Add Tamil translations of all new UI strings (`quiz.checkAnswer`, `quiz.correct`, `quiz.incorrect`, `presentation.exit`, etc.) to `translations.ts` / `UI_STRINGS`
- [ ] Test Tamil font rendering with `Noto Serif Tamil` or `Latha` for body text
- [ ] Validate RTL/LTR rendering for all new blocks
- [ ] Ensure language switcher triggers JSON reload for all 4 courses (same pattern as current `langService.lang$` pipe)

---

## 🗂️ File Impact Summary

| File | Action | Iteration |
|---|---|---|
| `src/styles/course-tokens.css` | CREATE | 0 |
| [src/index.html](file:///Users/sathishkumarramalingam/projects/codingtamilan/src/index.html) | MODIFY — add fonts | 0 |
| `src/app/components/course-shell/` | CREATE | 0 |
| [ai-lab.ts](file:///Users/sathishkumarramalingam/projects/codingtamilan/src/app/features/ai/ai-lab/ai-lab.ts) | MODIFY — block upgrades | 1, 2, 3 |
| `llm-lab.ts` | MODIFY — block upgrades | 1, 2, 3 |
| `prompt-lab.ts` | MODIFY — block upgrades | 1, 2, 3 |
| [context-lab.ts](file:///Users/sathishkumarramalingam/projects/codingtamilan/src/app/features/context/context-lab/context-lab.ts) | MODIFY — block upgrades | 1, 2, 3 |
| `presentation-mode.component.ts` | CREATE | 3 |
| `assets/data/ai-course.json` | MODIFY — enrich content | 4a |
| `assets/data/llm-course.json` | MODIFY — enrich content | 4b |
| `assets/data/prompt-course.json` | MODIFY — enrich content | 4c |
| `assets/data/context-course.json` | MODIFY — enrich content | 4d |
| `*-course-ta.json` (4 files) | MODIFY — Tamil parity | 4a–4d, 6 |
| `gamification.ts` | MODIFY — quiz XP | 5 |
| `translations.ts` | MODIFY — new UI strings | 6 |

---

## ✅ Priority Order (Start Here)

```
Iteration 0 → Iteration 1 → Iteration 2 → Iteration 4b (LLM tokenizer) → Iteration 4c (Prompt) → Iteration 4a (AI) → Iteration 4d (Context) → Iteration 3 → Iteration 5 → Iteration 6
```

> **Suggested first session:** Complete Iterations 0 + 1. These unlock visual quality without requiring any JSON content changes — pure UI/component work.

---

## 📐 Quick Reference — Course Topic Counts

| Course | Route | Topics | JSON File |
|---|---|---|---|
| AI | `/ai/:topic` | 25 | `ai-course.json` |
| LLM | `/llm/:topic` | 25 | `llm-course.json` |
| Prompt Engineering | `/prompt/:topic` | 20 | `prompt-course.json` |
| Context Engineering | `/context/:topic` | 22 | `context-course.json` |
| **Total** | | **92 topics** | |
