import { useQuery } from "@tanstack/react-query";
import { getWikiSummary } from "../api/wikipedia";

// Wikipedia-texten ändras sällan, så den får ligga kvar en timme.
export function useWikiSummary(countryName: string) {
  return useQuery({
    queryKey: ["wikipedia", countryName],
    queryFn: () => getWikiSummary(countryName),
    staleTime: 1000 * 60 * 60,
  });
}