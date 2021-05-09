"use strict";
exports.__esModule = true;
exports.Generation = exports.State = void 0;
var State = /** @class */ (function () {
    function State() {
        this.current = 0;
        this.next = 0;
    }
    return State;
}());
exports.State = State;
var Generation = /** @class */ (function () {
    function Generation(x, y) {
        this.x = x;
        this.y = y;
        this.member = new Array(this.x);
        this.addMembers();
    }
    Generation.prototype.addMembers = function () {
        for (var i = 0; i < this.x; i++) {
            this.member[i] = new Array();
            for (var j = 0; j < this.y; j++) {
                this.member[i][j] = new State();
            }
        }
    };
    Generation.prototype.setNextState = function () {
        for (var i = 1; i < this.x - 1; i++) {
            for (var j = 1; j < this.y - 1; j++) {
                this.member[i][j].next = this.getNextState(i, j);
            }
        }
    };
    Generation.prototype.setState = function (i, j, val) {
        this.member[i][j].current = val;
    };
    Generation.prototype.getNextState = function (i, j) {
        var neighbourhood = new Array(this.member[i - 1][j].current, this.member[i + 1][j].current, this.member[i][j - 1].current, this.member[i][j + 1].current, this.member[i - 1][j - 1].current, this.member[i - 1][j + 1].current, this.member[i + 1][j - 1].current, this.member[i + 1][j + 1].current);
        var count = 0;
        var alive;
        if (this.member[i][j].current === 1) {
            alive = true;
        }
        else {
            alive = false;
        }
        for (var k = 0; k < 8; k++) {
            if (neighbourhood[k] === 1) {
                count++;
            }
        }
        if (alive) {
            if (count < 2 || count > 3) {
                return 0;
            }
        }
        else {
            if (count === 3) {
                return 1;
            }
        }
    };
    Generation.prototype.evolve = function () {
        for (var i = 0; i < this.x; i++) {
            for (var j = 0; j < this.y; j++) {
                this.member[i][j].current = this.member[i][j].next;
            }
        }
    };
    Generation.prototype.setInitialState = function (initStates) {
        for (var i = 0; i < initStates.length; i++) {
            this.setState(initStates[i][0], initStates[i][1], 1);
        }
    };
    return Generation;
}());
exports.Generation = Generation;
