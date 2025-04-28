// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [CommonModule, RouterModule], 
  templateUrl: './app.components.html',
  styleUrl: './app.components.css'
})
export class AppComponent {}
