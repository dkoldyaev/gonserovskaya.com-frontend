export type TTextPartSpan = {
  type: "text",
  text: "ppp ",

  bold?: boolean,
  italic?: boolean,
  underline?: boolean,
  strikethrough?: boolean,
  code?: boolean,
}

export type TTextPartLink = {
  type: "link",
  url: string,
  children: TTextPartSpan[]
}

// -------------

export type TTextPartH<THLevel extends 1 | 2 | 3> = {
  type: "heading",
  children: TTextPartSpan[],
  level: THLevel
};

export type TTextPartListItem = {
  type: "list-item",
  children: TTextPartSpan[]
};

export type TTextPartList = {
  type: "list",
  format: "unordered" | "ordered",
  children: TTextPartListItem[],
};

export type TTextParagraph = {
  type: "paragraph",
  children: TTextPartSpan[]
};

// -------------

export type TTextBlock = {
  __component: "blocks.text",
  id: number,
  text: (TTextPartH<1> | TTextPartH<2> | TTextPartH<3> | TTextPartList | TTextParagraph)[]
}