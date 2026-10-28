import { useQuery } from "@tanstack/react-query";
import { getCountry } from "../api/countries";

// Hämtar ett land och sparar det, så samma land inte hämtas igen i onödan.
export function useCountry(code: string) {
  return useQuery({
    queryKey: ["country", code],
    queryFn: () => getCountry(code),
    staleTime: 1000 * 60 * 60,
  });
}