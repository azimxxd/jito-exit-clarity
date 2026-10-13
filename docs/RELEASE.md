# Public release plan

## Prepared locally

- Static React/TypeScript/Vite application and lockfile.
- Node 24 selection (`.nvmrc`), documented setup and `npm run check`.
- `vercel.json`: Vite preset, `npm ci`, production build, `dist` output and basic response headers.
- GitHub Actions workflow running tests and the production build.
- Secret/local-state exclusions in `.gitignore`.
- English research notes, competition verification and contribution draft.
- Neutral concept identity and an independent-research disclosure.

The user approved public GitHub publication and Vercel deployment on 13 October 2026. The repository is public at https://github.com/azimxxd/jito-exit-clarity. Initial GitHub CI passed: https://github.com/azimxxd/jito-exit-clarity/actions/runs/38390412776. Vercel deployment is in progress.

## Approval scope

Create the public repository **azimxxd/jito-exit-clarity**, publish the reviewed source and selected release screenshots, and deploy the static website to the user's Vercel account under **jito-exit-clarity**. This approval does not authorize posting to TokenGems, following/reposting on X, connecting a wallet or submitting to Earn.

No open-source license is selected yet. Publishing the repository does not itself grant an explicit software license; the user may choose one later. Do not copy third-party Jito trademarks into a license or imply endorsement.

## GitHub procedure after approval

1. Recheck whether the target repository now exists.
2. Commit the locally reviewed files using an appropriate attribution configuration. Avoid exposing a private email in public commit metadata.
3. Create the public repository through the authenticated GitHub CLI, push `main`, and verify that the remote files are accessible.
4. Verify the GitHub Actions result. A prepared workflow has not run on GitHub until this point.

## Vercel procedure after approval

1. Use the existing Vercel account/session, or ask the user to sign in if no session is available. Never request a token in chat.
2. Import the GitHub repository into Vercel. Use the repository root and Vite preset.
3. The committed configuration uses `npm ci`, `npm run build` and `dist` output. No environment variables are needed.
4. Inspect the deployment result, then verify the actual live URL on desktop and mobile. No live URL is promised until deployment succeeds; the desired name may already be taken.
5. Fill the verified demo/code links in the README and submission draft.

Alternatively, deploy with the official Vercel CLI after authentication and approval. Do not run `vercel --prod` or upload the source before approval.

## Final submission procedure

The main Earn link is the user's TokenGems profile, not the demo site. Obtain approval of the completed contribution separately. Wallet sign-in must be performed by the user. Add the actual contribution permalink and X handle, confirm the live contest status, and obtain final approval before posting/submitting.

## Deployment reference

[Vercel project configuration](https://vercel.com/docs/project-configuration)

[Supported Vercel Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions). The package engine and CI select 24.x; local validation ran on Node 24.19.0.
