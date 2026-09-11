import { blocksToMillis } from '@ergolabs/ergo-dex-sdk';
import { DateTime } from 'luxon';
import {
  combineLatest,
  debounceTime,
  map,
  publishReplay,
  refCount,
} from 'rxjs';

import { Currency } from '../../../../common/models/Currency.ts';
import { Position } from '../../../../common/models/Position';
import { allAmmPools$ } from '../ammPools/ammPools';
import { lpBalance$ } from '../balance/lpBalance';
import { tokenLocksGroupedByLpAsset$ } from '../common/tokenLocks';
import { networkContext$ } from '../networkContext/networkContext';

export const positions$ = combineLatest([
  allAmmPools$,
  lpBalance$,
  tokenLocksGroupedByLpAsset$,
  networkContext$,
]).pipe(
  debounceTime(300),
  map(
    ([
      ammPools,
      lpWalletBalance,
      tokenLocksGroupedByLpAsset,
      networkContext,
    ]) => {
      return ammPools
        .filter(
          (ammPool) =>
            lpWalletBalance.get(ammPool.lp.asset).isPositive() ||
            tokenLocksGroupedByLpAsset[ammPool.lp.asset.id]?.length > 0,
        )
        .map(
          (ammPool) =>
            new Position(
              ammPool,
              lpWalletBalance.get(ammPool.lp.asset),
              false,
              tokenLocksGroupedByLpAsset[ammPool.lp.asset.id]?.map((item) => ({
                deadline: item.deadline,
                redeemer: item.redeemer,
                active: item.active,
                currentBlock: networkContext.height,
                lockedAsset: new Currency(
                  item.lockedAsset.amount,
                  ammPool.lp.asset,
                ),
                boxId: item.boxId,
                unlockDate: DateTime.now().plus({
                  millisecond: Number(
                    blocksToMillis(item.deadline - networkContext.height - 1),
                  ),
                }),
              })) || [],
            ),
        );
    },
  ),
  publishReplay(1),
  refCount(),
);
