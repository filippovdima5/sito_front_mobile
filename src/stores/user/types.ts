export type SexId = 0 | 1 | 2

type CategoryInfo = {
  index: number,
  title: string,
  count: number,
}

export type UserInfo = {
  sex_id: SexId,

  clothing: Array<CategoryInfo>,
  shoes: Array<CategoryInfo>,
  accessory: Array<CategoryInfo>,
}