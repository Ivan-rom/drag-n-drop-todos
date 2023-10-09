export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
}

export class LocalStorageClient {
  constructor(name) {
    this.name = name
  }

  save(state) {
    storage(this.name, state)
    return Promise.resolve()
  }

  get() {
    return storage(this.name)
  }
}
