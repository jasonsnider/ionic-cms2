import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user';

import { UserPage } from '../user/user';
import { UserCreatePage } from '../user-create/user-create';

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage {

  private loader: any;

  public users: User;
  public toUser = UserPage;
  public toUserCreate = UserCreatePage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider,
    public loadingCtrl: LoadingController
  ) {
    this.loader = this.loadingCtrl.create({
      content: 'Loading...',
    });

    this.loader.present();
    this.getUsers();
  }

  private getUsers(): void {
    this.userProvider.getUsers().subscribe(
      (response) => {
        this.users = response.users,
        this.loader.dismiss()
      }
    );
  }

}
