import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class MedicationsService {
  constructor(private client: HttpClient) {}

  get(): Observable<any> {
    return this.client.get<any>(environment.medicationsApiUrl);
  }
}
