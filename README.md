# 🌍 Reseapp

En reseapp där man kan bläddra bland världens länder och läsa mer om varje land. Slutuppgift i JavaScript 3 (FE25).

**Live:** https://reseapp-ali-hammadi.netlify.app

## Vad appen gör

- **Landlista:** alla ca 250 länder med flagga, namn, region och huvudstad. Listan hämtas med ett enda API-anrop.
- **Sök och regionfilter:** sök på landsnamn och filtrera på All, Africa, Americas, Asia, Europe eller Oceania. Allt sker lokalt i appen, utan nya API-anrop.
- **Paginering:** 12 länder per sida med Föregående/Nästa och "Sida 1 av 21".
- **URL-parametrar:** sök, region och sida sparas i adressen, t.ex. `/?page=2&query=fin&region=Europe`. Det gör att sidan fungerar efter omladdning och med bakåtknappen.
- **Detaljsida** (`/country/SWE`): flagga, namn, namn på landets eget språk, region och subregion, huvudstad, befolkning, språk och valuta. Tillbaka-länken går till samma sök, filter och sida som innan. Ogiltiga koder visar "Landet hittades inte".
- **Väder:** aktuell temperatur, vind och en svensk väderbeskrivning från Open-Meteo. Huvudstadens position söks fram med landets `alpha2Code`, och hittas den inte används landets `latlng`.
- **Wikipedia:** kort introduktion, bild, källa och länk till hela artikeln.
- **Laddning och fel:** spinner under laddning, felmeddelanden med "Försök igen"-knapp och en egen 404-sida. Väder och Wikipedia har egna felmeddelanden, så resten av sidan visas ändå om de strular.

## Kör lokalt

```bash
git clone https://github.com/Hammadi15/fe25-js3-reseapp-Ali-Hammadi.git
cd fe25-js3-reseapp-Ali-Hammadi
npm install
npm run dev
```

Öppna sedan http://localhost:5173. Ingen `.env` behövs eftersom alla API:er är öppna.

Bygg för produktion med `npm run build`.

## Tekniker

- **React + Vite** med **TypeScript**
- **Tailwind CSS** för all styling
- **React Router** för sidor och URL-parametrar (`useSearchParams`)
- **TanStack Query** för hämtning, cache, laddning och fel
- API:er: [countries.dev](https://countries.dev), [Open-Meteo](https://open-meteo.com) och [Wikipedia](https://en.wikipedia.org/api/rest_v1/)

### Varför React (Vite) och inte Next.js?

All data kommer från öppna API:er utan nycklar, så appen behöver ingen egen server. Därför valde jag en vanlig React-app med Vite, som är enklare att starta, förstå och publicera. React Router räcker för att ha sök, filter och sida i URL:en.

## Struktur

```
src/
  api/          Anrop till countries.dev, Open-Meteo och Wikipedia
  hooks/        useCountries, useCountry, useWeather, useWikiSummary (TanStack Query)
  components/   CountryCard, SearchField, RegionFilter, Pagination, WeatherCard, WikiIntro
  pages/        HomePage, CountryPage, NotFoundPage
  types/        TypeScript-typer för land, väder och Wikipedia
  utils/        describeWeather – översätter WMO-väderkoder till svensk text
```

## Tillgänglighet och responsivitet

- Semantisk HTML (`header`, `nav`, `main`, `section`, `ul`, `dl`)
- Synlig label på sökfältet och `aria-pressed` på regionknapparna
- Synliga fokusmarkeringar och alt-text på alla bilder
- Mobile-first: 1, 2, 3 eller 4 kolumner beroende på skärmbredd, ingen horisontell scroll vid 375 px

## Fördjupningar

Inga, projektet är gjort för betyget G.

## AI-redovisning

Jag har använt **Claude** (Anthropic) som hjälp under projektet. Claude hjälpte mig att:

- hitta varför Tailwind inte fungerade (pluginen saknades i `vite.config.ts`)
- förklara koden rad för rad, t.ex. `useSearchParams`, filtrering och paginering
- ta fram designen med grönt tema och färg per region på korten
- felsöka bygget och sätta upp publiceringen på Netlify

Jag har själv testat alla funktioner och gått igenom koden så att projeketet funkar som den ska

## Reflektion

Det svåraste var att få sök, region och sida att sparas i URL:en och fungera ihop, till exempel att en ny sökning ska börja om på sida 1. Jag lärde mig mycket om hur TanStack Query sköter laddning, fel och cache, så att jag slapp skriva det själv. Det tog också tid att förstå varför Tailwind inte fungerade i början, och då lärde jag mig hur Vite och Tailwind hänger ihop. Nästa gång skulle jag committa oftare och i mindre steg.
