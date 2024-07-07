import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vndFormat'
})
export class VndFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (value) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    }
    return '';
  }
}