import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "./client";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = 'http://localhost:8089/api/clients';

  constructor(private http: HttpClient) { }

  // Récupérer tous les clients
  getAll(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl);
  }

  // Récupérer un client par ID
  getById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/client/${id}`);
  }

  // Créer un client
  create(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.baseUrl}/create`, client);
  }

  // Mettre à jour un client
  update(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.baseUrl}/update/${id}`, client);
  }

  // Supprimer un client
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
