import { Component, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { Favorite } from "../favorite";
import { Tag } from "../tag";
import { AppService } from "../app.service";

@Component({
  selector: 'app-add-favorite',
  templateUrl: './add-favorite.component.html',
  styleUrls: ['./add-favorite.component.scss'],
  providers: [AppService]
})

export class AddFavoriteComponent implements OnInit {
  newFavorite: Favorite = new Favorite();
  favorites: Favorite[] = [];
  allTags: Tag[] = [];
  searchKeyword: string = "";
  matchedFavorites: Favorite[] = [];
  selectedFavorites: Favorite[] =[];
  allCheckBoxes: HTMLInputElement[];
  linkedFavorites: number[] = [];

  constructor(
    private appService: AppService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.appService.getAllFavorites()
      .subscribe(favorites => this.favorites = favorites);
    this.appService.getAllTags()
      .subscribe(tags => {
        this.allTags = tags;
      });
  }

  addFavorite() {
    this.newFavorite.id = this.favorites[this.favorites.length - 1].id + 1;
    this.newFavorite.read = false;
    this.selectedFavorites.forEach(fav => {
      this.linkedFavorites.push(fav.id);
    });
    this.linkedFavorites.push(this.newFavorite.id);
    this.newFavorite.linked = this.linkedFavorites;

    // need to update other linked favorites' linked property
    this.selectedFavorites.forEach(fav => {

      fav.linked = this.linkedFavorites;
      this.appService.updateFavorite(fav).subscribe();
    });

    this.appService.addFavorite(this.newFavorite)
      .subscribe(newFavorite => {
        this.favorites.concat(newFavorite);
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
    this.searchKeyword = "";
    this.selectedFavorites.length = 0;
    this.matchedFavorites.length = 0;
  }

  onKeyUpSearchFavorite() {
    this.appService.getAllFavorites()
      .subscribe(favorites => {
        this.matchedFavorites.length = 0;
        if(this.searchKeyword === "") { return; }
        favorites.forEach(fav => {
          if(fav.title.toLowerCase().includes(this.searchKeyword.toLowerCase())) {
            this.matchedFavorites.push(fav);
          }
        });
      });
  }
  
  selectMatchedFavorite(event: Event, fav: Favorite) {
    let inputTarget = <HTMLInputElement>event.target;
    if(inputTarget.checked) {
      this.selectedFavorites.push(fav);
    } else {
      this.selectedFavorites = this.selectedFavorites.filter(selectedFav => {
        return selectedFav.id !== fav.id;
      });
    }
  }

  removeSelectedFavorite(favId: number) {
    let idx = this.selectedFavorites.findIndex(fav => {
      return fav.id === favId;
    });
    this.selectedFavorites.splice(idx, 1);
    this.allCheckBoxes = this.elementRef.nativeElement.querySelectorAll(".fav-checkbox");
    this.allCheckBoxes.forEach(checkbox => {
      if(+checkbox.value === favId) {
        checkbox.checked = false;
      }
    });
  }
}
