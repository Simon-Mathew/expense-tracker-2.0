import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Sidenav } from '../app/pages/sidenav/sidenav';
import { SidenavService } from './shared/services/sidenavService';
import { Card } from '../../src/app/shared/components/card/card';
import { Divider } from './shared/components/divider/divider';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Dashboard, Sidenav, Card, Divider],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'expense-tracker-2.0';

  constructor(public sidenavService: SidenavService) {}
}
