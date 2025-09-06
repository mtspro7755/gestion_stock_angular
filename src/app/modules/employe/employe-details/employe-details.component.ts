import {Component, OnInit} from '@angular/core';
import {EmployeService} from "../employe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CurrencyPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-employe-details',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgIf
  ],
  templateUrl: './employe-details.component.html',
  styleUrl: './employe-details.component.css'
})
export class EmployeDetailsComponent implements OnInit {
  employe:any;

  constructor(
    private employeService:EmployeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id=this.route.snapshot.paramMap.get('id');
    if(id){
      this.employeService.getById(+id).subscribe({
        next:(data=>this.employe = data),
        error:(err)=>{
          console.error("Erreur lors du chargement de l'employe, err");
          alert("Impossible de charger l'employe");
          this.router.navigate(['/produits']);
        }
      });
    }
  }

  onRetour(){
    this.router.navigate(['/produits']);
  }
}
