import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HousingService } from '../housing.service';

import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent,
  ],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter (input)="filterResults(filter.value)">
        <!-- <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button> -->
      </form>
    </section>
    <section class="results">
      <app-housing-location *ngFor="let housingLocation of filteredLocations" [housingLocation]="housingLocation"></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {  
  housingLocationList: HousingLocation[] = [];
  filteredLocations: HousingLocation[] = [];

  housingService: HousingService = inject(HousingService);

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationist: HousingLocation[]) => {
      this.housingLocationList = housingLocationist;
      this.filteredLocations = housingLocationist;
    });
    this.filteredLocations = this.housingLocationList;
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocations = this.housingLocationList;
    }

    this.filteredLocations = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
