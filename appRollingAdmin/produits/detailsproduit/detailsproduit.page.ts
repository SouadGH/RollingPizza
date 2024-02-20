import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ProduitProvider } from 'src/providers/produits_provider';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from 'src/models/produit_model';
import { CategorieProduit } from 'src/models/categorieproduit_model';
import { TypeProduit } from 'src/models/typeproduit_model';
import { AnyARecord } from 'dns';
import { LIEN_PATH_FILES, LIEN_UPLOAD_FILES, LIEN_UPLOAD_FILES_CHANGE } from 'src/providers/config_bdd';
import { HttpClient } from '@angular/common/http';
import { ComposantPizza } from 'src/models/composantpizza_model';
import { ComposantPizzaProvider } from 'src/providers/composantpizza_provider';
import { element } from 'protractor';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-detailsproduit',
  templateUrl:'detailsproduit.page.html',
  styleUrls: ['detailsproduit.page.scss'],
})

export class DetailsproduitPage implements OnInit {
  updateProduit = false;
  btnValidUpdate = true;
  allCategorie: CategorieProduit[];
  allTypeProduit: TypeProduit;
  // allProduits: Produit[];
  //produits: any;
  allIngredientsProduit: any[];
  allProduits: any;
  public produit: any;
  @Input() idproduit: any;
  path = LIEN_PATH_FILES;
  path_upload_change = LIEN_UPLOAD_FILES_CHANGE;

  image = "";
  newcomposant: any;
  newEntreeCombos: any;
  newtaillePizza: any;
  newtailleBoisson: any;
  newcomposantt: {
    idcomposant: string;
    nomcomposant: string;
  };
  allComposants: ComposantPizza[];
  tailleallIngredientsProduit: number;
  allProduitsShop: any[] = [];
  entrees: any[] = [];
  pizza: any[] = [];
  boissons: any[] = [];
  taillepizza: any[] = [];
  boissonsCombos: any[] = [];
  quantiteePizza: any;
  detailsOffres: any[] = [];
  listeTypesLivraison: any[] = [];
  newTypeLivraison: any;
  newTypeProduit: any;
  allTypeProduits: TypeProduit[];
  newTypeProduitNom: any;


  //taillepizza: { idcomposant: number; nomcomposant: string; prixcomposant: number; }[];
  constructor(
    private http: HttpClient, public router: Router, private composantsProvider: ComposantPizzaProvider,
    private modalCtrl: ModalController,
    private produitProvider: ProduitProvider, public navParams: NavParams
  ) {  
    this.produit = navParams.get('produit');
    this.allProduits = this.produit;  
    this.idproduit = this.produit.idproduit;
    this.detailsOffres = this.produit.ComposantsOffres;    
    this.getListeIngredientProduit(this.idproduit);

    if (this.produit.composantsCombos.length > 0) {
      this.entrees = this.produit.composantsCombos[0].entree;      
      this.pizza = this.produit.composantsCombos[0].pizza;
      this.newtaillePizza = this.produit.composantsCombos[0].pizza[0].idcomposant;
      this.quantiteePizza = this.produit.composantsCombos[0].pizza[0].quantitee;      
      this.newtailleBoisson = this.produit.composantsCombos[0].boissons[0].idcomposant;     
      this.boissons = this.produit.composantsCombos[0].boissons;     
    }

    if (this.produit.ComposantsOffres.length > 0) {
      this.getAllTypeProduit();
    }

    this.getAllCategorieProduit();
    this.getAllComposants();
    this.getAllProduits();
    this.getListeTypesLivraison();
  }

  ngOnInit() {
    
  }

  getDetailProduit(idproduit) {
    this.produitProvider.getProduit(idproduit).subscribe(
      res => {
        if (res == false) {          
        } else {          
          this.produit = res;
        }
      }
    )
  }

  getAllProduits() {
    this.produitProvider.getAllProduits().subscribe(
      res => {
        if (res == false) {         
        } else {
          this.allProduitsShop = res;
          let tab = [];        
          this.allProduitsShop.forEach(element => {          
            if ((element.idcategorie == 4) || (element.idcategorie == 1)) {
              element.listetypesproduits.forEach(p => {
                tab.push(p);
              });             
            }
          });        
          this.allProduitsShop = tab;         
        }
      } //res
    )//subscribe
  }

  //récupérer la liste des composants d'un produit selon son id
  getListeIngredientProduit(idproduit) {
    this.produitProvider.getListeIngredientProduit(idproduit).subscribe(
      res => {
        if (res["succes"] == false) {
          this.allIngredientsProduit = [];
          this.tailleallIngredientsProduit = 0;
        } else {
          this.allIngredientsProduit = <[]>res;
          this.tailleallIngredientsProduit = this.allIngredientsProduit.length;
        }
      }
    )
  }

  //supprimer un composant d'un produit selon son id
  deletecomposant(idproduit, idcomposant) {

    this.produitProvider.deleteIngredientProduitID(idproduit, idcomposant).subscribe(
      res => {
        if (res == false) {
          console.log("ERREUR");
        } else {
          this.getListeIngredientProduit(idproduit);        
        }
      }
    )
  }

