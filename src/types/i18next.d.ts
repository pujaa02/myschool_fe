import 'i18next';
import { defaultNS, resources } from '../localization';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)['it'];
  }
}
