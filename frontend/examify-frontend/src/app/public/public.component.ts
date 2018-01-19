import { Component, OnInit } from '@angular/core';

import { Topic } from "../../common/entity/topic.entity";
import { PublicService } from "./public.service";


@Component({
  selector: 'ex-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  private topics: Topic[];

  constructor(private publicService: PublicService) { }

  public ngOnInit() {
    this.publicService.getAllTopics()
      .subscribe((topics: Topic[]) => {
        this.topics = topics;
      });
  }

}
