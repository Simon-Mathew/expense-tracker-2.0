import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidenav-link',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidenav-link.html',
  styleUrls: ['./sidenav-link.scss'],
  standalone: true,
})
export class SidenavLink {
  @Input()
  routerLink?: string;

  // @Input()
  // routerLinkActiveOptions?: { exact: boolean };
}
