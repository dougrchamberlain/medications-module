import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { StateHistory } from '@codewithdan/observable-store';
import { severityLevels } from '../../environments/environment';
import { MedicationsService, StoreState } from '../medications.service';
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
  lastState: StateHistory<StoreState>;

  constructor(
    private medications: MedicationsService,
    private route: ActivatedRoute,
    private telemetry: TelemetryService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.fragment.subscribe((data: any) => {
      console.log('fragment', data);
      this.fragment = data;
    });
    this.telemetry.logPageView('medications', this.route.fragment);
    this.patientMedication$ = this.medications.get(10084);

    this.patientMedication$.subscribe({
      next: (data: any) => {
        console.log(data);
        this.patientMeds = data.PatientOcularMeds;
      },
      error: (err: Error) =>
        this.telemetry.logException(err, severityLevels.HIGHEST)
    });
  }

  ngOnDestroy() {
    this.patientMedication$.unsubscribe();
  }

  undo() {
    this.medications.undo();
  }

  redo() {
    this.medications.redo();
  }

  private openSnackBar() {
    const ref = this._snackBar.open('Message archived', 'Undo', {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });

    let action$ = ref.onAction();
    console.log(action$);
    action$;
  }

  drop(event: CdkDragDrop<string[]>) {
    this.medications.applySortOrder(this.patientMeds);
    moveItemInArray(this.patientMeds, event.previousIndex, event.currentIndex);
    this.openSnackBar();
  }
}
