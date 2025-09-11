export interface ArticleCommande {
  id:number;
  prixDepart:number;
  quantite:number;
  remiseDecimal:number;
  produit:Produit;
  commande:Commande;


}

export interface Produit {
  id:number;
  nom:string;
}


export interface Commande {
  id:number;
  nom:string;
}
