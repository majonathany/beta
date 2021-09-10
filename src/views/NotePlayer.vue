<template>
  <Splitter style="height: 300px" stateStorage="local"
    @keyup.passive="event => sample[event.code].command()"
  >
    <SplitterPanel>
      <Card>
        <template #header>Sound Player2</template>
        <template #title>
          Sound Player
        </template>
        <template #content>
          <Button @click.passive="playCanon" label="Secondary" class="p-button-secondary">
            Play Canon
          </Button>
          <Button @click.passive="playAMinor" label="Secondary"
                  class="p-button-secondary">
            Play A Minor
          </Button>
          <InputText v-model:model-value="song"
                     placeholder="Enter space seperated degrees:"></InputText>
          <SplitterPanel class="p-splitter-gutter p-splitter" style="padding: 1rem;">
          <Button v-for="element in sample" :key="element.label" :label="element.label"
                  @click.passive="element.command"
                  class="p-button"></Button>
          </SplitterPanel>
        </template>
        <template #footer>
          <Button>Start Music</Button>
        </template>
      </Card>
    </SplitterPanel>
  </Splitter>
</template>

<script lang="ts">
import {defineComponent} from 'vue'


import * as Tone                     from 'tone'
import {NormalizedNote, Note, Scale} from '../models/Scale';

