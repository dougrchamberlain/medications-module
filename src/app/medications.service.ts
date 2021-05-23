import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObservableStore, StateHistory } from '@codewithdan/observable-store';
import { Observable } from 'rxjs';
import { API_URL, environment } from '../environments/environment';
import * as jmsepath from 'jmespath';
import { Exception } from '@microsoft/applicationinsights-web/dist/applicationinsights-web.rollup';

interface Medication {}

@Injectable({ providedIn: 'root' })
export class MedicationsService extends ObservableStore<StoreState> {
  apiPath: string = API_URL;
  lastState: any;
  constructor(private client: HttpClient) {
    super({ trackStateHistory: true });
    const initialState: StoreState = {
      medications: []
    };
    this.setState(initialState, 'INIT_STATE');
  }

  undo() {
    this.lastState = this.stateHistory.pop() || undefined;
    this.setState(this.lastState, 'UNDO_MEDICATIONS');
    console.log(this.lastState);
  }

  redo() {}

  get(id: any): Observable<Medication[]> {
    const o$ = this.client.post<any>(
      this.apiPath,
      {},
      { params: { patientId: id } }
    );

    o$.subscribe({
      next: (data: any) => {
        const medications = jmsepath.search(
          data.PracticeFileTypeModels,
          environment.jmesPathSearchString
        );
        this.setState({ medications }, 'GET_MEDICATIONS');
      },
      error: (error: any) => {
        console.log(error);
      }
    });

    return o$;
  }

  applySortOrder(medications: Medication[]) {
    return this.setState({ medications }, 'SORT_MEDICATIONS');
  }
  select() {
    throw new Error('not implemented');
  }
}
export interface StoreState {
  medications: Medication[];
}
