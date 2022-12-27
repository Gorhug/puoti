# Kirjontastudio Helmi

Kirjontastudio Helmi -projekti Copyright 2022 Ilkka Forsblom

[demo-versio](https://puoti-production.up.railway.app/)

Ensimmäinen oikea webohjelmointiprojektini, 
työkaluna lähinnä Sveltekit + kirjastoja (kirjastoja listattu alla).

Hyvää:
- toimii niiltä osin kuin projektia rajannut (kirjautuminen, tuotelisäykset, ostoskori, maksaminen)

Huonoa:
- olisi pitänyt ottaa jokin UI-kirjasto alusta lähtien käyttöön, 
  tässä mentiin käsityönä (oli sentään tailwind apuna)
- lomaketarkistuksiin samoin olisi kirjasto ollut kiva (Yup esimerkiksi)
- toimintalogiikkaa vähemmän UI:n seassa ja modulaarisempi 
  (esim. Markdown-editori olisi selkeästi oltava oma komponentti)
- paljon vielä tehtävää (oikeat tuotekategoria -ja tuotesivut, käyttäjäoikeushallinta, ym...)


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

Näistä osa on projektissa vanhoja versioita, API-muutokset tarkoittavat ettei voi ihan suoraan päivittää, tosin muutokset eivät isoja.

[lucia-sveltekit](https://lucia-sveltekit.vercel.app/)

  Sisäänkirjautumissysteemi.

[remarkable](https://github.com/jonschlinkert/remarkable)

  Markdown-renderöinti. 

[prisma](https://www.prisma.io/)

  Tietokantakirjasto/ORM.

[svelecte](https://mskocik.github.io/svelecte/)

  Monivalintaelementti. 

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
