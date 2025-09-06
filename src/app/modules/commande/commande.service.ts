import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Commande} from "./commande";

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private baseUrl="http://localhost:8089/api/commandes";
  constructor(private http: HttpClient) {}

  //Recuperer tous les commandes
  getAll(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.baseUrl);
  }


  //Recuperer une commande
  getById(id:number):Observable<Commande> {
    return this.http.get<Commande>(`${this.baseUrl}/${id}`);

  }


  //Enregistrer une commande
  create(commande: Commande): Observable<Commande> {
    return this.http.post<Commande>(`${this.baseUrl}`, commande);
  }


  //modifier une commande
  update(id:number, commande: Commande): Observable<Commande> {
    return this.http.put<Commande>(`${this.baseUrl}/${id}`, commande);
  }

  //supprimer une commande
  delete(id:number):Observable<Commande> {
    return this.http.delete<Commande>(`${this.baseUrl}/${id}`);
  }
}