  //add new composant
  onChangeAddComposant($event) {
    
    console.log("new composant is :", this.newcomposant);    
    this.allComposants.forEach(el => {
      el.listeIngredients.forEach(element => {
        if (element.idcomposant == this.newcomposant) {     
          this.allIngredientsProduit.push(element);   
        }
      });
    });
  }

  //récupère tous les composants des produits
  getAllComposants() {
    this.composantsProvider.getAllComposants().subscribe(res => {
      this.allComposants = res;     
      this.allComposants.forEach(composant => {
        if (composant.categoriecomposant == "combos_pizza_taille") {
          this.taillepizza.push(composant);
        }
        if (composant.categoriecomposant == "combos_boissons_sans_alcool") {
          this.boissonsCombos.push(composant);
        }
      });    
    });
  }

  //pour fermer le modal
  closeModal() {
    this.modalCtrl.dismiss();
  }

  //supprimer un produit selon son id
  deleteProduit(idproduit, imageproduit) {
    this.produitProvider.deleteProduit(idproduit, imageproduit).subscribe(
      res => {
        if (res == false) {
          console.log("Erreur de suppression de type produit. Merci de contacter votre Helvitech Développeur.");
        } else {
          this.modalCtrl.dismiss();
        }
      }
    );
  }
  //récupérer tous les catégories
  getAllCategorieProduit() {
    this.produitProvider.getAllCategorieProduits().subscribe(
      res => {
        if (res == false) {
          console.log("ERREUR");
        } else {

          this.allCategorie = res;
          console.log("Liste des catégorie : ", this.allCategorie);
        }
      }
    )
  }

  //récupère la nouvelle catégorie choisie
  onChangeCategorie($event, idcategorie) {
    //appel des types produits qui appartiennent à cette catégorie 
    this.getAllTypeProduitsIdCategorie(idcategorie);
  }

  //récupère tous les types de produits seon une catégorie choisie
  getAllTypeProduitsIdCategorie(idcategorie) {
    this.produitProvider.getAllTypeProduitsIdCategorie(idcategorie).subscribe(
      res => {
        if (res == false) {
          console.log("Aucun type de produit disponible ");
        } else {
          this.allTypeProduit = res;
          if (this.allTypeProduit.idtypeproduit != null) { this.allProduits[0].idtypeproduit = null; }
        }
      }
    )
  }

  //récupère la nouveau type produit choisi et active le bouton de update produit
  onChangeTypeProduit($event) {

    if ((this.allProduits[0].nomproduit != null) && (this.allProduits[0].prixproduit != null) &&
      (this.allProduits[0].idcategorie != null) && (this.allProduits[0].idtypeproduit != null)
    ) {
      this.btnValidUpdate = false;
    }
  }

  //update un produit et ferme le modal
  UpdateProduittArchive(allProduits) {
    console.log("new prices :"+this.allProduits[0].listeprix);
   /* this.produitProvider.updateProduitId(this.allProduits[0].idproduit, this.allProduits[0].nomproduit,
      this.allProduits[0].prixproduit, this.allProduits[0].idcategorie,
      this.allProduits[0].idtypeproduit, this.allIngredientsProduit, this.allProduits[0].listeprix, this.entrees, this.detailsOffres)
      .subscribe(
        res => {
          if (res == false) {
            console.log("Erreur de suppression de type produit. Merci de contacter votre Helvitech Développeur.");
          } else {
            this.modalCtrl.dismiss();
          }
        }
      );*/
  }

  //Update Photo produit
  onClick() {
    var id = JSON.stringify(this.produit.idproduit);
    var old_image = JSON.stringify(this.produit.imageproduit);   
    const formData = new FormData();
    formData.append('new_image', this.image);
    formData.append('id', id);
    formData.append('old_image', old_image);
    //this.http.post('http://localhost/rollingpizza/bdd/produits/upload/changephoto.php', formData)
    this.http.post(this.path_upload_change, formData)
      .subscribe((response: any) => {
        console.log(response);
        this.produit.imageproduit = response;
        this.image = "";
      });
  }

  onChangeFile(event) {
    this.image = event.target.files[0];

  }
  //supprimer un composant d'entrée s'un combos d'un produit selon son id
  deletecomposantEntreeCombos(idproduit, idproduitcombos, i) {   
    this.entrees.splice(i, 1);    
  }
  //add new composant
  onChangeAddEntreeCombos($event) { 

    this.allProduitsShop.forEach(el => {
      let existe = false;
      el.listeproduits.forEach(element => {
        if (element.idproduit == this.newEntreeCombos) {       
          //vérifier si le composant existe déja
          this.entrees.forEach(entree => {
            if (entree.idproduitcombos == this.newEntreeCombos) { existe = true; }
          });
          //prduit existe dansla liste des entrées du combos
          if (existe == false) {
            //récupérer idcomposant d'entree dans la liste des allcomposants
            let idcomposant: any;
            let taille: any;
            this.allComposants.forEach(cp => {
              if (cp.categoriecomposant == "combos_entree") {
                cp.listeIngredients.forEach(composant => {
                  idcomposant = composant.idcomposant;
                  taille = composant.nomcomposant;
                });
              }
            });
            this.entrees.push(
              {
                idcombos: this.produit.idproduit,
                idcomposant: idcomposant,
                quantitee: "1",
                taille: taille,
                idproduitcombos: this.newEntreeCombos,
                nomproduitcombos: element.nomproduit
              }

            );
          }         
        }
      });
    });   
  }

