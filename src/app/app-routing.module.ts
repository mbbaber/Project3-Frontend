import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { MainComponent } from './main/main.component';
import { FlashcardComponent } from './flashcard/flashcard.component';
import { UsersGroupsComponent } from './users-groups/users-groups.component';
import { YourAccountComponent } from './your-account/your-account.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  //main component = user's main page (groups is in drop down menu)

  //{path: 'main/:userId', component: MainComponent},
  {path: 'group/:groupId', component: MainComponent},
  {path: 'my-account', component: YourAccountComponent },
  {path: 'main', component: UsersGroupsComponent },

<<<<<<< HEAD
  {path: 'flashcard', component: FlashcardComponent}
=======

  {path: 'subject/:subjectId', component: FlashcardComponent},
>>>>>>> 9b5b327c9ed33da4ed2e4d684c890f4f36835b6c

  //Error Component
  //{path: '**', component: },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
