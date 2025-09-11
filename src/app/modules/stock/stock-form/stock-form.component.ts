import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProduitService} from "../../produit/produit.service";
import {MagasinService} from "../../magasin/magasin.service";
import {StockService} from "../stock.service";
import {NgForOf} from "@angular/common";
import {Stock} from "../stock";

@Component({
  selector: 'app-stock-form',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './stock-form.component.html',
  styleUrl: './stock-form.component.css'
})
export class StockFormComponent implements OnInit {
  stockForm!: FormGroup;
  produitId!: number | null;
  magasinId!: number | null;
  isEditMode = false;

  produits: any[] = [];
  magasins: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private produitService: ProduitService,
    private magasinService: MagasinService,
    private stockService: StockService
  ) {}

  ngOnInit(): void {
    this.stockForm = this.fb.group({
      produit: ['', Validators.required],
      magasin: ['', Validators.required],
      quantite: ['', Validators.required]
    });

    this.produitService.getAll().subscribe(data => this.produits = data);
    this.magasinService.getAll().subscribe(data => this.magasins = data);


    this.magasinId = Number(this.route.snapshot.paramMap.get('magasinId'));
    this.produitId = Number(this.route.snapshot.paramMap.get('produitId'));


    if (this.produitId && this.magasinId) {
      this.isEditMode = true;
      this.stockService.getById(this.magasinId, this.produitId).subscribe(data => {
        this.stockForm.patchValue({
          quantite: data.quantite,
          produit: data.produit.id,
          magasin: data.magasin.id
        });
      });
    }

  }

  onSubmit() {
    const formValue = this.stockForm.value;

    let stockData: Stock = {
      id: {
        produitId: formValue.produit,
        magasinId: formValue.magasin
      },
      produit: { id: formValue.produit },
      magasin: { id: formValue.magasin },
      quantite: formValue.quantite
    };

    if (this.isEditMode) {
      this.stockService.update(this.magasinId!, this.produitId!, stockData).subscribe(() => {
        alert('Stock modifié avec succès !');
        this.router.navigate(['/stocks']);
      });
    } else {
      //  Ici on enlève id car le backend ne veut pas d’ID pour créer
      const { id, ...stockWithoutId } = stockData;
      this.stockService.create(stockWithoutId as Stock).subscribe(() => {
        alert('Stock ajouté avec succès !');
        this.router.navigate(['/stocks']);
      });
    }
  }



  onCancel() {
    this.router.navigate(['/stocks']);
  }
}
