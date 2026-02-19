import { TFile } from "@/types/api-response";
import styles from './file.module.scss';

export type TFileBlock = {
  __component: "blocks.file";
  id: number;
  filename: string;
  file: TFile;
};

export function BlockFile({ file, filename }: TFileBlock) {
  return <p>
    <a className={styles.file}
      href={file.url}
      target="_blank"
      download rel="noreferrer">
      {filename || file.name}
    </a>
  </p>;
}