export default defineComponent(
    {
      name: 'NotePlayer',

      data: function() {
        return {
          pitch: "A4",
          song: "",
          sample: {
              KeyA:{label: "I",
                command: () => this.play(["Db3", "F3", "Ab3"])},
              KeyS:{label: "ii",
                command: () => this.play(["Eb3", "Gb3", "Bb3" ])},
              KeyD:{label: "iii",
                command: () => this.play(["F3", "Ab3", "C4"])},
              KeyF:{label: "IV",
                command: () => this.play(["Gb3", "Bb4", "Db4"])},
              KeyG:{label: "V",
                command: () => this.play(["Ab3", "C4", "Eb4" ])},
              KeyH:{label: "VI",
                command: () => this.play(["Bb3", "Db4", "F4"])},
              KeyJ:{label: "VII",
                command: () => this.play(["C4", "Eb4", "Gb4"])},
              KeyK:{label: "VIII",
                command: () => this.play(["Db4", "F4", "Ab4" ])},
          }
        }
      },

      computed: {
        dbMajor: function() {
          return [...Scale.getMajorScale(NormalizedNote.Db, 3),
            ...Scale.getMajorScale(NormalizedNote.Db, 4),
            ...Scale.getMajorScale(NormalizedNote.Db, 5)];
        },
        canon: function(): {time: string, chord: number}[] {
          let progression = [
            {chord: 15, time: "0:0:0"},
            {chord: 7+5, time: "0:1:0"},
            {chord: 7+6, time: "0:2:0"},
            {chord: 7+3, time: "0:3:0"},
            {chord: 11, time: "1:0:0"},
            {chord: 8, time: "1:1:0"},
            {chord: 11, time: "1:2:0"},
            {chord: 12, time: "1:3:0"},
          ];

          return progression;

        },
      },
      methods: {
        playAMinor: function() {
          let s = Scale.getMinorScale(NormalizedNote.Eb, 4);
          let s2 = Scale.getMinorScale(NormalizedNote.Eb, 5);

          const scale = s.map(elem => Note.toString(elem));
          const scale2 = s2.map(elem => Note.toString(elem));

          const synth = this.generateSynth();
          Tone.Transport.bpm.value = 40;

          const elem = new Tone.Part(function (time, event) {
            synth.triggerAttackRelease(event.note, "4n", event.time, 1);
          }, [
            { note: scale[0], time: "0:0:0"},
            { note: scale[1], time: "0:1:0"},
            { note: scale[2], time: "0:2:0"},
            { note: scale[3], time: "0:3:0"},
            { note: scale[4], time: "1:0:0"},
            { note: scale[5], time: "1:1:0"},
            { note: scale[6], time: "1:2:0"},
            { note: scale2[0], time: "1:3:0"},
          ]).start("0m");

          Tone.Transport.start(Tone.now())

        },
        play(event: string | string[]) {
          const synth = this.generateSynth();

          const offset = 0;
          const start = "0";

          if (Array.isArray(event)) {
            event.map(element => {
              new Tone.Part(((time, note) => {
                synth.triggerAttackRelease(note.note, "4n", time)
              }), event.map(note => ({note: note, time: Tone.now()}))).start("0:0:0",
                                                                             offset);
            });
          }
          else {
            synth
                .triggerAttackRelease(event, "4n", "0:0:0")
          }
          console.log(`start: ${start}, offset: ${offset}`);
          Tone.Transport.start(start);

        },

        getChords: function (note: NormalizedNote): string[][]
        {
            let scale = Scale.getMajorScale(note, 3);
            let scale2 = Scale.getMajorScale(note, 4);
            let scale3 = Scale.getMajorScale(note, 5);

            let chords: string[][] = [];
            let time = 1;

            for (let index = 0; index < 7; index++) {
              const one = Note.toString(scale[index]);
              const two = Note.toString(scale[(index + 2 >= 7) ? (index + 2 - 7) : (index + 2)])
              const three = Note.toString(scale[(index + 4 >= 7) ? (index + 4 - 7) : (index + 4)])

              chords.push([one, two, three]);
            }

            for (let index = 0; index < 7; index++) {
              const one = Note.toString(scale2[index]);
              const two = Note.toString(scale2[(index + 2 >= 7) ? (index + 2 - 7) : (index +
                  2)])
              const three = Note.toString(scale2[(index + 4 >= 7) ? (index + 4 - 7) : (index
                  + 4)])

              chords.push([one, two, three]);
            }

            const one = Note.toString(scale3[0]);
            const two = Note.toString(scale3[2])
            const three = Note.toString(scale3[4])

            chords.push([one, two, three]);

            return chords;
        },

        generateSynth: function() {
          Tone.Transport.timeSignature = [4, 4];

          const merge = new Tone.Merge();

          // a little reverb
          const reverb = new Tone.Reverb({
                                           wet: 0.3
                                         });

          merge.chain(reverb, Tone.Destination);

          return new Tone.PolySynth().set({
                                                    oscillator: {
                                                      type: "custom",
                                                      partials: [2, 2, 2, 2],
                                                    },
                                                    envelope: {
                                                      attack: 0.005,
                                                      decay: 0.3,
                                                      sustain: 0.2,
                                                      release: 1,
                                                    },
                                                    portamento: 0.01,
                                                    volume: -20
                                                  }).connect(merge, 0, 0)
                                             .connect(merge, 0, 1)

        },

        playCanon: function () {
          Tone.Transport.timeSignature = [4, 4];
          Tone.Transport.bpm.value = 40;

          const merge = new Tone.Merge();

          // a little reverb
          const reverb = new Tone.Reverb({
                                           wet: 0.3
                                         });

          merge.chain(reverb, Tone.Destination);

          const synthR = new Tone.PolySynth().set({
                                                    oscillator: {
                                                      type: "custom",
                                                      partials: [2, 1, 2, 2],
                                                    },
                                                    envelope: {
                                                      attack: 0.005,
                                                      decay: 0.3,
                                                      sustain: 0.2,
                                                      release: 1,
                                                    },
                                                    portamento: 0.01,
                                                    volume: -20
                                                  }).connect(merge, 0, 0)
                                             .connect(merge, 0, 1)

          const progression = this.canon;
          const chords = this.getChords(NormalizedNote.Eb);


          progression.map(element => {
            console.log(chords[element.chord - 1])
            const part = new Tone.Part((time, note) => {
              synthR.triggerAttackRelease(note.note, "4n", time, note.velocity)
            }, chords[element.chord - 1].map(note => ({note: note, time: element.time,
              velocity: 1})
            )).start("0m");
          });
          Tone.Transport.start();
        }
      }
    })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
