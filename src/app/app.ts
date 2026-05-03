import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dashboard } from '../app/pages/dashboard/Dashboard';
import { Sidenav } from '../app/pages/sidenav/sidenav';
import { SidenavService } from './shared/services/sidenavService';
import { Card } from '../../src/app/shared/components/card/card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Dashboard, Sidenav, Card],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'expense-tracker-2.0';

  constructor(public sidenavService: SidenavService) {}
}
