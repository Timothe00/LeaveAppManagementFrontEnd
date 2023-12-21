import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutText'
})
export class CutTextPipe implements PipeTransform {

  transform(value: string, limit: number): string {
    if (!value) return ''; // Vérifie si la valeur est définie

    if (value.length <= limit) {
      return value; // Renvoie le texte tel quel si sa longueur est inférieure ou égale à la limite
    } else {
      return value.substring(0, limit)+'...'; // coupe le texte et ajoute des points de suspension
    }
  }

}
