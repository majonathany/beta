export enum DenormalizedNote {
  'Ab' = 'Ab',
  'A' = 'A',
  'A#' = 'A#',
  'Bb' = 'Bb',
  'B' = 'B',
  'B#' = 'B#',
  'Cb' = 'Cb',
  'C' = 'C',
  'C#' = 'C#',
  'Db' = 'Db',
  'D' = 'D',
  'D#' = 'D#',
  'Eb' = 'Eb',
  'E' = 'E',
  'E#' = 'E#',
  'Fb' = 'Fb',
  'F' = 'F',
  'F#' = 'F#',
  'Gb' = 'Gb',
  'G' = 'G',
  'G#' = 'G#',
}

export enum NormalizedNote {
  'Ab' = 'Ab',
  'A' = 'A',
  'Bb' = 'Bb',
  'B' = 'B',
  'C' = 'C',
  'Db' = 'Db',
  'D' = 'D',
  'Eb' = 'Eb',
  'E' = 'E',
  'F' = 'F',
  'Gb' = 'Gb',
  'G' = 'G',
}

export type AbsoluteDenormalizedNote = {
  note: DenormalizedNote
  octave: number
}

export type AbsoluteNormalizedNote = {
  note: NormalizedNote
  octave: number
}

export type IntervalNote = {
  degree: number
  dOctave: number
}

export type RelativeDenormalizedInterval = {
  note: DenormalizedNote
  dOctave: number
}

export type RelativeNormalizedInterval = {
  note: NormalizedNote
  dOctave: number
}

