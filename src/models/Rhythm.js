export var TimeSignature;
(function (TimeSignature) {
    TimeSignature[TimeSignature["FourFour"] = 0] = "FourFour";
    TimeSignature[TimeSignature["ThreeFour"] = 1] = "ThreeFour";
    TimeSignature[TimeSignature["SixEight"] = 2] = "SixEight";
    TimeSignature[TimeSignature["FiveFour"] = 3] = "FiveFour";
    TimeSignature[TimeSignature["TwoFour"] = 4] = "TwoFour";
    TimeSignature[TimeSignature["TwoTwo"] = 5] = "TwoTwo";
})(TimeSignature || (TimeSignature = {}));
export class RhythmGenerator {
    constructor() {
        this.measure = 0;
        this.beat = 0;
        this.sixteenth = 0;
    }
    *generateFourth() {
        let measure = 0;
        let beat = 0;
        let sixteeth = 0;
        while (true) {
            if (this.beat > 3) {
                this.measure += 1;
                this.beat += 1;
            }
            yield this.writeDuration();
        }
    }
    writeDuration() {
        return `${this.measure}:${this.beat}:${this.sixteenth}`;
    }
}
export class Rhythm {
    generateOrdinary(chords) {
    }
}
//# sourceMappingURL=Rhythm.js.map