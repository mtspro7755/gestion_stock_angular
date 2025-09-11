import {Component, OnInit} from '@angular/core';
import {StockService} from "../stock.service";
import {Stock} from "../stock";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [
    CurrencyPipe,
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
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.css'
})
export class StockListComponent implements OnInit {
  stocks: Stock[] = [];
  searchTerm: string = '';

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.loadStocks();
  }

  // Charger tous les stocks
  loadStocks(): void {
    this.stockService.getAll().subscribe({
      next: (data) => this.stocks = data,
      error: (err) => console.error('Erreur lors du chargement des stocks', err)
    });
  }

  // Suppression d’un stock
  onSupprimer(stock: Stock) {
    if (confirm(`Voulez-vous vraiment supprimer le stock du produit "${stock.produit.nom}" dans le magasin "${stock.magasin.nom}" ?`)) {
      this.stockService.delete(stock.id.magasinId, stock.id.produitId).subscribe({
        next: () => {
          alert('Stock supprimé avec succès');
          this.loadStocks(); // recharge la liste après suppression
        },
        error: (err) => {
          console.error('Erreur lors de la suppression :', err);
          alert('Impossible de supprimer ce stock');
        }
      });
    }
  }
}
