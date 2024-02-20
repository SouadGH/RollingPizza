import { Component, OnInit, Input } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { ProduitProvider } from 'src/providers/produits_provider';
import { ActivatedRoute, Router } from '@angular/router';
import { LIEN_GET_TYPE_PRODUITS_BY_BUSINESS_ID_TYPE_SHOP } from 'src/providers/config_bdd';
import { TypeProduit } from 'src/models/typeproduit_model';
import { CategorieProduit } from 'src/models/categorieproduit_model';
import { element } from 'protractor';
import { Produit } from 'src/models/produit_model';

@Component({
  selector: 'app-modifiertypeproduit',
  templateUrl: './modifiertypeproduit.page.html',
  styleUrls: ['./modifiertypeproduit.page.scss'],
})
export class ModifiertypeproduitPage implements OnInit {

  idtypeproduit:any;
  nomtypeproduit:any;
  idcategorieproduit:any; 
  nomcategorieproduit:any;
  dataTypeProduit :  TypeProduit;
  allTypeProduits: TypeProduit;
   //stocker toutes les catégories de produits: 
   allCategorie: CategorieProduit;
   
  constructor(  private produitProvider: ProduitProvider,
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,public router: Router) {
      this.idtypeproduit = this.activatedRoute.snapshot.paramMap.get('idtypeproduit');
    
      this.getTypeProduit( this.idtypeproduit );    
      this.getAllCategorieProduit();
     }

  ngOnInit() { }
  getTypeProduit(idtypeproduit){
    this.produitProvider.getTypeProduitId(idtypeproduit).subscribe(res=>{
      console.log("res  :"+ res);
      if(res == false){
        alert("ERREUR DE SUPPRESSION!");
      }else{
      let resultat = <[]>res;
      resultat.forEach(element=>{
        console.log("element :",element);
       this.idtypeproduit = element['idtypeproduit'];
       this.nomtypeproduit = element['nomtypeproduit'];
       this.idcategorieproduit = element['idcategorie'];
       this.nomcategorieproduit = element['nomcategorie'];
     
      });
        
      console.log(" this.dataTypeProduit.nomcategorie  :"+  resultat);
     //   this.navCtrl.back();
      }}
    );
  }
  getTypeProduitId(idtypeproduit){
    this.produitProvider.getTypeProduitId(idtypeproduit).subscribe(
      res => {
       
        if(res == false){
          console.log("Aucun type de produit dans votre pizzeria. Merci de contacter votre Helvitech Développeur.");
        }else{
          this.allTypeProduits = res;       
          console.log("this.allTypeProduits :"+this.allTypeProduits);  
        }
      }
    );
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

  Update(){   
   this.produitProvider.updateTypeProduit( this.idtypeproduit, this.nomtypeproduit, this.idcategorieproduit)
  .subscribe(res=> {
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
