# Retrospective — MACH-I Revision Sprint Round 1
Date: 2026-03-03

## What Went Well

- **Phase 1 as P0 blocker was the correct call.** Treating global removals as a prerequisite before any parallel work prevented downstream agents from accidentally re-introducing or building on top of content that was about to be deleted. The gate held.
- **Parallel execution of Phases 2-5 worked cleanly.** File ownership was non-overlapping across those phases — Rod owned `index.html`, then `about.html`, then `services.html`, then `special-issuance.html` and `contact.html` in separate owned phases. Zero merge conflicts across the sprint.
- **UI review caught a real defect.** Jony's review surfaced the P2 gold callout box issue (the "Most comparable programs charge over $10,000" value proposition rendering as inline `<strong>` rather than a visually distinct callout). That issue was fixed before ship. The review was not ceremonial.
- **Orphaned CSS cleanup was thorough.** Phase 6 and the UI review together caught `.nav-review-link` and `.si-anchor-nav` — dead CSS rules that had no corresponding HTML. Clean codebase, not just clean content.
- **The dr-d-review.html client collaboration page was a high-value addition.** A standalone, non-linked review page with an interactive checklist gives Dr. D a structured way to verify each change without needing to diff code or remember what was requested. It positions the revision as professional and accountable.
- **Grep verification was the right acceptance criterion format.** Every phase gate used concrete grep checks — zero matches for "young", "pulmon", "hundreds" — rather than subjective "looks good" criteria. This made verification mechanical and trustworthy.
- **Commit history is clean and traceable.** 8 commits, each mapping 1:1 to a phase, each with a descriptive message. No squash commits, no fix-up chains. The git log tells the story of the sprint.
- **Deferred items were explicitly called out and scoped out.** The plan listed out-of-scope items (new email, encrypted inbox, testimonials, Netlify account transfer) with clear labels. No scope creep, no ambiguous "should we also..." moments.

## What Could Improve

- **UI review relied on ARIA snapshots, not visual screenshots at all 3 breakpoints.** The plan specified desktop (1440px+), tablet (768px), and mobile (375px) visual reviews. What Jony executed was ARIA snapshot analysis plus CSS breakpoint inference — not actual rendered screenshots at each size. Tablet and mobile results were marked "PASS (inferred from CSS)" rather than verified visually. For a static HTML site, this is lower confidence than it should be. Real rendering at each breakpoint is achievable and the plan called for it.
- **Live deployment was not verified.** The final review flags this explicitly as a remaining risk. The entire sprint ran against local files, not the live Netlify URL. Form submission, external links (PubMed, LWW publisher), and the Google Maps iframe were all unverified at deploy time. For a client-facing site, a post-deploy smoke test should be a hard gate, not an open item.
- **Phase granularity was slightly over-split.** Phases 2 and 3 (home page content edits, about page bio enhancement) were assigned to the same agent (Rod) and could have been a single phase with two file ownership slots. They ran sequentially anyway — Rod couldn't work on both simultaneously — so the split added overhead without parallelization benefit. For a ~10-phase plan, consolidating same-agent sequential phases would simplify orchestration.
- **The plan specified model estimates but actual models used weren't tracked.** The plan included estimated context cost (small/medium/large) and intended models (sonnet, haiku, opus) per phase. There's no record of whether the actual dispatched agents matched those estimates. Retrospecting on model efficiency requires knowing what was actually run.
- **Phase 6 (site-wide consistency pass) owned too many files simultaneously.** Woz owned all HTML files, main.js, and styles.css in Phase 6 for a consistency pass. In practice this worked because the changes were targeted, but the ownership map in the plan shows "Woz" against everything in Phase 6 — which violates the spirit of the file ownership rule even if not the letter. A large sweep agent is higher-risk than focused narrow agents.
- **No cost tracking.** The sprint plan estimated context sizes but there's no record of actual token spend, model usage, or agent run time. For a sprint that ran ~10 dispatched agents, that data would sharpen future estimates.

## Lessons Learned

- **P0 gates that remove content before any P1 work begins are essential for content revision sprints.** When a sprint's first task is "remove X from everywhere," that must complete and be verified before parallel agents start adding content adjacent to where X was. Even if agents own different files, they may be adding content that references the removed items.
- **"Inferred from CSS" is not a passing test result for visual review.** Responsive behavior confirmed by reading breakpoint rules in CSS does not tell you how the page actually renders in a browser. Playwright or similar tools can screenshot real rendered output at any viewport — use them.
- **Post-deploy smoke tests belong inside the sprint, not in the risks section.** If the project deploys to a live URL, a post-deploy checklist (load each page, submit a test form, verify one external link) should be an explicit phase gate before declaring the sprint complete. A sprint that ships but hasn't verified the live deployment has an open P1 by definition.
- **Client-facing change summaries (review pages, checklists, diffs) are worth the investment.** The dr-d-review.html page was created as a deliverable, not as an afterthought. That kind of artifact accelerates client sign-off and reduces back-and-forth. For any client revision sprint, plan for a change summary document as a first-class output.
- **Acceptance criteria should be machine-checkable wherever possible.** Grep patterns as gate criteria (zero matches for "young", "pulmon", "hundreds") are far more reliable than human spot-checks. Define these upfront in the plan so verification is automatic, not judgment-based.
- **Static HTML sites don't require a build step — leverage that for speed.** The entire sprint operated on files that could be opened directly in a browser. No build pipeline, no compilation, no dependencies. For revision sprints on static sites, the absence of a build step means agents can verify changes immediately without any toolchain overhead.
- **When a phase cleanup agent owns "all files," consider breaking it into smaller targeted passes.** A global consistency sweep carries more risk than targeted file-by-file verification. The efficiency gain from a single sweep agent is real, but so is the risk of cross-contamination. Consider parallel narrow sweeps per page instead.

