import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MagasinService} from "../magasin.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-magasin-details',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './magasin-details.component.html',
  styleUrl: './magasin-details.component.css'
})

export class MagasinDetailsComponent implements OnInit {
  magasin: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private magasinService: MagasinService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.magasinService.getById(+id).subscribe({
        next: (data) => this.magasin = data,
        error: (err) => {
          console.error('Erreur lors du chargement du magasin', err);
          alert("Impossible de charger le magasin !");
          this.router.navigate(['/magasins']); // retour en cas d'erreur
        }
      });
    }
  }

  onRetour() {
    this.router.navigate(['/magasins']);
  }
}
