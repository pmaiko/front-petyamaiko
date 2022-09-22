export interface IReducerAction<T> {
  type: T,
  payload: any
}

export interface IGlobalData {
  header: {
    menu: {
      logo: string,
      items: {
        label: string,
        link: string
      }[]
    }
  }
}
