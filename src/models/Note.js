export var DenormalizedNote;
(function (DenormalizedNote) {
    DenormalizedNote["Ab"] = "Ab";
    DenormalizedNote["A"] = "A";
    DenormalizedNote["A#"] = "A#";
    DenormalizedNote["Bb"] = "Bb";
    DenormalizedNote["B"] = "B";
    DenormalizedNote["B#"] = "B#";
    DenormalizedNote["Cb"] = "Cb";
    DenormalizedNote["C"] = "C";
    DenormalizedNote["C#"] = "C#";
    DenormalizedNote["Db"] = "Db";
    DenormalizedNote["D"] = "D";
    DenormalizedNote["D#"] = "D#";
    DenormalizedNote["Eb"] = "Eb";
    DenormalizedNote["E"] = "E";
    DenormalizedNote["E#"] = "E#";
    DenormalizedNote["Fb"] = "Fb";
    DenormalizedNote["F"] = "F";
    DenormalizedNote["F#"] = "F#";
    DenormalizedNote["Gb"] = "Gb";
    DenormalizedNote["G"] = "G";
    DenormalizedNote["G#"] = "G#";
})(DenormalizedNote || (DenormalizedNote = {}));
export var NormalizedNote;
(function (NormalizedNote) {
    NormalizedNote["Ab"] = "Ab";
    NormalizedNote["A"] = "A";
    NormalizedNote["Bb"] = "Bb";
    NormalizedNote["B"] = "B";
    NormalizedNote["C"] = "C";
    NormalizedNote["Db"] = "Db";
    NormalizedNote["D"] = "D";
    NormalizedNote["Eb"] = "Eb";
    NormalizedNote["E"] = "E";
    NormalizedNote["F"] = "F";
    NormalizedNote["Gb"] = "Gb";
    NormalizedNote["G"] = "G";
})(NormalizedNote || (NormalizedNote = {}));
export const Note = {
    getNormalizedNote: (fundamental) => {
        switch (fundamental) {
            case DenormalizedNote['B#']:
                return NormalizedNote.C;
            case DenormalizedNote.Cb:
                return NormalizedNote.B;
            case DenormalizedNote['C#']:
                return NormalizedNote.Db;
            case DenormalizedNote['D#']:
                return NormalizedNote.Eb;
            case DenormalizedNote['E#']:
                return NormalizedNote.F;
            case DenormalizedNote.Fb:
                return NormalizedNote.E;
            case DenormalizedNote['F#']:
                return NormalizedNote.Gb;
            case DenormalizedNote['G#']:
                return NormalizedNote.Ab;
            case DenormalizedNote['A#']:
                return NormalizedNote.Bb;
            default:
                return DenormalizedNote[fundamental];
        }
    },
    toString: (note) => {
        if (typeof note === 'string') {
            return note;
        }
        else {
            note = note;
            if (note.note) {
                return `${NormalizedNote[Note.getNormalizedNote(note.note)]}${note.octave}`;
            }
            return `${note.note}${note.octave}`;
        }
    },
    addHalfNotes: (fundamental, halfSteps) => {
        if (fundamental) {
            const note = fundamental.note;
            fundamental = { note: Note.getNormalizedNote(note), octave: fundamental.octave };
        }
        else {
            fundamental = fundamental;
        }
        let currentOctave = fundamental.octave;
        let realNote = fundamental.note;
        if (halfSteps >= 0) {
            for (let i = 0; i < halfSteps; i++) {
                const relativeNormalizedInterval = Note.addHalfNote(realNote);
                currentOctave = relativeNormalizedInterval.dOctave + currentOctave;
                realNote = relativeNormalizedInterval.note;
            }
        }
        else {
            for (let i = 0; i < -halfSteps; i++) {
                const relativeNormalizedInterval = Note.subtractHalfNote(realNote);
                currentOctave = relativeNormalizedInterval.dOctave + currentOctave;
                realNote = relativeNormalizedInterval.note;
            }
        }
        return { note: realNote, octave: currentOctave };
    },
    subtractHalfNote: (fundamental) => {
        if (fundamental) {
            fundamental = Note.getNormalizedNote(fundamental);
        }
        fundamental = fundamental;
        switch (fundamental) {
            case NormalizedNote.A:
                return { note: NormalizedNote.Ab, dOctave: 0 };
            case NormalizedNote.Bb:
                return { note: NormalizedNote.A, dOctave: 0 };
            case NormalizedNote.B:
                return { note: NormalizedNote.Bb, dOctave: 0 };
            case NormalizedNote.C:
                return { note: NormalizedNote.B, dOctave: -1 };
            case NormalizedNote.Db:
                return { note: NormalizedNote.C, dOctave: 0 };
            case NormalizedNote.D:
                return { note: NormalizedNote.Db, dOctave: 0 };
            case NormalizedNote.Eb:
                return { note: NormalizedNote.D, dOctave: 0 };
            case NormalizedNote.E:
                return { note: NormalizedNote.Eb, dOctave: 0 };
            case NormalizedNote.F:
                return { note: NormalizedNote.E, dOctave: 0 };
            case NormalizedNote.Gb:
                return { note: NormalizedNote.F, dOctave: 0 };
            case NormalizedNote.G:
                return { note: NormalizedNote.Gb, dOctave: 0 };
            default:
                return { note: NormalizedNote.G, dOctave: 0 };
        }
    },
    addHalfNote: (fundamental) => {
        if (fundamental) {
            fundamental = Note.getNormalizedNote(fundamental);
        }
        fundamental = fundamental;
        switch (fundamental) {
            case NormalizedNote.A:
                return { note: NormalizedNote.Bb, dOctave: 0 };
            case NormalizedNote.Bb:
                return { note: NormalizedNote.B, dOctave: 0 };
            case NormalizedNote.B:
                return { note: NormalizedNote.C, dOctave: 1 };
            case NormalizedNote.C:
                return { note: NormalizedNote.Db, dOctave: 0 };
            case NormalizedNote.Db:
                return { note: NormalizedNote.D, dOctave: 0 };
            case NormalizedNote.D:
                return { note: NormalizedNote.Eb, dOctave: 0 };
            case NormalizedNote.Eb:
                return { note: NormalizedNote.E, dOctave: 0 };
            case NormalizedNote.E:
                return { note: NormalizedNote.F, dOctave: 0 };
            case NormalizedNote.F:
                return { note: NormalizedNote.Gb, dOctave: 0 };
            case NormalizedNote.Gb:
                return { note: NormalizedNote.G, dOctave: 0 };
            case NormalizedNote.G:
                return { note: NormalizedNote.Ab, dOctave: 0 };
            default:
                return { note: NormalizedNote.A, dOctave: 0 };
        }
    },
    intervalToSteps(interval) {
        switch (interval) {
            case 1:
                return 0;
            case 2:
                return 2;
            case 3:
                return 4;
            case 4:
                return 5;
            case 5:
                return 7;
            case 6:
                return 9;
            case 7:
                return 11;
            case 8:
                return 12;
            default:
                return -1000;
        }
    },
    getAbsoluteNote(root, interval) {
        return Note.addHalfNotes(root, this.intervalToSteps(interval.degree) + interval.dOctave * 12);
    },
    halfStep(note) {
        return Note.addHalfNotes(note, 1);
    },
    wholeStep(note) {
        return Note.addHalfNotes(note, 2);
    },
    minorThird(note) {
        return Note.addHalfNotes(note, 3);
    },
    majorThird(note) {
        return Note.addHalfNotes(note, 4);
    },
    perfectFourth(note) {
        return Note.addHalfNotes(note, 5);
    },
    diminishedFifth(note) {
        return Note.addHalfNotes(note, 6);
    },
    perfectFifth(note) {
        return Note.addHalfNotes(note, 7);
    },
    minorSixth(note) {
        return Note.addHalfNotes(note, 8);
    },
    majorSixth(note) {
        return Note.addHalfNotes(note, 9);
    },
    minorSeventh(note) {
        return Note.addHalfNotes(note, 10);
    },
    majorSeventh(note) {
        return Note.addHalfNotes(note, 11);
    },
    perfectOctave(note) {
        return Note.addHalfNotes(note, 12);
    },
    minorNinth(note) {
        return Note.addHalfNotes(note, 13);
    },
    majorNinth(note) {
        return Note.addHalfNotes(note, 14);
    },
    minorTenth(note) {
        return Note.addHalfNotes(note, 15);
    },
    majorTenth(note) {
        return Note.addHalfNotes(note, 16);
    },
    perfectEleventh(note) {
        return Note.addHalfNotes(note, 17);
    },
    diminishedTwelfth(note) {
        return Note.addHalfNotes(note, 18);
    },
    perfectTwelfth(note) {
        return Note.addHalfNotes(note, 19);
    },
    leadingToneBelow(note) {
        return Note.addHalfNotes(note, -1);
    },
    submediantBelow(note) {
        return Note.addHalfNotes(note, -3);
    },
    dominantBelow(note) {
        return Note.addHalfNotes(note, -5);
    },
    subdominantBelow(note) {
        return Note.addHalfNotes(note, -7);
    },
    mediantBelow(note) {
        return Note.addHalfNotes(note, -8);
    },
    supertonicBelow(note) {
        return Note.addHalfNotes(note, -10);
    },
    octaveBelow(note) {
        return Note.addHalfNotes(note, -12);
    },
};
//# sourceMappingURL=Note.js.map