import { Component, OnInit } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { EmployesProvider } from 'src/providers/employers_provider';
import { Router } from '@angular/router';
import { Employers } from 'src/models/employers_model';
import { Storage } from '@ionic/storage';
/*export const panier = { 
  idclient: "1", 
  idshop: "1",
  demandeur:0,
  totalcom: 0.00,
  idtypelivraison: 1,
  listeProduits: [{
    idproduit: Number,
    nomproduit: String,
    quantiteproduit: 0,
    prixproduit:0.00,
    taille:'',
    prixtotalSupplement:0.00,
    listeSupplements:[{
      nomcomposant: '',
      prixcomposant: 0.00
    
    }]
  }],
  
};*/

export const panierArchive = { 
  idclient: null, 
  idshop : "1",
  demandeur:0,
  totalcom: 0.00,
  idtypelivraison: 3,
  heurelivraison:null,
  listeProduits: [{
    idproduit: Number,
    nomproduit: String,
    imageproduit: String,
    quantiteproduit: 0,
    prixproduit:0.00,
    taille:'',
    prixtotalSupplement:0.00,
    listeSupplements:[{
      idcomposant: Number,
      nomcomposant: '',
      categoriecomposant: '',
      prixcomposant: 0.00
    
    }],
    listeARetirer:[{
      idcomposant: Number,
      nomcomposant: '',
      categoriecomposant: '',
      prixcomposant: 0.00    
    }],
    listeOffre: [{
      idproduitOffre: Number,
      nomproduitOffre: '',
      taille: '',
      prixproduitOffre: 0.00,
      quantiteOffre: Number,
      listeprix: []
    }]
  }],
  
};
export const panier = {
  idclient: null,
  idshop: 1,
  demandeur: 0,
  totalcom: 0.00,
  idtypelivraison: 3,
  heurelivraison: null,
  listeProduits: [{
    idproduit: Number,
    nomproduit: String,
    imageproduit: String,
    quantiteproduit: 0,
    prixproduit: 0.00,
    taille: '',
    prixtotalSupplement: 0.00,
    listeIngredients: [{
      idCombos: null,
      nomCombos: null,
      prixCombos: 0.00,
      quantiteCombos: 0
    }],
    listeSupplements: [{
      idcomposant: Number,
      nomcomposant: '',
      categoriecomposant: '',
      prixcomposant: 0.00

    }],
    listeARetirer: [{
      idcomposant: Number,
      nomcomposant: '',
      categoriecomposant: '',
      prixcomposant: 0.00
    }],
    listeOffre: [{
      idproduitOffre: Number,
      nomproduitOffre: '',
      taille: '',
      prixproduitOffre: 0.00,
      quantiteOffre: Number,
      listeprix: []
    }]
  }],

};
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
 /*   {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Commandes',
      url: '/listecommandesclients',    
      icon: 'list'
    },
    {
      title: 'Archives Commandes',
      url: '/archives-commandes',    
      icon: 'trash'
    },
    {
      title: 'Clients',
      url: '/listeclients',
      icon: 'people'
    },
    {
      title: 'Produits',
      url: '/listeproduit',
      icon: 'podium'
    },
    {
      title: 'Ingrédients',
      url: '/listeingredients',
      icon: 'keypad'
    },
    {
      title: 'Catégories',
      url: '/listecategories',
      icon: 'grid'
    },
    {
      title: 'Types de produit',
      url: '/listetypeproduit',
      icon: 'images'
    },
    {
      title: 'Notre RollingPizza',
      url: '/shop',
      icon: 'images'
    },
    {
      title: 'Passer une commande',
      url: '/tabs',
      icon: 'paper-plane'
    } */  
  ];
  idemploye: any;
  isadmin: number;
  employe: Employers;
  userID: string; 

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private employeProvider: EmployesProvider,
    private storage: Storage,
    private router: Router,
    private menuCtrl : MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('home')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    this.getProfile();
    //update side menu   
    this.employeProvider.authInfo$.subscribe((data) => {      
      this.userID = data.$uid;
      this.loadProfile();
    });
  }
  ionViewWillEnter() {
    this.getProfile();   
  }

  ionViewDidLoad() {
    this.getProfile();
  }

  loadProfile() {
    if (this.userID != null) {
      localStorage.setItem('idemploye', this.userID);
      this.getProfile();
    }
  }

  getProfile() {
    this.getStorageIdEmploye();
  }

  getStorageIdEmploye() {
      this.idemploye = localStorage.getItem('idemploye');
    this.getInfosEmploye(this.idemploye);
  }

  getInfosEmploye(idemploye: any) {
    this.employeProvider.getEmployeInfosId(idemploye).subscribe(
      res => {
        if (res['succes'] == false) {
          console.log("ERROR_NO_DATA_EMPLOYE");
          this.router.navigate(['/login']);
        //  this.defineMenu(null, null);
        } else {
          this.employe = res;
          console.log("DATA_EMPLOYE : ", this.employe);
          this.defineMenu(this.employe[0].isadmin, idemploye);
        }
      }
    )
  }

  defineMenu(isadmin, idemploye) {

    console.log("ISADMIN : " + isadmin + "--" + "ID : " + idemploye);

    if (idemploye == null) {
      console.log("Aucun employé n'est connecté.");
      this.appPages = [
        {
          title: 'Connexion',
          url: 'login',
          icon: 'log-in'
        }
      ]
    } else if (isadmin == 1) {
      console.log("Vous êtes bien connecté : ", idemploye);
      console.log("ADMIN !", this.employe[0].isadmin);

      this.appPages = [
        {
          title: 'Home',
          url: '/home',
          icon: 'home'
        },
        {
          title: 'Commandes',
          url: '/listecommandesclients',    
          icon: 'list'
        },
        {
          title: 'Archives Commandes',
          url: '/archives-commandes',    
          icon: 'trash'
        },
        {
          title: 'Clients',
          url: '/listeclients',
          icon: 'people'
        },
        {
          title: 'Produits',
          url: '/listeproduit',
          icon: 'podium'
        },
        {
          title: 'Ingrédients',
          url: '/listeingredients',
          icon: 'keypad'
        },
        {
          title: 'Catégories',
          url: '/listecategories',
          icon: 'grid'
        },
        {
          title: 'Types de produit',
          url: '/listetypeproduit',
          icon: 'images'
        },
        {
          title: 'Notre RollingPizza',
          url: '/shop',
          icon: 'images'
        },
        {
          title: 'Employés',
          url: '/listeemployes',
          icon: 'people'
        },
        {
          title: 'Passer une commande',
          url: '/tabs',
          icon: 'paper-plane'
        }
      ]

    } else if (isadmin == 0) {
      console.log("VOUS ETES UN EMPLOYEUR !", isadmin)
      this.appPages = [
        {
          title: 'Home',
          url: '/home',
          icon: 'home'
        },
        {
          title: 'Commandes',
          url: '/listecommandesclients',    
          icon: 'list'
        },
        {
          title: 'Archives Commandes',
          url: '/archives-commandes',    
          icon: 'trash'
        },
        {
          title: 'Clients',
          url: '/listeclients',
          icon: 'people'
        },
        {
          title: 'Produits',
          url: '/listeproduit',
          icon: 'podium'
        },
        {
          title: 'Ingrédients',
          url: '/listeingredients',
          icon: 'keypad'
        },
        {
          title: 'Catégories',
          url: '/listecategories',
          icon: 'grid'
        },
        {
          title: 'Types de produit',
          url: '/listetypeproduit',
          icon: 'images'
        }
       
       
        
      ]
    }

  }

  deconnexion() {
    localStorage.removeItem('idemploye');
    localStorage.removeItem('nomemploye');
    localStorage.removeItem('prenomemploye');
    localStorage.removeItem('isadmin');
    this.menuCtrl.enable(false);
   /* this.storage.set('nomemploye', '');
    this.storage.set('prenomemploye', '');
    this.storage.set('isadmin', '');*/
  }

}
