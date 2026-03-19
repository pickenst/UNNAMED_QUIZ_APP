export type Nullable<T> = {
  [P in keyof T]: T[P] | null
}

export type DeNullified<T> = {
  [P in keyof T]: NonNullable<T[P]>
}