import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private URL_BASE = environment.url_service
  
  constructor(private http: HttpClient) { }

  public login(body) {
    return this.http.post(`${this.URL_BASE}/login`, body).pipe(map(data=>data));
  }

  public registry(body) {
    return this.http.post(`${this.URL_BASE}/registry`, body).pipe(map(data=>data));
  }

  public getAllDates() {
    return this.http.get(`${this.URL_BASE}/getReservas`).pipe(map(data=>data));
  }

  public newReserve(body) {
    return this.http.post(`${this.URL_BASE}/newReserva`,body).pipe(map( data => data));
  }
  
}
