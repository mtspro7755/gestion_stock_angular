import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {MagasinService} from "../../magasin/magasin.service";
import {MarqueService} from "../marque.service";

@Component({
  selector: 'app-marque-details',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './marque-details.component.html',
  styleUrl: './marque-details.component.css'
})
export class MarqueDetailsComponent implements OnInit {
  marque: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private marqueService: MarqueService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.marqueService.getById(+id).subscribe({
        next: (data) => this.marque = data,
        error: (err) => {
          console.error('Erreur lors du chargement du marque', err);
          alert("Impossible de charger le marque!");
          this.router.navigate(['/marques']); // retour en cas d'erreur
        }
      });
    }
  }

  onRetour() {
    this.router.navigate(['/marques']);
  }

}
