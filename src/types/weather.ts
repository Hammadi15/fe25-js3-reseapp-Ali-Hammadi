// Vädret som vi visar på detaljsidan. place är huvudstaden, eller landet om huvudstaden inte hittades.
export interface Weather {
  temperature: number;
  windSpeed: number;
  weatherCode: number;
  place: string;
}