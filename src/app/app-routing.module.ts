import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { MainComponent } from './main/main.component';
import { FlashcardComponent } from './flashcard/flashcard.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  //main component = user's main page with list of subjects (groups is in drop down menu)
  {path: 'main', component: MainComponent},
  //flashcard page
  {path: 'flashcard', component: FlashcardComponent},

  //Error Component
  //{path: '**', component: },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
