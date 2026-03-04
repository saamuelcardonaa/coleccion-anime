import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FiguraService, Figura } from '../../services/figura.service';

@Component({
  selector: 'app-figura-detail',
  templateUrl: './figura-detail.component.html',
  styleUrls: ['./figura-detail.component.css']
})
export class FiguraDetailComponent implements OnInit {
  figura: Figura | null = null;
  loading = false;
  error: string | null = null;
  showModal = false;
  loadingDelete = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private figuraService: FiguraService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.figuraService.getById(id).subscribe({
        next: (fig) => {
          this.figura = fig;
          this.loading = false;
        },
        error: () => {
          this.error = 'No se pudo cargar la figura.';
          this.loading = false;
        }
      });
    } else {
      this.error = 'ID no válido.';
    }
  }

  volver(): void {
    this.router.navigate(['/figuras']);
  }

  editar(): void {
    if (this.figura && this.figura._id) {
      this.router.navigate(['/figuras/editar', this.figura._id]);
    }
  }

  confirmarEliminar() {
    if (!this.figura || !this.figura._id) return;
    if (!confirm(`¿Eliminar "${this.figura.nombre}"?`)) return;
    this.loadingDelete = true;
    this.figuraService.delete(this.figura._id).subscribe({
      next: () => {
        this.loadingDelete = false;
        this.router.navigate(['/figuras'], { queryParams: { msg: 'Figura eliminada correctamente.' } });
      },
      error: () => {
        this.error = 'Error al eliminar la figura.';
        this.loadingDelete = false;
      }
    });
  }
}
