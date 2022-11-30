# Kirjontastudio Helmi

Kirjontastudio Helmi -projekti Copyright 2022 Ilkka Forsblom

[demo-versio](https://puoti-production.up.railway.app/)

## Pikaohje:

Kopioi .env.example -> .env -tiedostoksi ja täytä tarvittavat kohdat.
Asennukset:

```bash
npm install
npx prisma db push
```

Dev-ympäristö käynnistys (avaa selaimen):

```bash
npm run dev -- --open
```



## Käytetyt kirjastot ja komponentit


[lucia-sveltekit](https://lucia-sveltekit.vercel.app/)

  Käyttäjänhallinta (tällä hetkellä projektissa vanhentunut versio, uusi versio on selkeämpi ja toimivampi, toivon mukaan). Vain sveltekit-käyttöön

[remarkable](https://github.com/jonschlinkert/remarkable)

  Markdown-renderöinti. Voi käyttää missä tahansa projektissa selain-javascriptinä, sekä myös node.js -projekteissa

[prisma](https://www.prisma.io/)

  Tietokantakirjasto node.js/Typescript -projekteihin.

[svelecte](https://mskocik.github.io/svelecte/)

  Monivalintaelementti. Tehty sveltelle, mutta voi käyttää javascript/custom element ratkaisuna missä projektissa tahansa.


----

Sveltkit-projektin mukana tullut oletusohje:

# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
