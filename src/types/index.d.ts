export type Project = {
  "s.no": number;
  "amt.pledged": number;
  blurb: string;
  by: string;
  country: string;
  currency: string;
  "end.time": string;
  location: string;
  "percentage.funded": number;
  "num.backers": string;
  state: string;
  title: string;
  type: string;
  url: string;
};

export type SortColumn = "s.no" | "percentage.funded" | "amt.pledged";
export type SortDirection = "asc" | "desc";
