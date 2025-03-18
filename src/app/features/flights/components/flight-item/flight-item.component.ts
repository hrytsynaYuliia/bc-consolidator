import { Component, input } from '@angular/core';
import { IFlightItem } from '../../../../models/flight';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-flight-item',
  standalone: true,
  imports: [ DatePipe ],
  templateUrl: './flight-item.component.html',
  styleUrl: './flight-item.component.scss'
})
export class FlightItemComponent {
  public flightItem = input<IFlightItem>();

  public getLogoSrc() {
    return `https://d263qmvlt29h99.cloudfront.net/${this.flightItem()?.airline}.svg`;
  }

  public getStops() {
    if(!this.flightItem()?.stops) {
      return 'Nonstop';
    } else {
      return this.flightItem()?.stops + 'stop';
    }
  }

  public getDuration() {
    let hours = Math.floor((this.flightItem()?.duration_minutes ?? 0) / 60);
    let minutes = Math.floor((this.flightItem()?.duration_minutes ?? 0) % 60);
    return `${hours}h ${minutes}m`;
  }
}
