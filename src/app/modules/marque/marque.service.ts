import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Marque } from './marque';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {
  private baseUrl= 'http://localhost:8089/api/marques';
  constructor(private http: HttpClient) {}


  // Récupérer tous les marques
  getAll():Observable<Marque[]>{
    return this.http.get<Marque[]>(`${this.baseUrl}`);
  }

  // Récupérer une marque par ID
  getById(id:number):Observable<Marque> {
    return this.http.get<Marque>(`${this.baseUrl}/${id}`);
  }

  // Créer une marque
  create(marque: Marque): Observable<Marque> {
    return this.http.post<Marque>(`${this.baseUrl}`, marque);
  }

  // Mettre à jour une marque
  update(id: number, marque: Marque): Observable<Marque> {
    return this.http.put<Marque>(`${this.baseUrl}/${id}`, marque);
  }

  delete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }


}

