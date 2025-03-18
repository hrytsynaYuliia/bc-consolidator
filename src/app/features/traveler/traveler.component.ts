import { Component } from '@angular/core';
import { SummaryComponent } from "./components/summary/summary.component";
import { FormComponent } from "./components/form/form.component";

@Component({
  selector: 'app-traveler',
  standalone: true,
  imports: [SummaryComponent, FormComponent],
  templateUrl: './traveler.component.html',
  styleUrl: './traveler.component.scss'
})
export class TravelerComponent {

}
