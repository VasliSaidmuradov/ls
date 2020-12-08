<template>
  <q-dialog :value="isShow" @hide="onClose">
    <AddAnalyzes isPopup/>
  </q-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit} from 'vue-property-decorator';
import {IAnalyzes} from '@/interfaces/analyzes.interface';
import MainBtn from '@/components/UI/buttons/MainBtn.vue';
import AnalyzesCard from '@/components/analyzes/AnalyzesCard.vue';
import {bus} from '@/plugins/bus';
import AddAnalyzes from '@/components/analyzes/AddAnalyzes.vue';


@Component({
  components: {
    MainBtn,
    AnalyzesCard,
    AddAnalyzes
  }
})
export default class AddAnalyzesModal extends Vue {
  @Prop({required: true, default: () => false}) isShow: boolean;

  @Emit('close')
  onClose() {
    return false;
  }
}
</script>
