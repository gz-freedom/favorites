import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Favorite } from "../favorite";
import { Tag } from "../tag";
import { AppService } from "../app.service";

@Component({
  selector: 'app-add-favorite',
  templateUrl: './add-favorite.component.html',
  styleUrls: ['./add-favorite.component.scss']
})

export class AddFavoriteComponent {
  newFavorite: Favorite = new Favorite();
  @Input() favorites: Favorite[] = [];
  @Input() allTags: Tag[] = [];

  @Output() onAddFavorite = new EventEmitter<Favorite>();

  constructor(
    private appService: AppService
  ) { }

  addFavorite() {
    this.newFavorite.id = this.favorites[this.favorites.length - 1].id + 1;
    this.newFavorite.read = false;
    this.appService.addFavorite(this.newFavorite)
        .subscribe(newFavorite => {
          this.onAddFavorite.emit(newFavorite);
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
        this.appService.addTag(tag).subscribe(newTag => null);
      }
    });
    
    this.newFavorite = new Favorite();
  }

}
