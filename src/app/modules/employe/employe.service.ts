import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Employe} from "./employe";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  private baseUrl= 'http://localhost:8089/api/employes';
  constructor(private http: HttpClient) {}

  // Récupérer tous les employes
  getAll():Observable<Employe[]>{
    return this.http.get<Employe[]>(this.baseUrl);
  }

  // // Récupérer un employe par ID
  getById(id: number): Observable<Employe> {
    return this.http.get<Employe>(`${this.baseUrl}/employe/${id}`);
  }

  //creer un employe
  create(employe:Employe):Observable<Employe>{
    return this.http.post<Employe>(`${this.baseUrl}/create`,employe);
  }


  //modifier un employe
  update(id:number,employe:Employe):Observable<Employe>{
    return this.http.put<Employe>(`${this.baseUrl}/update/${id}`,employe)
  }

  //supprimer un employe
  delete(id:number):Observable<Employe>{
    return this.http.delete<Employe>(`${this.baseUrl}/delete/${id}`)
  }





}
