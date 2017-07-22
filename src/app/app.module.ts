import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { ArrayToString } from './app.pipe';
import { FavoriteDetailComponent } from './favorite-detail/favorite-detail.component';
import { HomeComponent } from './home/home.component';
import { TagsListComponent } from './tags-list/tags-list.component';
import { TagDetailComponent } from './tag-detail/tag-detail.component';
import { AddFavoriteComponent } from './add-favorite/add-favorite.component';
import { FavoritesListComponent } from './favorites-list/favorites-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ArrayToString,
    FavoriteDetailComponent,
    HomeComponent,
    TagsListComponent,
    TagDetailComponent,
    AddFavoriteComponent,
    FavoritesListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})

export class AppModule { }
