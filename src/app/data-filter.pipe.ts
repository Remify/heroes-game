import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";
@Pipe({
  name: 'dataFilter'
})

/**
 * Filtre les éléments d'un tableau sur la propriété name
 */
export class DataFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, row=>row.name.indexOf(query) > -1);
    }
    return array;
  }

}
