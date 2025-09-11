import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ArticleCommande} from "./article-commande";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArticleCommandeService {
  private baseUrl="http://localhost:8089/api/article-commandes";
  constructor(private http: HttpClient) { }

  //recuperer tous les article commandes
  getAll(): Observable<ArticleCommande[]> {
    return this.http.get<ArticleCommande[]>(this.baseUrl);
  }

  //recuperer une article commande
  getById(id: number): Observable<ArticleCommande> {
    return this.http.get<ArticleCommande>(`${this.baseUrl}/article-commande/${id}`);
  }

  //creer une article commande
  create(articleCommande: ArticleCommande): Observable<ArticleCommande> {
    return this.http.post<ArticleCommande>(`${this.baseUrl}/create`, articleCommande);
  }

  //modifier une article commande
  update(id: number, articleCommande: ArticleCommande): Observable<ArticleCommande> {
    return this.http.put<ArticleCommande>(`${this.baseUrl}/update`, articleCommande);
  }

  //supprimer une article commande
  delete(id: number): Observable<ArticleCommande> {
    return this.http.delete<ArticleCommande>(`${this.baseUrl}/delete/${id}`);
  }

}
