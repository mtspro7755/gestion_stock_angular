import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CommandeService} from "../commande.service";
import {MagasinService} from "../../magasin/magasin.service";
import {EmployeService} from "../../employe/employe.service";
import {Client, Commande, Employe, Magasin} from "../commande";
import {NgForOf} from "@angular/common";
import {ClientService} from "../../client/client.service";

@Component({
  selector: 'app-commande-form',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './commande-form.component.html',
  styleUrl: './commande-form.component.css'
})
export class CommandeFormComponent implements OnInit {
  commandeForm!:FormGroup;
  commandeId!: number | null;
  isEditMode=false;

  commandes:Commande[]=[];
  magasins:Magasin[]=[];
  vendeurs:Employe[]=[];
  clients:Client[]=[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private commandeService: CommandeService,
    private magasinService: MagasinService,
    private employeService: EmployeService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire
    this.commandeForm = this.fb.group({
      status: ['', Validators.required],
      dateCommande: ['', Validators.required],
      dateLivraison: ['', Validators.required],
      dateLivraisonVoulue: ['', Validators.required],
      magasin: ['', Validators.required],
      vendeur: [''],
      client: [''],
    });

    // Charger les données liées
    this.magasinService.getAll().subscribe(data => this.magasins = data);
    this.employeService.getAll().subscribe(data => this.vendeurs = data);
    this.clientService.getAll().subscribe(data => this.clients = data);

    // Vérifier si on est en mode EDIT
    this.commandeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.commandeId) {
      this.isEditMode = true; // ✅ très important
      this.commandeService.getById(this.commandeId).subscribe(data => {
        this.commandeForm.patchValue({
          status: data.status,
          dateCommande: data.dateCommande,
          dateLivraison: data.dateLivraison,
          dateLivraisonVoulue: data.dateLivraisonVoulue,
          client: data.client?.id,
          magasin: data.magasin?.id,
          vendeur: data.vendeur?.id
        });
      });
    }
  }





  onSubmit() {
      if (this.commandeForm.valid) {
        const formValue = this.commandeForm.value;

        const payload = {
          ...formValue,
          magasin: { id: formValue.magasin },   // transformer en objet pour l’API
          vendeur: formValue.vendeur ? { id: formValue.vendeur } : null,
          client: formValue.client ? { id: formValue.client } : null
        };

        if (this.isEditMode) {
          this.commandeService.update(this.commandeId!, payload).subscribe(() => {
            alert('Commande modifié avec succès !');
            this.router.navigate(['/commandes']);
          });
        } else {
          this.commandeService.create(payload).subscribe(() => {
            alert('Commande ajouté avec succès !');
            this.router.navigate(['/commandes']);
          });
        }
      }
    }

    onCancel() {
      this.router.navigate(['/commandes']);
    }


}

