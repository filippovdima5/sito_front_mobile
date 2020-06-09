import { createEvent, restore } from 'lib/effector'


export const $setShowFilters = createEvent<boolean>()
export const $showFilters = restore($setShowFilters, false)


export const $setShowFilter = createEvent<{ index: string, title: string } | null>()
export const $showFilter = restore($setShowFilter, null)

$showFilter.watch(state => console.log(state))
