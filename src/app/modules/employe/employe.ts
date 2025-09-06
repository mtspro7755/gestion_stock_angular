export interface Employe {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  magasin:Magasin;
  manager?:Employe;
}

export interface Magasin {
  id: number;
  nom: string;
}
