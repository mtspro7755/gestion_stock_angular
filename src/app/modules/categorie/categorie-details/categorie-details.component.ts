import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CategorieService} from "../categorie.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-categorie-details',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './categorie-details.component.html',
  styleUrl: './categorie-details.component.css'
})
export class CategorieDetailsComponent implements OnInit {
  categorie: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.categorieService.getById(+id).subscribe({
        next: (data) => this.categorie = data,
        error: (err) => {
          console.error('Erreur lors du chargement du categorie', err);
          alert("Impossible de charger le categorie!");
          this.router.navigate(['/categories']); // retour en cas d'erreur
        }
      });
    }
  }

  onRetour() {
    this.router.navigate(['/categories']);
  }
}
