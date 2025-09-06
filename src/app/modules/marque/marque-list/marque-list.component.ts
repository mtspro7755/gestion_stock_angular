import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {Magasin} from "../../magasin/magasin";
import {MagasinService} from "../../magasin/magasin.service";
import {Marque} from "../marque";
import {MarqueService} from "../marque.service";

@Component({
  selector: 'app-marque-list',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    FormsModule
  ],
  templateUrl: './marque-list.component.html',
  styleUrl: './marque-list.component.css'
})
export class MarqueListComponent implements OnInit {
  marques: Marque[] = [];
  searchTerm: string = '';

  constructor(private marqueService: MarqueService) {}

  ngOnInit(): void {
    this.loadMagasins();
  }

  loadMagasins(): void {
    this.marqueService.getAll().subscribe({
      next: (data) => this.marques = data,
      error: (err) => console.error('Erreur lors du chargement des marques', err)
    });
  }



  onSupprimer(marque: any) {
    if (confirm(`Voulez-vous vraiment supprimer le magasin "${marque.nom}" ?`)) {
      this.marqueService.delete(marque.id).subscribe({
        next: () => {
          alert('Marque supprimé avec succès');
          this.loadMagasins(); // recharge la liste après suppression
        },
        error: (err) => {
          console.error('Erreur lors de la suppression :', err);
          alert('Impossible de supprimer la marque ');
        }
      });
    }
  }
}
