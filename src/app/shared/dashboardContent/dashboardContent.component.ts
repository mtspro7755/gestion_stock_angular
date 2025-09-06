import {Component, OnInit} from '@angular/core';
import {ProduitService} from "../../modules/produit/produit.service";
import {ClientService} from "../../modules/client/client.service";
import {CommandeService} from "../../modules/commande/commande.service";
import {MagasinService} from "../../modules/magasin/magasin.service";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-dashboardContent',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './dashboardContent.component.html',
  styleUrl: './dashboardContent.component.css'
})
export class DashboardContentComponent implements OnInit {
  // Stats
  totalProduits = 0;
  totalClients = 0;
  totalCommandes = 0;
  totalMagasins = 0;

  // Alertes de stock
  stockAlerts: { nom: string, quantite: number }[] = [];

  constructor(
    private produitService: ProduitService,
    private clientService: ClientService,
    private commandeService: CommandeService,
    private magasinService: MagasinService
  ) {}

  ngOnInit(): void {
    // Charger les stats
    this.produitService.getAll().subscribe(data => {
      this.totalProduits = data.length;
      // Exemple : détection stock faible
      this.stockAlerts = data
        .filter((p: any) => p.stock <= 5)
        .map((p: any) => ({ nom: p.nom, quantite: p.stock }));
    });

    this.clientService.getAll().subscribe(data => {
      this.totalClients = data.length;
    });

    this.commandeService.getAll().subscribe(data => {
      this.totalCommandes = data.length;
    });

    this.magasinService.getAll().subscribe(data => {
      this.totalMagasins = data.length;
    });
  }
}
