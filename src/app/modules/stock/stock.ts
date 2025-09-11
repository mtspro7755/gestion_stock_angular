export interface Stock {
  id: StockId;
  magasin:Magasin;
  produit:Produit;
  quantite:number;
}

export interface StockId{
  magasinId: number;
  produitId: number;
}


export interface Produit {
  id: number;
  nom?: string;
}

export interface Magasin {
  id: number;
  nom?: string;
}
