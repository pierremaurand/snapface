import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoreModule } from '../../core.module';

@Component({
  selector: 'app-header',
  imports: [CoreModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private router: Router) {}

  onCreateFaceSnap() {
    this.router.navigateByUrl('/create');
  }
}
