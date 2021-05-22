import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { Observable } from 'rxjs';
import { API_URL, environment } from '../environments/environment';
import * as jmsepath from 'jmespath';

interface Medication {}

@Injectable({ providedIn: 'root' })
export class MedicationsService extends ObservableStore<StoreState> {
  apiPath: string = API_URL;
  constructor(private client: HttpClient) {
    super({ trackStateHistory: true });
    const initialState: StoreState = {
      documents: [],
      document: { url: '', description: '', subtype: '', type: '' }
    };
    this.setState(initialState, 'INIT_STATE');
  }

  get(id: any): Observable<Medication[]> {
    const o$ = this.client.post<any>(
      this.apiPath,
      {},
      { params: { patientId: id } }
    );

    o$.subscribe({
      next: (data: any) => {
        const documents = jmsepath.search(
          data.PracticeFileTypeModels,
          environment.jmesPathSearchString
        );
        this.setState({ documents }, StoreActions.GetDocuments);
      },
      error: error => {
        console.log(error);
      }
    });

    return o$;
  }

  select(doc: Medication) {
    this.setState({ document: doc });
  }
}
export interface StoreState {
  documents: Medication[];
  document: Medication | null;
}
