interface IObserver {
  stateName: string,
  callback: (newValue: any) => void
}

const state = {
  preloaderDone: false
}

const mutations = {
  // tslint:disable-next-line:no-shadowed-variable
  'SET_PRELOADER_DONE' (state: TState, payload: any) {
    state.preloaderDone = payload
  }
}

type TState = typeof state
type TMutations = keyof typeof mutations

class Store {
  private _state: TState = state

  get state () {
    return this._state
  }

  private observers: Partial<[IObserver]> = []
  constructor () {
    const _watch = (name: string, newValue: any) => {
      this.observers.forEach(observer => {
        if (observer?.stateName === name) {
          observer.callback(newValue)
        }
      })
    }

    this._state = new Proxy(this._state, {
      get (target, name) {
        return target[name as keyof typeof target]
      },

      set (target, name: string, newValue: any, receiver: any): boolean {
        _watch(name, newValue)
        return target[name as keyof typeof target] = newValue
      }
    })
  }

  watch (stateName: string, callback: (newValue: any) => void) {
    this.observers.push({
      stateName,
      callback
    })
  }

  commit (mutation: TMutations, payload: any) {
    mutations[mutation as keyof typeof mutations](this._state, payload)
  }
}

export default new Store()
