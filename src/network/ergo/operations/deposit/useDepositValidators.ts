import { MinBoxValue } from '@ergolabs/ergo-sdk';
import { t } from '@lingui/macro';

import { AddLiquidityFormModel } from '../../../../components/AddLiquidityForm/AddLiquidityFormModel';
import { OperationValidator } from '../../../../components/OperationForm/OperationForm';
import { networkAsset } from '../../api/networkAsset/networkAsset';
import { useMinExFee as useNativeMinExFee } from '../../settings/executionFee/nativeExecutionFee';
import { useMinerFee } from '../../settings/minerFee';

const useNativeFeeSwapValidators = () => {
  const minExFee = useNativeMinExFee();
  const minerFee = useMinerFee();

  const insufficientFeeValidator: OperationValidator<AddLiquidityFormModel> = (
    { value: { x, y } },
    balance,
  ) => {
    let totalFeesWithAmount = minerFee.plus(minExFee).plus(MinBoxValue);

    totalFeesWithAmount = x?.isAssetEquals(networkAsset)
      ? totalFeesWithAmount.plus(x)
      : totalFeesWithAmount;

    totalFeesWithAmount = y?.isAssetEquals(networkAsset)
      ? totalFeesWithAmount.plus(y)
      : totalFeesWithAmount;

    return totalFeesWithAmount.gt(balance.get(networkAsset))
      ? t`Insufficient ${networkAsset.ticker} balance for fees`
      : undefined;
  };

  return [insufficientFeeValidator];
};

export const useDepositValidators =
  (): OperationValidator<AddLiquidityFormModel>[] =>
    useNativeFeeSwapValidators();
