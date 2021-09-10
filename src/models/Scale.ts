export enum DenormalizedNote {
    "Ab" = "Ab", "A" = "A", "A#" = "A#", "Bb" = "Bb", "B" = "B", "B#" = "B#", "Cb" = "Cb", "C" = "C", "C#" = "C#",
    "Db" = "Db", "D" = "D", "D#" = "D#", "Eb" = "Eb", "E" = "E", "E#" = "E#", "Fb" = "Fb", "F" = "F", "F#" = "F#",
    "Gb" = "Gb", "G" = "G", "G#" = "G#"
}

export enum NormalizedNote {
    "Ab" = "Ab", "A" = "A", "Bb" = "Bb", "B" = "B", "C" = "C",
    "Db" = "Db", "D" = "D", "Eb" = "Eb", "E" = "E", "F" = "F",
    "Gb" = "Gb", "G" = "G"
}

export type AbsoluteNote = {
    note: DenormalizedNote;
    octave: number;
}

export type AbsoluteNormalizedNote = {
    note: NormalizedNote;
    octave: number;
}

export type IntervalNote = {
    degree: number,
    dOctave: number;
}

export type RelativeInterval = {
    note: DenormalizedNote;
    dOctave: number;
}

export type RelativeNormalizedInterval = {
    note: NormalizedNote;
    dOctave: number;
}

export type MajorScale = [
    AbsoluteNormalizedNote,
    AbsoluteNormalizedNote,
    AbsoluteNormalizedNote,
    AbsoluteNormalizedNote,
    AbsoluteNormalizedNote,
    AbsoluteNormalizedNote,
    AbsoluteNormalizedNote
];

export class Note {
    public static getNormalizedNote = (fundamental: DenormalizedNote): NormalizedNote => {
        switch (fundamental) {
            case DenormalizedNote["B#"]:
                return NormalizedNote.C;
            case DenormalizedNote.Cb:
                return NormalizedNote.B
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
                return <NormalizedNote> <any> DenormalizedNote[fundamental];
        }
    }

    private static addHalfNote = (fundamental: NormalizedNote | DenormalizedNote): RelativeNormalizedInterval => {
        if (<DenormalizedNote> fundamental) {
            fundamental = Note.getNormalizedNote(<DenormalizedNote> fundamental);
        }
        fundamental = <NormalizedNote> fundamental;
        switch(fundamental) {
            case NormalizedNote.A:
                return {note: NormalizedNote.Bb, dOctave: 0};
            case NormalizedNote.Bb:
                return {note: NormalizedNote.B, dOctave: 0};
            case NormalizedNote.B:
                return {note: NormalizedNote.C, dOctave: 1};
            case NormalizedNote.C:
                return {note: NormalizedNote.Db, dOctave: 0};
            case NormalizedNote.Db:
                return {note: NormalizedNote.D, dOctave: 0};
            case NormalizedNote.D:
                return {note: NormalizedNote.Eb, dOctave: 0};
            case NormalizedNote.Eb:
                return {note: NormalizedNote.E, dOctave: 0};
            case NormalizedNote.E:
                return {note: NormalizedNote.F, dOctave: 0};
            case NormalizedNote.F:
                return {note: NormalizedNote.Gb, dOctave: 0};
            case NormalizedNote.Gb:
                return {note: NormalizedNote.G, dOctave: 0};
            case NormalizedNote.G:
                return {note: NormalizedNote.Ab, dOctave: 0};
            default:
                return {note: NormalizedNote.A, dOctave: 0};
        }
    };

    public static toString = (note: DenormalizedNote | NormalizedNote | AbsoluteNote | AbsoluteNormalizedNote): string => {
        if (typeof note === "string") {
            return <string> note;
        } else {
            note = < AbsoluteNote | AbsoluteNormalizedNote > note;
            if (<DenormalizedNote> note.note) {
                return `${NormalizedNote[Note.getNormalizedNote(<DenormalizedNote> note.note)]}${note.octave}`;
            }
            return `${note.note}${note.octave}`;
        }
    }


    public static addHalfNotes = (fundamental: AbsoluteNote | AbsoluteNormalizedNote, halfSteps: number): AbsoluteNormalizedNote => {
        if (<AbsoluteNote> fundamental) {
            const note: DenormalizedNote = (<AbsoluteNote> fundamental).note;
            fundamental = {note: Note.getNormalizedNote(note), octave: fundamental.octave};
        }
        else {
            fundamental = <AbsoluteNormalizedNote> fundamental;
        }

        let currentOctave = fundamental.octave;
        let realNote: NormalizedNote = fundamental.note;

        for (let i = 0; i < halfSteps; i++) {
            const relativeNormalizedInterval: RelativeNormalizedInterval = Note.addHalfNote(realNote);
            currentOctave = relativeNormalizedInterval.dOctave + currentOctave;
            realNote = relativeNormalizedInterval.note;
        }
        return {note: realNote, octave: currentOctave};
    }
}

export class Scale {

    public static getMinorScale(tonicNote: DenormalizedNote | NormalizedNote, octave: number): MajorScale {

        if (<DenormalizedNote> tonicNote) {
            tonicNote = Note.getNormalizedNote(<DenormalizedNote> tonicNote);
        }

        const tonicAbsoluteNote = {note: <NormalizedNote> tonicNote, octave: octave};
        return [
            tonicAbsoluteNote,
            Note.addHalfNotes(tonicAbsoluteNote, 2),
            Note.addHalfNotes(tonicAbsoluteNote, 3),
            Note.addHalfNotes(tonicAbsoluteNote, 5),
            Note.addHalfNotes(tonicAbsoluteNote, 7),
            Note.addHalfNotes(tonicAbsoluteNote, 8),
            Note.addHalfNotes(tonicAbsoluteNote, 10)
        ]
    }

    public static getMajorScale(tonicNote: DenormalizedNote | NormalizedNote, octave: number): MajorScale {

        if (<DenormalizedNote> tonicNote) {
            tonicNote = Note.getNormalizedNote(<DenormalizedNote> tonicNote);
        }

        const tonicAbsoluteNote = {note: <NormalizedNote> tonicNote, octave: octave};
        return [
            tonicAbsoluteNote,
            Note.addHalfNotes(tonicAbsoluteNote, 2),
            Note.addHalfNotes(tonicAbsoluteNote, 4),
            Note.addHalfNotes(tonicAbsoluteNote, 5),
            Note.addHalfNotes(tonicAbsoluteNote, 7),
            Note.addHalfNotes(tonicAbsoluteNote, 9),
            Note.addHalfNotes(tonicAbsoluteNote, 11)
        ]
    }

    private getDegreeModulus(degree: number): IntervalNote | null {
        if(!Number.isInteger(degree)) {
            return null;
        }

        let dOctive = 0;
        if (degree > 0 && degree < 8) {
            degree = degree + 0;
        }
        else if (degree < 0) {
            while (degree < 0) {
                degree += 8
                dOctive -= 1;
            }
        }
        else {
            while (degree >= 8) {
                degree -= 8
                dOctive += 1;
            }
        }
        return {degree: degree - 1, dOctave: dOctive};
    }

    getNoteByDegree(degree: number, scale: string, scaleOctave: string): string | null {
        const [tonic, mode] = scale.split("_");
        const note: IntervalNote | null = this.getDegreeModulus(degree);
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
