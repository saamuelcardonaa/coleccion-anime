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
}
