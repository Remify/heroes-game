"use strict";
var HeroClass = (function () {
    function HeroClass(totalPoint) {
        this.$key;
        this.name = "";
        this.totalPoint = totalPoint;
        this.attaquePoint = 0;
        this.defensePoint = 0;
        this.movePoint = 0;
        this.cost = 0;
        this.hp = 0;
    }
    return HeroClass;
}());
exports.HeroClass = HeroClass;
