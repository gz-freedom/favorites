import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
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
  favorites: Favorite[] = [];
  allTags: Tag[] = [];
  newCollection: Collection = new Collection();
  collections: Collection[] = [];
  addForm: FormGroup;
  selectedCollectionId: number = 0;

  constructor(
    private appService: AppService,
    private titleService: Title,
    fb: FormBuilder
  ) {
    this.addForm = fb.group({
      "favTitle": [null, Validators.required],
      "favUrl": [null, Validators.required],
      "favTags": [null, Validators.required]
    });
  }

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
    let newFavorite = new Favorite({
      read: false,
      title: this.addForm.value.favTitle,
      url: this.addForm.value.favUrl,
      tags: this.addForm.value.favTags
    });
    this.appService.addFavorite(newFavorite)
      .subscribe(newFav => {
        this.favorites.concat(newFav);

        // update collection if select any
        if(this.selectedCollectionId) {
          let selectedCollection = this.collections.filter(collection => collection.id === +this.selectedCollectionId).pop();
          selectedCollection.articleIds.push(newFav.id);
          this.appService.updateCollection(selectedCollection).subscribe();
        }

        //add tags or update tag
        newFav.tags.split(",").forEach(tagName => {
          let isExist = false;
          for(let i = 0, len = this.allTags.length; i < len; i++) {
            let thisTag = this.allTags[i];
            if(thisTag.name.toLowerCase() === tagName.trim().toLowerCase()) {
              // exists, then update tag
              thisTag.articleIds.push(newFav.id);
              this.appService.updateTag(thisTag).subscribe(updatedTag => {
                thisTag = updatedTag;
              });
              isExist = true;
              break;
            }
          }
          if(!isExist) {
            let tag: Tag = new Tag({
              articleIds: [newFav.id],
              name: tagName.trim()
            });
            this.appService.addTag(tag).subscribe();
          }
        });
        
        this.addForm.reset();
        this.selectedCollectionId = 0;
      });
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