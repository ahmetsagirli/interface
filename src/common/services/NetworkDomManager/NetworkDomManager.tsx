import capitalize from 'lodash/capitalize';
import last from 'lodash/last';
import { FC } from 'react';
import { useLocation, useParams } from 'react-router';
import {
  generatePath,
  matchPath,
  matchRoutes,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { of } from 'rxjs';

import { RouteConfigExtended } from '../../../components/RouterTitle/RouteConfigExtended';
import {
  defaultNetwork,
  initializeNetwork,
  networksInitialized$,
  SELECTED_NETWORK_KEY,
  selectedNetwork$,
} from '../../../gateway/common/network';
import { Network } from '../../../network/common/Network';
import { useObservable } from '../../hooks/useObservable';
import { localStorageManager } from '../../utils/localStorageManager';

const handleAfterNetworkChange = (
  routesConfig: RouteConfigExtended[],
  network: Network<any, any>,
): void => {
  const matches = matchRoutes(routesConfig, location.pathname) || [];
  const pathPattern = matches
    .filter((m) => m.route.path !== '/' && m.route.path !== '')
    .reduce((pattern, m) => `${pattern}/${m.route.path}`, '');

  location.pathname = generatePath(pathPattern, {
    ...last(matches)?.params,
    network: network.name,
  });
};

const init = (routesConfig: RouteConfigExtended[]): void => {
  const urlNetworkParameter = matchPath(
    { path: ':network', end: false },
    location.pathname,
  )?.params?.network;

  initializeNetwork({
    possibleName: urlNetworkParameter,
    afterNetworkChange: handleAfterNetworkChange.bind(null, routesConfig),
    // Only Ergo is supported, so there is nothing to ask the user about.
    getSelectedNetwork: () => of(defaultNetwork),
  }).subscribe();
};

const NetworkDomManagerOutlet: FC = () => {
  const { network } = useParams<{ network: string }>();
  const location = useLocation();
  const cachedNetwork =
    localStorageManager.get<string>(SELECTED_NETWORK_KEY) ||
    defaultNetwork.name;

  if (cachedNetwork === network) {
    return <Outlet />;
  }
  // Legacy links (e.g. /cardano/swap) keep the page and land on the
  // supported network.
  const restPathname = network
    ? location.pathname.replace(`/${network}`, '')
    : '';

  return (
    <Navigate
      replace={true}
      to={`/${cachedNetwork}${restPathname}${location.search}`}
    />
  );
};

const useNetworkTitle = (): string | undefined => {
  const [selectedNetwork] = useObservable(selectedNetwork$, [], undefined);

  return selectedNetwork ? capitalize(selectedNetwork.label) : undefined;
};

const initialized$ = networksInitialized$;

export const NetworkDomManager = {
  init,
  Outlet: NetworkDomManagerOutlet,
  useNetworkTitle,
  initialized$,
};
