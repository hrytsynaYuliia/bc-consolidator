import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FlightService } from '../../../../services/flight.service';
import { ITraveler } from '../../../../models/traveler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, MatInputModule, MatRadioModule, MatButtonModule ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit{
  public travelerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    gender: new FormControl(),
  });

  private readonly flightService = inject(FlightService);
  private readonly router = inject(Router);

  public ngOnInit(): void {
    if(this.flightService.traveler) {
      this.travelerForm.setValue(this.flightService.traveler);
    }
  }

  public handleBack() {
    this.flightService.traveler = this.travelerForm.value as ITraveler;
    this.router.navigate(['flights']);
  }

  public submit() {
    console.log(`Flight id: ${this.flightService.selectedFlight?.id}`);
    console.log('Traveler:');
    console.log(this.travelerForm.value);
  }

}
