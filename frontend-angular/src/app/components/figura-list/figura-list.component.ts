import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FiguraService, Figura } from '../../services/figura.service';

@Component({
  selector: 'app-figura-list',
  templateUrl: './figura-list.component.html',
  styleUrls: ['./figura-list.component.css']
})
export class FiguraListComponent implements OnInit {
  figuras: Figura[] = [];
  loading = false;
  error: string | null = null;
  success: string | null = null;
  search: string = '';
  page: number = 1;
  pageSize: number = 6;
  pageSizes: number[] = [6, 12, 24];

  figuraAEliminar: Figura | null = null;
  showModal = false;
  loadingDelete = false;

  constructor(
    private figuraService: FiguraService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarFiguras();
    this.route.queryParamMap.subscribe(params => {
      const msg = params.get('msg');
      if (msg) {
        this.success = msg;
        // Limpiar el query param después de mostrar el mensaje
        setTimeout(() => {
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {},
            replaceUrl: true
          });
        }, 100);
      }
    });
    setTimeout(() => {
      console.log('Figuras cargadas:', this.figuras);
    }, 1000);
  }

  onSearchChange() {
    this.page = 1;
  }

  onPageSizeChange() {
    this.page = 1;
  }

  cargarFiguras(): void {
    this.loading = true;
    this.error = null;
    this.success = null;
    this.figuraService.getAll().subscribe({
      next: (figuras) => {
        this.figuras = figuras;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Error al cargar las figuras.';
        this.loading = false;
      }
    });
  }


  irACrear(): void {
    this.router.navigate(['/figuras/nueva']);
  }

  verDetalle(figura: Figura): void {
    if (figura._id) {
      this.router.navigate(['/figuras', figura._id]);
    }
  }

  editarFigura(figura: Figura): void {
    if (figura._id) {
      this.router.navigate(['/figuras/editar', figura._id]);
    }
  }

  eliminar(id: string, nombre?: string): void {
    if (!id) return;
    const confirmado = confirm(`¿Eliminar "${nombre ?? ''}"?`);
    if (!confirmado) return;
    this.loading = true;
    this.error = null;
    this.success = null;
    this.figuraService.delete(id).subscribe({
      next: () => {
        this.success = 'Figura eliminada';
        this.cargarFiguras();
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo eliminar';
        this.loading = false;
      }
    });
  }

  abrirModalEliminar(figura: Figura) {
    this.figuraAEliminar = figura;
    this.showModal = true;
  }

  cerrarModalEliminar() {
    this.showModal = false;
    this.figuraAEliminar = null;
  }

  confirmarEliminar() {
    if (!this.figuraAEliminar || !this.figuraAEliminar._id) return;
    this.loadingDelete = true;
    this.error = null;
    this.success = null;
    this.figuraService.delete(this.figuraAEliminar._id).subscribe({
      next: () => {
        this.success = 'Figura eliminada correctamente.';
        this.cerrarModalEliminar();
        this.cargarFiguras();
        this.loadingDelete = false;
      },
      error: (err: any) => {
        this.error = 'Error al eliminar la figura.';
        this.loadingDelete = false;
      }
    });
  }

  get filtered(): Figura[] {
    if (!this.search) return this.figuras;
    const s = this.search.toLowerCase();
    return this.figuras.filter(f =>
      f.nombre.toLowerCase().includes(s) ||
      f.anime.toLowerCase().includes(s) ||
      (f.personaje && f.personaje.toLowerCase().includes(s))
    );
  }

  get paginated(): Figura[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filtered.length / this.pageSize) || 1;
  }

  setPage(p: number) {
    if (p >= 1 && p <= this.totalPages) {
      this.page = p;
    }
  }

  viewMode: 'cards' | 'table' = 'cards'; // Toggle de vista, por defecto 'cards'
}
