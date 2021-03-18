import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Contact} from '../models/contact-book.models';
import {environment} from '../../environments/environment';


@Injectable()
export class ContactBookService  {

  constructor(private http: HttpClient) {
  }

  getTestContactBook(): Observable<any> {
    return this.http.get<Contact[]>('assets/data/contacts.json');
  }

  getContactBooks(): Observable<any> {
    return this.http.get<Observable<any>>(environment.baseUrl);
  }

  addContact(сontact: Contact): Observable<any> {
    return this.http.post(`${environment.baseUrl}/contact`, сontact);
  }

  deletedContact(id: number): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: 1,
        name: 'test',
      },
    };
    return this.http.delete<Observable<number>>(`${environment.baseUrl}/contact/${id}`, options);
  }

  editContact(id: number, сontact: Contact): Observable<any> {
    return this.http.put<Observable<any>>(`${environment.baseUrl}/contact/${id}`, сontact);
  }

}
