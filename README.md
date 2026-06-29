# Legacy Dairies — The Design Story

> *"Every great piece of art tells a story before a single word is read."*

---

## The Concept: An Artisan's Atelier

Legacy Dairies is not a website — it is an **atelier**, a craftsman's workshop where stories are preserved by hand. Every pixel is deliberate. The design philosophy draws from the world of **hand-drawn sketchbooks, aged parchment, and the tactile warmth of physical memory-keeping.**

The user doesn't scroll a webpage. They browse an **open journal** — one that is being drawn in real-time, as if an invisible artist's hand is sketching the interface as they watch.

---

## The Parchment (Background)

The body of the site is not a screen — it is a **sheet of parchment paper**, complete with:

- **Burnt edges** on all four sides, as if the paper has been carefully cut and singed by candlelight — a nod to the fragility and preciousness of memory
- **Paper texture** that scrolls with the content, never repeating unnaturally — because real paper has grain, and real stories have depth

> **Why?** Legacy is old. Memory is fragile. The parchment reminds you that what you're preserving matters enough to write on something that endures — not a disposable digital screen, but a surface with history.

---

## The Pencil Cursor

The user's cursor is replaced with a **graphite pencil**. Every interaction becomes an act of **creation**, not consumption. You are not clicking — you are **writing your story**.

> **Why?** The pencil is the most human tool. It makes mistakes. It smudges. It creates. It is the antithesis of the sterile pointer — it says *"this is your canvas."*

---

## The Header (A Torn Paper Strip)

The navigation bar has the same **crumbled-gum texture** as the interactive buttons. It doesn't sit above the page like a chrome toolbar — it sits **on** the page, like a strip of paper with edges worn soft by handling.

When you scroll, it **shrinks** — not because of modern UI convention, but because when you're deep in a journal, the header becomes the binding of the book. Less prominent, always there, but not intrusive.

> **Why?** A journal's spine holds it together quietly. The header is the spine of this experience.

---

## The Buttons (Crumbled Gum & Rough Sketch)

Every interactive button is wrapped in `crumbled-gum-container` — a SVG turbulence filter that gives it the appearance of a **sticker that's been pressed onto paper and wrinkled slightly at the edges**.

The border of each button is drawn in real-time using **Rough.js**, animating stroke by stroke like a pencil tracing the outline. On hover, a single **underline is sketched** beneath the text — not a CSS transition, but a **hand-drawn line** that sweeps from the cursor's position.

> **Why?** Buttons are decisions. In a journal, decisions are circled, underlined, emphasized with a nervous pencil stroke. These buttons capture that energy — the moment before you commit.

---

## The Hero Photo (A Photograph Taped to Paper)

The hero image sits slightly rotated, held in place by a **tape strip** — as if someone opened the first page of their journal and taped in a photograph. It has:

- **No hover effects** — because a real photo doesn't respond to your hand hovering over it
- A **layered shadow** simulating 2mm of physical thickness — the photo isn't printed on the page, it's **pasted** on it, and you can feel the edge where paper meets photograph
- **No white frame** — the image bleeds to its container edges, intimate and unframed

> **Why?** The first page of a legacy journal always has a photo. It's the face of the person whose story follows. It should feel real — heavy, tactile, permanent.

---

## The Three Pillars (Sketch Cards)

The Capture, Preserve, and Connect cards are each drawn with a **Rough.js rectangle** that animates into existence as you scroll down. The border wobbles slightly — it's imperfect, hand-drawn, alive.

Each card is wrapped in a `crumbled-gum-container`, giving it that **pressed-sticker texture** against the parchment.

> **Why?** Three pillars. Three stones supporting a legacy. Each drawn individually, because each part of the process — capturing, preserving, connecting — is a separate act of love.

---

## Story Doodle (The Living Canvas)

The Story Doodle section features a visual placeholder with the same **card-bg sketch border** as the pillar cards — a rectangle drawn by an invisible hand as you scroll to it. It's a canvas waiting to be filled.

> **Why?** Story Doodle is the AI companion that will embody your wisdom. Its visual space is intentionally minimal — a frame waiting for a portrait. The story hasn't been told yet. The canvas is ready.

---

## The Call to Action (A Handwritten Note)

The CTA section breaks from the typical bold-color-block convention. Instead of a teal banner screaming for attention, it's a **parchment note** with:

- The same `crumbled-gum` texture wrapping the entire block — as if someone tore off a piece of paper and stuck it in the journal with a message
- A **rough-separator** line — the sanguine (blood-red) mark of importance
- Dark graphite text on transparent background — **it reads like a personal note**, not a marketing banner

> **Why?** The most important messages in a journal aren't highlighted in neon. They're underlined. Circled. Written with extra pressure. This CTA is a quiet, sincere invitation — *"Ready to immortalize your story?"* — handwritten at the bottom of a page.

---

## The Contact Cards (Portraits in a Gallery)

Each team member's card is drawn with Rough.js borders that animate on scroll — each person's frame sketched independently, as if the artist paused to draw each portrait frame before moving to the next.

> **Why?** People are not mass-produced. Each contact card being drawn individually says: *these are real people who care about your story.*

---

## The Footer (The Back Cover)

Dark, understated, and simple. The back cover of the journal. It closes the story without fanfare — just the essential links, like an index at the back of a book.

---

## The Invisible Artist

Throughout the experience, **Rough.js** and the **LiveSketchEngine** work together to create the illusion of an invisible hand drawing the interface in real-time. Nothing appears fully-formed — every component is **born before your eyes**, sketched stroke by stroke.

This is the core metaphor: **your legacy is being written right now.** The act of scrolling this page is the act of opening a journal that hasn't been finished yet. The artist is still working. The story is still being told.

And that story is yours.

---

*Designed with graphite, parchment, and the belief that every life deserves to be remembered.*
