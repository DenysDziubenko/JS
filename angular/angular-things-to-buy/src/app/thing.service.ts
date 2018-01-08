import { Injectable } from '@angular/core';
import { Thing } from './thing';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class ThingService {

  private thingsUrl = '/things';

  constructor(
    private http: HttpClient) { }

  /** GET things from the server. */
  getThings (): Observable<Thing[]> {
    return this.http.get<Thing[]>(this.thingsUrl);
  }

  /** GET thing by id. */
  getThing(id: String): Observable<Thing> {
    return this.http.get<Thing>(`${this.thingsUrl}/${id}`);
  }

  /** PUT: update the thing. */
  updateThing (thing: Thing): Observable<any> {
    return this.http.put(this.thingsUrl, thing, httpOptions);
  }

  /** POST: add a new thing. */
  addThing (thing: Thing): Observable<Thing> {
    return this.http.post<Thing>(this.thingsUrl, thing, httpOptions);
  }

  /** DELETE: delete the thing. */
  deleteThing (thing: Thing | number): Observable<Thing> {
    const id = typeof thing === 'number' ? thing : thing._id;
    return this.http.delete<Thing>(`${this.thingsUrl}/${id}`, httpOptions);
  }

  /** GET things whose name contains search term */
  searchThings(term: string): Observable<Thing[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Thing[]>(this.thingsUrl + `?name=${term}`);
  }
}

