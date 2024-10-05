import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EonetService {
  private apiUrl = 'https://eonet.gsfc.nasa.gov/api/v2.1/events';

  private http = inject(HttpClient);

  getEvents(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
