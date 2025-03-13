import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private recommendations: { [key: string]: string } = {
    'comunicación': 'Curso de comunicación efectiva',
    'liderazgo': 'Curso de liderazgo y gestión de equipos',
    'default': 'Explora nuestros cursos personalizados'
  };

  getRecommendation(skills: string): string {
    const skillList = skills.toLowerCase().split(',').map(s => s.trim());
    for (const skill of skillList) {
      if (this.recommendations[skill]) {
        return this.recommendations[skill];
      }
    }
    return this.recommendations['default'];
  }
}