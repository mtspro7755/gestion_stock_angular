import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ClientService} from "../client.service";

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent implements OnInit {
  clientForm!: FormGroup;
  clientId!: number | null; // id si on est en mode edit
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      codeZip: [''],
      ville: [''],
      etat: [''],
      telephone: [''],
      email: ['', [Validators.email]]
    });

    // Vérifier si on est en mode EDIT
    this.clientId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.clientId) {
      this.isEditMode = true;
      this.clientService.getById(this.clientId).subscribe(data => {
        this.clientForm.patchValue(data); // pré-remplir le form
      });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      // Mode EDIT
      this.clientService.update(this.clientId!, this.clientForm.value).subscribe(() => {
        alert('Client modifié avec succès !');
        this.router.navigate(['/clients']);
      });
    } else {
      //  Mode CREATE
      this.clientService.create(this.clientForm.value).subscribe(() => {
        alert('Client ajouté avec succès !');
        this.router.navigate(['/clients']);
      });
    }
  }

  onCancel() {
    this.router.navigate(['/clients']);
  }
}
