# Hotfixes for carried-over source trees

A build takes about two days on GitHub's runners, and the source tree is
patched only once, in the first stage. When a late stage fails (typically at
link time) and the fix is a change to the engine patches, a new run started
with `resume_run_id` continues from the failed run's `build-artifact` instead
of starting over. That tree still has the old patches applied.

Each `*.patch` here is the difference between that old tree and a tree patched
from the engine commit this repository pins. `build.py` applies the pending
ones to a carried-over tree and records them in `build/src/facet_hotfix/`.
A tree patched from scratch already contains them, so there they are only
recorded.

Rules:

- A hotfix must change the tree to exactly what the pinned engine patches
  produce. Fix the engine patch first, then copy the resulting source diff.
- Remove the files here once no run will be resumed from a tree older than
  the fix.

| Hotfix | Engine patch that contains it |
| --- | --- |
| `001-blink-common-ungoogled-switches-dep.patch` | `extra/fingerprint/002-user-agent-fingerprint.patch` |
