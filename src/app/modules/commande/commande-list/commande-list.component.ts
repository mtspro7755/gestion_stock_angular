import {Component, OnInit} from '@angular/core';
import {Commande} from "../commande";
import {CommandeService} from "../commande.service";
import {NgForOf} from "@angular/common";
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-commande-list',
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
  templateUrl: './commande-list.component.html',
  styleUrl: './commande-list.component.css'
})
export class CommandeListComponent implements OnInit{
  commandes: Commande[]=[];
  searchTerm:string='';

  constructor(private commandeService: CommandeService) {}

  ngOnInit() {
    this.loadingCommandes();
  }


  loadingCommandes():void{
    this.commandeService.getAll().subscribe({
      next: (data) => this.commandes = data,
      error:(err)=>console.log('Erreur lors du chargement des commandes',err)
    });
  }


  onSupprimer(commande:any){
    if(confirm(`Voulez-vous vraiment supprimer la commande "${commande.id}" ?`)){
      this.commandeService.delete(commande.id).subscribe({
        next: () => {
          alert('Commande supprimé avec succès');
          this.loadingCommandes();
        },
        error:(err)=>{
          console.error('Erreur lors de la suppression :',err);
          alert("Impossible de supprimer la commande ");
        }
      });
    }
  }
}
