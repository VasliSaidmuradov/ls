<template>
  <div class="layout">
    <AddAnalyzes />

    <AddComment :isShow="addCommentModalState" @close="addCommentClose"/>
    <EditAnalyzes :isShow="editAnalyzesModalState" :editData="editData" @close-modal="editModalClose"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AddAnalyzes from '@/components/analyzes/AddAnalyzes.vue';
import {bus} from '@/plugins/bus';
import {IAnalyzes} from '@/interfaces/analyzes.interface';
import EditAnalyzes from '@/components/modals/EditAnalyzes.vue';
import AddComment from '@/components/modals/AddComment.vue';


@Component({
  components: {
    AddAnalyzes,
    EditAnalyzes,
    AddComment
  }
})
export default class AnalyzesPage extends Vue {
  editAnalyzesModalState = false;
  addCommentModalState = false;
  editData = {};

  mounted() {
    bus.$on(IAnalyzes.BusEvents.OPEN_ADD_ANALYZES_COMMENT, () => this.addCommentModalState = !this.addCommentModalState);
    bus.$on(IAnalyzes.BusEvents.EDIT_ANALYZES, (data: IAnalyzes.IAddedAnalyzes) => {
      this.editData = data;
      this.editAnalyzesModalState = !this.editAnalyzesModalState;
    });
  }

  editModalClose(value: boolean) {
    this.editAnalyzesModalState = value
  }

  addCommentClose(value: boolean) {
    this.addCommentModalState = value;
  }


  destroy() {
    bus.$off(IAnalyzes.BusEvents.OPEN_ADD_ANALYZES_COMMENT);
    bus.$off(IAnalyzes.BusEvents.EDIT_ANALYZES);
  }
}
</script>

<style lang="scss">


</style>
