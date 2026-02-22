import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dashboard } from './Dashboard/Dashboard';
import { Home } from './home/home';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Dashboard, Home],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'expense-tracker-2.0';
}
