import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  // 🚀 L'import de RouterModule est la clé pour corriger l'erreur NG8001
  imports: [RouterModule], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  // Le composant racine ne gère plus les données.
  // Il sert uniquement de "cadre" pour la navigation.
}