import { NgModule } from '@angular/core';
import { VndFormatPipe } from './vnd-format.pipe';

export const PIPES = [
    VndFormatPipe
];

@NgModule({
  declarations: [...PIPES],
  imports: [],
  exports: [...PIPES],
})
export class PipesModule {}
