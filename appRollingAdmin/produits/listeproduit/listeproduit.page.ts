import { Component, OnInit } from '@angular/core';
import { Produit } from 'src/models/produit_model';
import { ProduitProvider } from 'src/providers/produits_provider';
import { ModalController, MenuController } from '@ionic/angular';
import { DetailsproduitPage } from '../detailsproduit/detailsproduit.page';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeProduit } from 'src/models/typeproduit_model';
import { LIEN_PATH_FILES } from 'src/providers/config_bdd';

@Component({
  selector: 'app-listeproduit',
  templateUrl: './listeproduit.page.html',
  styleUrls: ['./listeproduit.page.scss'],
})
export class ListeproduitPage implements OnInit {

  //stocker tous les produits de la pizzeria : 
  //allProduits : any;//Produit; 
  allProduits: any[] =[];
  allProduitsFinale: any[]=[] ;


  /**lister produits */
  path = LIEN_PATH_FILES;
  allProduitFinale: Produit[];
  allProduitFinaleArchive :Produit[];
  selectedCategorieIdx: any;
  selectedTypeProduitIdx: any;
  allTypeProduits: TypeProduit;
  showTypeProduit = true;
  constructor(
    private produitProvider: ProduitProvider,
    private modalCtrl: ModalController, private menuCtrl: MenuController,
    private router : Router
  ) {
    if(localStorage.getItem('idemploye') != null){
      this.menuCtrl.enable(true);
    
     this.getAllProduits();
    }
    else{
      this.router.navigate(['/login']);
      this.menuCtrl.enable(false);
    }
    
  }

  ngOnInit() {
    this.menuCtrl.enable(true);
  }

  onWillDismiss() {
    this.allProduits = [];
    this.getAllProduits();
    this.menuCtrl.enable(true);
  }

  ionViewWillEnter() {
    this.allProduits = [];
    this.getAllProduits();
    this.menuCtrl.enable(true);
  }

  getAllProduits() {
    this.produitProvider.getAllProduits().subscribe(
      res => {
        if (res == false) {
          console.log("Aucun produit disponible");
        } else {
          this.allProduits = res;
          this.allProduitsFinale = res;
          this.test();
          //  console.log("allproduits :"+  JSON.stringify(this.allProduits) );
        }
      } //res
    )//subscribe
  }//getallproduits()





  //Modal pour la visualisation en détail du produit sélectionné : 
  // async goDetail(produit : Produit){
  async goDetail(produit) {

    const modal = await this.modalCtrl.create({
      component: DetailsproduitPage,
      componentProps: { produit: produit }
    });
    return await modal.present();
  }
  onSearchTerm(ev: CustomEvent) {
    const val = ev.detail.value;
   this.allProduitFinale = this.allProduitFinaleArchive;
    if (val && val.trim() !== '') {
      this.allProduitFinale = this.allProduitFinale.filter(term => {
        return term.nomproduit.toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
      });
    }
  }
  onSearchTermTest(ev: CustomEvent) {
    const val = ev.detail.value;

    this.allProduits = this.allProduitsFinale;
 
    //let tab = this.allProduits[i]['listetypesproduits'][j]['listeproduits'];
    //  console.log("tab de search :" + tab);
    if (val && val.trim() !== '') {
      //alert("this.allProduits.length :" + this.allProduits.length);
      //alert("this.allProduitsFinale.length :" + this.allProduitsFinale.length);
      /*this.allProduits[i]['listetypesproduits'][j]['listeproduits'] = this.allProduits[i]['listetypesproduits'][j]['listeproduits'].filter(term => {
        return term.nomproduit.toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
      });*/



    this.allProduits.forEach(categorie => {
      return  categorie.listetypesproduits =categorie.listetypesproduits.forEach(typeproduit => {
       return   typeproduit.listeproduits = typeproduit.listeproduits.filter(term => {
            return term.nomproduit.toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
          });

        });
      });
    /*******************alloooo 
      this.allProduits =  this.allProduits.filter(categorie => {

          return  categorie.listetypesproduits.filter(typeproduit => {
         
         // alert("dedans listeproduits.length :" + typeproduit.listeproduits.length);
       return  typeproduit.listeproduits.filter(term => {
           
          return   (term.nomproduit.toLowerCase().indexOf(val.trim().toLowerCase()) > -1 
                   //  &&  categorie.listetypesproduits.length>0 
                    //  && typeproduit.listeproduits.length>0
                     );
             })
          

        }

        )
      });*/


    
    }
  //  alert("Après this.allProduits.length :" + this.allProduits.length);
  //  alert("Après this.allProduitsFinale.length :" + this.allProduitsFinale.length);
  }
  onSearchTermEmail(ev: CustomEvent) {
    const val = ev.detail.value;
   this.allProduits = this.allProduitsFinale;
    if (val && val.trim() !== '') {
      this.allProduits = this.allProduits.filter(term => {
        return term.emailclient.toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
      });
    }
  }

/********test lister produits */

changeCategorieProduit(index: number) {
  this.selectedCategorieIdx = index;
  this.allTypeProduits = this.allProduits[index].listetypesproduits;
  console.log(" this.allTypeProduits:", this.allTypeProduits);

  if (this.allProduits[index].listetypesproduits.length == 1) {
    this.showTypeProduit = true;
    this.changeTypeProduit(0);
  }
  else { this.showTypeProduit = false; }

}
changeTypeProduit(index: number) {
  this.selectedTypeProduitIdx = index;
console.log("this.allTypeProduits[index] :",this.allTypeProduits[index]);
  if(this.allTypeProduits[index].idtypeproduit==27){    
      for(let i=0; i<  this.allTypeProduits[index].listeproduits.length;i++){
        if(this.allTypeProduits[index].listeproduits[i].ComposantsOffres.length==0){
          this.allTypeProduits[index].listeproduits.splice(i,1);
                  }    
    }

  }
  this.allProduitFinale = this.allTypeProduits[index].listeproduits;
  this.allProduitFinaleArchive= this.allTypeProduits[index].listeproduits;
  console.log("this.allProduitFinale :", this.allProduitFinale);
  //this.showTypeProduit =true;
}
test() {
  console.log("test de menu :");
  for (let index = 0; index < this.allProduits.length; index++) {
    console.log(this.allProduits[index]);
    if (this.allProduits[index].nomcategorie == "pizzas") {
      //alert("pizzas index = " + index);

      this.selectedCategorieIdx = index;
      this.changeCategorieProduit(index);
      this.allTypeProduits = this.allProduits[index].listetypesproduits;
      for (let j = 0; j < this.allProduits[index].listetypesproduits.length; j++) {
        console.log("this.allProduits[index].listetypesproduits[j] :" + this.allProduits[index].listetypesproduits[j].idtypeproduit);
        if (this.allProduits[index].listetypesproduits[j].idtypeproduit == 1) {
          console.log("this.allProduits[index].listetypesproduits[j].idtypeproduit==1 :" + this.allProduits[index].listetypesproduits[j].idtypeproduit);
          console.log("j :" + j);
          this.changeTypeProduit(j);
        }
        
      }

    }


  }

}

}
