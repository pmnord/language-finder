export type Country = {
  name: string;
  fullName: string;
  aliases: string[];
  continents: string[];
  languages: Language[];
  type: 'country';
  flagSvg: string;
};

export type Language = {
  language: string;
  name: string;
  script: string;
  type: 'language';
  hyperlink: string;
};
