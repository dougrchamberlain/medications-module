import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { severityLevels } from '../../environments/environment';
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
  patientMeds: any[] = [];
  constructor(
    private medications: MedicationsService,
    private route: ActivatedRoute,
    private telemetry: TelemetryService
  ) {}

  ngOnInit() {
    this.route.fragment.subscribe((data: any) => {
      console.log('fragment', data);
      this.fragment = data;
    });
    this.telemetry.logPageView('medications', this.route.fragment);
    this.patientMedication$ = this.medications.get();

    this.patientMedication$.subscribe({
      next: (data: any) => {
        console.log(data);
        this.patientMeds.push(data.PatientOcularMeds);
      },
      error: (err: Error) =>
        this.telemetry.logException(err, severityLevels.HIGHEST)
    });
  }

  ngOnDestroy() {
    this.patientMedication$.unsubscribe();
  }
}
