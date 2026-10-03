# Security Policy

God of Design is Markdown content plus three small installers. The installers only copy files into the documented skill/rule folders, record each path in `~/.god-of-design/manifest.tsv` (or `./.god-of-design/manifest.tsv`), and remove only those paths on uninstall. They make no network calls except downloading this repository's archive from `codeload.github.com` when run remotely.

If you find a vulnerability (for example, an installer deleting files outside its manifest, or a path-traversal issue), please report it privately through **GitHub → Security → Report a vulnerability**. If that button is not available, open an issue that asks for a private contact, without including details. Expect a first reply within 7 days.

Prefer to inspect before running? Download `install.sh` / `install.ps1`, read them, and run them locally. Every flag supports `--dry-run`.
