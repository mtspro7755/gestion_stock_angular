import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CategorieService} from "../categorie.service";

@Component({
  selector: 'app-categorie-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './categorie-form.component.html',
  styleUrl: './categorie-form.component.css'
})
export class CategorieFormComponent implements OnInit {
  categorieForm!: FormGroup;
  categorieId!: number | null; // id si on est en mode edit
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    this.categorieForm = this.fb.group({
      nom: ['', Validators.required]
    });

    // Vérifier si on est en mode EDIT
    this.categorieId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.categorieId) {
      this.isEditMode = true;
      this.categorieService.getById(this.categorieId).subscribe(data => {
        this.categorieForm.patchValue(data); // pré-remplir le form
      });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      // Mode EDIT
      this.categorieService.update(this.categorieId!, this.categorieForm.value).subscribe(() => {
        alert('Categorie modifié avec succès !');
        this.router.navigate(['/categories']);
      });
    } else {
      //  Mode CREATE
      this.categorieService.create(this.categorieForm.value).subscribe(() => {
        alert('Categorie ajouté avec succès !');
        this.router.navigate(['/categories']);
      });
    }
  }

  onCancel() {
    this.router.navigate(['/categories']);
  }
}
