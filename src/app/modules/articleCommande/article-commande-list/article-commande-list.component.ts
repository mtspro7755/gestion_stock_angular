import {Component, OnInit} from '@angular/core';
import {ArticleCommande} from "../article-commande";
import {ArticleCommandeService} from "../article-commande.service";
import {NgForOf} from "@angular/common";
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-article-commande-list',
  standalone: true,
  imports: [
    NgForOf,
    NgbDropdown,
    NgbDropdownItem,
    NgbDropdownMenu,
    NgbDropdownToggle,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    FormsModule
  ],
  templateUrl: './article-commande-list.component.html',
  styleUrl: './article-commande-list.component.css'
})
export class ArticleCommandeListComponent  implements OnInit {
    articleCommandes: ArticleCommande[]=[];
    searchTerm:string='';

    constructor(private articleCommandeService: ArticleCommandeService) {
    }

    ngOnInit():void {
      this.loadingArticleCommande();
    }

    loadingArticleCommande(){
      this.articleCommandeService.getAll().subscribe({
        next: (data)=>this.articleCommandes = data,
        error:(err)=>console.log("Erreur lors du chargement de l'article commande",err),
      });
    }


  onSupprimer(articleCommande: any){
      if(confirm(`Voulez-vous vraiment supprimer l'article commande '${articleCommande.id}' ?' "`)){
        this.articleCommandeService.delete(articleCommande.id).subscribe({
          next: () => {
            alert("Article commande supprimer avec succes");
            this.loadingArticleCommande();
          },
          error:(err)=>{
            console.log("Erreur lors de la suppression: ",err);
            alert("Impossible de supprimer l'article commande");
          }
        });
      }
  }
}
