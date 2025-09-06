import {Component, OnInit} from '@angular/core';
import {Employe} from "../employe";
import {EmployeService} from "../employe.service";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-employe-list',
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
  templateUrl: './employe-list.component.html',
  styleUrl: './employe-list.component.css'
})
export class EmployeListComponent implements OnInit {
  employes: Employe[]=[];
  searchTerm:string='';

  constructor(private employeService: EmployeService ) {
  }

  ngOnInit():void {
    this.loadingEmployes();
  }

  loadingEmployes(){
    this.employeService.getAll().subscribe({
      next: (data) => this.employes=data,
      error: error => console.error('Erreur lors du chargement des employes',error)
    });
  }

  onSupprimer(employe: any){
    if(confirm(`Voulez-vous vraiment supprimer l'employe "${employe.nom}" ? `)) {
      this.employeService.delete(employe.id).subscribe({
        next:()=>{
          alert('Employé supprimé avec succès');
          this.loadingEmployes();// recharge la liste après suppression
      },
        error:(err)=>{
          console.error('Erreur lors du chargement des employe',err);
          alert("Impossible de supprimer l'employé ")
        }
      })
    }
  }

  }


