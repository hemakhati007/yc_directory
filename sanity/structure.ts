import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')//list them by content
// .items(S.documentTypeListItems())//define items an array of items instead
    .items([
      S.documentTypeListItem('author').title("Authors"),
      S.documentTypeListItem('startup').title("Startup"),
    ])
// list differet thigs that sanity provides