import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {Produit} from "../produit";

import {ProduitService} from "../produit.service";
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-produit-list',
  standalone: true,
  imports: [
    RouterLink,
    NgbDropdownMenu,
    NgbDropdownItem,
    CurrencyPipe,
    NgForOf,
    NgbDropdown,
    NgbDropdownToggle,
    FormsModule,
    RouterLinkActive
  ],
  templateUrl: './produit-list.component.html',
  styleUrl: './produit-list.component.css'
})
export class ProduitListComponent implements OnInit {
  produits: Produit[] = [];
  searchTerm: string = '';

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.loadMagasins();
  }

  loadMagasins(): void {
    this.produitService.getAll().subscribe({
      next: (data) => this.produits = data,
      error: (err) => console.error('Erreur lors du chargement des produits', err)
    });
  }



  onSupprimer(produit: any) {
    if (confirm(`Voulez-vous vraiment supprimer le produit "${produit.nom}" ?`)) {
      this.produitService.delete(produit.id).subscribe({
        next: () => {
          alert('Produit supprimé avec succès');
          this.loadMagasins(); // recharge la liste après suppression
        },
        error: (err) => {
          console.error('Erreur lors de la suppression :', err);
          alert('Impossible de supprimer le produit ');
        }
      });
    }
  }
}
