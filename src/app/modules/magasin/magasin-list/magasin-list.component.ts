import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf} from "@angular/common";
import {Magasin} from "../magasin";
import {MagasinService} from "../magasin.service";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {Client} from "../../client/client";

@Component({
  selector: 'app-magasin-list',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgClass,
    RouterLink,
    RouterLinkActive,
    NgbDropdownItem,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu
  ],
  templateUrl: './magasin-list.component.html',
  styleUrl: './magasin-list.component.css'
})
export class MagasinListComponent implements OnInit {
  magasins: Magasin[] = [];
  searchTerm: string = '';

  constructor(private magasinService: MagasinService) {}

  ngOnInit(): void {
    this.loadMagasins();
  }

  loadMagasins(): void {
    this.magasinService.getAll().subscribe({
      next: (data) => this.magasins = data,
      error: (err) => console.error('Erreur lors du chargement des magasins', err)
    });
  }



  onSupprimer(magasin: any) {
    if (confirm(`Voulez-vous vraiment supprimer le magasin "${magasin.nom}" ?`)) {
      this.magasinService.delete(magasin.id).subscribe({
        next: () => {
          alert('Magasin supprimé avec succès');
          this.loadMagasins(); // recharge la liste après suppression
        },
        error: (err) => {
          console.error('Erreur lors de la suppression :', err);
          alert('Impossible de supprimer le magasin ');
        }
      });
    }
  }


}
