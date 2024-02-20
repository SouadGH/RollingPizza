import { Component } from '@angular/core';
import { ProduitProvider } from 'src/providers/produits_provider';
import { TypeProduit } from 'src/models/typeproduit_model';
import { Produit } from 'src/models/produit_model';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { CommandesClientProvider } from 'src/providers/commandesclient_provider';
import { panier } from 'src/app/app.component';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss']
})
export class MenuPage {

  segment = 'Pizza';

  //stocker tous les types de produits : 
  allTypeProduits : TypeProduit;
  allProduitFinale :Produit;

  allPizza: Produit;
  allPoulet : Produit;
  allSalades: Produit;
  allPainAil : Produit;
  allCafe : Produit;
  allPetitDejeuner: Produit;
  allSpiritueux : Produit;
  allRouge : Produit;
  allRoses: Produit;
  allBieres : Produit;
  allBoissons : Produit;
  allSauceExtras : Produit;
  allCombos : Produit;
  allAutres : Produit;
  allViennoiserie : Produit;
  allDesserts: Produit;
  //ajout souad
  allProduits : any[]=[];

  selectedCategorieIdx:any;
  selectedTypeProduitIdx :any;
  showTypeProduit=true;
  //
  idCom : any;
  idpartenaire : any;
  nompartenaire : any;
  hidePricePoduct = false;
  demandeur:any;
  idtypelivraison:any;
  idtypeproduit:any;

  constructor(
    private produitProvider : ProduitProvider,
    private router : Router,
    private route : ActivatedRoute,
    private storage : Storage,
    private commandesClientProvider :CommandesClientProvider
  ) {
  // alert(this.route.parent.toString());
    
    this.route.queryParams.subscribe(params => {    
      if(this.router.getCurrentNavigation().extras.state){
      //  alert("coucou menu partenaire");
        this.idCom = this.router.getCurrentNavigation().extras.state.idCom;
        this.idpartenaire =  this.router.getCurrentNavigation().extras.state.idpartenaire;
        this.nompartenaire =  this.router.getCurrentNavigation().extras.state.nompartenaire; 
        localStorage.setItem('idCom', this.router.getCurrentNavigation().extras.state.idCom);
        localStorage.setItem('idpartenaire',  this.router.getCurrentNavigation().extras.state.idpartenaire);
        localStorage.setItem('nompartenaire',  this.router.getCurrentNavigation().extras.state.nompartenaire);

        this.storage.set('idCom', this.router.getCurrentNavigation().extras.state.idCom);
        this.storage.set('idpartenaire', this.idpartenaire);
        this.storage.set('nompartenaire', this.nompartenaire);
         //cacher les prix des produits pour les partenaires
  
    }})
    ;
    //alert("partenaire est :" + localStorage.getItem('nompartenaire') );   
  // if( localStorage.getItem('idpartenaire')!=""){
    //demandeur est un partenaire
    this.idtypelivraison = panier.idtypelivraison;
      if( panier.demandeur ==1){
      panier.demandeur =1;
      this.demandeur= 1;
      this.hidePricePoduct = true;}
       //demandeur est un particulier
    else{
      panier.demandeur =0;
      this.demandeur= 0;
      this.hidePricePoduct = false;
    }
    //alert("idtypelivraison in type :"+panier.idtypelivraison);
   // alert("hidePricePoduct est :" + this.hidePricePoduct );
    console.log("panier in menu "+panier);
//ajout souad
this.getAllProduits();
//
  
  }

  ionViewWillEnter(){
    //ajout souad
    this.getAllProduits();

   
  }
  getAllProduits(){
    this.produitProvider.getAllProduits().subscribe(
      res => {
        if(res == false){
          console.log("Aucun produit disponible");
        }else{
          this.allProduits = res;
          console.log("allproduits :"+  this.allProduits );
          this.test();
        }
      } //res
    )//subscribe
  }//getallproduits()
 
  getAllTypeProduit(){
    this.produitProvider.getAllTypeProduits().subscribe(
      res => {
        if(res == false){
          console.log("Aucun type de produit dans votre pizzeria. Merci de contacter votre Helvitech Développeur.");
        }else{
          this.allTypeProduits = res;
          //console.log("*/*/*/*" , this.allTypeProduits);
        }
      }
    );
  }

 



 
 
 



  


