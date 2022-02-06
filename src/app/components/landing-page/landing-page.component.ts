import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  game_name: string;
  description: string;
  constructor(private uts: UtilitiesService) { 
    this.game_name = this.uts.game_name;
    this.description = this.uts.description;

  }

  ngOnInit(): void {
  }

}
