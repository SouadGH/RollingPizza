import { Component, OnInit } from '@angular/core';
import { ProduitProvider } from 'src/providers/produits_provider';
import { MenuController, ActionSheetController } from '@ionic/angular';
import { Produit } from 'src/models/produit_model';
import { TypeProduit } from 'src/models/typeproduit_model';
import { CategorieProduit } from 'src/models/categorieproduit_model';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LIEN_UPLOAD_FILES_CHANGE, LIEN_UPLOAD_FILES_PHOTO } from 'src/providers/config_bdd';
import { ComposantPizza } from 'src/models/composantpizza_model';
import { ComposantPizzaProvider } from 'src/providers/composantpizza_provider';

@Component({
  selector: 'app-ajouterproduit',
  templateUrl:'./ajouterproduit.page.html',
  styleUrls: ['./ajouterproduit.page.scss'],
})
export class AjouterproduitPage implements OnInit {

  public dataNewProduit: Produit;
  public profileImage: any;
  //stocker toutes les categories de produits : 
  allCategorieProduit: CategorieProduit;
  //stocker toutes les catégories de produits: 
  categorieSelected = true;
  allTypeProduit: TypeProduit;
  allTypeProduits: TypeProduit[];
  path = LIEN_UPLOAD_FILES_PHOTO;
  image = "";
  public base64Image: string;
  public photos: string[];
  public listeprix: any[] = [];
  p_prix_sur_place: 0; p_prix_a_emporter: 0; p_prix_livraison: 0;
  m_prix_sur_place: 0; m_prix_a_emporter: 0; m_prix_livraison: 0;
  l_prix_sur_place: 0; l_prix_a_emporter: 0; l_prix_livraison: 0;
  allComposants: ComposantPizza[];
  newcomposant: any;
  newcomposantt: {
    idcomposant: string;
    nomcomposant: string;
  };
  allIngredientsProduit: any[] = [];
  boissons: any[] = [];
  taillepizza: any[] = [];
  boissonsCombos: any[] = [];
  quantiteePizza: any;
  newtaillePizza: any;
  pizza: any[] = [];
  newtailleBoisson: any;
  entrees: any[] = [];
  newEntreeCombos: any;
  allProduitsShop: any[] = [];
  path_upload_change = LIEN_UPLOAD_FILES_CHANGE;
  detailsOffres = [{
    idproduit: null,
    nomproduit: null,
    prixproduit: null,
    debutoffre: "",
    finoffre: "",
    descriptionoffre: null,
    nbreproduitbase: null,
    nbreproduitoffert: null,
    remise: null,
    jour_offre: 0,
    idtypelivraison: null,
    idtypeproduitoffre: null,
    idshop: 1
  }];
  listeTypesLivraison: any[] = [];
  constructor(private http: HttpClient,
    private produitProvider: ProduitProvider,
    private menuCtrl: MenuController,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera, public router: Router,
    private composantsProvider: ComposantPizzaProvider


  ) {
    this.dataNewProduit = new Produit(null, null, null, null, null, null, null, null, null);

    this.quantiteePizza = 1;
    this.getAllCategorieProduit();
    this.getAllComposants();
    this.getAllProduits();
    this.getListeTypesLivraison()
    this.getAllTypeProduit();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  //Fonction pour l'ajout d'un nouveau produit du business connecté
  addNew() {
    let id: string;
   // alert("this.p_prix_sur_place :" + this.p_prix_sur_place);
    //si c'est une pizza
    if (this.dataNewProduit.idtypeproduit == 1) {    

      this.listeprix.push({
        taille: "petite",
        diametre: "25",
        prix: this.p_prix_sur_place,
        idtypelivraison: "1"
      },
        {
          taille: "moyenne",
          diametre: "33",
          prix: this.m_prix_sur_place,
          idtypelivraison: "1"
        },
        {
          taille: "large",
          diametre: "40",
          prix: this.l_prix_sur_place,
          idtypelivraison: "1"
        },
        {
          taille: "petite",
          diametre: "25",
          prix: this.p_prix_a_emporter,
          idtypelivraison: "2"
        },
        {
          taille: "moyenne",
          diametre: "33",
          prix: this.m_prix_a_emporter,
          idtypelivraison: "2"
        },
        {
          taille: "large",
          diametre: "40",
          prix: this.l_prix_a_emporter,
          idtypelivraison: "2"
        },
        {
          taille: "petite",
          diametre: "25",
          prix: this.p_prix_livraison,
          idtypelivraison: "3"
        },
        {
          taille: "moyenne",
          diametre: "33",
          prix: this.m_prix_livraison,
          idtypelivraison: "3"
        },
        {
          taille: "large",
          diametre: "40",
          prix: this.l_prix_livraison,
          idtypelivraison: "3"
        }
      );
      this.dataNewProduit.prixproduit = this.p_prix_sur_place;
    }
    let detailsCombos = [];
    if (this.dataNewProduit.idtypeproduit == 26) {
      this.entrees.forEach(entree => {
        detailsCombos.push(entree);
      });
      this.pizza[0].quantitee = this.quantiteePizza;    
      this.pizza.forEach(pizza => {
        detailsCombos.push(pizza);
      });
      this.boissons.forEach(boisson => {
        detailsCombos.push(boisson);
      });

    }
    if (this.dataNewProduit.idtypeproduit == 27) {
      this.detailsOffres[0].nomproduit = this.dataNewProduit.nomproduit;
      this.detailsOffres[0].prixproduit = this.dataNewProduit.prixproduit;
    }
    else {
      this.detailsOffres = [];
    }
    console.log("onChangeQuantitePizzaCombos() :"+ JSON.stringify(this.pizza));
    this.produitProvider.addNewProduit(
      this.dataNewProduit.nomproduit,
      this.dataNewProduit.prixproduit,
      this.dataNewProduit.idtypeproduit,
      this.dataNewProduit.idcategorie,
      this.dataNewProduit.listeprix = this.listeprix,
      this.allIngredientsProduit, detailsCombos, this.detailsOffres
    ).subscribe(res => {
      id = <string>res;       
      this.ajoutimage(id);
      this.router.navigate(['./listeproduit']);
    });
  }

  getAllCategorieProduit() {
    this.produitProvider.getAllCategorieProduits().subscribe(
      res => {
        if (res == false) {
          console.log("Aucun type de produit disponible ");
        } else {
          this.allCategorieProduit = res;
          console.log(" this.allCategorieProduit :" + this.allCategorieProduit);
        }
      }
    )
  }

  //Récupérer tous les types de produit 
  getAllTypeProduit() {
    this.produitProvider.getAllTypeProduits().subscribe(
      res => {
        if (res == false) {        
        } else {
          this.allTypeProduit = res;
          this.allTypeProduits = res;
         
        }
      }
    )
  }

  onChangeCategorie($event, idcategorie) {   
    //appel des types produits qui appartiennent à cette catégorie 
    this.getAllTypeProduitsIdCategorie(idcategorie);
  }

  getAllTypeProduitsIdCategorie(idcategorie) {
    this.produitProvider.getAllTypeProduitsIdCategorie(idcategorie).subscribe(
      res => {
        if (res == false) {
          console.log("Aucun type de produit disponible ");
        } else {
          if (this.dataNewProduit.idtypeproduit != null) { this.dataNewProduit.idtypeproduit = null; }
          this.allTypeProduit = res;
        }
      }
    )
  }

  onChangeTypeProduit($event) {  
  }

  //Menu upload DE PHOTO PRODUIT
  async presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({

      buttons: [
        {
          icon: 'camera',
          text: 'Caméra',
          role: 'prendre',
          handler: () => {
            this.openCamera();
            console.log('camera clicked');
          }
        }, {
          icon: 'folder',
          text: 'Gallery',
          role: 'choisir',
          handler: () => {
            this.pickCin();
            console.log('Archive clicked');
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    (await actionSheet).present();
  }

  openCamera() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.base64Image = imageData;
      this.photos.push(this.base64Image);
      this.photos.reverse();
      console.log(this.photos);
    }, (err) => {
      console.log("erreur de camera cin: ", err);
    });
  }

  pickCin() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.PictureSourceType.PHOTOLIBRARY;
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.image = imageData;
      this.photos.push(this.image);
      this.photos.reverse();
      console.log(this.photos);
    }, (err) => {
      console.log("erreur de gallery cin: " + err);
    });
  }

  uploadImage(image, id) {
    this.produitProvider.uploadImage(image, id);
    this.profileImage = "";
    this.photos = [];

  }

  onChangeFile(event) {
    this.image = event.target.files[0];   
  }

  ajoutimage(id) {
    var myData = JSON.stringify(id);       
    const formData = new FormData();
    formData.append('image', this.image);
    formData.append('id', myData);
    //alert(formData);
    //let dt: Observable<any> = this.http.post(url, postData);
    // this.http.post('http://localhost/rollingpizza/bdd/produits/upload/test1.php', formData)
    this.http.post(this.path, formData)
      .subscribe((response: any) => {
        console.log(response);
      });  
  }

  Annuler() {
    this.router.navigate(['./listeproduit']);
  }
  //Supprimer un imgredient de la liste
  deletecomposant(i){
    this.allIngredientsProduit.splice(i,1);
  }
  //add new composant
  onChangeAddComposant($event) {
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
      //récupérer que les tailles des pizzas dans les combos
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

  //update la taille des pizza du combos
  onChangetaillePizzaCombosFonctionne() {
    let existe = false;
    this.pizza.forEach(pizza => {
      if (pizza.idcomposant == this.newtaillePizza) { existe = true; }
    });
    if (existe == false) {     
      this.pizza = [];     
      this.pizza.push(
        {
          idcomposant: this.newtaillePizza,
          quantitee: this.quantiteePizza,              
          idproduitcombos: 0         
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
        if(this.newtaillePizza == composant.idcomposant){
          taille = composant.nomcomposant;
        }    
        
      });
    });
    this.pizza.push(
      {
        idcombos: null,
        idcomposant: this.newtaillePizza,
        quantitee: this.quantiteePizza,
        taille: taille,
        idproduitcombos: 0,
        nomproduitcombos: null
      }
    );
  }
  console.log("onChangetaillePizzaCombos() :"+ JSON.stringify(this.pizza));
}
  //update la taille des boissons du combos
  onChangeBoissonsCombos() {  
    let existe = false;
    this.boissons.forEach(boisson => {
      if (boisson.idcomposant == this.newtailleBoisson) { existe = true; }
    });
    if (existe == false) {
      this.boissons = [];

      this.boissons.push(
        {
          idcomposant: this.newtailleBoisson,
          quantitee: 1,
          idproduitcombos: 0
        }
      );
    }   
  }
   
//update la quantitee des pizza du combos
onChangeQuantitePizzaCombos() {
  this.pizza[0].quantitee = this.quantiteePizza;
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
            let idcomposant: any;
            this.allComposants.forEach(cp => {
              if (cp.categoriecomposant == "combos_entree") {

                cp.listeIngredients.forEach(composant => {
                  idcomposant = composant.idcomposant;
                });
              }
            });
            this.entrees.push(
              {
                idcomposant: idcomposant,
                quantitee: "1",
                idproduitcombos: this.newEntreeCombos,
                nomproduitcombos: element.nomproduit
              }
            );
          }
        }
      });
    });  
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

  //supprimer un composant d'entrée s'un combos d'un produit selon son id
  deletecomposantEntreeCombos( idproduitcombos, i) {
    this.entrees.splice(i, 1);
  }
  
  getListeTypesLivraison() {
    this.produitProvider.getAllTypesLivraison().subscribe(res => {
      if (res == false) {
        console.log("Erreur de récupération de type de livraison. Merci de contacter votre Helvitech Développeur.");
      } else {
        this.listeTypesLivraison = res;
      }
    });
  }

}
