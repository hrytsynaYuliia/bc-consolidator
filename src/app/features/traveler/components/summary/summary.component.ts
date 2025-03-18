import { FlightService } from './../../../../services/flight.service';
import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IFlight } from '../../../../models/flight';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [ MatCardModule, MatIconModule, CurrencyPipe ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit {
  public flight: IFlight | null = null;
  private readonly flightService = inject(FlightService);

  public ngOnInit(): void {
    this.flight = this.flightService.selectedFlight;
  }

}
