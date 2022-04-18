export interface Pokemon {

  height: number;

  id: number;

  name: string;

  sprites: {

    front: string;

    official: string;
  };

  stats: {

    base_stat: number;
 
    effort: number;
    
    stat: {
  
      name: string;

      url: string;
    }
  }[];

  types: {

    slot: number;
 
    type: {

      name: string;

      url: string;
    }
  }[];

  weight: number;
}