  /**********************
   * Détail d'un produit 
   **********************/
  goDetail(produit: Produit){
    //this.router.navigate(['/detailproduit']);
    //alert("idtypeproduit "+this.allTypeProduits[this.selectedTypeProduitIdx].idtypeproduit);
    let navigationExtras : NavigationExtras = {
      state : {
        produit : produit,
        idtypeproduit : this.allTypeProduits[this.selectedTypeProduitIdx].idtypeproduit
      }
    };
    this.router.navigate(['detailproduit'], navigationExtras);
  }

  /*******Ajouter au panier */
  ajouterAuPanier(){
   
    panier.listeProduits.splice(0,1)
    console.log("Le panier est :", panier);
    let totalCommande  = 0.00;

    panier.listeProduits.forEach(produit=>{
      totalCommande +=  ((produit.prixproduit) +  (produit.prixtotalSupplement));

    });
    panier.totalcom = (totalCommande);
    this.commandesClientProvider.addPanier(panier).subscribe(
      res => {
        panier.listeProduits.splice(0,  panier.listeProduits.length)
        panier.totalcom=0.00;
        if(res == false){
          console.log("Aucun composant à pizza ");
        }else{
         // panier.listeProduits.splice(0,  panier.listeProduits.length)
        //  this.allComposants = res;
       //   console.log("Composants : ", this.allComposants);
        }
      }
    );
  }
  changeCategorieProduitt(index:number)
{
    this.selectedCategorieIdx=index;
    this.allTypeProduits = this.allProduits[index].listetypesproduits;
    console.log(" this.allTypeProduits:", this.allTypeProduits);
    this.showTypeProduit =false;
}
changeTypeProduitt(index:number)
{
    this.selectedTypeProduitIdx=index;
    this.allProduitFinale =  this.allTypeProduits[index].listeproduits;
    console.log("this.allProduitFinale :",this.allProduitFinale);
    this.idtypeproduit =this.allTypeProduits[index].idtypeproduit ;

   
    //this.showTypeProduit =true;

    //si typeproduit pizza afficher les prix selon livraison ou  a emporter
   /* if(this.allTypeProduits[index].idtypeproduit=='1'){
     // alert("sousou pizza");
      this.allTypeProduits[index].listeproduits.forEach(element => {
        if(panier.idtypelivraison==3){
         // alert("sousou pizza livraison");
         
           element.listeprix.forEach(pr => {
            //  alert("prrrrrrrrrr   "+pr.prix);
              if(pr.diametre=='25'){
               // alert("petite   "+pr.prix);
                element.prixproduit = pr.prix_livraison;
              }
            });
        }
        else{
        //  alert("sousou pizza emporter"+element.listeprix[0]);
          element.listeprix.forEach(pr => {
          //  alert("prrrrrrrrrr   "+pr.prix);
            if(pr.diametre=='25'){
          //    alert("petite   "+pr.prix);
              element.prixproduit = pr.prix;
            }
          });
         // element.prix = element.listeprix[0].prix;
        }
      });
    }*/
}
changeCategorieProduit(index: number) {
  this.selectedCategorieIdx = index;
  this.allTypeProduits = this.allProduits[index].listetypesproduits;
  console.log(" this.allTypeProduits:", this.allTypeProduits);
  if( this.allProduits[index].listetypesproduits.length==1){ this.showTypeProduit = true; 
    this.changeTypeProduit(0);
  }
  else{this.showTypeProduit = false;}
 
}

changeTypeProduit(index: number) {
  this.selectedTypeProduitIdx = index;
  this.allProduitFinale = this.allTypeProduits[index].listeproduits;
  console.log("this.allProduitFinale :", this.allProduitFinale);
  //this.showTypeProduit =true;
}

test(){
  for (let index = 0; index < this.allProduits.length; index++) {
    if(this.allProduits[index].nomcategorie =="pizzas"){
      //alert ("pizzas index = "+index);  

    this.selectedCategorieIdx=index;
    this.changeCategorieProduit(index);
    for (let j = 0; j < this.allProduits[index].listetypesproduits.length; j++) {
      if( this.allProduits[index].listetypesproduits[j].idtypeproduit==1){
      this.changeTypeProduit(j);}
    }
    
  }
   

}

}
}
