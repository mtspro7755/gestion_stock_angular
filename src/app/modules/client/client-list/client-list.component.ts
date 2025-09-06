import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf, UpperCasePipe} from "@angular/common";
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {Client} from "../client";
import {ClientService} from "../client.service";

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [
    NgForOf,
    NgbDropdown,
    NgbDropdownItem,
    NgbDropdownMenu,
    NgbDropdownToggle,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    NgClass,
    UpperCasePipe
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  searchTerm: string = '';

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadMagasins();
  }

  loadMagasins(): void {
    this.clientService.getAll().subscribe({
      next: (data) => this.clients = data,
      error: (err) => console.error('Erreur lors du chargement des magasins', err)
    });
  }



  onSupprimer(client: any) {
    if (confirm(`Voulez-vous vraiment supprimer le client "${client.nom}" ?`)) {
      this.clientService.delete(client.id).subscribe({
        next: () => {
          alert('Client supprimé avec succès');
          this.loadMagasins(); // recharge la liste après suppression
        },
        error: (err) => {
          console.error('Erreur lors de la suppression :', err);
          alert('Impossible de supprimer le client ');
        }
      });
    }
  }
}
