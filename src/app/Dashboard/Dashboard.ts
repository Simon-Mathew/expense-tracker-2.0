import { Component } from '@angular/core';
import { Card } from '../../../public/components/card/card';
import { Divider } from '../../../public/components/divider/divider';

@Component({
  selector: 'app-header',
  imports: [Card, Divider],
  templateUrl: './Dashboard.html',
  styleUrl: './Dashboard.scss',
})
export class Dashboard {}
