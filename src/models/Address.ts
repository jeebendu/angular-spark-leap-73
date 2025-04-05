export class Address {
  id: number;
  city: String;
  locality: String;
  latitude: Number;
  longitude: Number;
  country: Country = new Country();
  state: State = new State();
  district: District = new District();
}

export class City {
  id!: number;
  name: string;
  district: District = new District();
  state: State = new State();
  country: Country = new Country();
  pincode: string;
  imageUrl: string;
}

export class Country {
    id!:number;
    name?:string;
    code?:string;
    iso?:string;
    status?:boolean;
}

export class State {
    id!: number;
    name!: string;
    country!: Country;  
    
}

export class District {
    id!: number;
    name!: string;
    state!: State;
}


