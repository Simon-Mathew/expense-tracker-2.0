import { Component } from '@angular/core';
import { SidenavLink } from '../sidenav-link/sidenav-link';
import { SidenavService } from '../sidenav';

@Component({
  selector: 'app-side-bar',
  imports: [SidenavLink],
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.scss'],
  standalone: true,
})
export class Sidenav {
  constructor(public sidenavService: SidenavService) {}
}
