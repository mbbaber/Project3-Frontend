import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { MainComponent } from './main/main.component';
import { FlashcardComponent } from './flashcard/flashcard.component';
import { UsersGroupsComponent } from './users-groups/users-groups.component';
import { YourAccountComponent } from './your-account/your-account.component';
import { YourGroupsComponent } from './your-account/your-groups/your-groups.component';
import { YourSubjectsComponent } from './your-account/your-subjects/your-subjects.component';
import { UserAccountComponent } from './your-account/user-account/user-account.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  //main component = user's main page (groups is in drop down menu)

  //{path: 'main/:userId', component: MainComponent},
  { path: 'group/:groupId', component: MainComponent},
  { path: 'my-account/:userId', 
    component: YourAccountComponent,
    children: [
      {path: 'groups', component: YourGroupsComponent},
      {path: 'details', component: UserAccountComponent},
      {path: 'subjects', component: YourSubjectsComponent}
    ]},
  { path: 'main', component: UsersGroupsComponent },


  {path: 'g/:groupId/subject/:subjectId', component: FlashcardComponent},

  //Error Component
  // {path: '**', component: HomepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
