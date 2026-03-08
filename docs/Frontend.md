 # Elura — Frontend Architecture (`frontend.md`)

Version: 1.0  
Product: Elura  
Scope: MVP Frontend Design  
Primary Goal: Ship a clean, premium, high-converting frontend for artist onboarding, portfolio display, discovery, booking requests, and one AI-powered artist workflow.

---

# 1. Purpose

This document defines the frontend structure for Elura's MVP.

It covers:

- frontend goals
- design principles
- visual system
- color palette
- page architecture
- component structure
- state handling
- API integration expectations
- accessibility
- development order

This document is meant to guide implementation decisions, not just describe the interface.

---

# 2. Frontend Goal

The frontend for Elura should make one thing immediately clear:

**Elura is a premium, professional platform for makeup artists.**

The product should not feel like:
- a noisy social app
- an influencer feed
- a generic marketplace
- a dashboard overloaded with features

It should feel:
- clean
- confident
- modern
- premium
- focused on bookings and trust

The frontend should support the MVP flow:

Artist lands on Elura  
→ signs up  
→ creates profile  
→ uploads portfolio  
→ gets a public profile  
→ clients browse artists  
→ clients send booking requests  
→ artists use the AI consultation feature

---

# 3. Frontend Product Principles

These principles should guide every UI decision.

## 3.1 Clarity over decoration
Visual polish matters, but understanding matters more.

A user should immediately understand:
- what Elura does
- what action to take
- what each page is for

## 3.2 Portfolio first
For makeup artists, images are the strongest trust signal.

The UI should consistently elevate:
- portfolio work
- artist identity
- specialty
- booking intent

## 3.3 Premium without heaviness
The interface should feel elevated and high-end without becoming stiff, overly formal, or visually crowded.

## 3.4 Action-oriented
Every important screen should drive a next action:
- join
- complete profile
- upload work
- browse artists
- request booking
- generate consultation pack

## 3.5 MVP discipline
Do not add unnecessary UI complexity for future features.
The MVP should feel complete, not bloated.

---

# 4. Visual Identity

## 4.1 Brand Feel

Elura should visually communicate:

- elegance
- professionalism
- softness
- modern beauty-tech
- trust

The design language should feel like:

**premium beauty x minimal product design**

Not:
- loud pink beauty branding
- influencer aesthetics
- generic SaaS dashboards

---

# 5. Core Color System

The following color system is the approved base palette for Elura frontend.

## 5.1 Core Tokens

```css
:root {
  --bg-color: #0B0B0F;
  --text-color: #FFFFFF;
  --text-muted: #A0A0A5;
  --accent-color: #E8AEB7;
  --border-color: rgba(255, 255, 255, 0.08);
  --card-bg: rgba(255, 255, 255, 0.03);
  --glow-color: rgba(232, 174, 183, 0.4);
  --elura-blend: #1f1f29;
  --elura-grad-start: #f1c2cc;
  --elura-grad-mid: #c08d98;
  --elura-grad-end: #6a5564;
}
```

## 5.2 Primary UI Colors

- Page background: `#0B0B0F`
- Main text: `#FFFFFF`
- Secondary text: `#A0A0A5`
- Brand accent: `#E8AEB7`
- Accent hover: `#fce1e6`

## 5.3 Buttons and Surfaces

- Primary button gradient: `rgba(232, 174, 183, 1)` → `rgba(200, 140, 150, 1)`
- Primary button text: `#0B0B0F`
- Glass panel background: `rgba(11, 11, 15, 0.4)`
- Glass panel border: `rgba(255, 255, 255, 0.1)` or `rgba(255, 255, 255, 0.2)`

## 5.4 Inputs and States

- Input background: `rgba(255, 255, 255, 0.05)`
- Input focus background: `rgba(255, 255, 255, 0.08)`
- Placeholder: `rgba(255, 255, 255, 0.3)`
- Waitlist / success accent: `rgba(232, 174, 183, 0.9)`
- Error text: `#f5b3c1`

---

# 6. 3D / Ambient Background Palette

This palette should be used carefully for atmospheric visuals, not for overwhelming the interface.

## 6.1 Background / Lighting Palette

- Fog base: `#0b0b0f`
- Cursor light: `#f4b9c4`
- Ambient light: `#ffe9ef`
- Directional light: `#ffd3dc`

## 6.2 Particle / Sparkle Palette

- Particles: `#e8aeb7`, `#fce4ea`
- Sparkles: `#ffd9e1`

## 6.3 Orb Set

- `#ffe5eb`
- `#f8ccd5`
- `#ffd6df`
- `#f3b8c4`
- `#fce2e8`
- `#efb2be`

## 6.4 Usage Rule

Ambient effects should support brand mood only.

They should never:
- reduce readability
- compete with primary CTAs
- make forms harder to use
- distract from portfolio content

---

# 7. Typography System

## 7.1 Typography Goal

Typography should feel clean, modern, and premium.

## 7.2 Recommended Fonts

Primary recommendation:
- **Inter** for body and UI
- **Satoshi** or **Clash Display** for headings if desired

