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
import { CreateNewSubjectComponent } from './create-new-subject/create-new-subject.component';
import { AuthenticationService } from './api/authentication.service';
import { AdminAuthenticateService } from './api/admin-authenticate.service';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  //main component = user's main page (groups is in drop down menu)
  { path: 'group/:groupId', 
    component: MainComponent,
    canActivate: [AuthenticationService]},
  { path: 'my-account/:userId', 
    component: YourAccountComponent,
    canActivate: [AuthenticationService],
    children: [
      {path: 'groups', component: YourGroupsComponent, canActivate: [AuthenticationService]},
      {path: 'details', component: UserAccountComponent, canActivate: [AuthenticationService]},
      {path: 'subjects', component: YourSubjectsComponent, canActivate: [AuthenticationService]}
    ]},
  { path: 'main', 
    component: UsersGroupsComponent, 
    canActivate: [AuthenticationService] },
  { path: 'new-subject/:subId', 
    component: CreateNewSubjectComponent, 
    canActivate: [AuthenticationService] },


  {path: 'g/:groupId/subject/:subjectId', 
    component: FlashcardComponent, 
    canActivate: [AuthenticationService]},

  //Error Component
  // {path: '**', component: HomepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
