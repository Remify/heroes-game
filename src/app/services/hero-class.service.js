"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var hero_class_1 = require("../models/hero-class");
var HeroClassService = (function () {
    function HeroClassService(firebase) {
        this.heroes = firebase.database.list('/heroes', hero_class_1.HeroClass);
    }
    HeroClassService.prototype.createHero = function (hero) {
        return this.heroes.push(hero);
    };
    HeroClassService.prototype.removeHero = function (hero) {
        return this.heroes.remove(hero.$key);
    };
    HeroClassService.prototype.updateHero = function (hero, changes) {
        return this.heroes.update(hero.$key, hero);
    };
    HeroClassService = __decorate([
        core_1.Injectable()
    ], HeroClassService);
    return HeroClassService;
}());
exports.HeroClassService = HeroClassService;
