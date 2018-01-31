import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user';
import { UsersPage } from '../users/users';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  private loader: any;

  public user: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private userProvider: UserProvider,
    private alertCtrl: AlertController,
    private iab: InAppBrowser
  ) {

      this.loader = this.loadingCtrl.create({
        content: 'Loading...',
      });

      this.loader.present();

      this.getUser(this.navParams.data);
  }

  private getUser(id: string): void {
    this.userProvider.getUser(id).subscribe(
      (response) => {
        this.user = response.user,
        this.loader.dismiss()
      }
    );
  }

  public toUrl(target) {
    this.iab.create(target, "_system");
  }

  public delete(id): void{

    let alert = this.alertCtrl.create({
      title: `Delete ${this.user.username}?`,
      message: `Are you sure you want to delete ${this.user.username}?
        This action cannot be undone.`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Delete',
          handler: () => {
            this.userProvider.deleteUser(id).subscribe(
              ()=>{
                this.navCtrl.push(UsersPage)
              }
            );
          }
        }
      ]
    });

    alert.present();

  }


}
