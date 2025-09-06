import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from "./layout/dashboard-layout/dashboard-layout.component";
import { DashboardContentComponent } from "./shared/dashboardContent/dashboardContent.component";
import {MagasinListComponent} from "./modules/magasin/magasin-list/magasin-list.component";
import {MagasinFormComponent} from "./modules/magasin/magasin-form/magasin-form.component";
import {ClientListComponent} from "./modules/client/client-list/client-list.component";
import {ClientFormComponent} from "./modules/client/client-form/client-form.component";
import {MarqueListComponent} from "./modules/marque/marque-list/marque-list.component";
import {MarqueFormComponent} from "./modules/marque/marque-form/marque-form.component";
import {MagasinDetailsComponent} from "./modules/magasin/magasin-details/magasin-details.component";
import {ClientDetailsComponent} from "./modules/client/client-details/client-details.component";
import {MarqueDetailsComponent} from "./modules/marque/marque-details/marque-details.component";
import {CategorieFormComponent} from "./modules/categorie/categorie-form/categorie-form.component";
import {CategorieListComponent} from "./modules/categorie/categorie-list/categorie-list.component";
import {CategorieDetailsComponent} from "./modules/categorie/categorie-details/categorie-details.component";
import {ProduitListComponent} from "./modules/produit/produit-list/produit-list.component";
import {ProduitDetailsComponent} from "./modules/produit/produit-details/produit-details.component";
import {ProduitFormComponent} from "./modules/produit/produit-form/produit-form.component";
import {EmployeListComponent} from "./modules/employe/employe-list/employe-list.component";
import {EmployeDetailsComponent} from "./modules/employe/employe-details/employe-details.component";
import {EmployeFormComponent} from "./modules/employe/employe-form/employe-form.component";
import {CommandeListComponent} from "./modules/commande/commande-list/commande-list.component";
import {CommandeFormComponent} from "./modules/commande/commande-form/commande-form.component";
import {CommandeDetailsComponent} from "./modules/commande/commande-details/commande-details.component";

export const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardContentComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      {path: 'magasins', component: MagasinListComponent},
      { path: 'magasins/ajout', component: MagasinFormComponent},
      { path: 'magasins/:id', component: MagasinDetailsComponent },
      { path: 'magasins/edit/:id', component: MagasinFormComponent },

      {path: 'clients', component: ClientListComponent},
      {path: 'clients/ajout', component: ClientFormComponent},
      {path: 'clients/:id', component: ClientDetailsComponent},
      { path: 'clients/edit/:id', component: ClientFormComponent },

      {path: 'marques', component: MarqueListComponent},
      {path: 'marques/ajout', component: MarqueFormComponent},
      { path: 'marques/:id', component: MarqueDetailsComponent },
      { path: 'marques/edit/:id', component: MarqueFormComponent },

      {path: 'categories', component: CategorieListComponent},
      { path: 'categories/ajout', component: CategorieFormComponent},
      { path: 'categories/:id', component: CategorieDetailsComponent },
      { path: 'categories/edit/:id', component: CategorieFormComponent },

      {path: 'produits', component: ProduitListComponent},
      { path: 'produits/ajout', component: ProduitFormComponent},
      { path: 'produits/:id', component: ProduitDetailsComponent },
      { path: 'produits/edit/:id', component: ProduitFormComponent },


      {path: 'employes', component: EmployeListComponent},
      { path: 'employes/ajout', component: EmployeFormComponent},
      { path: 'employes/:id', component: EmployeDetailsComponent},
      { path: 'employes/edit/:id', component: EmployeFormComponent },

      {path:'commandes', component: CommandeListComponent},
      {path: 'commandes/ajout', component: CommandeFormComponent},
      {path:'commandes/:id', component: CommandeDetailsComponent},
      {path:'commandes/edit/:id', component: CommandeFormComponent},


    ]
  }
];

