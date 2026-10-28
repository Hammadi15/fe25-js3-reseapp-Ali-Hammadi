// Det vi plockar ut från Wikipedia. imageUrl är null när artikeln saknar bild.
export interface WikiSummary {
  title: string;
  extract: string;
  imageUrl: string | null;
  articleUrl: string;
}