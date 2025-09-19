export type TEmbeddedBlock = {
  __component: "blocks.embedded";
  id: number;
  title?: string;
  html: string;
};


export function TextBlockEmbedded({ html }: TEmbeddedBlock) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}