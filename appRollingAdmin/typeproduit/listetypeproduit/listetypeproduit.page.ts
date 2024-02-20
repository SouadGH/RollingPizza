import { Component, OnInit } from '@angular/core';
import { TypeProduit } from 'src/models/typeproduit_model';
import { ProduitProvider } from 'src/providers/produits_provider';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-listetypeproduit',
  templateUrl: './listetypeproduit.page.html',
  styleUrls: ['./listetypeproduit.page.scss'],
})
export class ListetypeproduitPage implements OnInit {

  //variable contenant tous les types de produits, récupérés depuis la BDD
  allTypeProduits: TypeProduit;

  constructor(
    private produitProvider: ProduitProvider,
    private menuCtrl: MenuController, public router: Router,
  ) { 
    this.getAllTypeProduit();
  }

  ngOnInit() {
    this.menuCtrl.enable(true);
  }
  
  ionViewWillEnter(){
    this.getAllTypeProduit();
  }

  getAllTypeProduit(){
    this.produitProvider.getAllTypeProduits().subscribe(
      res => {
       
        if(res == false){
          console.log("Aucun type de produit dans votre pizzeria. Merci de contacter votre Helvitech Développeur.");
        }else{
          this.allTypeProduits = res;
          let tab =<[]>res;
          let tableau =[];
          let tableau_finale=[];

          tab.forEach(element=>{});  
          for(let i=0; i<tab.length;i++){
            tableau_finale.push(['nomcategorie',tab[i]['nomcategorie'] ]);
           for(let j=0; j<tab.length;j++){
              if(tab[i]['nomcategorie']==tab[j]['nomcategorie']){
                tableau.push(['nomtypeproduit', tab[j]['nomtypeproduit']]  );
                i=j;
              }
              tableau_finale.push(['listetypeproduits',tableau ]);
              tableau =[];
           }
          }
          
          console.log( this.allTypeProduits);    
          console.log( "tableau_finale est :"+tableau_finale);      
        }
      }
    );
  }

  deletetypeptoduit(idtypeproduit){
      this.produitProvider.deleteTypeProduit(idtypeproduit).subscribe(
      res => {
       
        if(res == false){
          console.log("Erreur de suppression de type produit. Merci de contacter votre Helvitech Développeur.");
        }else{
          
          this.getAllTypeProduit();       
        }
      }
    );
  }
  updatetypeptoduit(idtypeproduit){
   
    this.router.navigate(['../modifiertypeproduit', idtypeproduit]);
  }
  userDetails(uid) {   
    this.router.navigate(['../modifiertypeproduit', uid]);
  }

}
