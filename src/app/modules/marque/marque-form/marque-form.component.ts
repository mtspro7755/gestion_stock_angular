import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { MarqueService } from "../marque.service";

@Component({
  selector: 'app-marque-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './marque-form.component.html',
  styleUrls: ['./marque-form.component.css']
})
export class MarqueFormComponent implements OnInit {
  marqueForm!: FormGroup;
  marqueId!: number | null; // id si on est en mode edit
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private marqueService: MarqueService
  ) {}

  ngOnInit(): void {
    this.marqueForm = this.fb.group({
      nom: ['', Validators.required],
      description : [''],
    });

    // Vérifier si on est en mode EDIT
    this.marqueId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.marqueId) {
      this.isEditMode = true;
      this.marqueService.getById(this.marqueId).subscribe(data => {
        this.marqueForm.patchValue(data); // pré-remplir le form
      });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      // Mode EDIT
      this.marqueService.update(this.marqueId!, this.marqueForm.value).subscribe(() => {
        alert('Marque modifié avec succès !');
        this.router.navigate(['/marques']);
      });
    } else {
      //  Mode CREATE
      this.marqueService.create(this.marqueForm.value).subscribe(() => {
        alert('Marque ajouté avec succès !');
        this.router.navigate(['/marques']);
      });
    }
  }

  onCancel() {
    this.router.navigate(['/marques']);
  }
}
