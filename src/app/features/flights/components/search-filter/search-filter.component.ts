import { Component, inject, input, model, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { IPriceRange } from '../../../../models/price-range';
import { FlightService } from '../../../../services/flight.service';
import { combineLatest, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [ ReactiveFormsModule, MatSelectModule, MatFormFieldModule, FormsModule, MatSliderModule, MatCheckboxModule ],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss'
})
export class SearchFilterComponent implements OnInit, OnDestroy {
  public sortByOptions = [
    {
      value: 'lowest',
      description: 'Price(Lowest)'
    },
    {
      value: 'highest',
      description: 'Price(Highest)'
    }
  ];

  public sortByControl = new FormControl('lowest');
  public priceControlStart = new FormControl();
  public priceControlEnd = new FormControl();
  public stopsGroup = new FormGroup({
    all: new FormControl(),
    none: new FormControl(),
    one: new FormControl(),
    two: new FormControl(),
  })

  private readonly flightService = inject(FlightService);

  private readonly destroy$ = new Subject();

  public ngOnInit(): void {
    this.priceControlStart.setValue(this.flightService.$priceRange()?.lowest);
    this.priceControlEnd.setValue(this.flightService.$priceRange()?.highest);

    this.sortByControl.valueChanges
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((value) => {
      this.flightService.sortBy(value ?? 'lowest');
    });
    this.handleStopFilter();
  }

  public ngOnDestroy(): void {
    this.destroy$.complete();
  }

  public getPriceRange(): IPriceRange {
    return this.flightService.$priceRange();
  }

  private handleStopFilter() {
    this.stopsGroup.valueChanges
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((value) => {
      const includedStops = [];
      if(value.all === true) {
        return this.flightService.filterStops([], this.sortByControl.value ?? 'lowest');
      } else {
        if(value.none === true) {
          includedStops.push(0);
        } else if(value.one === true) {
          includedStops.push(1);
        } else if(value.two === true) {
          includedStops.push(2)
        }
        return this.flightService.filterStops(includedStops, this.sortByControl.value ?? 'lowest');
      }
    });
  }

}
