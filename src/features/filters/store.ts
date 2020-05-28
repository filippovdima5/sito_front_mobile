import { createEvent, restore } from 'lib/effector'


export const $setShowFilters = createEvent<boolean>()
export const $showFilters = restore($setShowFilters, false)


export const $setShowFilter = createEvent<boolean>()
export const $showFilter = restore($setShowFilter, false)
