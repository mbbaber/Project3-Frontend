import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/operator/toPromise';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MainComponent } from './main/main.component';
import { FlashcardComponent } from './flashcard/flashcard.component';
import { GroupsService } from './api/groups.service';
import { SubjectsService } from './api/subjects.service';



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    MainComponent,
    FlashcardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule
  ],
  providers: [GroupsService, SubjectsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
