import { Component, inject, input, Input } from '@angular/core';
import { IFlight } from '../../../../models/flight';
import { FlightItemComponent } from '../flight-item/flight-item.component';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FlightService } from '../../../../services/flight.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [ FlightItemComponent, CurrencyPipe, MatButtonModule ],
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.scss'
})
export class FlightCardComponent {
 public flight = input<IFlight>();

 private readonly flightService = inject(FlightService);
 private readonly router = inject(Router);

 public handleBook() {
  this.flightService.selectFlight(this.flight() as IFlight);
  this.router.navigate(['traveler']);
 }

}
