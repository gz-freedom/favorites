import { Component, OnInit } from '@angular/core';
import { Favorite } from "../favorite";
import { Tag } from "../tag";
import { AppService } from "../app.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [AppService]
})
export class HomeComponent implements OnInit {

  favorites: Favorite[] = [];
  allTags: Tag[] = [];
  newFavorite: Favorite = new Favorite();

  constructor(
    private appService: AppService
  ) {}

  ngOnInit() {
    this.appService.getAllFavorites()
        .subscribe(favorites => {
          this.favorites = favorites;
        });
    this.appService.getAllTags()
        .subscribe(tags => {
          this.allTags = tags;
        });
  }
  
  addFavorite() {
    this.newFavorite.id = this.favorites[this.favorites.length - 1].id + 1;
    this.newFavorite.read = false;
    this.appService.addFavorite(this.newFavorite)
        .subscribe(newFavorite => {
          this.favorites = this.favorites.concat(newFavorite);
        });
    // add tags or update tag
    this.newFavorite.tags.split(",").forEach(tagName => {
      let isExist = false;
      for(let i = 0, len = this.allTags.length; i < len; i++) {
        let thisTag = this.allTags[i];
        if(thisTag.name.toLowerCase() === tagName.trim().toLowerCase()) {
          // exists, then update tag
          thisTag.articleIds.push(this.newFavorite.id);
          this.appService.updateTag(thisTag).subscribe(updatedTag => {
            thisTag = updatedTag;
          });
          isExist = true;
          break;
        }
      }
      if(!isExist) {
        let tag: Tag = new Tag({
          id: this.allTags.length,
          articleIds: [this.newFavorite.id],
          name: tagName.trim()
        });
        this.appService.addTag(tag).subscribe(newTag => this.allTags.concat(newTag));
      }
    });
    
    this.newFavorite = new Favorite();
  }

}
