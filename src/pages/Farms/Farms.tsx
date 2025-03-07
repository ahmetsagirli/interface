import { Flex } from '@ergolabs/ui-kit';
import flow from 'lodash/flow';
import { useNavigate } from 'react-router-dom';

import { useObservable } from '../../common/hooks/useObservable';
import { useSearchParams } from '../../common/hooks/useSearchParams';
import { Farm, FarmStatus } from '../../common/models/Farm';
import { Page } from '../../components/Page/Page';
import { useSelectedNetwork } from '../../gateway/common/network';
import { useGuardV2 } from '../../hooks/useGuard';
import { farms$ } from '../../network/ergo/lm/api/farms/farms';
import { FarmGuides } from './FarmGuides/FarmGuides';
import { FarmTableView } from './FarmTableView/FarmTableView';
import { FarmTopPanel } from './FarmTopPanel/FarmTopPanel';
import { FarmTabs } from './types/FarmTabs';

const filterFarmsByStatus = (
  activeStatus: FarmStatus,
): ((farms: Farm[]) => Farm[]) => {
  return (farms) => {
    if (activeStatus && activeStatus !== FarmStatus.All) {
      return farms.filter((farm) => farm.status === activeStatus);
    }
    return farms;
  };
};

const filterMyFarms = (activeTab: FarmTabs): ((farms: Farm[]) => Farm[]) => {
  return (farms) => {
    if (activeTab && activeTab === FarmTabs.MyFarms) {
      return farms.filter((farm) => farm.yourStakeLq.isPositive());
    }
    return farms;
  };
};

const filterFarmsByTerm = (term?: string): ((farms: Farm[]) => Farm[]) => {
  return (farms) => {
    if (!term?.trim()) {
      return farms;
    }
    return farms.filter(
      (farm) => farm.ammPool.match(term) || farm.id.match(term),
    );
  };
};

export const Farms = (): JSX.Element => {
  const [selectedNetwork] = useSelectedNetwork();
  const navigate = useNavigate();
  const [{ activeStatus, activeTab, searchString }, setSearchParams] =
    useSearchParams<{
      activeStatus: FarmStatus;
      activeTab: FarmTabs;
      searchString: string;
    }>();
  const [farms, isFarmsLoading] = useObservable(farms$, [], []);

  const filteredFarms: Farm[] = flow([
    filterFarmsByStatus(activeStatus),
    filterMyFarms(activeTab),
    filterFarmsByTerm(searchString),
  ])(farms);

  useGuardV2(
    () => selectedNetwork.name !== 'ergo',
    () => navigate(`../../../swap`),
  );

  return (
    <Page maxWidth={1110} padding={0} transparent>
      <Flex col>
        <Flex.Item marginBottom={6} display="none">
          <FarmGuides />
        </Flex.Item>
        <Flex.Item marginBottom={6}>
          <FarmTopPanel
            setSearchParams={setSearchParams}
            activeStatus={activeStatus}
            activeTab={activeTab}
            searchString={searchString}
          />
        </Flex.Item>
        <FarmTableView loading={isFarmsLoading} items={filteredFarms} />
      </Flex>
    </Page>
  );
};