## Agent Performance

| Agent | Role | Grade | Notes |
|-------|------|-------|-------|
| Elon | Planning + Final Review | A | Plan was well-structured: file ownership map, parallelization graph, concrete gate criteria, priority framework. Final review was systematic — grepped every key pattern, verified every checklist item, documented remaining risks honestly. The A- on risk management is fair (live deploy unverified). |
| Woz | Structural/Technical (Phase 1, Phase 6) | A | Phase 1 executed cleanly across 7 files with zero missed references. Phase 6 consistency pass caught and fixed everything it was asked to verify. The broad file ownership in Phase 6 is a process concern, not a Woz quality issue. |
| Rod | Copy/Messaging (Phases 2, 3, 4, 5) | A | Bio rewrite on about.html integrated all CV facts while reading naturally — not a CV dump. Services page revamp was a structural change, not just copy edits. CVG airport content was specific and useful. Maintained consistent tone and accuracy across 5 phases. |
| Jony | UI/UX Review (Phase 8) | B+ | Thorough cross-functional checks: all links, all forms, all anchor targets, all accordions, accessibility pass, nav verification. Caught the P2 callout box issue and two P3 orphaned CSS rules. Grade penalized because tablet/mobile reviews relied on CSS inference rather than actual rendering — the plan specified visual screenshots at 3 breakpoints and those weren't taken. For a content site, the ARIA snapshot approach found the real issues, but the methodology gap is real. |
| Pepper | Dispatch/Orchestration | A- | Phase sequencing and parallelization were correct. File ownership map enforced. Agents completed without conflicts. Deducted half-grade for not tracking actual model usage vs. planned, and for not flagging the UI review methodology gap (ARIA snapshots vs. visual screenshots) before it was too late to re-run Jony at actual viewport sizes. |

## Process Notes

**Dispatch pattern worked.** The single-fan-out from Pepper after Phase 1 — dispatching Phases 2, 3, 4, and 5 in parallel — is the right pattern for this type of content revision. File ownership being non-overlapping across those phases is what made parallelism safe. The design precedes the execution; get file ownership right and parallel agents become low-risk.

**Gating worked as designed.** Phase 1 → [2/3/4/5 parallel] → Phase 6 → Phase 7 → Phase 8 → Phase 9. Each gate was honoured. No phase was declared complete before its gate criteria were verified. This is what kept quality high throughout.

**The plan-before-execution investment paid off.** Elon produced a detailed plan before any implementation began — acceptance criteria, file ownership map, commit message templates, parallelization diagram, model estimates, scope exclusions. That upfront investment is what allowed parallel execution with minimal coordination overhead. Agents didn't need to ask questions because the plan answered them.

**Static HTML sites are fast to iterate on.** No compilation, no dependency management, no hot-reload configuration. Agents made edits and the site was immediately reviewable. Sprint velocity on a static HTML project is fundamentally higher than on a compiled app — plan phases accordingly (more parallel work is viable).

**The review page (dr-d-review.html) as a deliverable is a pattern worth repeating.** Any time a sprint makes changes on behalf of a client or stakeholder, a standalone change summary with a verification checklist is a professional output. It reduces "what did you change?" back-and-forth and gives the reviewer structure.

## Recommendations for Next Sprint

1. **Add a post-deploy smoke test phase.** After merging to main and Netlify deploying, run a lightweight checklist: load each page at production URL, verify one form submission, check one external link, confirm no console errors. This is 15 minutes of work that closes the largest remaining risk from this sprint.

2. **Require actual rendered screenshots for UI review at all 3 breakpoints.** Playwright can screenshot any page at any viewport. "Inferred from CSS" should not be an acceptable tablet/mobile test result. Update the Phase 8 gate criteria to require screenshots as evidence, not ARIA snapshots alone.

3. **Track actual model usage per agent.** Add a field to each agent's status JSON: `model_used`. Report it in the final review. This closes the loop between planned model efficiency and actual model efficiency.

4. **Consolidate same-agent sequential phases.** Phases 2 and 3 were both Rod, both sequential, both small-to-medium. They could be one phase: "Home page and About page copy updates, Files owned: index.html + about.html." Fewer phases = simpler orchestration without losing parallelism where it matters.

5. **Break Phase 6-style "all files" sweep agents into targeted per-page passes.** Rather than a single agent owning everything for a consistency pass, assign targeted sweeps: Agent A checks credential consistency across all pages (read-only grep), Agent B applies fixes to the specific files that need them. Keeps file ownership narrower.

6. **Consider a pre-sprint change log document as a standard artifact.** Before the revision plan is written, produce a structured change log that maps each client feedback item to: the specific file(s) it affects, the before/after text, and the acceptance criterion. Elon's plan did most of this, but formalizing it as a separate artifact (separate from the phase plan) makes verification more mechanical.

7. **For client revision sprints, add a "verify scope exclusions" gate.** The plan listed out-of-scope items explicitly. Add a final check that none of them crept in: grep for the excluded concepts (new email links, testimonials section, etc.) before shipping. The exclusion list is the scope boundary — verify it held.
