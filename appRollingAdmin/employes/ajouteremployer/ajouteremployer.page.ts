import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController, ToastController } from '@ionic/angular';
import { Employers } from 'src/models/employers_model';
import { EmployesProvider } from 'src/providers/employers_provider';


@Component({
  selector: 'app-ajouteremployer',
  templateUrl: './ajouteremployer.page.html',
  styleUrls: ['./ajouteremployer.page.scss'],
})
export class AjouteremployerPage implements OnInit {

  newEmployers: any;

  allEmployes : Employers[]; 

  constructor(
    private employerProvider: EmployesProvider, 
    private menuCtrl : MenuController,
    private toastCtrl : ToastController,
    private router: Router,
    public navCtrl : NavController
  ) { 
    this.newEmployers = new Employers(null, null, null, null, null);
    this.getAllEmployes();
  }

  ngOnInit() {
    this.getAllEmployes();
  }

  getAllEmployes(){
    this.employerProvider.getAllEmployes().subscribe(
      res => {
        if(res == false){
          console.log("ERROR_NO_EMPLOYES");
        }else{
          this.allEmployes = res;
          console.log("********************************");
          console.log(this.allEmployes);
          console.log("********************************");
        }
      }
    )
  }

  addNew(){
    this.allEmployes.forEach(element => {
      console.log("Code : " + element.codeemploye);

      if(this.newEmployers.codeemploye == element.codeemploye){
        console.log("ERROR_SAME_CODE#234");
        this.errorCode();
        this.newEmployers.codeemploye = "";
      }else{
        this.employerProvider.addNewEmploye(
          this.newEmployers.nomemploye,
          this.newEmployers.prenomemploye,
          this.newEmployers.codeemploye, 
          this.newEmployers.isadmin
        ).subscribe(
          res => {
            if(res == false){
              console.log("ERROR_: NOTHING_TO_ADD");
            }else{
              //this.router.navigate(['./listeemployes']);
              this.navCtrl.back();
            }
          }
        )

      }

    });
/*
    
  */  
  }

  async errorCode(){
    const toast = await this.toastCtrl.create({
      header : 'Code déjà utilisé.',
      message : 'Veuillez saisir un autre code.',
      position: 'middle',
      duration: 2000,
      animated: true, 
      color: 'danger'
    });
    toast.present();
  }

  annuler(){
    this.router.navigate(['./listeemployes']);
  }

}
