<div align="center">

<img src="assets/readme/hero.gif" width="1200" alt="MOHAMMADREZA ABEDINPOOR — rotating 3D geometry" />

**[English](README.md) · [فارسی](README.fa.md)**

<img src="assets/readme/identity.svg" width="1200" alt="web / English and Persian documentation" />

</div>

# MOHAMMADREZA ABEDINPOOR

A static personal website with project sections, certificate assets, locale data, search-engine metadata and a service worker.

[GitHub](https://github.com/MOHAMMADREZAABEDINPOOR/personal-website) · [PIMX / Profile](https://github.com/MOHAMMADREZAABEDINPOOR) · [Static artwork](assets/readme/hero.png)

## Features

- Personal introduction and project showcase
- Certificate assets and locale resources
- Manifest, service worker and installable-site foundations
- Sitemap, robots and deployment/SEO notes

## Stack

| Tool | Version / source |
|---|---|
| HTML / CSS / JavaScript | `static files` |

## Getting started

A modern browser; Python is optional for the local HTTP server.

```bash
git clone https://github.com/MOHAMMADREZAABEDINPOOR/personal-website.git
cd personal-website

python -m http.server 8000
```

## Configuration

No standard environment template is defined. Standalone exercises need no external configuration; inspect any service constants or paths in the source before running.

## Usage

Serve the directory over HTTP and open index.html. Update locale files, personal links and the sitemap when adapting content.

## Project structure

| Path | Role |
|---|---|
| [`assets/`](assets/) | Brand/media/README assets |
| [`google-site-verification.html`](google-site-verification.html) | Project entry/configuration file |
| [`index.html`](index.html) | Project entry/configuration file |
| [`manifest.json`](manifest.json) | Project entry/configuration file |

## Commands and checks

No automated test command is declared in a manifest. Verify behavior through a local example run.

## Deployment

Publish the directory to an HTTPS static host and verify file paths and external links.

## Limitations

Service-worker caching can retain older assets; clear site data during development. Certificates and brand resources remain subject to their owners’ rights.

## Troubleshooting

- Missing packages: install dependencies using the project’s package manager.
- API/network failure: check the configured origin, provider and hosting bindings.
- Old assets: rebuild when a build script exists, then clear the browser cache.

## Contributing

Create a focused branch, verify the affected behavior and explain the change clearly. Keep private data, build outputs and local databases out of commits.

Supporting guides:

- [DEPLOYMENT.md](DEPLOYMENT.md)

## License

The repository license text is in the following file; third-party resources and dependencies can have different terms: [LICENSE](LICENSE).

---

Part of **PIMX** · Documentation in English and Persian.
