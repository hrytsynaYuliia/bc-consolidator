import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { IFlight } from '../models/flight';
import { Observable, tap } from 'rxjs';
import { IPriceRange } from '../models/price-range';
import { ITraveler } from '../models/traveler';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  public fullDataList: IFlight[] = [];
  public $flights = signal<IFlight[]>([]);
  public $priceRange = computed<IPriceRange>(() => {
    if(this.$flights().length) {
      return {
        lowest: this.$flights().reduce((a, b)=> a.price < b.price ? a : b).price,
        highest: this.$flights().reduce((a, b)=> a.price > b.price ? a : b).price,
      }
    } else {
      return {
        lowest: 0,
        highest: 0,
      }
    }
  });
  public selectedFlight: IFlight | null = null;
  public traveler: ITraveler | null = null;
  private readonly httpClient = inject(HttpClient);

  public getFlights$(): Observable<IFlight[]> {
    return this.httpClient.get<IFlight[]>('https://public-front-bucket.s3.eu-central-1.amazonaws.com/test/test_flights.json')
    .pipe(tap((data) => {
      this.$flights.set(data);
      this.fullDataList = data;
    }));
  }

  public sortBy(key: string) {
    this.$flights.update((data) => {
      if(key === 'lowest') {
        return data.sort((a, b) => a.price - b.price);
      } else {
        return data.sort((a, b) => b.price - a.price);
      }
    });
  }

  public filterStops(stopsToInclude: number[], sortBy: string) {
    this.$flights.update((data) => {
      const result: IFlight[] = [];
      if(stopsToInclude.length === 0) {
        return this.fullDataList;
      }
      this.fullDataList.forEach(item => {
        if(stopsToInclude.indexOf(item.flights[0].stops) !== -1 || stopsToInclude.indexOf(item.flights[1].stops) !== -1) {
          result.push(item);
        }
      });
      return result;
    });

    this.sortBy(sortBy);
  }

  public selectFlight(flight: IFlight) {
    this.selectedFlight = flight;
  }

}
