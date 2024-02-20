import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import { Employers } from 'src/models/employers_model';
import { EmployesProvider } from 'src/providers/employers_provider';
import { DetailemployePage } from '../detailemploye/detailemploye.page';

import { ModifieremployerPage } from '../modifieremployer/modifieremployer.page';

@Component({
  selector: 'app-listeemployes',
  templateUrl: './listeemployes.page.html',
  styleUrls: ['./listeemployes.page.scss'],
})
export class ListeemployesPage implements OnInit {

  allEmployes : Employers;

  constructor(
    private employerProvider: EmployesProvider,
    private router: Router, 
    private menuCtrl : MenuController,
    private modalCtrl : ModalController,
    private alertCtrl : AlertController
  ) { 
    this.getAllEmployes();
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.getAllEmployes();
  }

  ionViewWillEnter() {
    this.getAllEmployes();
  }

  getAllEmployes(){
    this.employerProvider.getAllEmployes().subscribe(
      res => {
        if(res == false){
          console.log("ERROR_NO_EMPLOYES");
        }else{
          this.allEmployes = res;
          console.log(" this.allEmployes :"+  this.allEmployes);
        }
      }
    )
  }

  async goDetail(employe){
    const modal = await this.modalCtrl.create({
      component:DetailemployePage,
      componentProps : { employe : employe}
    });
    return await modal.present();
  }

  async update(employe: Employers){
    const modal = await this.modalCtrl.create({
      component : ModifieremployerPage,
      componentProps: {employe : employe}
    });
    return await modal.present();
  }

  async deleteAlert(idemploye, nomemploye, prenomemploye){
    const alert = await this.alertCtrl.create({
      cssClass: 'delete-alert',
      header: 'Voulez-vous vraiment supprimer l\'employé : ',
      message: nomemploye + ' ' + prenomemploye,
      buttons: [
        {
          text: 'Confirmer',
          handler: () => {
            this.delete(idemploye);
          }
        },
        {
          text: 'Annuler',
          role: 'cancel'
        }
      ] 
    });
    await alert.present();
  }

  delete(idemploye){
    this.employerProvider.deleteEmploye(idemploye).subscribe(
      res => {
        if(res == false){
          console.log("ERROR_NO_DELETE_DONE");
        } else{
          console.log("DONE_DELETED");
          this.getAllEmployes();
        }
      }
    )

  }


}
