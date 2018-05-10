import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/operator/toPromise';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MainComponent } from './main/main.component';
import { UserService } from './services/user.service';

import { FlashcardComponent } from './flashcard/flashcard.component';
import { YourAccountComponent } from './your-account/your-account.component';



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    MainComponent,
    FlashcardComponent,
    YourAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    FormsModule
  ],
  providers: [ UserService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
