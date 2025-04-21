import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, JsonPipe } from '@angular/common'; // Importa estos módulos

@Component({
  selector: 'app-root',
  standalone: true, // Asegúrate que está como standalone
  imports: [CommonModule, HttpClientModule, JsonPipe], // Añade estos imports
  template: `
    <h1>Estado de conexión:</h1>
    <p>{{ connectionStatus }}</p>
    <pre>{{ apiResponse | json }}</pre>
  `,
})
export class AppComponent implements OnInit {
  connectionStatus = "Probando conexión...";
  apiResponse: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:8081/api/propiedades').subscribe({
      next: (response) => {
        this.connectionStatus = "Conexión exitosa con el backend";
        this.apiResponse = response;
      },
      error: (error) => {
        this.connectionStatus = "Error de conexión con el backend";
        this.apiResponse = error;
      }
    });
  }
}