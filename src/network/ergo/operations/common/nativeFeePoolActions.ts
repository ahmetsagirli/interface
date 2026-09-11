import {
  makeNativePoolActionsSelector,
  makeWrappedNativePoolActionsSelector,
} from '@ergolabs/ergo-dex-sdk';

import { mainnetTxAssembler } from '../../../../services/defaultTxAssembler';
import { uiFeeParams$ } from '../../api/uiFee/uiFee';
import { proverMediator } from './proverMediator';

export const nativeFeePoolActions = makeWrappedNativePoolActionsSelector(
  uiFeeParams$.getValue().address,
  proverMediator,
  mainnetTxAssembler,
);

export const ergoPayNativeFeePoolActions = makeNativePoolActionsSelector(
  uiFeeParams$.getValue().address,
);
