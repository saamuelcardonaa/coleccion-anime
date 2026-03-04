import { Component } from '@angular/core';
import { FiguraService } from '../../services/figura.service';

@Component({
  selector: 'app-jikan-search',
  templateUrl: './jikan-search.component.html'
})
export class JikanSearchComponent {
  nombreAnime = '';
  resultados: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private figuraService: FiguraService) {}

  buscar() {
    if (!this.nombreAnime.trim()) return;
    this.loading = true;
    this.error = null;
    this.resultados = [];
    this.figuraService.jikanSearch(this.nombreAnime).subscribe({
      next: (res) => {
        this.resultados = Array.isArray(res) ? res : (res.results || []);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al buscar en Jikan API.';
        this.loading = false;
      }
    });
  }
}
