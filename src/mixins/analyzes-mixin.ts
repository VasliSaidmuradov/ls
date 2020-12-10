import { Component, Vue } from 'vue-property-decorator';
import {IDashBoard} from '@/interfaces/dashboard.interface';
import IRanges = IDashBoard.IRanges;


@Component({})
export default class AnalyzesMixin extends Vue {
  getRanges(ranges: IRanges | undefined): string {
    if (!ranges) return '';
    return ranges?.min !== null && ranges?.max !== null
      ? `${ranges.min} - ${ranges.max}`
      : ranges.min !== null
        ? `${ranges.min} >`
        : `< ${ranges.max}`
  }
}
