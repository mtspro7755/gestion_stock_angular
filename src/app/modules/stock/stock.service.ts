import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StockId} from "./stock";
import {Stock} from "./stock";

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'http://localhost:8089/api/stocks';

  constructor(private http: HttpClient) {
  }

  create(stock: Omit<Stock, 'id'>) {
    return this.http.post<Stock>(`${this.apiUrl}/create`, stock);
  }

  update(magasinId: number, produitId: number, stock: Stock) {
    return this.http.put<Stock>(`${this.apiUrl}/stock/${magasinId}/${produitId}`, stock);
  }

  getById(magasinId: number, produitId: number) {
    return this.http.get<Stock>(`${this.apiUrl}/stock/${magasinId}/${produitId}`);
  }

  getAll() {
    return this.http.get<Stock[]>(this.apiUrl);
  }

  // Supprimer un stock
  delete(magasinId: number, produitId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${magasinId}/${produitId}`);
  }


}
