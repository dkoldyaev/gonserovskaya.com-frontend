import { TPage } from "../../types/page"

export type TPagesListBlock = {
  __component: "blocks.pages-list",
  id: number,
  pages: TPage<'url' | 'cover'>,
}