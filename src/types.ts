export type Options = {
  exclude?: string[];
  hidden?: boolean;
  ignore?: boolean;
  output?: string;
  print?: boolean;
  tokens?: boolean;
  type?: string[];
  typeNot?: string[];
};

export type Target = {
  name: string;
  path: string;
  result?: string;
};
