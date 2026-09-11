import { MinBoxValue } from '@ergolabs/ergo-sdk';

import { Balance } from '../../../../common/models/Balance';
import { Currency } from '../../../../common/models/Currency';
import { AddLiquidityFormModel } from '../../../../components/AddLiquidityForm/AddLiquidityFormModel';
import { depositMaxButtonClickForNative } from '../../../common/depositMaxButtonClickForNative';
import { useMinExFee as useNativeMinExFee } from '../../settings/executionFee/nativeExecutionFee';
import { useMinerFee } from '../../settings/minerFee';

const useNativeHandleDepositMaxButtonClick = (): ((
  pct: number,
  value: AddLiquidityFormModel,
  balance: Balance,
) => [Currency, Currency]) => {
  const minExFee = useNativeMinExFee();
  const minerFee = useMinerFee();

  return (pct, value, balance) => {
    const totalFees = minerFee.plus(minExFee).plus(MinBoxValue);
    return depositMaxButtonClickForNative(totalFees)(pct, value, balance);
  };
};

export const useHandleDepositMaxButtonClick = (): ((
  pct: number,
  value: AddLiquidityFormModel,
  balance: Balance,
) => [Currency, Currency]) => useNativeHandleDepositMaxButtonClick();
