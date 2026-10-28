// Ett land som det ser ut i listan på startsidan.
export interface Country {
  name: string;
  alpha3Code: string;
  region: string;
  capital: string | null;
  flags: {
    svg: string;
    png: string;
  };
  population: number;
  area: number | null;
}

// Ett land med all info till detaljsidan. Har allt från Country plus lite till.
// Fälten med ? saknas för vissa länder, t.ex. har Antarktis ingen valuta.
export interface CountryDetails extends Country {
  alpha2Code: string;
  nativeName?: string;
  subregion?: string;
  latlng?: number[];
  languages?: { name: string }[];
  currencies?: { code: string; name: string; symbol?: string }[];
}