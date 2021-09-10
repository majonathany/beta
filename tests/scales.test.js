import { Scale } from '../src/models/Scale';
import { DenormalizedNote, NormalizedNote, Note } from '../src/models/Note';
import { Chord } from '../src/models/Chord';
import * as Tone from 'tone';
test('first test', () => {
    const note = DenormalizedNote.C;
    expect(DenormalizedNote[note]).toEqual(NormalizedNote[NormalizedNote.C]);
});
test('relative equivalent', () => {
    expect(NormalizedNote.B).toEqual(Note.getNormalizedNote(DenormalizedNote.Cb));
    expect(NormalizedNote.B).toEqual(Note.getNormalizedNote(DenormalizedNote.Cb));
    expect(NormalizedNote.Db).toEqual(Note.getNormalizedNote(DenormalizedNote['C#']));
    expect(NormalizedNote.Gb).toEqual(Note.getNormalizedNote(DenormalizedNote['F#']));
    expect(NormalizedNote.Bb).toEqual(Note.getNormalizedNote(DenormalizedNote['A#']));
});
test('major scale', () => {
    expect(Scale.getMajorScale(NormalizedNote.Bb, 3)).toEqual([
        { note: 'Bb', octave: 3 },
        { note: 'C', octave: 4 },
        { note: 'D', octave: 4 },
        { note: 'Eb', octave: 4 },
        { note: 'F', octave: 4 },
        { note: 'G', octave: 4 },
        { note: 'A', octave: 4 },
    ]);
});
test('intervals', () => {
    expect(Note.wholeStep({ note: NormalizedNote.Bb, octave: 3 })).toEqual({
        note: NormalizedNote.C,
        octave: 4,
    });
    expect(Note.dominantBelow({ note: NormalizedNote.Bb, octave: 3 })).toEqual({
        note: NormalizedNote.F,
        octave: 3,
    });
    expect(Note.majorSeventh({ note: NormalizedNote.B, octave: 3 })).toEqual({
        note: NormalizedNote.Bb,
        octave: 4,
    });
    expect(Note.perfectOctave({ note: NormalizedNote.Eb, octave: 3 })).toEqual({
        note: NormalizedNote.Eb,
        octave: 4,
    });
    expect(Note.majorSixth({ note: NormalizedNote.E, octave: 3 })).toEqual({
        note: NormalizedNote['Db'],
        octave: 4,
    });
    expect(Note.supertonicBelow({ note: NormalizedNote.Bb, octave: 3 })).toEqual({
        note: NormalizedNote.C,
        octave: 3,
    });
    expect(Note.diminishedFifth({ note: NormalizedNote.Db, octave: 3 })).toEqual({
        note: NormalizedNote.G,
        octave: 3,
    });
    expect(new Chord({ note: NormalizedNote.Db, octave: 3 }).toJson()).toEqual({
        pitches: {
            Ab: new Set([{ dOctave: 0, degree: 5 }]),
            Db: new Set([{ dOctave: 0, degree: 1 }]),
            F: new Set([{ dOctave: 0, degree: 3 }]),
        },
        root: { note: NormalizedNote.Db, octave: 3 },
    });
    expect(new Chord({ note: NormalizedNote.B, octave: 3 }).toJson()).toEqual({
        pitches: {
            Eb: new Set([{ dOctave: 0, degree: 3 }]),
            B: new Set([{ dOctave: 0, degree: 1 }]),
            Gb: new Set([{ dOctave: 0, degree: 5 }]),
        },
        root: { note: NormalizedNote.B, octave: 3 },
    });
});
test('intervals', () => {
    expect(Note.getAbsoluteNote({ note: NormalizedNote.Db, octave: 3 }, { degree: 2, dOctave: 1 })).toEqual({ note: NormalizedNote.Eb, octave: 4 });
    expect(Note.getAbsoluteNote({ note: NormalizedNote.Bb, octave: 3 }, { degree: 2, dOctave: 2 })).toEqual({ note: NormalizedNote.C, octave: 6 });
});
test("time", () => {
    console.log(Tone.Time(2));
});
//# sourceMappingURL=scales.test.js.map