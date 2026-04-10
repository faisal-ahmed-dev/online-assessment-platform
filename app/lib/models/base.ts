export interface BaseModel {
  id: guid
}

export interface BaseListModel<T> {
  data: T[]
  total: number
}
