# @matteosacchetto/ts-rollup-esbuild-node-template

Template for developing a NodeJS app using tpyescript, rollup and esbuild

This repository follows the [conventional commit v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) specification and the [semantic versioning v2.0.0](https://semver.org/spec/v2.0.0.html) specification.

![conventional commit](https://img.shields.io/badge/conventional%20commit-1.0.0-ffd942?style=for-the-badge)
![semantic versioning](https://img.shields.io/badge/semantic%20versioning-2.0.0-f542b9?style=for-the-badge)

Commit messages should follow the [Angular commit convention format](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

## Settings

![typescript](https://img.shields.io/badge/typescript-007acc?style=for-the-badge&logo=typescript&logoColor=ffffff)

Runs with

- `node`: `18.18.2`
- `npm`: `>=9.6.5`

It uses

- `rollup`: for its plugin ecosystem
- `esbuild`: for transpilation speed
- `biome`: for linting and formatting
- `tsx`: (esbuild under the hood) as ts to esm loader
- `node:test` for testing
- `c8`: for coverage reporting

It also provides some env variables which will be replaced during transpilation

- `process.env.PKG_NAME`: contains package name
- `process.env.PKG_VERSION`: contains the package version
- `process.env.PKG_DESCRIPTION`: contains package description
- `process.env.BUILD_NODE_ENV`: allows to perform threeshaking of code you do not want to have after the production build step

> ![NOTE]
> If you are using this template for a CLI you need to set the `isCli` property of `rollup.config.mjs` to `true`. Then add `#!/usr/bin/env node` to the top of the `src/index.ts` file

It contains already a bunch of github actions configured

- `sync-labels`: allows you to synch the github labels accoring to the `.github/labels.yml` file
- `pr-linter`: enforces conventional commit in PR
- `ci`: runs `npm run test` and `npm run build`. If it is a PR it also runs `npm run style-check`
- `release`: it uses `release-please` to create github releases
  - To allow this to run you need to set "Allow GitHub Actions to create and approve pull requests" under repository Settings > Actions > General.
