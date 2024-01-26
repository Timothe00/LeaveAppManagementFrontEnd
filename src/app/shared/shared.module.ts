import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CutTextPipe } from './cut-text/cut-text.pipe';
import { SearchfilterPipe } from './searchfilter/searchfilter.pipe';




@NgModule({
  declarations: [
    CutTextPipe,
    SearchfilterPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CutTextPipe,
    SearchfilterPipe
  ]
})
export class SharedModule { }
