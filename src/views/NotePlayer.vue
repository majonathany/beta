<template>
  <Splitter style="height: 300px" stateStorage="local">
    <SplitterPanel>
      <Card>
        <template #header>Sound Player2</template>
        <template #title>
          Sound Player
        </template>
        <template #content>
          <Button @click="playC5" label="Secondary" class="p-button-secondary">
            Play Canon
          </Button>
        </template>
        <template #footer>
          <Button>Start Music</Button>
        </template>
      </Card>
    </SplitterPanel>
    <SplitterPanel>
      Panel
    </SplitterPanel>
  </Splitter>
</template>

<script lang="ts">
import * as Tone                                       from 'tone'
import {DenormalizedNote, NormalizedNote, Note, Scale} from '../models/Scale';

export default {
  name: 'NotePlayer',

  methods: {
    playC5: function() {
      const synth = new Tone.PolySynth(Tone.Synth).toDestination();

      let scale = Scale.getMajorScale(NormalizedNote.D, 4);
      let scale2 = Scale.getMajorScale(NormalizedNote.D, 5);
      let scale3 = Scale.getMajorScale(NormalizedNote.D, 6);

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


      let progression = [15, 7+5, 6, 3+7, 4+7, 1+7, 4+7, 5+7,
        8, 7+5, 6, 3+7, 4+7, 1+7, 4+7, 5+7];

      for (let index = 0; index < progression.length; index++) {
        console.log("degree: " + `${progression[index] > 7 ? progression[index] - 7: progression[index]}
                                    ${chords[progression[index]-1]}`);
        synth.triggerAttackRelease(chords[progression[index] - 1], 1, time);
        time += 1
      }


    }
  }
}
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
