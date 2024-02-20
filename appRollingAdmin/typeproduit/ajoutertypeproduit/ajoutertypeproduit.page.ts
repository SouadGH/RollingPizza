import { Component, OnInit } from '@angular/core';
import { ProduitProvider } from 'src/providers/produits_provider';
import { MenuController, NavParams, NavController } from '@ionic/angular';
import { TypeProduit } from 'src/models/typeproduit_model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CategorieProduit } from 'src/models/categorieproduit_model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajoutertypeproduit',
  templateUrl: './ajoutertypeproduit.page.html',
  styleUrls: ['./ajoutertypeproduit.page.scss'],
})
export class AjoutertypeproduitPage implements OnInit {

  //valeur du nouveau type de produit 
  dataNewTypeProduit : any;

  //stocker toutes les catégories de produits: 
  allCategorie: CategorieProduit;

  constructor(
    private produitProvider: ProduitProvider,
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    public router: Router
  ) { 
    this.dataNewTypeProduit = new TypeProduit(null, null, null,null);

    this.getAllCategorieProduit();
  }

  ngOnInit() {
    this.menuCtrl.enable(true);
  }

  getAllCategorieProduit(){
    this.produitProvider.getAllCategorieProduits().subscribe(
      res => {
        if(res == false){
          console.log("ERREUR");
        }else{
          
          this.allCategorie = res;
          console.log("Liste des catégorie : " , this.allCategorie);
        }
      }
    )
  }

  addNew(){
    this.produitProvider.addNewTypeProduit(
      this.dataNewTypeProduit.nomtypeproduit,
      this.dataNewTypeProduit.idcategorieproduit
    ).subscribe(res=> {
      if(res == false){
        alert("ERREUR !");
      }else{
        this.navCtrl.back();
      }
    });


  }
  Annuler(){
    this.router.navigate(['./listetypeproduit']);
  }
}
