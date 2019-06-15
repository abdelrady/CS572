import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UserDetailsComponent } from './user.details.component';
import { RouterModule, Routes } from '@angular/router'
import { DataService } from '../data.service';
import { ValidUserGuard } from './valid.user.guard';

const users_routes = [
  { path: '', component: UsersComponent },
  { path: 'userDetails/:uuid', component: UserDetailsComponent, canActivate: [ValidUserGuard] }];

@NgModule({
  declarations: [UsersComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(users_routes)
  ],
  providers: [DataService, ValidUserGuard]
})
export class UsersModule { }
