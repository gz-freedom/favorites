import { Component, OnInit } from '@angular/core';
import { Favorite } from "../favorite";
import { AppService } from "../app.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [AppService]
})
export class HomeComponent implements OnInit {

  favorites: Favorite[] = [];
  tags: string[] = [];
  newFavorite: Favorite = new Favorite();

  constructor(
    private appService: AppService
  ) {}

  ngOnInit() {
    this.appService.getAllFavorites()
        .subscribe(favorites => {
          this.favorites = favorites;
        });
  }
  
  addFavorite() {
    this.newFavorite.id = this.favorites[this.favorites.length - 1].id + 1;
    this.newFavorite.read = false;
    this.appService.addFavorite(this.newFavorite)
        .subscribe(newFavorite => {
          this.favorites = this.favorites.concat(newFavorite);
        });
    // check whether need to add tags
    this.newFavorite.tags.split(",").forEach(tag => {
      if(!this.tags.includes(tag.trim())) {
        //this.appService.addTag(tag).subscribe(newTag => {
          //this.tags = this.tags.concat(newTag);
        //});
      }
    });
    
    this.newFavorite = new Favorite();
  }

}
