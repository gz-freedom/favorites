import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { AppService } from "./app.service";
import { Favorite } from "./favorite";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppService]
})
export class AppComponent implements OnInit {
  title = 'My Favorite';
  favorites: Favorite[] = [];

  constructor(
    private appService: AppService
  ) {}

  ngOnInit() {
    this.appService.getAllFavorites()
        .subscribe((favorites) => {
          this.favorites = favorites;
        });
  }
}
