import { Component, Input, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { create, ellipsisHorizontal, ellipsisVertical, helpCircle, personCircle, search, star } from 'ionicons/icons';


@Component({
  selector: 'app-toolbar-header',
  templateUrl: './toolbar-header.component.html',
  styleUrls: ['./toolbar-header.component.scss'],
})
export class ToolbarHeaderComponent {

  @Input() title: string;

  constructor() {
    addIcons({ create, ellipsisHorizontal, ellipsisVertical, helpCircle, personCircle, search, star });
  }

}
