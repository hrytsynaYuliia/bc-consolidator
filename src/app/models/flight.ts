export interface IFlightItem {
  departure_date: Date;
  departure_time: Date;
  departure_airport: string;
  duration_minutes: number;
  arrival_date: Date;
  arrival_time: Date;
  arrival_airport: string;
  stops: number;
  airline: string;
}

export interface IFlight {
  id: number;
  price: number;
  flights: IFlightItem[];
}
