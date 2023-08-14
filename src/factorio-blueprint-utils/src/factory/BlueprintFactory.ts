import type { Blueprint, WrappedBlueprint } from '../data/Blueprint'
import type { BlueprintBook, WrappedBlueprintBook } from '../data/BlueprintBook'

export const newBlueprint = (name: string): Blueprint => {
  return {
    label: name,
    item: 'blueprint',
    entities: [],
    tiles: [],
    version: 1,
  }
}

export const newWrappedBlueprint = (name: string): WrappedBlueprint => {
  return {
    blueprint: newBlueprint(name),
  }
}

export const newBlueprintBook = (name: string): BlueprintBook => {
  return {
    item: 'blueprint_book',
    label: name,
    blueprints: [],
    active_index: 0,
    version: 0,
  }
}

export const newWrappedBlueprintBook = (name: string): WrappedBlueprintBook => {
  return {
    blueprint_book: newBlueprintBook(name),
  }
}
