import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MagasinService} from "../magasin.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-magasin-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './magasin-form.component.html',
  styleUrl: './magasin-form.component.css'
})
export class MagasinFormComponent implements OnInit {
  magasinForm!: FormGroup;
  magasinId!: number | null; // id si on est en mode edit
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private magasinService: MagasinService
  ) {}

  ngOnInit(): void {
    this.magasinForm = this.fb.group({
      nom: ['', Validators.required],
      adresse: [''],
      codeZip: [''],
      ville: [''],
      etat: [''],
      telephone: [''],
      email: ['', [Validators.email]]
    });

    // Vérifier si on est en mode EDIT
    this.magasinId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.magasinId) {
      this.isEditMode = true;
      this.magasinService.getById(this.magasinId).subscribe(data => {
        this.magasinForm.patchValue(data); // pré-remplir le form
      });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      // 🔹 Mode EDIT
      this.magasinService.update(this.magasinId!, this.magasinForm.value).subscribe(() => {
        alert('Magasin modifié avec succès !');
        this.router.navigate(['/magasins']);
      });
    } else {
      // 🔹 Mode CREATE
      this.magasinService.create(this.magasinForm.value).subscribe(() => {
        alert('Magasin ajouté avec succès !');
        this.router.navigate(['/magasins']);
      });
    }
  }

  onCancel() {
    this.router.navigate(['/magasins']);
  }

}
