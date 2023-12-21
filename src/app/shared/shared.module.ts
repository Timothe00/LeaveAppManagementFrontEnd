import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CutTextPipe } from './cut-text/cut-text.pipe';



@NgModule({
  declarations: [
    CutTextPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CutTextPipe
  ]
})
export class SharedModule { }
