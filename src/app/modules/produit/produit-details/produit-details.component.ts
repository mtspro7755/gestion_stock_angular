import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {ProduitService} from "../produit.service";

@Component({
  selector: 'app-produit-details',
  standalone: true,
  imports: [
    NgIf,
    CurrencyPipe
  ],
  templateUrl: './produit-details.component.html',
  styleUrl: './produit-details.component.css'
})
export class ProduitDetailsComponent implements OnInit{
  produit: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produitService: ProduitService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.produitService.getById(+id).subscribe({
        next: (data) => this.produit = data,
        error: (err) => {
          console.error('Erreur lors du chargement du produit', err);
          alert("Impossible de charger le produit!");
          this.router.navigate(['/produits']); // retour en cas d'erreur
        }
      });
    }
  }

  onRetour() {
    this.router.navigate(['/produits']);
  }

}
