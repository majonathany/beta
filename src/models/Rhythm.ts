export enum TimeSignature {
    FourFour, ThreeFour, SixEight, FiveFour, TwoFour, TwoTwo
}

export type Time = string

export type Duration = string

export type TimeWithDuration = {
    time: Time,
    duration: Duration
}

export class RhythmGenerator {
    private measure: number;
    private beat: number;
    private sixteenth: number;

    constructor() {
        this.measure = 0;
        this.beat = 0;
        this.sixteenth = 0;
    }


    public *generateFourth(): Generator<TimeWithDuration> {
        let measure = 0;
        let beat = 0;
        let sixteeth = 0;

        while(true) {
            if (this.beat > 3) {
                this.measure += 1;
                this.beat += 1;
            }

            yield this.writeDuration()
        }
    }

    public *generateSixteenth():

    private writeDuration(): string {
        return `${this.measure}:${this.beat}:${this.sixteenth}`
    }
}

export class Rhythm {
    public generateOrdinary(chords) {

    },


}
