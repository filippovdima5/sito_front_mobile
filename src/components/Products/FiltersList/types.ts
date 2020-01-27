export type FilerTitles = 'categories'
| 'Бренды'
| 'Размеры'
| 'Цвета'
| 'Цены'
| 'Скидки'
| 'Товары дня'
| 'Избранное'

export type FilterTypes = 'list' | 'range' | 'check'


export type VisFilter = {
  vis: boolean,
  type: FilterTypes | null,
  title: FilerTitles | null,
}