import { BankOutlined, Flex, Tooltip, useDevice } from '@ergolabs/ui-kit';
import { FC } from 'react';

import { AmmPool } from '../../../../../../../common/models/AmmPool';
import { AssetPairTitle } from '../../../../../../../components/AssetPairTitle/AssetPairTitle';
import { DataTag } from '../../../../../../../components/common/DataTag/DataTag';

export interface PairColumnProps {
  readonly ammPool: AmmPool;
}

export const PairColumn: FC<PairColumnProps> = ({ ammPool }) => {
  const { s } = useDevice();

  return (
    <Flex align="center">
      <Flex.Item>
        <AssetPairTitle
          level={s ? 'body-strong' : undefined}
          assetX={ammPool.x.asset}
          assetY={ammPool.y.asset}
          isShowDivider={!s}
        />
      </Flex.Item>
      <Flex.Item marginLeft={2} marginRight={2}>
        <DataTag content={`${ammPool.poolFee}%`} />
      </Flex.Item>
      {ammPool.treasuryFee && (
        <Flex.Item marginRight={2}>
          <DataTag
            content={
              <Tooltip
                placement="top"
                title="The fee charged by the DAO"
                width="200"
              >
                <Flex align="center">
                  <Flex.Item marginRight={1}>
                    <BankOutlined size={16} />
                  </Flex.Item>
                  {`${ammPool.treasuryFee}%`}
                </Flex>
              </Tooltip>
            }
          />
        </Flex.Item>
      )}
    </Flex>
  );
};
