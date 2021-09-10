import {
  AbsoluteDenormalizedNote,
  AbsoluteNormalizedNote,
  DenormalizedNote,
  IntervalNote,
  NormalizedNote,
  Note,
} from './Note'

export enum ChordType {
  Major = 'Major',
  Minor = 'Minor',
  Diminished = 'Diminished',
  Augmented = 'Augmented',
}

export interface NoteSet {
  notes: Set<number>
}

export type IntervalGroup = {
  intervals: Set<IntervalNote>
}

export class Chord {
  public root: AbsoluteDenormalizedNote
  public pitches: { [key: string]: NoteSet }
  public chordType: ChordType

  constructor(rootNote: AbsoluteNormalizedNote | AbsoluteDenormalizedNote) {
    this.root = { note: DenormalizedNote[rootNote.note], octave: rootNote.octave }
    this.pitches = {}
    this.initializeRootPosition()
  }

  public toJson(): { root: AbsoluteDenormalizedNote; pitches: { [key: string]: NoteSet } } {
    return { root: this.root, pitches: this.pitches }
  }

  public initializeRootPosition() {
    this.pitches[this.root.note] = new Set([{ degree: 1, dOctave: 0 }])
    this.pitches[Note.majorThird(this.root).note] = new Set([{ degree: 3, dOctave: 0 }])
    this.pitches[Note.perfectFifth(this.root).note] = new Set([{ degree: 5, dOctave: 0 }])
  }

  public initializeFirstInversion() {}
  public initializeSecondInversion() {}
  public initializeByIntervalGroup(group: IntervalGroup): void {}

  public get isMajor(): boolean {
    return true
  }

  public get isMinor(): boolean {
    return true
  }

  public get isDiminished(): boolean {
    return true
  }

  public get isAugmented(): boolean {
    return true
  }

  public get degrees(): Set<number> {
    return new Set([1, 3, 5])
  }
}
