import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './shared/components/auth/auth.component';
import { UsersComponent } from './shared/components/users/users.component';
import { UserFormComponent } from './shared/components/users/user-form/user-form.component';
import { UserComponent } from './shared/components/users/user/user.component';
import { ProductsComponent } from './shared/components/products/products.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { HomeComponent } from './shared/components/home/home.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { UserRoleGuard } from './shared/guards/user-role.guard';
import { NewUserResolver } from './shared/resolver/new-user.resolver';
import { CanDeactiveGuard } from './shared/guards/can-deactive.guard';
import { ProductComponent } from './shared/components/product/product.component';

const routes: Routes = [
  {
    path : 'home',
    component : HomeComponent,
      data : {
    userRoles : ['buyer','admin','superAdmin']
    }
  },
  {
    path : '',
    component : AuthComponent,
    pathMatch : 'full'
  },
  {
    path : 'users',
    component : UsersComponent,
    canActivate : [AuthGuard,UserRoleGuard],
    resolve : {
      users : NewUserResolver
    },
    data : {
    userRoles : ['buyer']
    },
    children : [
      {
        path :'addUser',
        component : UserFormComponent
      },
      {
        path : ':userId',
        component : UserComponent,
        resolve : {
        user : NewUserResolver
      }
      },
      {
        path : ':userId/edit',
        component : UserFormComponent,
        // canDeactivate : [CanDeactiveGuard]
      }
    ]
  },
   {
    path : 'products',
    component : ProductsComponent,
    canActivate : [AuthGuard,UserRoleGuard],
     data : {
    userRoles : ['buyer','admin','superAdmin']
    }
  },
  {
    path: 'products/:_id',
    component: ProductComponent,
  }
  // {
  //   path : 'page-not-found',
  //   component : PageNotFoundComponent
  // },
  // {
  //   path : '**',
  //   redirectTo : 'page-not-found'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
