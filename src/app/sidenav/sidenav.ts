import { Component, HostBinding } from '@angular/core';
import { SidenavLink } from '../sidenav-link/sidenav-link';
import { SidenavService } from '../sidenavService';
import { Divider } from '../shared/components/divider/divider';

@Component({
  selector: 'app-side-bar',
  imports: [SidenavLink, Divider],
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.scss'],
  standalone: true,
})
export class Sidenav {
  constructor(public sidenavService: SidenavService) {}

  @HostBinding('class.is-expanded')
  get isExpanded() {
    return this.sidenavService.isExpanded;
  }
}
