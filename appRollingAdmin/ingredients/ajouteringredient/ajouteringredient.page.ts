import { Component, OnInit } from '@angular/core';
import { ComposantPizzaProvider } from 'src/providers/composantpizza_provider';
import { MenuController } from '@ionic/angular';
import { ComposantPizza } from 'src/models/composantpizza_model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouteringredient',
  templateUrl: './ajouteringredient.page.html',
  styleUrls: ['./ajouteringredient.page.scss'],
})
export class AjouteringredientPage implements OnInit {
 
  allCategorieComposant: any;
  nomcomposant:any;
  prixcomposant:any;
  categoriecomposant:string;

  constructor(private composantProvider: ComposantPizzaProvider,
    private menuCtrl: MenuController, public router: Router) {
   
    this.getAllCategorieComposant() ;
  }

  ngOnInit() {
    this.getAllCategorieComposant() ;
  }
  ionViewWillEnter() {
    this.getAllCategorieComposant() ;
    this.menuCtrl.enable(false);
  }
  getAllCategorieComposant() {
    this.composantProvider.getAllCategorieComposant().subscribe(res => {
      this.allCategorieComposant = res;
      console.log("categories composants :", this.allCategorieComposant);
    }
    );
  }
  onChangeCategorie($event){
    console.log("composant est ",this.nomcomposant+"prix :"+this.prixcomposant,"categorie :"+ this.categoriecomposant);
 console.log("lenght of catgeorie is :"+this.categoriecomposant.length);
  }
   //Fonction pour l'ajout d'un nouveau produit du business connecté
   addNew(){
    this.composantProvider.addNewComposant(
      this.nomcomposant,
      this.prixcomposant,
      this.categoriecomposant
    ).subscribe(res => {

    });
  }
  Annuler(){
    this.router.navigate(['./listeingredients']);
  }

}
