# Public release record

Published on **13 October 2026**, with the user's approval of public GitHub publication and Vercel deployment.

## Live artifacts

- **Production:** https://jito-exit-clarity.vercel.app
- **Repository:** https://github.com/azimxxd/jito-exit-clarity (public, default branch `main`)
- **Initial GitHub CI:** https://github.com/azimxxd/jito-exit-clarity/actions/runs/38390412776 — passed
- **Initial Vercel deployment:** https://vercel.com/azamat-s-projects7/jito-exit-clarity/D4HycQ9XAVgqVvYa6fFPCS5CSZbd — READY

Vercel connected the GitHub repository during deployment. Subsequent pushes use that integration. The package engine, `.nvmrc` and GitHub Actions select Node 24. No API keys or environment variables are needed.

## Publication checks

- GitHub confirmed public visibility and `main` as the default branch.
- GitHub Actions completed `npm ci`, ten calculation tests and the production build.
- Vercel built the source using the committed Vite configuration and assigned the production domain.
- An anonymous HTTPS request to the production domain returned 200; no Vercel sign-in was required.
- The live response included `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin` and `X-Frame-Options: DENY`.
- Browser checks on the live domain verified amount/rate/slippage calculations, invalid-input suppression, preference highlighting and expandable explanations.
- Mobile layouts at 390px and 320px had no horizontal overflow. Browser error logs were empty during the checks.

The initial CLI deployment reported a non-blocking npm cache-dir warning from Vercel's environment and an esbuild install-script review notice. The build still completed successfully. No application build errors were reported.

## Source and privacy

The repository contains the reviewed application, research documentation, contribution draft and two selected release screenshots. Dependencies, build output, environment files, Vercel account state and development screenshots are ignored. `.vercelignore` keeps documentation, test files and local state out of deployment uploads. Git commits use GitHub's noreply attribution rather than a private email.

No open-source license has been selected. This is an independent educational prototype, not an official Jito interface. Publication does not validate the UX hypothesis or make the mock calculations suitable for real transactions.

## Remaining competition steps

The hosting approval did not authorize a TokenGems post, X follow/repost, wallet connection or Earn submission. None of those actions was performed.

The user still needs to complete their TokenGems profile independently, supply its URL and their X handle, and meet the X requirements. Then review and separately approve the final contribution in `TOKEN_GEMS_SUBMISSION.md`. After posting, add its permalink, recheck the contest deadline and obtain final approval of the Earn application. The main Earn link must be the user's TokenGems profile, not the demo.

## References

- [Vercel project configuration](https://vercel.com/docs/project-configuration)
- [Supported Vercel Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions)
