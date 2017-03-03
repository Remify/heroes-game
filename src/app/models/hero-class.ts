export class HeroClass {
  $key?: string;
  name :string;
  totalPoint :number;
  attaquePoint :number;
  defensePoint :number;
  movePoint :number;
  cost :number;
  hp :number;



  constructor(totalPoint: number) {
    this.$key;
    this.name = "";
    this.totalPoint = totalPoint;
    this.attaquePoint = 0;
    this.defensePoint = 0;
    this.movePoint = 0;
    this.cost = 0;
    this.hp = 0;
  }

}
