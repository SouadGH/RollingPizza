import { Component, OnInit } from '@angular/core';
import { CategorieProduit } from 'src/models/categorieproduit_model';
import { ProduitProvider } from 'src/providers/produits_provider';
import { MenuController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajoutercategorie',
  templateUrl: './ajoutercategorie.page.html',
  styleUrls: ['./ajoutercategorie.page.scss'],
})
export class AjoutercategoriePage implements OnInit {
 //stocker toutes les catégories de produits: 
 allCategorie: CategorieProduit;
 newCategorie:any;
  constructor(private produitProvider: ProduitProvider,
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    public router: Router) { 
    this.getAllCategorieProduit();
  }

  ngOnInit() {
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
    this.produitProvider.addNewCategorie(this.newCategorie).subscribe(res=> {
      if(res == false){
        alert("ERREUR !");
      }else{
        this.navCtrl.back();
      }
    });


  }
  Annuler(){
    this.router.navigate(['./listecategories']);
  }
}
