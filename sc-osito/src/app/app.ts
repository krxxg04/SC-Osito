import { Component } from '@angular/core';
import { CalculadoraComponent } from './calculadora/calculadora.component';

@Component({
  selector: 'app-root',
  imports: [CalculadoraComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
