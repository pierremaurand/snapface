import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  exports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
})
export class CoreModule {}
