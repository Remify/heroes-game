export class Item {
  key? :string;
  name :string;
  attaque: number;
  defense: number;
  move: number;
  hp: number;

  constructor(data :any) {
    this.key = data.$key || '';
    this.name = data.name || '';
    this.attaque = data.attaque || 0;
    this.defense = data.defense || 0;
    this.move = data.move || 0;
    this.hp = data.hp ||  0;

  }

  // Ajout à une propriété +1 et enlèev aléatoirement -1
  plus(property :string) {
    this[property]++;

    let otherProperties = Object.keys(this).filter(key => key != 'name').filter(key => key != 'key').filter(key => key != property ); // On enlève la propriété name & key
    let randomProperty = otherProperties[Math.floor(Math.random()*otherProperties.length)];
    this[randomProperty]--;
  }

  // Enlève -1 à une propriété et Ajouté +1 à une autre propriété aléatoire
  minus(property :string) {
    this[property]--;

    let otherProperties = Object.keys(this).filter(key => key != 'name').filter(key => key != 'key').filter(key => key != property ); // On enlève la propriété name & key
    let randomProperty = otherProperties[Math.floor(Math.random()*otherProperties.length)];
    this[randomProperty]++;
  }


}
