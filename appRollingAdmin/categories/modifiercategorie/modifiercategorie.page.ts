import { Component, OnInit } from '@angular/core';
import { ProduitProvider } from 'src/providers/produits_provider';
import { NavController, MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieProduit } from 'src/models/categorieproduit_model';

@Component({
  selector: 'app-modifiercategorie',
  templateUrl: './modifiercategorie.page.html',
  styleUrls: ['./modifiercategorie.page.scss'],
})
export class ModifiercategoriePage implements OnInit {
 // idcategorie:any;
//  nomCategorie:any;
  categorie: CategorieProduit;
  //stocker toutes les catégories de produits: 
 allCategorie: CategorieProduit;
  constructor(  private produitProvider: ProduitProvider,
                private menuCtrl: MenuController,
                private navCtrl: NavController,
                private activatedRoute: ActivatedRoute,
                public router: Router
              )
    { 
      this.categorie= new CategorieProduit(null, null);
    this.categorie.idcategorie  = Number(this.activatedRoute.snapshot.paramMap.get('idcategorie'));
   // alert( "id categorie "+ this.categorie.idcategorie );
    this.getCategorie( this.categorie.idcategorie  );  
    this.getAllCategorieProduit();
  }

  ngOnInit() {
  }
  getCategorie(idcategorie){
    this.produitProvider.getCategorieId(idcategorie).subscribe(res=>{
      console.log("res  :"+ res);
      if(res == false){
        alert("ERREUR DE SUPPRESSION!");
      }else{
      let resultat = <[]>res;
      resultat.forEach(element=>{
        console.log("element :",element);      
        this.categorie.idcategorie = element['idcategorieproduit'];
        this.categorie.nomcategorie = element['nomcategorieproduit']; 
      });
        
      console.log(" get categorie  :"+  resultat);
     //   this.navCtrl.back();
      }}
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
    this.produitProvider.updateCategorieId( this.categorie.idcategorie, this.categorie.nomcategorie)
   .subscribe(res=> {
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