If using one family only:
- Inter is acceptable for full MVP

## 7.3 Hierarchy

### Heading styles
- Hero headings should be large and confident
- Section headings should be strong but not oversized
- Dashboard headings should be functional and readable

### Body styles
- Use medium contrast for body copy
- Avoid overly small text
- Keep helper text readable

## 7.4 Typography Rules

- Avoid excessive font weights on one screen
- Avoid decorative scripts
- Avoid all-caps overuse
- Maintain strong spacing and line-height

---

# 8. Layout Principles

## 8.1 Page Width

Use a controlled content width.
Do not let important content stretch too wide on desktop.

Recommended:
- landing page content max-width
- dashboard content max-width
- generous padding on both mobile and desktop

## 8.2 Whitespace

Whitespace is part of the visual identity.
The UI should breathe.

## 8.3 Grid Discipline

Use structured grids for:
- discovery cards
- portfolio layouts
- dashboard sections
- forms

## 8.4 Mobile-first expectation

Elura must work well on mobile because many artists will likely access it from phones.

Key rule:
- every MVP flow must be usable on mobile first

---

# 9. Frontend Architecture

## 9.1 Recommended Stack

- Next.js
- React
- Tailwind CSS
- TypeScript

## 9.2 App Structure

Suggested structure:

```text
elura-frontend/
├─ app/
│  ├─ page.tsx
│  ├─ signup/
│  ├─ onboarding/
│  ├─ dashboard/
│  ├─ artist/[username]/
│  ├─ discover/
│  └─ booking/
│
├─ components/
│  ├─ ui/
│  ├─ forms/
│  ├─ layout/
│  ├─ cards/
│  └─ sections/
│
├─ lib/
│  ├─ api/
│  ├─ utils/
│  ├─ constants/
│  └─ validators/
│
├─ styles/
│  └─ globals.css
│
└─ docs/
   └─ frontend.md
```

---

# 10. MVP Pages

The MVP frontend should include these primary pages.

## 10.1 Landing Page

### Objective
Communicate what Elura is and drive artist signups.

### Required sections
- hero
- value proposition
- problem/solution
- features preview
- social proof or credibility framing
- CTA

### Core message
Elura helps makeup artists look professional, get discovered, and get booked.

### Key actions
- Join / Sign up
- Learn more

---

## 10.2 Signup Page

### Objective
Allow artists to create an account.

### Required elements
- email input
- password input
- submit button
- login link
- error state
- loading state

### UX rule
Keep this screen simple.
Do not overload signup with too many fields.

---

## 10.3 Onboarding / Profile Setup

### Objective
Collect artist identity and professional profile information.

### Required fields
- full name
- username
- bio
- location
- specialty
- price range
- Instagram handle
- profile image

### UX rule
This should feel like profile creation, not a bureaucratic form.

---

## 10.4 Dashboard

### Objective
Give artists a clean control center.

### Required sections
- profile completion status
- portfolio uploads
- AI consultation feature entry point
- future booking requests preview

### MVP rule
Dashboard should be lightweight, not enterprise-style.

---

## 10.5 Public Artist Profile

### Objective
Present the artist as professional and bookable.

### Required sections
- profile header
- bio
- specialties
- location
- pricing
- portfolio gallery
- booking CTA

### Design priority
This page should feel elegant and highly visual.

---

## 10.6 Discovery Page

### Objective
Allow clients to browse artists easily.

### Required elements
- artist card grid
- filter controls
- empty state
- loading state

### Filters
- location
- specialty
- price range

---

## 10.7 Booking Request Page / Modal

### Objective
Allow a client to submit a booking inquiry.

### Required fields
- client name
- email
- phone
- event type
- event date
- message

### UX rule
Fast, clear, and low-friction.

---

## 10.8 AI Consultation Feature

### Objective
Allow artists to generate a consultation pack.

### Required inputs
- event type
- skin type
- desired finish
- time constraint
- notes

### Required outputs
- questionnaire
- prep message
- kit checklist
- timeline
- artist tips

### UX rule
Outputs should be easy to scan and easy to copy.

---

# 11. Core Components

The frontend should be built from reusable, consistent components.

## 11.1 Button System

### Primary Button
Use for:
- primary CTAs
- signup
- form submit
- booking request

Style:
- gradient accent
- dark text
- soft glow
- rounded shape

### Secondary Button
Use for:
- less prominent actions
- cancel / back / alternate flows

### Ghost Button
Use for:
- low-priority actions
- filter clearing
- text-led actions

---

## 11.2 Card System

### Artist Card
Must include:
- profile image
- name
- specialty
- location
- price range

### Glass Card
Use for:
- feature previews
- dashboard panels
- AI result blocks

### Rule
Cards should feel soft, minimal, and premium.

---

## 11.3 Input System

### Base Input
Use for:
- text
- email
- username
- phone
- location

### Textarea
Use for:
- bio
- notes
- booking message

### Select / Multi-select
Use for:
- specialties
- price ranges
- event type

### Rules
- clear labels
- visible focus states
- readable placeholder text
- consistent spacing

---

