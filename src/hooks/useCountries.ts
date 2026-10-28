
import { useQuery } from "@tanstack/react-query";
import { getCountries } from "../api/countries";

// Länderna ändras typ aldrig, så vi hämtar dem bara en gång i timmen.
export function useCountries() {
  return useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
    staleTime: 1000 * 60 * 60,
  });
}
