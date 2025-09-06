export interface Commande {
  id: number;
  status: number;
  dateCommande:string;
  dateLivraison:string;
  dateLivraisonVoulue:string;
  client:Client;
  magasin:Magasin;
  vendeur:Employe;




}

export interface Employe {
  id: number;
  nom: string;
  prenom: string;
}

export interface Client{
  id: number;
  nom: string;
  prenom: string;
}

export interface Magasin{
  id: number;
  nom: string;

}
