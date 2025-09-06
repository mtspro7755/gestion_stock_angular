import { Injectable } from '@angular/core';
import {Produit} from "./produit";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private baseUrl = 'http://localhost:8089/api/produits';

  constructor(private http: HttpClient) {}

  // Récupérer tous les produits
  getAll(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.baseUrl);
  }

  // Récupérer un produit par ID
  getById(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.baseUrl}/produit/${id}`);
  }

  // Créer un produit
  create(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(`${this.baseUrl}/create`, produit);
  }

  // Modifier un produit
  update(id: number, produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.baseUrl}/update/${id}`, produit);
  }

  // Supprimer un produit
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
