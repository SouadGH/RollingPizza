import { Component, OnInit, DebugElement } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComposantPizza } from 'src/models/composantpizza_model';
import { ComposantPizzaProvider } from 'src/providers/composantpizza_provider';
import { panier } from 'src/app/app.component';
import { Storage } from '@ionic/storage';
import { ProduitProvider } from 'src/providers/produits_provider';
import { AlertController, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { MiscService } from 'src/app/services/misc.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { debug } from 'console';
//import { parseJSON } from 'jquery';
import { pseudoRandomBytes } from 'crypto';
import { LIEN_PATH_FILES } from 'src/providers/config_bdd';


//import { ImagePicker,ImagePickerOptions } from '@ionic-native/image-picker/ngx';
//import { File } from '@ionic-native/file/ngx';
//import { threadId } from 'worker_threads';
@Component({
  selector: 'app-detailproduit',
  templateUrl: './detailproduit.page.html',
  styleUrls: ['./detailproduit.page.scss'],
})
export class DetailproduitPage implements OnInit {
  path = LIEN_PATH_FILES;
  public chosenIngredients: any = [];
  public chosenCombosPizza: any = [];
  public chosenCombosPizzaPrice: any = [];
  public chosenCombosPizzaPricePromo: any = [];
  public chosenCombosEntree: any = [];
  public chosenCombosBoissons: any = [];
  public chosenIngredientsSalades: any = [];
  public chosenSauces: any = [];
  public prixTotalItem: number;

  dataProduit: any;
  quantite = 1;
  idtypeproduit: number;
  nomproduit = "P";

  //allComposants: ComposantPizza[];
  allComposants: any[] = [];
  PrixGarnituresSupplementaire: any[] = [];

  check = false;
  pizzataille = '0';
  pizzapate: any = [];
  pizzasauce: any = [];
  index = '0';
  demandeur: any;
  hidePricePoduct = false;

  idtypelivraison: any;
  cartItemCount: number;// BehaviorSubject<number>;
  images: any = ["../../../assets/img/margherita.jpg", "../../../assets/img/margherita.jpg", "../../../assets/img/margherita.jpg", "../../../assets/img/margherita.jpg"];
  imagess: any = [];
  allPizza: any = [];
  allBoissonsSansAlcool: any = [];

  selectedCombosPizzas: any = [];
  selectedCombosBoissons: any = [];

  // PSE
  currentPizzaTailles: any = [
    { id: 0, name: "25 cm" },
    { id: 1, name: "33 cm" },
    { id: 2, name: "40 cm" }];
  selectedPizzaTailles: any = [];
  selectedPizzaTaille: any = ["25 cm", "33 cm", "40 cm"];

  chosenCombosPizzaPrices: any = [];
  // listProduits: any = [];
  // selectedProduits: any = [];
  ingredient: any ;
  // PSE

  chosenCombosPizzaTaille: any = [];
  

  valuePromos: any;

  promoFound = 0;
  defaultSize = "25 cm";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private composantProvider: ComposantPizzaProvider,
    private produitProvider: ProduitProvider,
    private storage: Storage,
    public toastCtrl: ToastController,
    // public imagePicker: ImagePicker,
    //public file :File
  ) {

    this.AmountProduct();
    this.idtypelivraison = panier.idtypelivraison;

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.dataProduit = this.router.getCurrentNavigation().extras.state.produit;
        console.log("dataProduit ", this.dataProduit);
        // this.idtypeproduit =  this.dataProduit.idtypeproduit;
        this.idtypeproduit = this.router.getCurrentNavigation().extras.state.idtypeproduit;

        // PSE
        //console.log("this.dataProduit.ComposantsOffres[0].nbreproduitbase: ", this.dataProduit.ComposantsOffres[0].nbreproduitbase);
        // this.initializeTaillePizzaOffre(this.dataProduit.composantsproduit.length);
        // this.initializeTaillePizzaOffre(2);
        if (this.idtypeproduit == 27) {
         
      
        this.initializeTaillePizzaOffre(Number(this.dataProduit.ComposantsOffres[0].nbreproduitbase) +
          Number(this.dataProduit.ComposantsOffres[0].nbreproduitoffert));  
        }
        // PSE
      }
      //console.log("INSIDE ROUTE QUERY : ID TYPE PRODUIT : " , this.idtypeproduit);

      this.getIdTypeProduitFromMenuPage(this.idtypeproduit);
      if (this.idtypeproduit == 1) {
        this.onChangeTaillePizza();
      }
      this.updateItemPrice();

      // console.log(">>>>>> ", this.dataProduit);
      // panier.idtypelivraison=3;
      /*  if(this.idtypeproduit ==1){
          this.getAllPrixTaillePizzaLivraison(this.dataProduit.idproduit);
          //pizza surplace ou à emporter
        /*  if(panier.idtypelivraison !=3){
          //  alert("panier sur place/à emporter");
          this.getAllPrixTaillePizza();}
          //pizza à livrer
          else{
           
          this.getAllPrixTaillePizzaLivraison(this.dataProduit.idproduit);
        
          }
        }*/
    });
    //console.log("ID TYPE PRODUIT : " , this.idtypeproduit);
    this.getPrixGarnituresSupplementaire();
    this.getAllComposantsPizza();
    // this.triIngredients();


    //si pizza afficher lesprix selon le type de livraison et taille
    /* if( panier.demandeur ==1){
       panier.demandeur =1;
       this.demandeur= 1;
       this.hidePricePoduct = true;}
        //demandeur est un particulier
     else{
       panier.demandeur =0;
       this.demandeur= 0;
       this.hidePricePoduct = false;
     }*/
    this.getAllTypePizza();
    this.getAllBoissonsSansAlcool();

    // show total price
    // this.updateItemPrice();

    // Supprimer supplément inutile en entête...
    // PSE
    this.removeEmptyHeadingSupplements();
    // PSE
    //  this.showPrixBase();
      //si pizza afficher lesprix selon le type de livraison et taille
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
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  stringSequence(n: number): Array<String> {
    var choices = [];
    for (let i = 0; i < n; i++) {
      choices.push("Choix " + (i + 1));
    }
    return choices;
  }

  stringSequenceOffre(n: number, m: number): Array<String> {
    var choices = [];
    let somme = Number(n) + Number(m);
    for (let i = 0; i < somme; i++) {
      choices.push("Choix " + (i + 1));
    }
    return choices;
  }

  removeEmptyHeadingSupplements() {

    if(panier.listeProduits.length <1){return;}
    if ((panier.listeProduits[0].listeSupplements.length == 1) && (panier.listeProduits[0].listeSupplements[0].nomcomposant == '')) {
      panier.listeProduits[0].listeSupplements.splice(0);
    }
    else {
      if ((panier.listeProduits[0].listeSupplements.length > 1) && (panier.listeProduits[0].listeSupplements[0].nomcomposant == '')) {
        panier.listeProduits[0].listeSupplements.splice(0, 1);
      }
    }
  }

  getAllTypePizza() {

    this.produitProvider.getTypePizzaProduits('1').subscribe(
      res => {
        if (res == false) {
          console.log("Aucun type de produit dans votre pizzeria. Merci de contacter votre Helvitech Développeur.");
        } else {
          this.allPizza = res;

          let tab: any;
          this.allPizza.forEach(element => {
            element.listetypesproduits.forEach(type => {
              tab = type.listeproduits;
            });

          });
          this.allPizza = tab;
          console.log("All  pizza", this.allPizza);

        }
      }
    );
  }

  getAllBoissonsSansAlcool() {

    this.produitProvider.getTypePizzaProduits('8').subscribe(
      res => {
        if (res == false) {
          console.log("Aucun type de produit dans votre pizzeria. Merci de contacter votre Helvitech Développeur.");
        } else {
          this.allBoissonsSansAlcool = res;
          let tab: any;
          this.allBoissonsSansAlcool.forEach(element => {
            element.listetypesproduits.forEach(type => {
              tab = type.listeproduits;
            });
          });
          this.allBoissonsSansAlcool = tab;
          // console.log("All  allBoissonsSansAlcool", this.allBoissonsSansAlcool);
        }
      }
    );
  }

  onSelectChangeChosenPizzaCombo(pizza: any, position?: number) {
    console.log("Selected pizza: ", pizza);

    if (this.chosenCombosPizza.length > this.dataProduit.composantsCombos[0].pizza[0].quantitee) {
      this.chosenCombosPizza.splice(this.dataProduit.composantsCombos[0].pizza[0].quantitee);
      // this.chosenCombosPizza = this.chosenCombosPizza[0, this.dataProduit.composantsCombos[0].pizza[0].quantitee-1];
      // alert("Vous avez droit à "+this.dataProduit.composantsCombos[0].pizza[0].quantitee+" pizza(s).");
    }
    else {
      if (position >= 0) {
        this.selectedCombosPizzas[position] = pizza;
      }
    }
  }

  onSelectChangeChosenBoissonCombo(boisson: any, position?: number) {
    console.log("Selected boisson: ", boisson);

    if (this.chosenCombosBoissons.length > this.dataProduit.composantsCombos[0].pizza[0].quantitee) {
      this.chosenCombosBoissons.splice(this.dataProduit.composantsCombos[0].pizza[0].quantitee);
      // this.chosenCombosPizza = this.chosenCombosPizza[0, this.dataProduit.composantsCombos[0].pizza[0].quantitee-1];
      // alert("Vous avez droit à "+this.dataProduit.composantsCombos[0].pizza[0].quantitee+" pizza(s).");
    }
    else {
      if (position >= 0) {
        this.selectedCombosBoissons[position] = boisson;
      //  console.log("this.chosenCombosBoissons: ", this.chosenCombosBoissons);
        // this.chosenCombosBoissons[position] = boisson;
      }
    }
  }

  onSelectChangeChosenPizza(pizza: any, position?: number) {
    //alert("this.dataProduit.composantsCombos[0].pizza[0].quantite :"+this.dataProduit.composantsCombos[0].pizza[0].quantitee+
    //"this.chosenCombosPizza.length :"+this.chosenCombosPizza.length);
    if (this.chosenCombosPizza.length > this.dataProduit.composantsCombos[0].pizza[0].quantitee) {
      this.chosenCombosPizza.splice(this.dataProduit.composantsCombos[0].pizza[0].quantitee);
      // this.chosenCombosPizza = this.chosenCombosPizza[0, this.dataProduit.composantsCombos[0].pizza[0].quantitee-1];
     // alert("Vous avez droit à " + this.dataProduit.composantsCombos[0].pizza[0].quantitee + " pizza(s).");
    }
    else {
      // PSE
      // add or replace a pizza
      if (position) {
        //console.log("ADDING or REPLACING a pizza ", pizza, " at ", position);
        this.chosenCombosPizza[position] = pizza;
      }
      // PSE
    }
    // console.log(this.chosenCombosPizza);
  }

  ngOnInit() {
    this.promoFound = 0;
    // this.selectedPizzaTailles[0] = this.currentPizzaTailles[0];
    // this.updateItemPrice();
    // this.test();
    // this.triIngredients();

  }

  /* PickMultipleImages(){
     var options :ImagePickerOptions={
       maximumImagesCount:5,
       height:100
     }
     this.imagePicker.getPictures(options).then((results)=>{
       for(var interval =0; interval<this.images.length; interval++)
       {
         let filename = this.images[interval].substring(results[interval].lastIndexOf('/')+1);
         let path = this.images[interval].substring(0,this.images[interval].lastIndexOf('/')+1);
         this.file.readAsDataURL(path,filename).then((base64string)=>{
           this.imagess.push(base64string);
         })
       }
     })
   }*/
  //somme de tous les produits damns le panier
  AmountProduct() {
    this.cartItemCount = 0;
    panier.listeProduits.forEach(element => {
      this.cartItemCount += element.quantiteproduit;
    });
  }

  getPrixGarnituresSupplementaire() {
    this.composantProvider.getPrixGarnituresSupplementaire().subscribe(
      //this.composantProvider.getAllComposantsPizza().subscribe(
      res => {
        if (res == false) {
         // console.log("Aucune garniture supplémentaire payante ");
        } else {
          this.PrixGarnituresSupplementaire = <[]>res;
         // console.log("getPrixGarnituresSupplementaire : ", this.PrixGarnituresSupplementaire);
          // alert("PrixGarnituresSupplementaire :" + this.PrixGarnituresSupplementaire.length);

        }
      }
    );
  }

  test() {
    this.dataProduit.composantsproduit.forEach(composant => {
      //alert("composant par défaut :" + composant);
      //alert("this.allComposants.find(composant):" + this.allComposants.find(composant));
      if (this.allComposants.find(composant)) {
        // alert("composant par défaut :" + composant);
      }
    });
  }

  onSelectChange(cp: ComposantPizza) {
    console.log("ebenvt :" + cp);
    this.updateItemPrice();
    //this.triIngredients();
  }

  triIngredients() {
    this.dataProduit.composantsproduit.forEach(element => {
      if (element.categoriecomposant == "sauces") {
        this.pizzasauce = element;
        //  this.onSelectChange(element);
        //this.chosenIngredients.push(element);
      }

    });
  }

  getIdTypeProduitFromMenuPage(id) {
    this.idtypeproduit = id;
    console.log("getId :>>> :>>> :>>> " + this.idtypeproduit);
  }
  /*
  getAllPrixTaillePizza(){

this.produitProvider.getAllPrixTaillePizza().subscribe(
  //this.composantProvider.getAllComposantsPizza().subscribe(
    res => {
      if(res == false){
        console.log("Aucun prix de pizza  ");
      }else{
        this.allPrixTaillePizza = res;
     
        console.log("taille -prix pizza  : ", this.allPrixTaillePizza);
      }
    }
  );
  }
  getAllPrixTaillePizzaLivraison(idproduit){
    this.produitProvider.getAllPrixTaillePizzaLivraison(idproduit).subscribe(
      //this.composantProvider.getAllComposantsPizza().subscribe(
        res => {
          if(res == false){
            console.log("Aucun prix de pizza  ");
          }else{
            this.allPrixTaillePizza =res;
           // this.dataProduit.prixproduit=this.allPrixTaillePizza[0].prix;
            console.log("taille -prix pizza livraison : ", this.allPrixTaillePizza);
            alert("sousousou  :"+this.allPrixTaillePizza[0].prix_sur_place);
          }
        }
      );
  }*/
  onChangeTaillePizza() {
    this.dataProduit.prixproduit = this.dataProduit.listeprix[this.pizzataille].prixproduit;
    //alert()
    this.changePrixTaille(this.pizzataille);
    //alert(`taille symbole :${(this.allPrixTaillePizza[this.pizzataille].taille).susbstring(0, 1)}`);
    //alert("taille symbole :"+((this.allPrixTaillePizza[this.pizzataille].taille).substring(0,1)).toUpperCase()    );
    this.index = this.pizzataille;
    if (panier.idtypelivraison == 1) {
      this.dataProduit.prixproduit = this.dataProduit.listeprix[this.index].prix_sur_place;
    }
    else if (panier.idtypelivraison == 2) {
      this.dataProduit.prixproduit = this.dataProduit.listeprix[this.index].prix_a_emporter;
    }
    else {
      this.dataProduit.prixproduit = this.dataProduit.listeprix[this.index].prix_livraison;
    }
    this.updateItemPrice();
  }

  onChangePizzaOffre(k,event) {
    console.log ("event :",event);
    /* console.log ("SELECTED this.chosenCombosPizza[k]: ", this.chosenCombosPizza[k]);
     alert("*********this.currentPizzaTailles[0].id ***********"+this.currentPizzaTailles[0].id);
     alert("********* Number(this.currentPizzaTailles[0].id) ***********"+ Number(this.currentPizzaTailles[0].id));
     */
    let somme = Number(this.dataProduit.ComposantsOffres[0].nbreproduitbase) + Number(this.dataProduit.ComposantsOffres[0].nbreproduitoffert);


    let i = Number(this.selectedPizzaTailles[k].id);
    /*
    this.allPizza.forEach(element => {
      if(element.idproduit==event.value.idproduit){
        this.chosenCombosPizza[k]=element;
        alert("Pizza trouvé choix pizza!!!!!");
              }
    });
    */
  // alert("nomproduit :" + this.chosenCombosPizza[k].nomproduit + " Avant this.chosenCombosPizza[k].prixproduit:" + this.chosenCombosPizza[k].prixproduit);
 
    // alert("i:" + i);
    //i=Number(i);
    // alert("this.chosenCombosPizzaTaille[k] :"+this.chosenCombosPizzaTaille[k] );
    // alert("this.chosenCombosPizza[k].listeprix:"+JSON.stringify(this.chosenCombosPizza[k].listeprix[i]));
    // alert("this.chosenCombosPizza[k].listeprix[i].prix_livraison:"+this.chosenCombosPizza[k].listeprix[i].prix_livraison);
    // alert("*********i ***********"+i);
    // alert("nomproduit :" + this.chosenCombosPizza[k].nomproduit + " avant this.chosenCombosPizza[k].prixproduit:" + this.chosenCombosPizza[k].prixproduit);

    // PSE
    this.chosenCombosPizza[k].prixproduit = this.chosenCombosPizza[k].listeprix[i].prix_livraison;
    this.chosenCombosPizzaPrices[k] = this.chosenCombosPizza[k].listeprix[i].prix_livraison;
    // PSE

    // alert("nomproduit :" + this.chosenCombosPizza[k].nomproduit + " après this.chosenCombosPizza[k].prixproduit:" + this.chosenCombosPizza[k].prixproduit);

    // alert("Après this.chosenCombosPizza[k].prixproduit:"+this.chosenCombosPizza[k].prixproduit);
    this.chosenCombosPizzaPrice[k] = this.chosenCombosPizza[k].prixproduit;
    this.chosenCombosPizzaPricePromo[k] = false;
    this.chosenCombosPizzaPricePromo.forEach(element => {
      element = false;
    });
    // alert("******************************");
    // alert("chosenCombosPizzaPricePromo PizzaOffre: " +JSON.stringify(this.chosenCombosPizzaPricePromo));
    // alert("this.chosenCombosPizza PizzaOffre: " +JSON.stringify(this.chosenCombosPizza));
    // alert("******************************");
    if (this.chosenCombosPizza.length == somme) {
      this.updateItemOffresPanier();
    }
  }

  onChangeTaillePizzaOffre(k) {
    let somme = Number(this.dataProduit.ComposantsOffres[0].nbreproduitbase) + Number(this.dataProduit.ComposantsOffres[0].nbreproduitoffert);
    // let i = Number(this.chosenCombosPizzaTaille[k]);
    let i = Number(this.selectedPizzaTailles[k].id);
    // alert("i:"+i);
    //i=Number(i);
    //  alert("this.chosenCombosPizzaTaille[k] :"+this.chosenCombosPizzaTaille[k] );
    // alert("Avant this.chosenCombosPizza[k].prixproduit:"+this.chosenCombosPizza[k].prixproduit);
    // alert("this.chosenCombosPizza[k].listeprix:"+JSON.stringify(this.chosenCombosPizza[k].listeprix[i]));
    // alert("this.chosenCombosPizza[k].listeprix[i].prix_livraison:"+this.chosenCombosPizza[k].listeprix[i].prix_livraison);
    /*
    this.allPizza.forEach(element => {
      if(element.idproduit==this.chosenCombosPizza[k].idproduit ){
        this.chosenCombosPizza[k]=element;
        alert("Pizza trouvé taille !!!!!");
              }
    });
    */
    // PSE
    this.chosenCombosPizza[k].prixproduit = this.chosenCombosPizza[k].listeprix[i].prix_livraison;
    this.chosenCombosPizzaPrices[k] = this.chosenCombosPizza[k].listeprix[i].prix_livraison;
     // PSE
    
    // alert("Après this.chosenCombosPizza[k].prixproduit:"+this.chosenCombosPizza[k].prixproduit);
    this.chosenCombosPizzaPrice[k] = this.chosenCombosPizza[k].prixproduit;
    this.chosenCombosPizzaPricePromo[k] = false;
    this.chosenCombosPizzaPricePromo.forEach(element => {
      element = false;
    });
    // alert("******************************");
    // alert("chosenCombosPizzaPricePromo TaillePizzaOffre: " +JSON.stringify(this.chosenCombosPizzaPricePromo));
    // alert("this.chosenCombosPizzaPrice TaillePizzaOffre: " +JSON.stringify(this.chosenCombosPizzaPrice));
    // alert("******************************");
    //prixTotalItem
    if (this.chosenCombosPizza.length == somme) {
      this.updateItemOffresPanier();
    }
    //alert()
    //this.changePrixTaille(this.pizzataille);
    //alert(`taille symbole :${(this.allPrixTaillePizza[this.pizzataille].taille).susbstring(0, 1)}`);
    //alert("taille symbole :"+((this.allPrixTaillePizza[this.pizzataille].taille).substring(0,1)).toUpperCase()    );
    //this.index = this.pizzataille;

  }

  onChangePatePizza(pizzapate) {
    /*
      this.pizzapate=pizzapate;
      alert(pizzapate.nomcomposant);*/
    this.updateItemPrice();
  }

  onChangeSaucePizza(pizzasauce) {
    /*
     this.pizzasauce=  pizzasauce;
     alert(this.pizzasauce);*/
    this.updateItemPrice();
  }

  getAllComposantsPizza() {
    this.composantProvider.getAllComposants().subscribe(
      //this.composantProvider.getAllComposantsPizza().subscribe(
      res => {
        if (res == false) {
          console.log("Aucun composant à pizza ");
        } else {
          this.allComposants = <[]>res;
          console.log("Composants : ", this.allComposants);
          if (this.idtypeproduit == 1) {
            this.changePrixTaille(0);
          }
          if (this.idtypeproduit == 2) {
            this.allComposants.forEach(element => {
              //alert("Début prix :"+  element.listeIngredients);
              if (element.categoriecomposant == "salad") {
                let prix: any;
                this.PrixGarnituresSupplementaire.forEach(prixGaR => {
                  if (prixGaR.taille == "salad") {
                    prix = prixGaR.prix;
                  }
                });
                element.listeIngredients.forEach(cp => {
                  cp.prixcomposant = prix;
                });
              }
            });
          }

          //    this.triIngredients();

        }
      }
    );
  }

  changePrixTaille(index) {

    this.allComposants.forEach(element => {
      //alert("Début prix :"+  element.listeIngredients);
      if (element.categoriecomposant == "garnitures") {
        let t = (this.dataProduit.listeprix[index].taille);// ((this.dataProduit.listeprix[index].taille).substring(0, 1)).toUpperCase();
        let prix: any;
        this.PrixGarnituresSupplementaire.forEach(prixGaR => {
          // if (((prixGaR.taille).substring(0, 1)).toUpperCase() == t) {
          if (prixGaR.taille == t) {
            prix = prixGaR.prix;
          }
        });
        element.listeIngredients.forEach(cp => {
          cp.prixcomposant = prix;
        });
      }
    });

  }

  private tab = [];

  checkboxaaaa(nomcomposant, ischecked) {
    // console.log("Checkbox value : composant : " + nomcomposant + " boolean : " +  ischecked);
    console.log("-------------------------------");
    if (ischecked == true) {
      this.tab.push(nomcomposant, ischecked);
    }

    if (ischecked == false) {
      this.tab.push(nomcomposant, ischecked);
    }

    for (let i = 0; i < this.tab.length; i++) {
      const element = this.tab[i];
      //console.log("Tableau >> element : " , this.tab[i]);  
      console.log("Tableau >> tab[].value : ", element);
      console.log("-------------------------------------------");
      // console.log("Tableau >>>>>>> ischecked ? : " + this.tab[i].ischecked);  

    }

  }

  checkbox(nomcomposant, prixcomposant, ischecked, index) {
    // console.log("Checkbox value : composant : " + nomcomposant + " boolean : " +  ischecked);
    console.log("-------------------------------");
    if (ischecked == true) {
      this.tab.push({ nomcomposant: nomcomposant, prixcomposant: prixcomposant });
    }

    if (ischecked == false) {
      this.tab.splice(index, 1);
      //push({nomcomposant:nomcomposant,prixcomposant:prixcomposant});
    }

    for (let i = 0; i < this.tab.length; i++) {
      const element = this.tab[i];
      //console.log("Tableau >> element : " , this.tab[i]);  
      console.log("Tableau >> tab[].value : ", element);
      console.log("-------------------------------------------");
      // console.log("Tableau >>>>>>> ischecked ? : " + this.tab[i].ischecked);  

    }


  }

  private listeARetirer = [];

  checkboxAretirer(idcomposant, nomcomposant, categoriecomposant, prixcomposant, ischecked, index) {
    // console.log("Checkbox value : composant : " + nomcomposant + " boolean : " +  ischecked);
    console.log("-------------------------------");
    if (ischecked == true) {
      this.listeARetirer.push({ idcomposant: idcomposant, nomcomposant: nomcomposant, categoriecomposant: categoriecomposant, prixcomposant: prixcomposant });
    }

    if (ischecked == false) {
      this.listeARetirer.splice(index, 1);
      //push({nomcomposant:nomcomposant,prixcomposant:prixcomposant});
    }

    for (let i = 0; i < this.listeARetirer.length; i++) {
      const element = this.listeARetirer[i];
      //console.log("Tableau >> element : " , this.tab[i]);  
      console.log("this.listeARetirer[i] ", element);

      // console.log("Tableau >>>>>>> ischecked ? : " + this.tab[i].ischecked);  

    }
    console.log("liste a retirer :" + this.listeARetirer);
    console.log("-------------------------------");
  }

  ajouterAuPanier() {

    if (this.quantite < 1 || this.quantite > 20) {
      // alert("Quantité saisie incorecte, merci de saisir à nouveau.");
      this.quantite = 1;
    } else {
      if (this.idtypeproduit == 26) {
        this.ajoutCombosPanier();
        console.log("chosen pizza ." + this.chosenCombosPizza.length);
        this.chosenCombosPizza.forEach(element => {
          console.log("element pizza ." + element.nomproduit);
        });

      }
      else if (this.idtypeproduit == 27) {
        this.ajoutOffresPanier();
        console.log("chosen pizza ." + this.chosenCombosPizza.length);
        this.chosenCombosPizza.forEach(element => {
          console.log("element pizza ." + element.nomproduit);
        });

      }
      else {

        let Supplement: {
          nomcomposant: String,
          prixcomposant: Number
        };
        let tableauSupplements: [
          {
            nomcomposant: '',
            prixcomposant: ''
          }
        ];
        /*alert("this.pizzapate :"+ JSON.stringify(this.pizzapate));
        alert("this.pizzasauce :"+JSON.stringify(this.pizzasauce));
        alert("this.chosenIngredients :"+ this.chosenIngredients);*/

        let sommeSupplements = 0.00;
        if (this.idtypeproduit == 1) {

          if (this.pizzapate != '') { this.chosenIngredients.push(this.pizzapate); }
          if (this.pizzasauce != '') { this.chosenIngredients.push(this.pizzasauce); }

          /*
          if (this.pizzapate != '') { 
            sommeSupplements += parseFloat(this.pizzapate.prixcomposant);
          }
          if (this.pizzasauce != '') { 
            sommeSupplements += parseFloat(this.pizzasauce.prixcomposant);
          }
          */

          this.chosenIngredients.forEach(element => {
            console.log("element is :", element);
            sommeSupplements += parseFloat(element.prixcomposant);
          });
        }

        if (this.idtypeproduit == 2) {
          console.log(this.chosenIngredientsSalades);
          this.chosenIngredientsSalades.forEach(element => {
            console.log("element is :", element);
            sommeSupplements += parseFloat(element.prixcomposant);
          });
          this.chosenIngredients = this.chosenIngredientsSalades;
        }


        let taille: any;
        //alert("idtypeproduit :"+this.idtypeproduit);
        if (this.idtypeproduit != 1) { taille = "" }
        else { //taille = ((this.dataProduit.listeprix[this.pizzataille].taille).substring(0, 1)).toUpperCase(); 
          taille = (this.dataProduit.listeprix[this.pizzataille].taille);
        }
        panier.listeProduits.push(
          {
            idproduit: this.dataProduit.idproduit,
            nomproduit: this.dataProduit.nomproduit,
            imageproduit :this.dataProduit.imageproduit,
            quantiteproduit: this.quantite,
            prixproduit: parseFloat(this.dataProduit.prixproduit),
            taille: taille,//((this.allPrixTaillePizza[this.pizzataille].taille).substring(0,1)).toUpperCase() ,
            prixtotalSupplement: sommeSupplements * this.quantite,
            listeSupplements: this.chosenIngredients,
            listeARetirer: this.listeARetirer,
            listeIngredients: [],
            listeOffre: []
          }

        );

        /*
        if (this.pizzapate != '') {
            alert (this.pizzapate.prixcomposant);
            alert (this.pizzapate.nomcomposant);
            panier.listeProduits[0].listeSupplements.push(this.pizzapate);
        }
        if (this.pizzasauce != '') {
            alert (this.pizzasauce.prixcomposant);
            alert (this.pizzasauce.nomcomposant);
            panier.listeProduits[0].listeSupplements.push(this.pizzasauce);
        }
        */

        console.log("panier.listeProduits[0].listeSupplements = ", panier.listeProduits[0].listeSupplements);
        console.log("panier.listeProduits[0] = ", panier.listeProduits[0]);
        console.log("panier = ", panier);


        panier.totalcom += (parseFloat(this.dataProduit.prixproduit) * this.quantite +
          (sommeSupplements * this.quantite));
        //  alert("hello panier is"+ panier.listeProduits.length);       
        // console.log("detail panier est detail produit :", panier);
        //0 = particulier ; 1= partenaire
        /* if(localStorage.getItem('idpartenaire') ==""){panier.demandeur=0;}
         else{panier.demandeur=1;}*/
        this.AmountProduct();

        this.toastConfirmAddPanier();

        this.reinitialiser();
      }
    }
  }

  private reinitialiser() {
    this.chosenIngredients = [];
    this.pizzapate = [];
    this.pizzasauce = [];
    this.chosenSauces = [];
    this.chosenIngredientsSalades = [];
    this.chosenCombosBoissons = [];
    this.chosenCombosEntree = [];
    this.chosenCombosPizza = [];
    this.quantite = 1;
    this.prixTotalItem = 0.0;
    this.uncheckBoxes();
    this.listeARetirer = [];
  }


  private uncheckBoxes() {
    // console.log ("this.dataProduit.composantsproduit = ", this.dataProduit.composantsproduit);
    for (let i = 0; i < this.dataProduit.composantsproduit.length; i++) {
      this.dataProduit.composantsproduit[i].isChecked = false;
    }
  }

  ajoutCombosPanier() {
    let Supplement: {
      nomcomposant: String,
      prixcomposant: Number
    };
    let tableauIngredientss: [
      {
        nomCombos: '',
        prixcomposant: ''
      }
    ];
    let tableauIngredients: any = [];
    /*alert("this.pizzapate :"+ JSON.stringify(this.pizzapate));
    alert("this.pizzasauce :"+JSON.stringify(this.pizzasauce));
    alert("this.chosenIngredients :"+ this.chosenIngredients);*/
    let sommeSupplements = 0.00;
    if (this.idtypeproduit == 1) {
      // if (this.pizzapate != '') { this.chosenIngredients.push(this.pizzapate); }
      // if (this.pizzasauce != '') { this.chosenIngredients.push(this.pizzasauce); }

      // PSE
      if (this.pizzapate != '') {
        sommeSupplements += parseFloat(this.pizzapate.prixcomposant);
      }
      if (this.pizzasauce != '') {
        sommeSupplements += parseFloat(this.pizzasauce.prixcomposant);
      }
      // PSE

      this.chosenIngredients.forEach(element => {
        /*   tableauIngredients.push({ idCombos:element.idcomposant,
             nomCombos:element.nomcomposant,
             prixCombos:0.00,
            quantiteCombos:1
           });*/

        console.log("element is :", element);
        sommeSupplements += parseFloat(element.prixcomposant);
      });
    }
    //rajoutPizza du combos
    this.chosenCombosPizza.forEach(element => {
      // console.log("element pizza ." + element.nomproduit);
      tableauIngredients.push({
        idCombos: element.idproduit,
        nomCombos: element.nomproduit,
        prixCombos: 0.00,
        quantiteCombos: this.dataProduit.composantsCombos[0].pizza[0].quantitee * this.quantite
      }
      );
    });
    /*
    //rajout entree combos
    tableauIngredients.push({
      idCombos: this.chosenCombosEntree.idproduitcombos,
      nomCombos: this.chosenCombosEntree.nomproduitcombos,
      prixCombos: 0.00,
      quantiteCombos: this.dataProduit.composantsCombos[0].entree[0].quantitee * this.quantite
    }
    );
    //rajout boissons combos
    tableauIngredients.push({
      idCombos: this.chosenCombosBoissons.idproduit,
      nomCombos: this.chosenCombosBoissons.nomproduit,
      prixCombos: 0.00,
      quantiteCombos: this.dataProduit.composantsCombos[0].boissons[0].quantitee * this.quantite
    }
    ); */

    this.chosenCombosEntree.forEach(element => {
      console.log("element entree ." + element.nomproduit);
      tableauIngredients.push({
        idCombos: element.idproduitcombos,
        nomCombos: element.nomproduitcombos,
        prixCombos: 0.00,
        quantiteCombos: this.dataProduit.composantsCombos[0].entree[0].quantitee * this.quantite
      }
      );
    });
    this.chosenCombosBoissons.forEach(element => {
      console.log("element boisson ." + element.nomproduit);
      tableauIngredients.push({
        idCombos: element.idproduit,
        nomCombos: element.nomproduit,
        prixCombos: 0.00,
        quantiteCombos: this.dataProduit.composantsCombos[0].boissons[0].quantitee * this.quantite
      }
      );
    });



    if (this.idtypeproduit == 2) {
      console.log(this.chosenIngredientsSalades);
      this.chosenIngredientsSalades.forEach(element => {
        console.log("element is :", element);
        sommeSupplements += parseFloat(element.prixcomposant);
      });
      this.chosenIngredients = this.chosenIngredientsSalades;
    }



    let taille: any;
    //alert("idtypeproduit :"+this.idtypeproduit);
    if (this.idtypeproduit != 1) { taille = "" }
    else { //taille = ((this.dataProduit.listeprix[this.pizzataille].taille).substring(0, 1)).toUpperCase(); 
      taille = (this.dataProduit.listeprix[this.pizzataille].taille);
    }


    panier.listeProduits.push(
      {
        idproduit: this.dataProduit.idproduit,
        nomproduit: this.dataProduit.nomproduit,
        imageproduit:this.dataProduit.imageproduit,
        /* idCombos:this.dataProduit.idproduit,
         nomCombos:this.dataProduit.nomproduit,
         prixCombos:this.dataProduit.prixproduit,
         quantiteCombos:this.quantite,*/
        quantiteproduit: this.quantite,// this.dataProduit.composantsCombos[0].pizza[0].quantitee * this.quantite,
        prixproduit: parseFloat(this.dataProduit.prixproduit),
        // taille: this.dataProduit.composantsCombos[0].pizza[0].taille,//((this.allPrixTaillePizza[this.pizzataille].taille).substring(0,1)).toUpperCase() ,
        taille: '',
        prixtotalSupplement: sommeSupplements * this.quantite,
        listeSupplements: this.chosenIngredients,
        listeARetirer: this.listeARetirer,
        listeIngredients: tableauIngredients,
        listeOffre: []

      }

    );
    /*
    
    panier.listeProduits.push(
      {
        idproduit: this.chosenCombosEntree.idproduitcombos,
        nomproduit: this.chosenCombosEntree.nomproduitcombos,
        idCombos:this.dataProduit.idproduit,
        nomCombos:this.dataProduit.nomproduit,
        prixCombos:this.dataProduit.prixproduit,
        quantiteCombos:this.quantite,
        quantiteproduit: this.dataProduit.composantsCombos[0].entree[0].quantitee* this.quantite,
        prixproduit:  parseFloat("0.00") ,
        taille: taille,//((this.allPrixTaillePizza[this.pizzataille].taille).substring(0,1)).toUpperCase() ,
        prixtotalSupplement: sommeSupplements * this.quantite,
        listeSupplements: this.chosenIngredients,
        listeARetirer: this.listeARetirer
    
      }
    
    );
    panier.listeProduits.push(
      {
        idproduit: this.chosenCombosBoissons.idproduit,
        nomproduit: this.chosenCombosBoissons.nomproduit,
        idCombos:this.dataProduit.idproduit,
        nomCombos:this.dataProduit.nomproduit,
        prixCombos:this.dataProduit.prixproduit,
        quantiteCombos:this.quantite,
        quantiteproduit: this.dataProduit.composantsCombos[0].boissons[0].quantitee* this.quantite,
        prixproduit:  parseFloat("0.00") ,
        taille: taille,//((this.allPrixTaillePizza[this.pizzataille].taille).substring(0,1)).toUpperCase() ,
        prixtotalSupplement: sommeSupplements * this.quantite,
        listeSupplements: this.chosenIngredients,
        listeARetirer: this.listeARetirer
    
      }
    
    );*/


    panier.totalcom += (parseFloat(this.dataProduit.prixproduit) * this.quantite +
      (sommeSupplements * this.quantite));
    //  alert("hello panier is"+ panier.listeProduits.length);       
    console.log("detail panier est detail produit :", panier);
    //0 = particulier ; 1= partenaire
    /* if(localStorage.getItem('idpartenaire') ==""){panier.demandeur=0;}
     else{panier.demandeur=1;}*/
    this.AmountProduct();

    this.toastConfirmAddPanier();

  }
  ajoutOffresPanier() {

    let tableauIngredients: any = [];
    /*alert("this.pizzapate :"+ JSON.stringify(this.pizzapate));
    alert("this.pizzasauce :"+JSON.stringify(this.pizzasauce));
    alert("this.chosenIngredients :"+ this.chosenIngredients);*/
    let sommeSupplements = 0.00;
    if (this.idtypeproduit == 1) {
      // if (this.pizzapate != '') { this.chosenIngredients.push(this.pizzapate); }
      // if (this.pizzasauce != '') { this.chosenIngredients.push(this.pizzasauce); }

      // PSE
      if (this.pizzapate != '') {
        sommeSupplements += parseFloat(this.pizzapate.prixcomposant);
      }
      if (this.pizzasauce != '') {
        sommeSupplements += parseFloat(this.pizzasauce.prixcomposant);
      }
      // PSE

      this.chosenIngredients.forEach(element => {
        /*   tableauIngredients.push({ idCombos:element.idcomposant,
             nomCombos:element.nomcomposant,
             prixCombos:0.00,
            quantiteCombos:1
           });*/

        console.log("element is :", element);
        sommeSupplements += parseFloat(element.prixcomposant);
      });
    }
    //rajoutPizza du combos


    //console.log("parseJSON(this.chosenCombosPizza): " + JSON.stringify(this.chosenCombosPizza));
    let sommeProduitsOffre = 0.00;
    let cmp = 0;
    console.log("this.selectedPizzaTailles: " + JSON.stringify(this.selectedPizzaTailles));
    this.chosenCombosPizza.forEach(element => {
   //   element.prixproduit = MiscService.roundTwoDecimals(element.prixproduit);
      element.prixproduit = Number(element.prixproduit).toFixed(2);
      let i = Number(this.selectedPizzaTailles[cmp].id);
      //alert("taille pizza de :"+cmp+" est "+Number(this.selectedPizzaTailles[cmp]));
      //alert("element :"+element.prixproduit);
      // console.log("element pizza ." + element.nomproduit);
      tableauIngredients.push({
        // idCombos: element.idproduit,
        // nomCombos: element.nomproduit,
        //prixCombos: (element.prixproduit),
        //quantiteCombos: 1//this.dataProduit.composantsCombos[0].pizza[0].quantitee * this.quantite

        idproduitOffre: element.idproduit,
        nomproduitOffre: element.nomproduit,
        taille: element.listeprix[i].taille,
        prixproduitOffre:  element.prixproduit,
        quantiteOffre: 1
      }
      );
      cmp++;
    });
    //trouver la moins chère
    let index = 0;
    for (let i = 0; i < tableauIngredients.length; i++) {
      //  alert("prix pizza :"+Number(tableauIngredients[i].prixproduitOffre));
      if (Number(tableauIngredients[i].prixCombos) <= Number(tableauIngredients[index].prixproduitOffre)) {
        index = i;
      }
    }
    //calcule de la somme des pizza de l'offre
    for (let i = 0; i < tableauIngredients.length; i++) {
      if (i != index) {
        sommeProduitsOffre += Number(tableauIngredients[i].prixproduitOffre);
      }
      if (i == index) {
        tableauIngredients[i].prixproduitOffre = (Number(tableauIngredients[i].prixproduitOffre) * Number(this.dataProduit.ComposantsOffres[0].remise)) / 100;
        sommeProduitsOffre += Number(tableauIngredients[i].prixproduitOffre);
      }

    }
    // alert("La somme des pizzas est :"+sommeProduitsOffre);
    console.log("tableauIngredients :" + tableauIngredients);

    panier.listeProduits.push(
      {
        idproduit: this.dataProduit.idproduit,
        nomproduit: this.dataProduit.nomproduit,
        imageproduit:this.dataProduit.imageproduit,
        /* idCombos:this.dataProduit.idproduit,
         nomCombos:this.dataProduit.nomproduit,
         prixCombos:this.dataProduit.prixproduit,
         quantiteCombos:this.quantite,*/
        quantiteproduit: this.quantite,// this.dataProduit.composantsCombos[0].pizza[0].quantitee * this.quantite,
        prixproduit: (sommeProduitsOffre),
        // taille: this.dataProduit.composantsCombos[0].pizza[0].taille,//((this.allPrixTaillePizza[this.pizzataille].taille).substring(0,1)).toUpperCase() ,
        taille: '',
        prixtotalSupplement: sommeSupplements * this.quantite,
        listeSupplements: this.chosenIngredients,
        listeARetirer: this.listeARetirer,
        listeIngredients: [],
        listeOffre: tableauIngredients

      }

    );
    // this.dataProduit.prixproduit = sommeProduitsOffre;
    panier.totalcom += (sommeProduitsOffre * this.quantite +
      (sommeSupplements * this.quantite));
    //  alert("hello panier is"+ panier.listeProduits.length);       
    console.log("detail panier est detail produit :", panier);
    //0 = particulier ; 1= partenaire
    /* if(localStorage.getItem('idpartenaire') ==""){panier.demandeur=0;}
     else{panier.demandeur=1;}*/
    this.AmountProduct();

    this.toastConfirmAddPanier();

  }
  //fonction pour afficher un message lors d'un ajout de produit au panier
  async toastConfirmAddPanier() {
    const toast = await this.toastCtrl.create({
      header: 'Votre produit est ajouté au panier.',
      message: 'Continuez vos achats ou rendez-vous au panier pour passer commande.',
      position: 'middle',
      duration: 3000,
      animated: true,
      color: 'success'
    });
    toast.present();
  }

  //Icons pour ajouter ou supprimer la quantite de l'article
  addQuantite() {

    if (this.quantite == 20) {
      // alert("Quantité maximale atteinte, vous ne pouvez pas augmenter la quantité.");
    } else {
      this.quantite = this.quantite + 1;
      this.updateItemPrice();
    }

  }
  removeQuantite() {
    if (this.quantite == 1) {
      // alert("Quantité minimale atteinte, vous ne pouvez pas descendre en-dessous.");
    } else {
      this.quantite = this.quantite - 1;
      this.updateItemPrice();
    }

  }


  updateItemPrice() {

    /* if (this.idtypeproduit == 26) {
       // this.updateItemCombosPanier();
     }   
     else */
    if (this.idtypeproduit == 27) {
      this.updateItemOffresPanier();

    }
    else {

      let Supplement: {
        nomcomposant: String,
        prixcomposant: Number
      };
      let tableauSupplements: [
        {
          nomcomposant: '',
          prixcomposant: ''
        }
      ];

      var sommeSupplements = 0.00;
      if (this.idtypeproduit == 1) {

        if (this.pizzapate != '') {
          sommeSupplements += parseFloat(this.pizzapate.prixcomposant);
        }
        if (this.pizzasauce != '') {
          sommeSupplements += parseFloat(this.pizzasauce.prixcomposant);
        }

        this.chosenIngredients.forEach(element => {
          sommeSupplements += parseFloat(element.prixcomposant);
        });
      }
      else if (this.idtypeproduit == 2) {
        this.chosenIngredientsSalades.forEach(element => {
          sommeSupplements += parseFloat(element.prixcomposant);
        });
        // this.chosenIngredients = this.chosenIngredientsSalades;
      }
      this.dataProduit.prixproduit = MiscService.roundTwoDecimals(this.dataProduit.prixproduit);
      this.prixTotalItem = (parseFloat(this.dataProduit.prixproduit) + sommeSupplements) * this.quantite;
      this.prixTotalItem = MiscService.roundTwoDecimals(this.prixTotalItem);
    }

  }


  //css class definition : 
  garnituresOptions = {
    cssClass: 'backgroundoptions'
  }

  updateItemOffresPanier() {
    this.chosenCombosPizzaPricePromo.forEach(element => {
      element = false;
    });
    // alert("******************************");
    // alert("chosenCombosPizzaPricePromo PizzaOffre: " +JSON.stringify(this.chosenCombosPizzaPricePromo));
    // alert("this.chosenCombosPizzaPrice PizzaOffre: " +JSON.stringify(this.chosenCombosPizzaPrice));
    // alert("******************************");
    let sommeProduitsOffre = 0.00;
    let tableauIngredients: any = [];
    for(let i=0; i<this.chosenCombosPizza.length;i++){
    
      tableauIngredients.push({
        idCombos: this.chosenCombosPizza[i].idproduit,
        nomCombos: this.chosenCombosPizza[i].nomproduit,
        prixCombos: this.chosenCombosPizza[i].prixproduit,
        quantiteCombos: 1//this.dataProduit.composantsCombos[0].pizza[0].quantitee * this.quantite
      }
      );
    }
  /*  this.chosenCombosPizza.forEach(element => {
      //alert("element :"+element.prixproduit);
      // console.log("element pizza ." + element.nomproduit);
      tableauIngredients.push({
        idCombos: element.idproduit,
        nomCombos: element.nomproduit,
        prixCombos: (element.prixproduit),
        quantiteCombos: 1//this.dataProduit.composantsCombos[0].pizza[0].quantitee * this.quantite
      }
      );

    });*/
    //test trier 
    //alert("Avant trie this.chosenCombosPizzaPrice :" + this.chosenCombosPizzaPrice);
   // this.chosenCombosPizzaPrices.sort((a, b) => { return a - b; });
   // alert("Après trie this.chosenCombosPizzaPrice :" + this.chosenCombosPizzaPrice);

    //##################
    //trouver la moins chère
    /* let tableau =this.chosenCombosPizzaPrice;
     alert("this.chosenCombosPizzaPrice :"+this.chosenCombosPizzaPrice);
     alert("tableau :"+tableau);
     alert(" Avant tableau 0:"+tableau[0] +"tableau 1:"+tableau[1]);
     //  tableau.sort();
       alert("Après tableau 0:"+tableau[0] +"tableau 1:"+tableau[1]);*/
       console.log("########################chosenCombosPizza :"+JSON.stringify(this.chosenCombosPizza));
      // alert("tableauIngredients :"+JSON.stringify(tableauIngredients));
    let index = 0;
    for (let i = 1; i < tableauIngredients.length; i++) {
      //alert("prix pizza :"+Number(tableauIngredients[i].prixCombos));
     // alert( Number(tableauIngredients[i].prixCombos) + " VS " + Number(tableauIngredients[index].prixCombos));
      if (Number(tableauIngredients[i].prixCombos) < Number(tableauIngredients[index].prixCombos)) 
      {    
       // alert("Promo :" + Number(tableauIngredients[i].prixCombos) + "<" + Number(tableauIngredients[index].prixCombos));
        this.chosenCombosPizzaPricePromo[i] = true;
        this.chosenCombosPizzaPricePromo[index] = false;
      }
      else if (Number(tableauIngredients[i].prixCombos) > Number(tableauIngredients[index].prixCombos)) 
      {
        //alert("Promo :" + Number(tableauIngredients[i].prixCombos) + ">" + Number(tableauIngredients[index].prixCombos));
        this.chosenCombosPizzaPricePromo[i] = false;
        this.chosenCombosPizzaPricePromo[index] = true;
      }
      else { 
           // alert("Promo meme produit : "+Number(tableauIngredients[i].prixCombos) +"=="+ Number(tableauIngredients[index].prixCombos));
           // alert("si ========== this.chosenCombosPizza"+JSON.stringify(this.chosenCombosPizza));
            this.chosenCombosPizzaPricePromo[i] = false;
            this.chosenCombosPizzaPricePromo[index] = true;
      }
      index = i;
    }
    // alert("la fin :"+this.chosenCombosPizzaPricePromo);
    //calcule de la somme des pizza de l'offre
    let tab_secours=[];
    this.chosenCombosPizzaPrices.forEach(element => {
      tab_secours.push(element);
    });
    tab_secours.sort((a, b) => { return a - b; });
    for (let i = 0; i <  tab_secours.length; i++) {
      if (i != 0) {
        sommeProduitsOffre += Number( tab_secours[i]);
      }
      if (i == 0) {
        tab_secours[i] = (Number( tab_secours[i]) * Number(this.dataProduit.ComposantsOffres[0].remise)) / 100;
        sommeProduitsOffre += Number( tab_secours[i]);
        // this.chosenCombosPizzaPricePromo[index]=true;
      }
    }
   /* for (let i = 0; i < tableauIngredients.length; i++) {
      if (i != index) {
        sommeProduitsOffre += Number(tableauIngredients[i].prixCombos);
      }
      if (i == index) {
        tableauIngredients[i].prixCombos = (Number(tableauIngredients[i].prixCombos) * Number(this.dataProduit.ComposantsOffres[0].remise)) / 100;
        sommeProduitsOffre += Number(tableauIngredients[i].prixCombos);
        // this.chosenCombosPizzaPricePromo[index]=true;
      }
    }*/
    let sommeSupplements = 0;
   
    this.prixTotalItem = (sommeProduitsOffre + sommeSupplements) * this.quantite;
    this.prixTotalItem = MiscService.roundTwoDecimals(this.prixTotalItem);

  }

  initializeTaillePizzaOffre(nbrComposants: number) {
    if (nbrComposants < 1) {
      return;
    }
    for (let i = 0; i < nbrComposants; i++) {
      this.selectedPizzaTailles[i] = this.currentPizzaTailles[0];
    }

    // console.log("currentPizzaTailles values: ", this.currentPizzaTailles);
    // console.log("selectedPizzaTailles values: ", this.selectedPizzaTailles);

  }

  testPromo(k) {

    if (this.chosenCombosPizzaPrice[k].ispromo == true) {

      this.valuePromos = (Number(this.chosenCombosPizzaPrice[k]) * Number(this.dataProduit.ComposantsOffres[0].remise)) / 100;
    }
    return this.chosenCombosPizzaPrice[k].ispromo;
  }
  testPromoarchive(k) {
    this.valuePromos = (Number(this.chosenCombosPizzaPrice[k]) * Number(this.dataProduit.ComposantsOffres[0].remise)) / 100;


    let ispromos = false;
    /* if(this.promoFound==true){
        alert("this.promoFound :"+this.promoFound);
       ispromos =true;
       return false;
     }*/

    let somme = Number(this.dataProduit.ComposantsOffres[0].nbreproduitbase) + Number(this.dataProduit.ComposantsOffres[0].nbreproduitoffert);
    if (this.chosenCombosPizzaPrice.length == somme) {
      // alert("sort tab :"+this.chosenCombosPizzaPrice.sort());
      //  let tableau = this.chosenCombosPizzaPrice.sort();
      //  this.valuePromos =(Number(this.chosenCombosPizzaPrice[0]) * Number(this.dataProduit.ComposantsOffres[0].remise))/100;

      for (let i = 0; i < this.chosenCombosPizzaPrice.length; i++) {
        if (Number(this.chosenCombosPizzaPrice[i].prixproduit) == Number(this.chosenCombosPizzaPrice[k])) {
          //if( this.promoFound<1){
          // alert(" promoFound <1:"+this.promoFound +" this.chosenCombosPizzaPrice[k] :"+this.chosenCombosPizzaPrice[k]);
          ispromos = true;
          this.valuePromos = (Number(this.chosenCombosPizzaPrice[k]) * Number(this.dataProduit.ComposantsOffres[0].remise)) / 100;

          this.promoFound++;

          // }
          break;
        }
      }
    }
    return ispromos;
  }



  testPromoValue(k) {

    for (let i = 0; i < this.chosenCombosPizzaPrice.length; i++) {
      if (Number(this.chosenCombosPizzaPrice[i]) > Number(this.chosenCombosPizzaPrice[k])) {
        this.valuePromos = (Number(this.chosenCombosPizzaPrice[i]) * Number(this.dataProduit.ComposantsOffres[0].remise)) / 100;

      }
    }
    // alert(" testPromoValue(k) :"+  this.valuePromos);
  }
}

