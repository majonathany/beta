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
export class Note {
}
Note.getNormalizedNote = (fundamental) => {
    switch (fundamental) {
        case DenormalizedNote["B#"]:
            return NormalizedNote.C;
        case DenormalizedNote.Cb:
            return NormalizedNote.B;
        case DenormalizedNote["C#"]:
            return NormalizedNote.Db;
        case DenormalizedNote["D#"]:
            return NormalizedNote.Eb;
        case DenormalizedNote["E#"]:
            return NormalizedNote.F;
        case DenormalizedNote.Fb:
            return NormalizedNote.E;
        case DenormalizedNote["F#"]:
            return NormalizedNote.Gb;
        case DenormalizedNote["G#"]:
            return NormalizedNote.Ab;
        case DenormalizedNote["A#"]:
            return NormalizedNote.Bb;
        default:
            return DenormalizedNote[fundamental];
    }
};
Note.addHalfNote = (fundamental) => {
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
};
Note.toString = (note) => {
    if (typeof note === "string") {
        return note;
    }
    else {
        note = note;
        if (note.note) {
            return `${NormalizedNote[Note.getNormalizedNote(note.note)]}${note.octave}`;
        }
        return `${note.note}${note.octave}`;
    }
};
Note.addHalfNotes = (fundamental, halfSteps) => {
    if (fundamental) {
        const note = fundamental.note;
        fundamental = { note: Note.getNormalizedNote(note), octave: fundamental.octave };
    }
    else {
        fundamental = fundamental;
    }
    let currentOctave = fundamental.octave;
    let realNote = fundamental.note;
    for (let i = 0; i < halfSteps; i++) {
        const relativeNormalizedInterval = Note.addHalfNote(realNote);
        currentOctave = relativeNormalizedInterval.dOctave + currentOctave;
        realNote = relativeNormalizedInterval.note;
    }
    return { note: realNote, octave: currentOctave };
};
export class Scale {
    static getMajorScale(tonicNote, octave) {
        if (tonicNote) {
            tonicNote = Note.getNormalizedNote(tonicNote);
        }
        const tonicAbsoluteNote = { note: tonicNote, octave: octave };
        return [
            tonicAbsoluteNote,
            Note.addHalfNotes(tonicAbsoluteNote, 2),
            Note.addHalfNotes(tonicAbsoluteNote, 4),
            Note.addHalfNotes(tonicAbsoluteNote, 5),
            Note.addHalfNotes(tonicAbsoluteNote, 7),
            Note.addHalfNotes(tonicAbsoluteNote, 9),
            Note.addHalfNotes(tonicAbsoluteNote, 11)
        ];
    }
    getDegreeModulus(degree) {
        if (!Number.isInteger(degree)) {
            return null;
        }
        let dOctive = 0;
        if (degree > 0 && degree < 8) {
            degree = degree + 0;
        }
        else if (degree < 0) {
            while (degree < 0) {
                degree += 8;
                dOctive -= 1;
            }
        }
        else {
            while (degree >= 8) {
                degree -= 8;
                dOctive += 1;
            }
        }
        return { degree: degree - 1, dOctave: dOctive };
    }
    getNoteByDegree(degree, scale, scaleOctave) {
        const [tonic, mode] = scale.split("_");
        const note = this.getDegreeModulus(degree);
        if (!note) {
            return null;
        }
        switch (mode) {
            case "Major":
                return `C4`;
            case "Minor":
                return `C4`;
            default:
                return `C4`;
        }
    }
}
//# sourceMappingURL=Scale.js.map