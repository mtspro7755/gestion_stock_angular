import {Component, OnInit} from '@angular/core';
import {EmployeService} from "../../employe/employe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe, NgIf} from "@angular/common";
import {Commande} from "../commande";
import {CommandeService} from "../commande.service";

@Component({
  selector: 'app-commande-details',
  standalone: true,
  imports: [
    NgIf,
    DatePipe
  ],
  templateUrl: './commande-details.component.html',
  styleUrl: './commande-details.component.css'
})
export class CommandeDetailsComponent implements OnInit {
  commande:any;

  constructor(
    private commandeService:CommandeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id=this.route.snapshot.paramMap.get('id');
    if(id){
      this.commandeService.getById(+id).subscribe({
        next:(data=>this.commande = data),
        error:(err)=>{
          console.error("Erreur lors du chargement de la commande, err");
          alert("Impossible de charger la commande");
          this.router.navigate(['/commandes']);
        }
      });
    }
  }

  onRetour(){
    this.router.navigate(['/commandes']);
  }
}
