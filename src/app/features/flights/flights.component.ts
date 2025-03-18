import { Component, inject, OnInit } from '@angular/core';
import { SearchFilterComponent } from "./components/search-filter/search-filter.component";
import { FlightCardComponent } from "./components/flight-card/flight-card.component";
import { FlightService } from '../../services/flight.service';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [SearchFilterComponent, FlightCardComponent, MatButtonModule ],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.scss'
})
export class FlightsComponent implements OnInit{
  private readonly flightService = inject(FlightService);

  public $flights = this.flightService.$flights;
  public showCount = 5;

  public ngOnInit(): void {
    this.flightService.getFlights$().subscribe();
  }

  public showMore() {
    this.showCount = this.showCount + 5;
  }
}
