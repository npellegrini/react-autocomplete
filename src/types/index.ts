export interface AutocompleteItem {
    name:string,
    capital:string,
    region:string,
    onSelectItem: () => void,
    text: string
  }
export interface Item {
    name:string,
    capital:string,
    region:string,
    alpha2Code:string,
    flag:string,
  }
export interface AutocompleteComponent {
    onSelect: (item: Item) => void,
    getSources: (q:string) => Promise<Item[]>
  }