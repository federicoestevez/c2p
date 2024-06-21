export type Options = {
  tokens?: boolean;
  hidden?: boolean;
  print?: boolean;
  type?: string[];
  typeNot?: string[];
  output?: string;
};

export type Target = {
  name: string;
  path: string;
  result?: string;
};
