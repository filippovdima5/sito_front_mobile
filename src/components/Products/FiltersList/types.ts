



export type FilerTitles = 'categories'
| 'brands'
| 'sizes'
| 'colors'
| 'prices'
| 'sales'
| 'favorite'
| 'likes'

export type FilterTypes = 'list' | 'range' | 'check'


export type VisFilter = {
  vis: boolean,
  type: FilterTypes | null,
  title: FilerTitles | null,
  listData: Array<{}>,
  rangeData: Array<{}>
}