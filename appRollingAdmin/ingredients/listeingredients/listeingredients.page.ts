import { Component, OnInit } from '@angular/core';
import { ComposantPizzaProvider } from 'src/providers/composantpizza_provider';
import { MenuController } from '@ionic/angular';
import { LIEN_GET_CATEGORIE_TYPE_SHOP_BUSINESS_CONNECTED } from 'src/providers/config_bdd';
import { ComposantPizza } from 'src/models/composantpizza_model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listeingredients',
  templateUrl: './listeingredients.page.html',
  styleUrls: ['./listeingredients.page.scss'],
})
export class ListeingredientsPage implements OnInit {
  allComposants: ComposantPizza;

  constructor(private composantsProvider: ComposantPizzaProvider,public router: Router,
    private menuCtrl: MenuController,) { this.getAllComposants(); }


  ngOnInit() {
    this.getAllComposants();
    this.menuCtrl.enable(true);
  }

  ionViewWillEnter() {
    this.getAllComposants();
  }
  //récupère tous les composants des produits
  getAllComposants() {
    this.composantsProvider.getAllComposants().subscribe(res => {
      this.allComposants = res;
      console.log("allcomposants :"+  this.allComposants.categoriecomposant);
      console.log("allcomposants :"+  this.allComposants.listeIngredients);
   /*   res => {
        if (res == false) {
          console.log("Aucun produit disponible");
        } else {
       
          console.log("composants :",res);
        }
      }*/
    });
  }
  //update un composant selon son id
  updateingredient(idcomposant){
   console.log("Composant est :"+idcomposant);
    this.router.navigate(['../modifieringredient',idcomposant]);
  }

 
 
  //supprimer un composant de la liste des composants
  deletetingredient(idcomposant){
    this.composantsProvider.deleteComposant(idcomposant).subscribe(
      res => {
       
        if(res == false){
          console.log("Erreur de suppression de composant. Merci de contacter votre Helvitech Développeur.");
        }else{
          
          this.getAllComposants();       
        }
      }
    );
  }
  deletetcategorieComposant(categoriecomposant){}
  updatecategorieComposant(categoriecomposant){}

}
