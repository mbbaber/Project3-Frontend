import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { MainComponent } from './main/main.component';
import { FlashcardComponent } from './flashcard/flashcard.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  //main component = user's main page (groups is in drop down menu)
  //{path: 'main/:userId', component: MainComponent},

  {path: 'group/:groupId', component: MainComponent},


  {path: 'flashcard', component: FlashcardComponent},

  //Error Component
  //{path: '**', component: },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
