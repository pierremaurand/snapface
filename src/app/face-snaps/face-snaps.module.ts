import { NgModule } from '@angular/core';
import {CommonModule, UpperCasePipe} from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UpperCasePipe
  ],
  exports: [
    UpperCasePipe
  ]
})
export class FaceSnapsModule { }
