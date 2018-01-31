import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UsersPage } from '../pages/users/users';
import { UserPage } from '../pages/user/user';
import { UserCreatePage } from '../pages/user-create/user-create';

import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserProvider } from '../providers/user/user';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UsersPage,
    UserPage,
    UserCreatePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],

  entryComponents: [
    MyApp,
    HomePage,
    UsersPage,
    UserPage,
    UserCreatePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    InAppBrowser
  ]
})
export class AppModule {}
