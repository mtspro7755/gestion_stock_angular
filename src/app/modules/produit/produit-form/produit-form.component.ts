import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ProduitService } from "../produit.service";
import { MarqueService } from "../../marque/marque.service";
import { CategorieService } from "../../categorie/categorie.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-produit-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf],
  templateUrl: './produit-form.component.html',
  styleUrls: ['./produit-form.component.css']
})
export class ProduitFormComponent implements OnInit {
  produitForm!: FormGroup;
  produitId!: number | null;
  isEditMode = false;

  marques: any[] = [];
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private produitService: ProduitService,
    private marqueService: MarqueService,
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    // Initialisation du form
    this.produitForm = this.fb.group({
      nom: ['', Validators.required],
      anneeModel: ['', [Validators.required, Validators.min(1900)]],
      prixDepart: ['', [Validators.required, Validators.min(1)]],
      marque: ['', Validators.required],
      categorie: ['', Validators.required],
    });

    // Charger listes
    this.marqueService.getAll().subscribe(data => this.marques = data);
    this.categorieService.getAll().subscribe(data => this.categories = data);

    // Vérifier mode EDIT
    this.produitId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.produitId) {
      this.isEditMode = true;
      this.produitService.getById(this.produitId).subscribe(data => {
        this.produitForm.patchValue({
          nom: data.nom,
          anneeModel: data.anneeModel,
          prixDepart: data.prixDepart,
          marque: data.marque.id,
          categorie: data.categorie.id
        });
      });
    }
  }

  onSubmit() {
    const produitData = {
      ...this.produitForm.value,
      marque: { id: this.produitForm.value.marque },
      categorie: { id: this.produitForm.value.categorie }
    };

    if (this.isEditMode) {
      this.produitService.update(this.produitId!, produitData).subscribe(() => {
        alert('Produit modifié avec succès !');
        this.router.navigate(['/produits']);
      });
    } else {
      this.produitService.create(produitData).subscribe(() => {
        alert('Produit ajouté avec succès !');
        this.router.navigate(['/produits']);
      });
    }
  }

  onCancel() {
    this.router.navigate(['/produits']);
  }
}
