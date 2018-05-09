import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  //main component = user's main page with list of subjects
  {path: 'main', component: MainComponent},
  //flashcard page
  //{path: '/phone/:blahId', component: },
  
  //Error Component
  //{path: '**', component: },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
