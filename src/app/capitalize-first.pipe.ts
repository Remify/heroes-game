import { Pipe, PipeTransform } from '@angular/core';
/**
 * Pipe pour Capitalize la premiere lettre d'une chaine
 * Prend une chaine en paramètre
 * Usage:
 *  value | capitalizefirst
 *  https://scotch.io/tutorials/create-a-globally-available-custom-pipe-in-angular-2
 */
@Pipe(
  {name: 'capitalizefirst'}
  )
export class CapitalizeFirstPipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) return value;

    return value.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}
