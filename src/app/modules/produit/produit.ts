export interface Produit {
  id: number;
  nom: string;
  anneeModel: number;
  prixDepart: number;
  categorie: Categorie;  // dépend d'une autre interface
  marque: Marque;        // dépend d'une autre interface
}

// Interface pour Categorie (adapte selon ton backend)
export interface Categorie {
  id: number;
  nom: string;
}

// Interface pour Marque (adapte selon ton backend)
export interface Marque {
  id: number;
  nom: string;
}
