import { Component, EventEmitter, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Favorite } from "../favorite";
import { Tag } from "../tag";
import { Collection } from "../collection";
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
  newCollection: Collection = new Collection();
  collections: Collection[] = [];

  constructor(
    private appService: AppService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.appService.getAllFavorites()
      .subscribe(favorites => this.favorites = favorites);
    this.appService.getAllTags()
      .subscribe(tags => {
        this.allTags = tags;
      });
    this.appService.getCollections()
      .subscribe(collections => {
        this.collections = collections;
      });
    this.titleService.setTitle("Add Favorite");
  }

  addFavorite() {
    this.newFavorite.read = false;

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
        this.appService.addTag(tag).subscribe(newTag => {
          location.reload();
        });
      }
    });
    
    this.newFavorite = new Favorite();
  }

  addCollection() {
    this.newCollection.articleIds = [];
    this.appService.addCollection(this.newCollection)
      .subscribe(newCollection => {
        this.collections.push(newCollection);
        this.newCollection = new Collection();
      });
  }
}