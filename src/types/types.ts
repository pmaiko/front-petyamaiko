export interface IGlobal {
  header: {
    menu: IHeaderMenu
  }
}

export interface IHeaderMenu {
  logo: string,
  items: {
    label: string,
    url: string
  }[]
}
