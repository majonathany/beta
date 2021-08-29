import { DenormalizedNote, NormalizedNote, Note, Scale } from '../models/Scale';
test('first test', () => {
    const note = DenormalizedNote.C;
    expect(DenormalizedNote[note]).toEqual(NormalizedNote[NormalizedNote.C]);
});
test('relative equivalent', () => {
    expect(NormalizedNote.B).toEqual(Note.getNormalizedNote(DenormalizedNote.Cb));
    expect(NormalizedNote.B).toEqual(Note.getNormalizedNote(DenormalizedNote.Cb));
    expect(NormalizedNote.Db).toEqual(Note.getNormalizedNote(DenormalizedNote["C#"]));
    expect(NormalizedNote.Gb).toEqual(Note.getNormalizedNote(DenormalizedNote["F#"]));
    expect(NormalizedNote.Bb).toEqual(Note.getNormalizedNote(DenormalizedNote["A#"]));
});
test('major scale', () => {
    console.log(Scale.getMajorScale(NormalizedNote.Bb, 3));
    for (const note of Scale.getMajorScale(NormalizedNote.Bb, 4)) {
        console.log(Note.toString(note));
    }
});
//# sourceMappingURL=scales.test.js.map