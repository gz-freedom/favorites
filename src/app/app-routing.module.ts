import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { FavoritesListComponent } from "./favorites-list/favorites-list.component";
import { FavoriteDetailComponent } from './favorite-detail/favorite-detail.component';
import { TagsListComponent } from "./tags-list/tags-list.component";
import { TagDetailComponent } from "./tag-detail/tag-detail.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: []
  },
  {
    path: 'favorites',
    component: FavoritesListComponent
  },
  {
    path: 'detail/:id',
    component: FavoriteDetailComponent
  },
  {
    path: 'tags',
    component: TagsListComponent
  },
  {
    path: 'tag/:id',
    component: TagDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
