import { Observable } from 'rxjs';

import { AmmPool } from '../../common/models/AmmPool';
import { Currency } from '../../common/models/Currency';
import { TxId } from '../../common/types';
import { AddLiquidityFormModel } from '../../components/AddLiquidityForm/AddLiquidityFormModel';
import { CreatePoolFormModel } from '../../pages/CreatePool/CreatePoolFormModel';
import { RemoveLiquidityFormModel } from '../../pages/RemoveLiquidity/RemoveLiquidityFormModel';
import { SwapFormModel } from '../../pages/Swap/SwapFormModel';

export interface NetworkOperations {
  swap(data: Required<SwapFormModel>): Observable<TxId>;
  deposit(
    data: Required<AddLiquidityFormModel>,
    withoutConfirmation?: boolean,
  ): Observable<TxId>;
  createPool(data: Required<CreatePoolFormModel>): Observable<TxId>;
  redeem(
    pool: AmmPool,
    data: Required<RemoveLiquidityFormModel>,
    withoutConfirmation?: boolean,
  ): Observable<TxId>;
  refund(
    txId: TxId,
    xAmount: Currency,
    yAmount: Currency,
    manual?: boolean,
  ): Observable<TxId>;
}
