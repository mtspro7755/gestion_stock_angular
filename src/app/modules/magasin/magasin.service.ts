import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Magasin} from "./magasin";

@Injectable({
  providedIn: 'root'
})
export class MagasinService {

  private baseUrl = 'http://localhost:8089/api/magasins';

  constructor(private http: HttpClient) { }

  // Récupérer tous les magasins
  getAll(): Observable<Magasin[]> {
    return this.http.get<Magasin[]>(this.baseUrl);
  }

  // Récupérer un magasin par ID
  getById(id: number): Observable<Magasin> {
    return this.http.get<Magasin>(`${this.baseUrl}/${id}`);
  }

  // Créer un magasin
  create(magasin: Magasin): Observable<Magasin> {
    return this.http.post<Magasin>(this.baseUrl, magasin);
  }

  // Mettre à jour un magasin
  update(id: number, magasin: Magasin): Observable<Magasin> {
    return this.http.put<Magasin>(`${this.baseUrl}/${id}`, magasin);
  }

  // Supprimer un magasin
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
