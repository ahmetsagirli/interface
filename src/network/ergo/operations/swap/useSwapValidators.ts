import { MinBoxValue } from '@ergolabs/ergo-sdk';
import { t } from '@lingui/macro';
import { map } from 'rxjs';

import { OperationValidator } from '../../../../components/OperationForm/OperationForm';
import { SwapFormModel } from '../../../../pages/Swap/SwapFormModel';
import { networkAsset } from '../../api/networkAsset/networkAsset';
import { calculateUiFee } from '../../api/uiFee/uiFee';
import { useMaxExFee as useNativeMaxExFee } from '../../settings/executionFee/nativeExecutionFee';
import { useMinerFee } from '../../settings/minerFee';

const useNativeFeeSwapValidators = (): OperationValidator<SwapFormModel>[] => {
  const maxExFee = useNativeMaxExFee();
  const minerFee = useMinerFee();

  const insufficientAssetForFeeValidator: OperationValidator<
    Required<SwapFormModel>
  > = ({ value: { fromAmount } }, balance) => {
    if (!fromAmount) {
      return undefined;
    }

    const totalFees = minerFee.plus(maxExFee).plus(MinBoxValue);

    const totalFeesWithAmount = fromAmount.isAssetEquals(networkAsset)
      ? fromAmount.plus(totalFees)
      : totalFees;

    return calculateUiFee(fromAmount).pipe(
      map((uiFee) =>
        totalFeesWithAmount.plus(uiFee).gt(balance.get(networkAsset))
          ? t`Insufficient ${networkAsset.ticker} balance for fees`
          : undefined,
      ),
    );
  };

  return [insufficientAssetForFeeValidator as any];
};

export const useSwapValidators = (): OperationValidator<SwapFormModel>[] =>
  useNativeFeeSwapValidators();
