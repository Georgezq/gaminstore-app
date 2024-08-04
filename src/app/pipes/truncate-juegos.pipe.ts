import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateJuegos',
  standalone: true
})
export class TruncateJuegosPipe implements PipeTransform {

  transform(value: string, limit: number = 100, completeWords: boolean = false, ellipsis: string = '...'): string {
    if (!value) return '';

    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
    }

    return value.length > limit ? value.substr(0, limit) + ellipsis : value;
  }

}
