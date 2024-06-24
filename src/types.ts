export type Options = {
  hidden?: boolean;
  ignore?: boolean;
  output?: string;
  print?: boolean;
  template?: boolean;
  tokens?: boolean;
  type?: string[];
  typeNot?: string[];
};

export type Target = {
  name: string;
  path: string;
  result?: string;
};
