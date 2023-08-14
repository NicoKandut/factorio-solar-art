import * as factorio from '../index'

// create a blueprint
const blueprint = factorio.newWrappedBlueprint('Solar Panel Blueprint')

// add entities
blueprint.blueprint.entities.push({
  entity_number: 0,
  name: 'solar_panel',
  position: {
    x: 0,
    y: 0,
  },
})
