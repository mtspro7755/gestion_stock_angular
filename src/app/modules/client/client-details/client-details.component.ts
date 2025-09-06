import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {MagasinService} from "../../magasin/magasin.service";
import {ClientService} from "../client.service";

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.css'
})
export class ClientDetailsComponent implements OnInit {
  client: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.clientService.getById(+id).subscribe({
        next: (data) => this.client = data,
        error: (err) => {
          console.error('Erreur lors du chargement du client', err);
          alert("Impossible de charger le client !");
          this.router.navigate(['/clients']); // retour en cas d'erreur
        }
      });
    }
  }

  onRetour() {
    this.router.navigate(['/clients']);
  }
}
