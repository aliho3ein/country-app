export interface countryType {
  name: { common: string; official: string; nativeName: object };
  tid: string[];
  region: string;
  capital: string[];
  subregion: string;
  languages: object;
  borders: string[];
  area: number;
  timezones: string[];
  flags: { png: string; svg: string; alt: string };
  flag: string;
  startOfWeek: string;
  population: number;
  cca3: string;
}
