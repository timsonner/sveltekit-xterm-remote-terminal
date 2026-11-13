# sveltekit-xterm-remote-terminal

Browser terminal proof of concept. A SvelteKit page embeds xterm.js. Pressing Enter sends the typed line to this app, and `src/routes/[args].ts` runs it on the server with Node.js `child_process.spawn()`.

The endpoint runs the request path as a local process and does not check credentials. Treat the server as a shell for anyone who can open that port. With no extra flags, `npm run dev` and `npm run preview` print `local: http://localhost:3000` and `network: not exposed`.

## Prerequisites

- Node.js 14.13 or newer, and npm. The locked `@sveltejs/kit` release (`1.0.0-next.314`) sets `"engines": { "node": ">=14.13" }`.
- A browser for the terminal page.

The page requests `http://localhost:3000/<command>`. Keep the server on port 3000. That is the default for `npm run dev` and `npm run preview`.

## Install, build, run, and check

Clone and install:

```bash
git clone https://github.com/timsonner/sveltekit-xterm-remote-terminal.git
cd sveltekit-xterm-remote-terminal
npm install
```

`npm install` runs the `prepare` script, `svelte-kit sync`.

Opening the repo in Gitpod follows `.gitpod.yml`: `npm install && npm run build`, then `npm run dev`.

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000.

Build for production, then serve that build:

```bash
npm run build
npm run preview
```

`npm run build` uses `@sveltejs/adapter-auto`. In an environment the adapter does not recognize, the build still finishes and prints that it could not detect a supported production environment.

Type-check the project:

```bash
npm run check
```

Watch mode for the same check:

```bash
npm run check:watch
```

`package.json` has no `test` script. `npm test` exits with `Missing script: "test"`.

`npm run package` (`svelte-kit package`) exits with an error because `src/lib` does not exist. This app is not set up as a library package.

## Usage

1. Run `npm run dev`.
2. Open http://localhost:3000.
3. The page loads `src/routes/Term.svelte` in the browser and opens an xterm.js terminal. The prompt text is `Remote terminal $`.
4. Type a command and press Enter. The page sends the line as a GET path, for example `GET http://localhost:3000/echo%20hello`. It sends that request twice, with `mode: "no-cors"`.
5. `src/routes/[args].ts` splits the path on spaces, then calls `spawn(program, args)`. Standard output and standard error are appended to a module-level string and returned as `text/plain`.

A `no-cors` response is opaque, so the page does not copy command output into the xterm. Typed keys are echoed there. Read the response with curl:

```bash
curl "http://localhost:3000/echo%20hello"
```

The handler returns the output string without waiting for the process to exit, and it keeps output from earlier commands. The first request is often empty. Request the same path again to see the text collected so far.

## Project layout

```
src/app.html                 HTML shell
src/app.d.ts                 SvelteKit App types
src/routes/index.svelte      Loads Term.svelte in the browser
src/routes/Term.svelte       xterm.js terminal and fetch on Enter
src/routes/[args].ts         GET endpoint that runs the path with spawn()
static/favicon.png           Favicon
svelte.config.js             svelte-preprocess and @sveltejs/adapter-auto
package.json                 npm scripts and dependencies
.gitpod.yml                  Runs npm install, npm run build, then npm run dev
```

## License

This repository has no `LICENSE` file, and `package.json` has no `license` field.
