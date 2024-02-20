import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { Employers } from 'src/models/employers_model';
import { Storage } from '@ionic/storage';
import { AuthInfo, EmployesProvider } from 'src/providers/employers_provider';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
 
 
  code: string;

  employe : Employers;

  constructor(
    private employesProvider: EmployesProvider,
    private storage : Storage, 
    private taostCtrl : ToastController,
    private menuCtrl : MenuController,
    private router : Router
  ) { 
    this.code = "";
    console.log("This code is : " + this.code);
    if(localStorage.getItem('idemploye') != null){
      this.menuCtrl.enable(true);
      this.router.navigate(['/home']);
     
    }
    else{
      this.code = "";
      this.menuCtrl.enable(false);
    }
    
   
  }

  ngOnInit() {
    this.code = "";
  }

  code1(i: string) {
    this.code = this.code + "" + i;
    console.log("update code : " + this.code);
  }
/*
  ionViewDidLeave(){
    console.log("ionViewDidLeave Login  ***********");
    location.reload();
    this.router.navigate(['/home']);
  }
*/
  connexion(){
    if(this.code == null){
    //  alert("Connexion échouée. Veullez essayer à nouveau.");
      this.code == "";
    }else{
      //--
   //   alert("code page login envoyé est :"+this.code);
      this.employesProvider.authInfo$.next(EmployesProvider.UNKNOWN_USER);
      this.employesProvider.getUtilisateurConnexion((this.code)).subscribe(
        res => {
          this.employe = res;
          console.log("--Connexion infos : " + this.code );

          console.log("this.employe = ", this.employe);

          if (res.succes === false){
            console.log("Aucun profil ne correspond.");    
            this.code = "";  
            this.toastErrorConnexion();      
          }else{
            //this.toastConnexion();

            this.employe = res;
            this.employesProvider.authInfo$.next(new AuthInfo(this.employe[0].idemploye));
            this.employesProvider.authInfo$.subscribe((data) => {
              // alert('userData in login'+JSON.stringify(data));                
            });


            //Storage local : Stocke rles information du business en local pour la navigation interne des données
            this.storage.set('idemploye', this.employe[0].idemploye);
            this.storage.set('nomemploye', this.employe[0].nomemploye);
            this.storage.set('prenomemploye', this.employe[0].prenomemploye);
            this.storage.set('isadmin', this.employe[0].isadmin);

            console.log("storage employe[0].idclient : " , this.employe[0]);
            
            this.toastSuccesConnexion();

            //router navigation 
            //location.reload();
            this.router.navigate(['/home']);
          }

        } // res =>
      ) //subscribe
    }//else

  }//connexion()

  //message erreur connexion : 
  async toastErrorConnexion(){
    const toast = await this.taostCtrl.create({
      header : 'Connexion invalide.',
      message : 'Veuillez saisir votre code à nouveau.',
      position: 'middle',
      duration: 2500,
      animated: true, 
      color: 'danger'
    });
    toast.present();
  }  

  //message succès connexion : 
  async toastSuccesConnexion(){
    const toast = await this.taostCtrl.create({
      header : 'Connexion réussie.',
      message : 'Bon travail chez RollingPizza.',
      position: 'middle',
      duration: 2500,
      animated: true, 
      color: 'success'
    });
    toast.present();
  }  

  deleteCode(){
    this.code = "";
  }

}