  //update la quantitee des pizza du combos
  onChangeQuantitePizzaCombos() {
    this.pizza[0].quantitee = this.quantiteePizza;
    console.log("onChangeQuantitePizzaCombos() :"+ this.pizza);
  }
  
  //update la taille des boissons du combos
  onChangeBoissonsCombos() {
    // this.boissons[0].taille=this.newtailleBoisson;
    let existe = false;
    this.boissons.forEach(boisson => {
      if (boisson.idcomposant == this.newtailleBoisson) { existe = true; }
    });
    if (existe == false) {
      this.boissons = [];
      let idcomposant = this.newtailleBoisson;
      let taille: any;
      this.boissonsCombos.forEach(cp => {
        cp.listeIngredients.forEach(composant => {
          //   idcomposant=composant.idcomposant;
          taille = composant.nomcomposant;
        });
      });
      this.boissons.push(
        {
          idcombos: this.produit.idproduit,
          idcomposant: idcomposant,
          quantitee: 1,
          taille: taille,
          idproduitcombos: 0,
          nomproduitcombos: null
        }
      );
    }
  }

  //update la taille des pizza du combos
  onChangetaillePizzaCombos() {
    let existe = false;
    this.pizza.forEach(pizza => {
      if (pizza.idcomposant == this.newtaillePizza) { existe = true; }
    });
    if (existe == false) {
      let idcomposant = this.newtaillePizza;
      let taille: any;
      this.pizza = [];
      this.taillepizza.forEach(cp => {
        cp.listeIngredients.forEach(composant => {        
          taille = composant.nomcomposant;
        });
      });
      this.pizza.push(
        {
          idcombos: this.produit.idproduit,
          idcomposant: idcomposant,
          quantitee: this.quantiteePizza,
          taille: taille,
          idproduitcombos: 0,
          nomproduitcombos: null
        }
      );
    }
    console.log("onChangetaillePizzaCombos() :"+ JSON.stringify(this.pizza));
  }

  //update un produit et ferme le modal
  UpdateProduit(produit) {
    console.log("new prices :"+JSON.stringify(this.produit.listeprix));
    let tab = [];
    if (this.produit.composantsCombos.length > 0) {     
      this.entrees.forEach(entree => {
        tab.push(entree);
      });
      this.pizza[0].quantitee = this.quantiteePizza; 
      this.pizza.forEach(pizza => {
        tab.push(pizza);
      });
      this.boissons.forEach(boisson => {
        tab.push(boisson);
      });
    }
    if (this.detailsOffres.length > 0) {    
      this.detailsOffres[0].idtypeproduitoffre = this.newTypeProduit;
    }  
    console.log("new produit :"+JSON.stringify(this.produit));
  this.produitProvider.updateProduitId(this.produit.idproduit, this.produit.nomproduit,
      this.produit.prixproduit, this.produit.idcategorie,
      this.produit.idtypeproduit, this.allIngredientsProduit, this.produit.listeprix, tab, this.detailsOffres,0,[])
      .subscribe(
        res => {
          if (res == false) {
            console.log("Erreur de suppression de type produit. Merci de contacter votre Helvitech Développeur.");
          } else {
            console.log("Bonne modif.");
            console.log("this.image: "+this.image);
            if(this.image!==""){ this.onClick();}
           
            this.modalCtrl.dismiss();            
          }
        }
      );
  }

  getListeTypesLivraison() {
    this.produitProvider.getAllTypesLivraison().subscribe(res => {
      if (res == false) {
        console.log("Erreur de récupération de type de livraison. Merci de contacter votre Helvitech Développeur.");
      } else {

        this.listeTypesLivraison = res;      
        if (this.produit.ComposantsOffres.length > 0) {
          this.newTypeLivraison = this.produit.ComposantsOffres[0].idtypelivraison;        
        }
      }
    });
  }

  getAllTypeProduit() {
    this.produitProvider.getAllTypeProduits().subscribe(
      res => {
        if (res == false) {
          console.log("Aucun type de produit dans votre pizzeria. Merci de contacter votre Helvitech Développeur.");
        } else {
          this.allTypeProduits = res;        
          this.allTypeProduits.forEach(element => {
            if (element.idtypeproduit == this.produit.ComposantsOffres[0].idtypeproduitoffre) {
              this.newTypeProduit = element.idtypeproduit;
              this.newTypeProduitNom = element.nomtypeproduit;
            }
          });       
        }
      }
    );
  }

}
