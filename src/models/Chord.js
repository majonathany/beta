import { DenormalizedNote, Note, } from './Note';
export var ChordType;
(function (ChordType) {
    ChordType["Major"] = "Major";
    ChordType["Minor"] = "Minor";
    ChordType["Diminished"] = "Diminished";
    ChordType["Augmented"] = "Augmented";
})(ChordType || (ChordType = {}));
export class Chord {
    constructor(rootNote) {
        this.root = { note: DenormalizedNote[rootNote.note], octave: rootNote.octave };
        this.pitches = {};
        this.initializeRootPosition();
    }
    toJson() {
        return { root: this.root, pitches: this.pitches };
    }
    initializeRootPosition() {
        this.pitches[this.root.note] = new Set([{ degree: 1, dOctave: 0 }]);
        this.pitches[Note.majorThird(this.root).note] = new Set([{ degree: 3, dOctave: 0 }]);
        this.pitches[Note.perfectFifth(this.root).note] = new Set([{ degree: 5, dOctave: 0 }]);
    }
    initializeFirstInversion() { }
    initializeSecondInversion() { }
    initializeByIntervalGroup(group) { }
    get isMajor() {
        return true;
    }
    get isMinor() {
        return true;
    }
    get isDiminished() {
        return true;
    }
    get isAugmented() {
        return true;
    }
    get degrees() {
        return new Set([1, 3, 5]);
    }
}
//# sourceMappingURL=Chord.js.map