export const Note = {
  getNormalizedNote: (fundamental: DenormalizedNote): NormalizedNote => {
    switch (fundamental) {
      case DenormalizedNote['B#']:
        return NormalizedNote.C
      case DenormalizedNote.Cb:
        return NormalizedNote.B
      case DenormalizedNote['C#']:
        return NormalizedNote.Db
      case DenormalizedNote['D#']:
        return NormalizedNote.Eb
      case DenormalizedNote['E#']:
        return NormalizedNote.F
      case DenormalizedNote.Fb:
        return NormalizedNote.E
      case DenormalizedNote['F#']:
        return NormalizedNote.Gb
      case DenormalizedNote['G#']:
        return NormalizedNote.Ab
      case DenormalizedNote['A#']:
        return NormalizedNote.Bb
      default:
        return <NormalizedNote>(<any>DenormalizedNote[fundamental])
    }
  },

  toString: (
    note: DenormalizedNote | NormalizedNote | AbsoluteDenormalizedNote | AbsoluteNormalizedNote
  ): string => {
    if (typeof note === 'string') {
      return <string>note
    } else {
      note = <AbsoluteDenormalizedNote | AbsoluteNormalizedNote>note
      if (<DenormalizedNote>note.note) {
        return `${NormalizedNote[Note.getNormalizedNote(<DenormalizedNote>note.note)]}${
          note.octave
        }`
      }
      return `${note.note}${note.octave}`
    }
  },

  addHalfNotes: (
    fundamental: AbsoluteDenormalizedNote | AbsoluteNormalizedNote,
    halfSteps: number
  ): AbsoluteNormalizedNote => {
    if (<AbsoluteDenormalizedNote>fundamental) {
      const note: DenormalizedNote = (<AbsoluteDenormalizedNote>fundamental).note
      fundamental = { note: Note.getNormalizedNote(note), octave: fundamental.octave }
    } else {
      fundamental = <AbsoluteNormalizedNote>fundamental
    }

    let currentOctave = fundamental.octave
    let realNote: NormalizedNote = fundamental.note

    if (halfSteps >= 0) {
      for (let i = 0; i < halfSteps; i++) {
        const relativeNormalizedInterval: RelativeNormalizedInterval = Note.addHalfNote(realNote)
        currentOctave = relativeNormalizedInterval.dOctave + currentOctave
        realNote = relativeNormalizedInterval.note
      }
    } else {
      for (let i = 0; i < -halfSteps; i++) {
        const relativeNormalizedInterval: RelativeNormalizedInterval =
          Note.subtractHalfNote(realNote)
        currentOctave = relativeNormalizedInterval.dOctave + currentOctave
        realNote = relativeNormalizedInterval.note
      }
    }
    return { note: realNote, octave: currentOctave }
  },

  subtractHalfNote: (
    fundamental: NormalizedNote | DenormalizedNote
  ): RelativeNormalizedInterval => {
    if (<DenormalizedNote>fundamental) {
      fundamental = Note.getNormalizedNote(<DenormalizedNote>fundamental)
    }
    fundamental = <NormalizedNote>fundamental
    switch (fundamental) {
      case NormalizedNote.A:
        return { note: NormalizedNote.Ab, dOctave: 0 }
      case NormalizedNote.Bb:
        return { note: NormalizedNote.A, dOctave: 0 }
      case NormalizedNote.B:
        return { note: NormalizedNote.Bb, dOctave: 0 }
      case NormalizedNote.C:
        return { note: NormalizedNote.B, dOctave: -1 }
      case NormalizedNote.Db:
        return { note: NormalizedNote.C, dOctave: 0 }
      case NormalizedNote.D:
        return { note: NormalizedNote.Db, dOctave: 0 }
      case NormalizedNote.Eb:
        return { note: NormalizedNote.D, dOctave: 0 }
      case NormalizedNote.E:
        return { note: NormalizedNote.Eb, dOctave: 0 }
      case NormalizedNote.F:
        return { note: NormalizedNote.E, dOctave: 0 }
      case NormalizedNote.Gb:
        return { note: NormalizedNote.F, dOctave: 0 }
      case NormalizedNote.G:
        return { note: NormalizedNote.Gb, dOctave: 0 }
      default:
        return { note: NormalizedNote.G, dOctave: 0 }
    }
  },

  addHalfNote: (fundamental: NormalizedNote | DenormalizedNote): RelativeNormalizedInterval => {
    if (<DenormalizedNote>fundamental) {
      fundamental = Note.getNormalizedNote(<DenormalizedNote>fundamental)
    }
    fundamental = <NormalizedNote>fundamental
    switch (fundamental) {
      case NormalizedNote.A:
        return { note: NormalizedNote.Bb, dOctave: 0 }
      case NormalizedNote.Bb:
        return { note: NormalizedNote.B, dOctave: 0 }
      case NormalizedNote.B:
        return { note: NormalizedNote.C, dOctave: 1 }
      case NormalizedNote.C:
        return { note: NormalizedNote.Db, dOctave: 0 }
      case NormalizedNote.Db:
        return { note: NormalizedNote.D, dOctave: 0 }
      case NormalizedNote.D:
        return { note: NormalizedNote.Eb, dOctave: 0 }
      case NormalizedNote.Eb:
        return { note: NormalizedNote.E, dOctave: 0 }
      case NormalizedNote.E:
        return { note: NormalizedNote.F, dOctave: 0 }
      case NormalizedNote.F:
        return { note: NormalizedNote.Gb, dOctave: 0 }
      case NormalizedNote.Gb:
        return { note: NormalizedNote.G, dOctave: 0 }
      case NormalizedNote.G:
        return { note: NormalizedNote.Ab, dOctave: 0 }
      default:
        return { note: NormalizedNote.A, dOctave: 0 }
    }
  },

  intervalToSteps(interval: number): number {
    switch (interval) {
      case 1:
        return 0
      case 2:
        return 2
      case 3:
        return 4
      case 4:
        return 5
      case 5:
        return 7
      case 6:
        return 9
      case 7:
        return 11
      case 8:
        return 12
      default:
        return -1000
    }
  },

  getAbsoluteNote(root: AbsoluteDenormalizedNote, interval: IntervalNote): AbsoluteNormalizedNote {
    return Note.addHalfNotes(root, this.intervalToSteps(interval.degree) + interval.dOctave * 12)
  },

  halfStep(note: AbsoluteDenormalizedNote | AbsoluteNormalizedNote): AbsoluteNormalizedNote {
    return Note.addHalfNotes(note, 1)
  },

  wholeStep(note: AbsoluteDenormalizedNote | AbsoluteNormalizedNote): AbsoluteNormalizedNote {
    return Note.addHalfNotes(note, 2)
  },

  minorThird(note: AbsoluteDenormalizedNote | AbsoluteNormalizedNote): AbsoluteNormalizedNote {
    return Note.addHalfNotes(note, 3)
  },

  majorThird(note: AbsoluteDenormalizedNote | AbsoluteNormalizedNote): AbsoluteNormalizedNote {
    return Note.addHalfNotes(note, 4)
  },

  perfectFourth(note: AbsoluteDenormalizedNote | AbsoluteNormalizedNote): AbsoluteNormalizedNote {
    return Note.addHalfNotes(note, 5)
  },

  diminishedFifth(note: AbsoluteDenormalizedNote | AbsoluteNormalizedNote): AbsoluteNormalizedNote {
    return Note.addHalfNotes(note, 6)
  },

  perfectFifth(note: AbsoluteDenormalizedNote | AbsoluteNormalizedNote): AbsoluteNormalizedNote {
    return Note.addHalfNotes(note, 7)
  },

  minorSixth(note: AbsoluteDenormalizedNote | AbsoluteNormalizedNote): AbsoluteNormalizedNote {
    return Note.addHalfNotes(note, 8)
  },

  majorSixth(note: AbsoluteDenormalizedNote | AbsoluteNormalizedNote): AbsoluteNormalizedNote {
    return Note.addHalfNotes(note, 9)
  },

  minorSeventh(note: AbsoluteDenormalizedNote | AbsoluteNormalizedNote): AbsoluteNormalizedNote {
    return Note.addHalfNotes(note, 10)
  },

  majorSeventh(note: AbsoluteDenormalizedNote | AbsoluteNormalizedNote): AbsoluteNormalizedNote {
    return Note.addHalfNotes(note, 11)
  },

  perfectOctave(note: AbsoluteDenormalizedNote | AbsoluteNormalizedNote): AbsoluteNormalizedNote {
    return Note.addHalfNotes(note, 12)
  },

  minorNinth(note: AbsoluteDenormalizedNote | AbsoluteNormalizedNote): AbsoluteNormalizedNote {
    return Note.addHalfNotes(note, 13)
  },

  majorNinth(note: AbsoluteDenormalizedNote | AbsoluteNormalizedNote): AbsoluteNormalizedNote {
    return Note.addHalfNotes(note, 14)
  },

  minorTenth(note: AbsoluteDenormalizedNote | AbsoluteNormalizedNote): AbsoluteNormalizedNote {
    return Note.addHalfNotes(note, 15)
  },

  majorTenth(note: AbsoluteDenormalizedNote | AbsoluteNormalizedNote): AbsoluteNormalizedNote {
    return Note.addHalfNotes(note, 16)
  },

  perfectEleventh(note: AbsoluteDenormalizedNote | AbsoluteNormalizedNote): AbsoluteNormalizedNote {
    return Note.addHalfNotes(note, 17)
  },

  diminishedTwelfth(
    note: AbsoluteDenormalizedNote | AbsoluteNormalizedNote
  ): AbsoluteNormalizedNote {
    return Note.addHalfNotes(note, 18)
  },

  perfectTwelfth(note: AbsoluteDenormalizedNote | AbsoluteNormalizedNote): AbsoluteNormalizedNote {
    return Note.addHalfNotes(note, 19)
  },

  leadingToneBelow(
    note: AbsoluteDenormalizedNote | AbsoluteNormalizedNote
  ): AbsoluteNormalizedNote {
    return Note.addHalfNotes(note, -1)
  },

  submediantBelow(note: AbsoluteDenormalizedNote | AbsoluteNormalizedNote): AbsoluteNormalizedNote {
    return Note.addHalfNotes(note, -3)
  },

  dominantBelow(note: AbsoluteDenormalizedNote | AbsoluteNormalizedNote): AbsoluteNormalizedNote {
    return Note.addHalfNotes(note, -5)
  },

  subdominantBelow(
    note: AbsoluteDenormalizedNote | AbsoluteNormalizedNote
  ): AbsoluteNormalizedNote {
    return Note.addHalfNotes(note, -7)
  },

  mediantBelow(note: AbsoluteDenormalizedNote | AbsoluteNormalizedNote): AbsoluteNormalizedNote {
    return Note.addHalfNotes(note, -8)
  },

  supertonicBelow(note: AbsoluteDenormalizedNote | AbsoluteNormalizedNote): AbsoluteNormalizedNote {
    return Note.addHalfNotes(note, -10)
  },

  octaveBelow(note: AbsoluteDenormalizedNote | AbsoluteNormalizedNote): AbsoluteNormalizedNote {
    return Note.addHalfNotes(note, -12)
  },
}
