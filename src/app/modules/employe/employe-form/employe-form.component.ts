import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";

import { EmployeService } from "../employe.service";
import { MagasinService } from "../../magasin/magasin.service";
import { Employe, Magasin } from "../employe";

@Component({
  selector: 'app-employe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employe-form.component.html',
  styleUrls: ['./employe-form.component.css']
})
export class EmployeFormComponent implements OnInit {
  employeForm!: FormGroup;
  employeId!: number | null;
  isEditMode = false;

  employes: Employe[] = [];   // liste globale des employés (pour choisir un manager)
  magasins: Magasin[] = [];   // liste des magasins
  managers: Employe[] = [];   // liste des managers (souvent les mêmes que employés)

  constructor(
    private employeService: EmployeService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private magasinService: MagasinService
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire
    this.employeForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      magasin: ['', Validators.required],
      manager: ['']
    });

    // Charger les données liées
    this.employeService.getAll().subscribe(data => {
      this.employes = data;
      this.managers = data;
    });
    this.magasinService.getAll().subscribe(data => this.magasins = data);

    // Vérifier si on est en mode EDIT
    this.employeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.employeId) {
      this.isEditMode = true;
      this.employeService.getById(this.employeId).subscribe(data => {
        this.employeForm.patchValue({
          nom: data.nom,
          prenom: data.prenom,
          email: data.email,
          telephone: data.telephone,
          magasin: data.magasin?.id,
          manager: data.manager?.id
        });
      });
    }
  }

  onSubmit() {
    if (this.employeForm.valid) {
      const formValue = this.employeForm.value;

      const payload = {
        ...formValue,
        magasin: { id: formValue.magasin },   // transformer en objet pour l’API
        manager: formValue.manager ? { id: formValue.manager } : null
      };

      if (this.isEditMode) {
        this.employeService.update(this.employeId!, payload).subscribe(() => {
          alert('Employé modifié avec succès !');
          this.router.navigate(['/employes']);
        });
      } else {
        this.employeService.create(payload).subscribe(() => {
          alert('Employé ajouté avec succès !');
          this.router.navigate(['/employes']);
        });
      }
    }
  }

  onCancel() {
    this.router.navigate(['/employes']);
  }
}
