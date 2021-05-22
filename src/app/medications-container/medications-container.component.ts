import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicationsService } from '../medications.service';
import { TelemetryService } from '../telemetry.service';

@Component({
  selector: 'app-medications-container',
  templateUrl: './medications-container.component.html',
  styleUrls: ['./medications-container.component.css']
})
export class MedicationsContainerComponent implements OnInit {
  patientMedication$: any;
  fragment: any;
  constructor(
    private medications: MedicationsService,
    private route: ActivatedRoute,
    private telemetry: TelemetryService
  ) {}

  ngOnInit() {
    this.route.fragment.subscribe((data: any) => {
      console.log(data);
      this.fragment = data;
    });
    this.telemetry.logPageView('medications', this.route.fragment);
    this.patientMedication$ = this.medications.get();

    this.patientMedication$.subscribe({
      next: (data: any) => {
        console.log(data);
        this.medications = data.PatientOcularMeds;
      },
      error: err => this.telemetry.logException(err)
    });
  }

  ngOnDestroy() {
    this.patientMedication$.unsubscribe();
  }
}
