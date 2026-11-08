# Releases

This monorepo uses **one shared SemVer** for frontend and backend.

| Location | Field |
| --- | --- |
| `el-geoushy/package.json` | `"version"` |
| `backend/Directory.Build.props` | `Version` / `AssemblyVersion` / `FileVersion` / `InformationalVersion` |
| `CHANGELOG.md` | Keep a Changelog sections |
| Git tag | `vMAJOR.MINOR.PATCH` (e.g. `v0.1.0`) |
| GitHub Release | Created by `.github/workflows/release.yml` on tag push |

## Why releases were empty

The release workflow already existed and listened for `v*` tags, but:

1. No SemVer lived in `package.json` or `Directory.Build.props`.
2. `CHANGELOG.md` used date headings instead of version sections.
3. **No `v*` tags** had been pushed, so the workflow never ran and the Releases page stayed empty.
4. The workflow attached raw build trees; large trees are unreliable as release assets. Artifacts are now **zipped**.

## How to cut a release

### 1. Prepare the version

1. Update **both** version sources to the same value (e.g. `0.2.0`):
   - `el-geoushy/package.json` → `"version"`
   - `backend/Directory.Build.props` → `Version`, `AssemblyVersion`, `FileVersion`, `InformationalVersion`
2. Move items under `## [Unreleased]` in `CHANGELOG.md` into a new section:

   ```markdown
   ## [0.2.0] - YYYY-MM-DD

   ### Added
   - ...
   ```

3. Update the comparison links at the bottom of `CHANGELOG.md`.
4. Open a PR, get CI green, merge to `main`.

### 2. Tag and push

From `main` after merge:

```sh
git checkout main
git pull
git tag -a v0.2.0 -m "Release v0.2.0"
git push origin v0.2.0
```

Pushing the tag runs **Release** (`.github/workflows/release.yml`), which:

- Builds the frontend (`pnpm build`) and publishes the backend (`dotnet publish`)
- Zips `frontend-.output.zip` and `backend-publish.zip`
- Creates a GitHub Release named `v0.2.0` with notes from `CHANGELOG.md` (fallback: generated notes)
- Attaches the two zip files

### 3. Verify

- [ ] [Releases](https://github.com/RealEstate-Global/El-Geoushy-Industrial-Cleaning-Eg/releases) shows the new tag
- [ ] Both zip assets download and unpack cleanly
- [ ] Changelog section for that version matches the release body

## Manual / dry-run

`workflow_dispatch` is enabled on the Release workflow. Running it from the Actions tab on a non-tag ref builds artifacts but only creates a GitHub Release when the ref is a `v*` tag (`softprops` `draft` / tag detection).

Prefer tagging `main` for real releases.

## Pre-1.0 policy

While the major version is `0`:

- Breaking changes may land in **minor** bumps (document them clearly under `### Changed` / `### Removed`).
- Prefer `0.x.0` for feature batches and `0.x.y` for fixes.
- Move to `1.0.0` when the public API and storefront contracts are stable enough for external consumers.
