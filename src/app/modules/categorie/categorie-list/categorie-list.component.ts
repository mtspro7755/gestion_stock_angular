import {Component, OnInit} from '@angular/core';
import {Marque} from "../../marque/marque";
import {MarqueService} from "../../marque/marque.service";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {Categorie} from "../categorie";
import {CategorieService} from "../categorie.service";

@Component({
  selector: 'app-categorie-list',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './categorie-list.component.html',
  styleUrl: './categorie-list.component.css'
})
export class CategorieListComponent implements OnInit {
  categories: Categorie[] = [];
  searchTerm: string = '';

  constructor(private categorieService: CategorieService) {}

  ngOnInit(): void {
    this.loadMagasins();
  }

  loadMagasins(): void {
    this.categorieService.getAll().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Erreur lors du chargement des categories', err)
    });
  }



  onSupprimer(categorie: any) {
    if (confirm(`Voulez-vous vraiment supprimer le categorie "${categorie.nom}" ?`)) {
      this.categorieService.delete(categorie.id).subscribe({
        next: () => {
          alert('Categorie supprimé avec succès');
          this.loadMagasins(); // recharge la liste après suppression
        },
        error: (err) => {
          console.error('Erreur lors de la suppression :', err);
          alert('Impossible de supprimer la categorie ');
        }
      });
    }
  }
}
