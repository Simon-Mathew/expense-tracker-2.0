import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dashboard } from './dashboard/Dashboard';
import { Sidenav } from './sidenav/sidenav';
import { SidenavService } from './sidenavService';
import { Card } from '../../public/components/card/card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Dashboard, Sidenav, Card],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'expense-tracker-2.0';

  // sidenavService = inject(SidenavService);
  constructor(public sidenavService: SidenavService) {}
}
