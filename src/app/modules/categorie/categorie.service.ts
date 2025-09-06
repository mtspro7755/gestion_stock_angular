import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Marque} from "../marque/marque";
import {Categorie} from "./categorie";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private baseUrl= 'http://localhost:8089/api/categories';
  constructor(private http: HttpClient) {}


  // Récupérer tous les marques
  getAll():Observable<Categorie[]>{
    return this.http.get<Categorie[]>(`${this.baseUrl}`);
  }

  // Récupérer une marque par ID
  getById(id:number):Observable<Categorie> {
    return this.http.get<Categorie>(`${this.baseUrl}/categorie/${id}`);
  }

  // Créer une marque
  create(categorie: Categorie): Observable<Categorie> {
    return this.http.post<Marque>(`${this.baseUrl}/create`, categorie);
  }

  // Mettre à jour une marque
  update(id: number, categorie: Categorie): Observable<Categorie> {
    return this.http.put<Marque>(`${this.baseUrl}/${id}`, categorie);
  }

  delete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
