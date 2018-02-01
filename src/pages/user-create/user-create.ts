import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { User } from '../../models/user';
import { UserProvider } from '../../providers/user/user';
import { UserPage } from '../user/user';

@IonicPage()
@Component({
//  selector: 'page-user-create',
//  templateUrl: 'user-create.html',
  template: `
    <div *ngIf="errorMessage"></div>
    <form [formGroup]="user" (ngSubmit)="onSubmit()">
      <ion-item>
        <ion-label>Username</ion-label>
        <ion-input type="text" formControlName="username"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Email</ion-label>
        <ion-input type="text" formControlName="email"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>First Name</ion-label>
        <ion-input type="text" formControlName="first_name"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Last Name</ion-label>
        <ion-input type="text" formControlName="last_name"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Admin</ion-label>
        <ion-select formControlName="admin">
          <ion-option value="false">False</ion-option>
          <ion-option value="true">True</ion-option>
        </ion-select>
      </ion-item>

      <button ion-button type="submit" [disabled]="!user.valid">Submit</button>
    </form>
  `
})
export class UserCreatePage {

  private user : FormGroup;

  public user = new User();
  public errors: Array<any> = [];
  public errorMessage: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private userProvider: UserProvider,
    private toastCtrl: ToastController
  ) {
    this.user = this.formBuilder.group({
      //username: [],
      //email: [],
      username: ['', Validators.required],
      email: ['', Validators.required],
      first_name: [],
      last_name: [],
      admin: [false, Validators.required]
    });
  }

  response(response): void{
    if(response.success===false){
      this.errors = response.error.errors;
      //this.errorMessage = response.error.message;

      //If client validation fails fall back to server validation.
      let toast = this.toastCtrl.create({
        message: response.error.message,
        position: 'top',
        showCloseButton: true,
        closeButtonText: 'Ok'
      });
      toast.present();
    }

    if(response.success===true){
      this.navCtrl.push(UserPage, {
        id: response.user._id
      });
    }
  }


  public onSubmit(): void {
    this.userProvider.createUser(this.user.value).subscribe(
      (response) => {
        this.response(response)
      }
    );
  }

}
