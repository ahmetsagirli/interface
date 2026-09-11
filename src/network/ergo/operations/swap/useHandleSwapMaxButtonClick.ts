import { MinBoxValue } from '@ergolabs/ergo-sdk';

import { Currency } from '../../../../common/models/Currency';
import { networkAsset } from '../../api/networkAsset/networkAsset';
import { calculateUiFeeSync } from '../../api/uiFee/uiFee';
import { useMaxExFee as useNativeMaxExFee } from '../../settings/executionFee/nativeExecutionFee';
import { useMinerFee } from '../../settings/minerFee';

const useNativeHandleSwapMaxButtonClick = (): ((
  balance: Currency,
) => Currency) => {
  const minerFee = useMinerFee();
  const maxExFee = useNativeMaxExFee();

  return (balance) => {
    if (balance.asset.id === networkAsset.id) {
      const balanceWithoutExAndMinerFees = balance
        .minus(maxExFee)
        .minus(minerFee)
        .minus(MinBoxValue);
      const uiFee = calculateUiFeeSync(balanceWithoutExAndMinerFees);

      return balanceWithoutExAndMinerFees.minus(uiFee);
    }

    return balance;
  };
};

export const useHandleSwapMaxButtonClick = (): ((
  balance: Currency,
) => Currency) => useNativeHandleSwapMaxButtonClick();
