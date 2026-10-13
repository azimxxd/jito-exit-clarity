# Verification

Checked on 13 October 2026.

## Automated

- `npm run build`: strict TypeScript compilation and Vite production build passed.
- `npm test`: ten calculation tests passed.
- Tests cover the mock conversion rate, documented protocol fee model, sequential slippage, zero amounts, malformed decimals, nonfinite values, negative values, range limits, output finiteness and reversals under different assumptions.

## Browser verification

Used the Codex in-app browser at 1440px desktop, 1024px and 768px tablet, 390px mobile and 320px small mobile. The document scroll width matched the viewport at each checked size. Desktop and mobile layouts were visually inspected; mobile cards stack vertically. Screenshots are saved in `docs/screenshots/`; files prefixed `refined-` show the updated design.

Verified the amount presets, editable rate and slippage, negative-input estimate suppression, zero output, preference highlighting, expandable fees, click/focus tooltip and direct withdrawal timeline. A scenario with 100 JitoSOL, a 1.2 mock rate, 0.2% trading cost and 1% slippage produced 118.5624 SOL for instant exit and 119.8800 SOL for direct unstaking.

No browser error or warning logs appeared during the refinement interactions. Motion respects the user's reduced-motion setting through MotionConfig and CSS. Keyboard focus and input labels are implemented; this was not a full assistive-technology audit or user study.

## Usability refinement checks

- Hero token packets animate through both route branches and toward SOL; reduced-motion CSS disables the packets.
- The main Compare Exit Methods link uses native smooth fragment scrolling. At desktop and mobile, the calculator aligned at approximately 100px from the top and received keyboard focus.
- All three amount presets and preference options were exercised. Preference highlighting remains about the selected priority, even when the modeled cost outcome reverses.
- Twenty browser input checks: blank, negative, NaN, Infinity and excessive values in each of the four inputs. All marked the field invalid and hid estimates.
- Zero, leading decimal, smallest supported fractional amount and maximum amount were checked. Small nonzero results show an inequality rather than a misleading zero.
- Equal 0.1% fee assumptions produced an exact tie. The calculation regression suite now checks this.
- Both fee breakdowns, the four-topic estimate guide and assumption collapse/expand were exercised.
- Both method timelines and tooltip focus/click/Escape behavior were checked. Escape dismissal was fixed after testing found a hover-style conflict.
- Official research references, the proposed discovery journey and non-affiliation disclosures were inspected.
- No horizontal overflow at all five checked viewport widths.

## Limits

No live quotes, wallet permissions, transactions, actual balances or public deployment. All timings and fees are educational descriptions drawn from the linked documentation. Real total costs and independent route exchange rates require a production integration.

## Release audit

The production output was served with `npm run preview` and inspected, rather than relying only on the development server. All amount presets, all preference choices, editable rate/slippage, invalid-input suppression, both fee disclosures, the estimate guide, tooltip Escape dismissal and both journey routes passed the repeated browser checks. Console error/warning logs were empty.

Accessibility improvements include explicit row/column header scopes, an ordered list for withdrawal stages, shorter tooltip button names with descriptions, persistent focused tooltips, and existing keyboard focus transfer to the calculator. Inputs are capped at 24 characters; parsing independently rejects overlong values. A regression test covers this cap.

Removed unused old wordmark/token-logo CSS and the superseded flow-dot animation. Added a neutral favicon, Node 24 selection, a Vercel manifest and a GitHub Actions build/test workflow. The workflow is prepared locally and has not run remotely yet.

The production dependency audit returned no reported vulnerabilities at inspection time. A local credential-pattern scan found no matches in the files selected for release. These checks do not constitute a security audit.

Production keyboard checks confirmed that the skip link focuses the calculator and the next Tab reaches the amount input. Explicit table header scopes and four ordered timeline items were inspected in the DOM. Release captures are `release-desktop.jpg` and `release-mobile.jpg`; earlier screenshots stay local.
