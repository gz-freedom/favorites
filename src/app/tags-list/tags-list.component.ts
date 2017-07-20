import { Component, OnInit } from '@angular/core';
import { AppService } from "../app.service";
import { Tag } from "../tag";

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss'],
  providers: [AppService]
})
export class TagsListComponent implements OnInit {
  tags: Tag[] = [];
  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    this.appService.getAllTags()
        .subscribe(tags => {
          this.tags = tags;
        });
  }

}
