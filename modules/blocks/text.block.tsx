import React, { createElement, CSSProperties, useMemo } from "react";

export type TTextPartSpan = {
  type: "text",
  text: string,

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
  children: (TTextPartSpan | TTextPartLink)[],
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

export function BlockText({ text }: TTextBlock) {
  return <>
    {text.map((textPart, index) => {
      if (textPart.type === 'heading') {
        return <TextPartH key={index} {...textPart} />
      }
      if (textPart.type === 'paragraph') {
        return <TextPartParagraph key={index} {...textPart} />
      }
      if (textPart.type === 'list') {
        return <TextPartList key={index} {...textPart} />
      }
    })}
  </>
}

export function TextPartListItem({ children }: TTextPartListItem) {
  return <li>
    {children.map((child, index) => <TextPartSpan key={index} {...child} />)}
  </li>
}

export function TextPartList({ format, children }: TTextPartList) {
  const Component = format === 'ordered' ? 'ol' : 'ul';
  return createElement(Component, {}, children.map((child, index) => (
    <TextPartListItem {...child} key={index} />
  )))
}

export function TextPartH({ children, level }: TTextPartH<1 | 2 | 3>) {
  const Component = `h${level}`;

  return createElement(Component, {}, children.map((child, index) => (
    child.type === 'link' ? <TextPartLink key={index} {...child} /> : <TextPartSpan key={index} {...child} />
  )));
}

export function TextPartParagraph({ children }: TTextParagraph) {
  return <p>{children.map((child, index) => (
    <TextPartSpan key={index} {...child} />
  ))}</p>;
}

export function TextPartLink({ url, children }: TTextPartLink) {
  return <a href={url}>
    {children.map((child, index) => (<TextPartSpan key={index} {...child} />))}
  </a>
}

export function TextPartSpan({ text, ...modifiers }: TTextPartSpan) {
  const style = useMemo<CSSProperties>(() => ({
    fontWeight: modifiers.bold ? 'bold' : undefined,
    fontStyle: modifiers.italic ? 'italic' : undefined,
    textDecoration: modifiers.underline ? 'underline' : modifiers.strikethrough ? 'line-through' : undefined,
  }), []);

  if (!Object.values(modifiers).some(Boolean)) {
    return text;
  }

  const tag = modifiers.code ? 'code' : 'span';

  return createElement(tag, { style }, text);
} 