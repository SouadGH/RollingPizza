import { Component, OnInit } from '@angular/core';
import { CategorieProduit } from 'src/models/categorieproduit_model';
import { ProduitProvider } from 'src/providers/produits_provider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listecategories',
  templateUrl: './listecategories.page.html',
  styleUrls: ['./listecategories.page.scss'],
})
export class ListecategoriesPage implements OnInit {

  //stocker toutes les catégories de produits
  allCategorie: CategorieProduit;

  constructor(
    private produitProvider: ProduitProvider,public router: Router,
  ) {
    this.getAllCategorie();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getAllCategorie();
  }

  getAllCategorie() {
    this.produitProvider.getAllCategorieProduits().subscribe(
      res => {
        if (res == false) {
          console.log("Aucun type de produit dans votre pizzeria. Merci de contacter votre Helvitech Développeur.");
        } else {
          this.allCategorie = res;
        }
      }
    )
  }
  deletetcategorie(idcategorieproduit) {
    this.produitProvider.deleteCategorie(idcategorieproduit).subscribe(
      res => {

        if (res == false) {
          console.log("Erreur de suppression de type produit. Merci de contacter votre Helvitech Développeur.");
        } else {

         this.getAllCategorie();
        }
      }
    );
  }
  updatecategorie(idtcategorie) {
    this.router.navigate(['../modifiercategorie', idtcategorie]);
  }
 

}
