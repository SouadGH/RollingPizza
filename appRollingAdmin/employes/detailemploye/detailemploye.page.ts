import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detailemploye',
  templateUrl: './detailemploye.page.html',
  styleUrls: ['./detailemploye.page.scss'],
})
export class DetailemployePage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }
}
