import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProduitService} from "../../produit/produit.service";
import {CommandeService} from "../../commande/commande.service";
import {ArticleCommandeService} from "../article-commande.service";
import {NgForOf} from "@angular/common";
import {ArticleCommande} from "../article-commande";

@Component({
  selector: 'app-article-commande-form',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './article-commande-form.component.html',
  styleUrl: './article-commande-form.component.css'
})
export class ArticleCommandeFormComponent implements OnInit {
  articleCommandeForm!:FormGroup;
  articleCommandeId!:number |null;
  isEditMode:boolean=false;

  produits:any[]=[];
  commandes:any[]=[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private produitService: ProduitService,
    private commandeService: CommandeService,
    private articleCommandeService: ArticleCommandeService
    ) {
  }
  ngOnInit(): void {
    // Initialisation du form
    this.articleCommandeForm = this.fb.group({
      prixDepart:['', Validators.required],
      quantite:['', Validators.required],
      remiseDecimal:['', Validators.required],
      produit:[''],
      commande:['']

    });


    // Charger les données liées
    this.commandeService.getAll().subscribe(data => this.commandes = data);
    this.produitService.getAll().subscribe(data => this.produits = data);


    // Vérifier si on est en mode EDIT
    this.articleCommandeId= Number(this.route.snapshot.paramMap.get('id'));
    if (this.articleCommandeId) {
      this.isEditMode = true; //  très important
      this.articleCommandeService.getById(this.articleCommandeId).subscribe(data => {
        this.articleCommandeForm.patchValue({
          prixDepart: data.prixDepart,
          quantite: data.quantite,
          remiseDecimal: data.remiseDecimal,
          produit:data.produit?.id,
          commande:data.commande?.id

        });
      });
    }
  }


  onSubmit() {
    if (this.articleCommandeForm.valid) {
      const formValue = this.articleCommandeForm.value;

      const payload = {
        ...formValue,
        produit: { id: formValue.produit},   // transformer en objet pour l’API
        commande: formValue.commande ? { id: formValue.commande } : null
      };

      if (this.isEditMode) {
        this.articleCommandeService.update(this.articleCommandeId!, payload).subscribe(() => {
          alert('Article commande modifié avec succès !');
          this.router.navigate(['/articleCommandes']);
        });
      } else {
        this.articleCommandeService.create(payload).subscribe(() => {
          alert('Article commande ajouté avec succès !');
          this.router.navigate(['/articleCommandes']);
        });
      }
    }
  }

  onCancel() {
    this.router.navigate(['/articleCommandes']);
  }


}
