export class Pokemons {
  constructor(
    public name: string,
    public url: string,
    public abilities: Abilities[],
    public forms: Forms[],
    public game_indices: GameIndices[],
    public height: number,
    public held_items: [],
    public id: number,
    public is_default: boolean,
    public location_area_encounters: string,
    public moves: Moves[],
    public order: number,
    public past_types: [],
    public species: Species,
    public sprites: Sprites,
    public stats: Stats[],
    public types: Types[],
    public weight: number
  ) { }
}

export class Sprites {
  constructor(
    public back_default: string,
    public back_female: string,
    public back_shiny: string,
    public back_shiny_female: string,
    public front_default: string,
    public front_female: string,
    public front_shiny: string,
    public front_shiny_female: string,
    public spritesWorld: string
  ) { }
}

export class Ability {
  constructor(public name: string, public url: string) { }
}
export class Abilities {
  constructor(public ability: Ability) {

  }
}

export class Forms {
  constructor(public name: string, public url: string) { }
}

export class GameIndices {
  constructor(public game_index: number, public version: VersionGame) { }
}

export class VersionGame {
  constructor(public name: string, public url: string) { }
}

export class Moves {
  constructor(
    public move: Move,
    public version_group_details: VersionGroupDetails[]
  ) { }
}

export class Move {
  constructor(
    public name: string,
    public url: string,
  ) { }
}

export class VersionGroupDetails {
  constructor(
    public level_learned_at: number,
    public move_learn_method: MoveLearnMethod[],
    public version_group: VersionGame[]
  ) { }
}

export class MoveLearnMethod {
  constructor(
    public name: string,
    public url: string
  ) { }
}

export class Species {
  constructor(
    public name: string,
    public url: string
  ) { }
}

export class Stats {
  constructor(
    public base_stat: number,
    public effort: number,
    public stat: Stat
  ) { }
}

export class Stat {
  constructor(
    public name: string,
    public url: string
  ) { }
}

export class Types {
  constructor(
    public slot: number,
    public type: Type
  ) { }
}

export class Type {
  constructor(
    public name: string,
    public url: string
  ) { }
}