## 11.4 Portfolio Grid

### Objective
Show makeup work clearly and beautifully.

### Rules
- prioritize image quality
- avoid awkward crops where possible
- consistent spacing
- support responsive layout

---

## 11.5 Status Components

Need dedicated UI for:
- loading
- empty states
- success states
- form validation errors
- API failure messages

---

# 12. Interaction Design

## 12.1 Motion

Use subtle motion only.

Recommended:
- soft fade-in
- hover lift for cards
- button hover glow
- smooth state transitions

Avoid:
- excessive motion
- distracting parallax
- slow page load caused by heavy animation

## 12.2 Hover States

Hover should reinforce quality, not look gimmicky.

Examples:
- link accent shift
- soft border emphasis
- card glow increase

## 12.3 Form Interaction

Forms should:
- validate clearly
- preserve input on minor errors
- show useful success messages
- never feel punishing

---

# 13. State Handling

The frontend must explicitly handle these states.

## 13.1 Loading
Examples:
- submitting form
- loading discovery results
- uploading image
- generating AI response

## 13.2 Empty
Examples:
- no portfolio images yet
- no discovery results
- no booking requests yet

## 13.3 Success
Examples:
- profile saved
- portfolio uploaded
- booking request sent
- AI consultation pack generated

## 13.4 Error
Examples:
- signup failed
- upload failed
- API request failed
- AI generation failed

Rule:
Every major user action should have a clear feedback state.

---

# 14. API Integration Expectations

The frontend must follow the backend contract exactly.

## 14.1 Source of truth
Use `api-contracts.md` as the contract source.

## 14.2 Rules
- do not invent backend fields
- do not assume undocumented response fields
- handle missing/optional fields gracefully
- centralize API calls in `lib/api/`

## 14.3 Suggested API Layer Structure

```text
lib/api/
├─ artists.ts
├─ portfolio.ts
├─ booking.ts
└─ ai.ts
```

---

# 15. Form Strategy

## 15.1 Artist Onboarding Form
Should feel smooth and confidence-building.

Recommendation:
- single page if short
- multi-step only if truly necessary

For MVP, a single structured page is acceptable.

## 15.2 Booking Form
Keep short.
Do not ask for unnecessary details.

## 15.3 AI Consultation Form
Should feel utility-first:
- concise inputs
- fast generation
- easy copy outputs

---

# 16. Accessibility Expectations

Elura must maintain a basic but real accessibility baseline.

## 16.1 Required standards
- clear focus states
- sufficient text contrast
- label every input
- semantic headings
- keyboard navigability for forms and CTAs

## 16.2 Color caution
Because the palette is soft and atmospheric, ensure muted text and accent states remain readable against the dark background.

---

# 17. Performance Expectations

The frontend must feel fast.

## 17.1 Priorities
- optimize images
- lazy load galleries where needed
- avoid heavy unneeded client-side animation
- keep initial page load light

## 17.2 Portfolio images
Image-heavy pages must be optimized carefully.
Do not let visual ambition destroy performance.

---

# 18. Development Order

The frontend should be built in the same vertical slice order as the product.

## Phase 1 — Foundation
STEP 1 — set up Next.js app  
STEP 2 — configure Tailwind and global tokens  
STEP 3 — implement layout primitives  
STEP 4 — create button, card, and input components  

## Phase 2 — Artist Onboarding
STEP 5 — build signup page  
STEP 6 — build onboarding form  
STEP 7 — connect profile creation to backend  

## Phase 3 — Portfolio
STEP 8 — build upload UI  
STEP 9 — build portfolio gallery component  
STEP 10 — connect upload to backend  

## Phase 4 — Public Presence
STEP 11 — build public artist profile page  
STEP 12 — connect profile data + portfolio  

## Phase 5 — Discovery
STEP 13 — build discovery page  
STEP 14 — add filters  
STEP 15 — connect artist listing endpoint  

## Phase 6 — Booking
STEP 16 — build booking request UI  
STEP 17 — connect booking endpoint  
STEP 18 — add success and error handling  

## Phase 7 — AI
STEP 19 — build consultation pack form  
STEP 20 — display structured AI results  
STEP 21 — add copy actions and loading states  

---

# 19. Definition of Done for MVP Frontend

The frontend is MVP-ready when:

- landing page clearly communicates value
- artists can sign up
- artists can complete a profile
- artists can upload portfolio images
- public artist profile pages work
- clients can browse artists
- clients can submit booking requests
- artists can use the AI consultation feature
- all major states have feedback
- mobile experience is usable
- design feels premium and consistent

---

# 20. What to Avoid

Do not add these too early:

- social feed UI
- messaging UI before messaging exists
- review UI before review data exists
- bloated dashboards
- too many gradients or glows
- decorative 3D backgrounds that reduce usability
- “beauty app” clichés that make Elura feel unserious

---

# 21. Final Frontend Principle

The frontend for Elura should make a makeup artist feel:

**“This is where my work looks professional.”**

And it should make a client feel:

**“I can trust and book someone here.”**

That is the standard every page, component, and interaction should meet.
