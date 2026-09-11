import { DateTime } from 'luxon';

import { Dictionary } from './common/utils/Dictionary';
import { isProductionEnv } from './common/utils/env';

const isProductionHost = 'zerodex.vercel.app' === location.host;

interface OperationRestriction {
  readonly asset: string;
  readonly restrictionEnd: DateTime;
  readonly operation: 'swap' | 'liquidity';
}

interface NetworkConfig {
  readonly name: string;
  readonly explorerUrl: string;
  readonly networkUrl: string;
  readonly analyticUrl?: string;
  readonly metadataUrl: string;
  readonly ergopayUrl?: string;
  readonly faucet?: string;
  readonly lowBalanceGuide?: string;
  readonly defaultTokenListUrl: string;
  readonly isCreatePoolAvailable: boolean;
}

interface ApplicationConfig {
  readonly cookieDomain: string | undefined;
  readonly operationTimeoutTime: number;
  readonly reCaptchaKey: string;
  readonly networksSettings: Dictionary<NetworkConfig>;
  readonly social: {
    readonly twitter: string;
    readonly telegram: string;
    readonly discord: string;
    readonly medium: string;
    readonly reddit: string;
  };
  readonly support: {
    readonly discord: string;
    readonly telegram: string;
  };
  readonly applicationTick: number;
  readonly hiddenAssets: string[];
  readonly blacklistedPools: string[];
  readonly blacklistedHistoryAssets: string[];
  readonly farmsWhiteList: string[];
  readonly testFarms: string[];
  readonly operationsRestrictions: OperationRestriction[];
  readonly requestRetryCount: number;
  readonly deprecatedPools: string[];
}

export const applicationConfig: ApplicationConfig = {
  operationTimeoutTime: 60_000,
  cookieDomain: isProductionEnv() ? 'spectrum.fi' : undefined,
  reCaptchaKey: '6LfxqfMpAAAAAOO6oqZxadkZ-CfskD6ME16qcHmj',
  requestRetryCount: 3,
  networksSettings: {
    ergo: {
      name: 'ergo',
      defaultTokenListUrl: 'https://www.ergdex.com/ergo-token-list.json',
      metadataUrl: 'https://spectrum.fi/logos/ergo',
      networkUrl: 'https://api.ergoplatform.com',
      explorerUrl: 'https://ergexplorer.com/',
      analyticUrl: 'https://dex-api.sigmaspace.io/v1/',
      lowBalanceGuide:
        'https://docs.spectrum.fi/docs/user-guides/quick-start#3-get-assets',
      ergopayUrl: 'https://api.ergexplorer.com/ergopay',
      isCreatePoolAvailable: true,
    },
  },
  social: {
    twitter: 'https://x.com/ergdex',
    telegram: 'https://t.me/spectrum_labs_community',
    discord: 'https://discord.com/invite/zY2gmTYQVD',
    medium: 'https://spectrumlabs.medium.com',
    reddit: 'https://www.reddit.com/r/SpectrumLabs/',
  },
  support: {
    discord: 'https://discord.com/invite/zY2gmTYQVD',
    telegram: 'https://t.me/spectrum_labs_community',
  },
  applicationTick: 5 * 1000,
  hiddenAssets: [
    isProductionHost
      ? 'ef802b475c06189fdbf844153cdc1d449a5ba87cce13d11bb47b5a539f27f12b'
      : '',
    isProductionHost
      ? '30974274078845f263b4f21787e33cc99e9ec19a17ad85a5bc6da2cca91c5a2e'
      : '',
  ],
  blacklistedHistoryAssets: [],
  blacklistedPools: [
    'd5fa50968efd6c80621e206cecbdfd9249f94e68a4e00ad219899b7faad49a93',
    '014c77c54b39748551bbc2487d10df9f905c4116af2cb3fd994a77bff2b85129',
    'a279526d972e41f5a3565ce170327589938ea2bfbf0fb2242005075d99a1ee4c',
    '496b5f14a91e8adaad1dbe772238bb52e286723c972321d9ec3585a54e5b64eb',
    'f20f1021e082d61233dad9289fd8542eda367c3d44b0159d2cdd8a3d9a76256c',
    'd367c8a6c801dc46e4d95680cc6d6dba62a41f77239de6591a0f4159733ee14b',
    'e7e4d7eed6093259446fb1e82bcf2b588db88b97e168b034ee2b097037f952c0',
    '91cc16c56015f567402bbc7736083892b0dae74af5790dbda85db43f09be294e',
    'f1fb942ebd039dc782fd9109acdb60aabea4dc7e75e9c813b6528c62692fc781',
    '8036684cf9f3dd5f56d3a88acb6027552d4a128b65224d574b85d8a88479b3b9',
    'e41aefbc42eb83da15b1f5652c3d57a6a2311359f73d376a0d07556d2eec6781',
    'a6ad7c7628e0511d2058129b25f4d1233f4dc849fe107123452f45918e6bfec6',
    'ea4f010c55fc1fa967fcf732721b1b83624e8ee3ccfa83a2d04843d19dbb5576',
    '79221546233de97b2fe84e3ded1a6c2bc4fb5d8abfffc0ed8e5df9c0f7ed5961',
    '03b45ce062567751507493a9006ba0965c916a15c6232a577700d977e360d897',
    'a3f873a8cd44122e355854d568331107d26298a3624a109d99d16d0d1b8b4431',
    '87eb985875596ca28d6ccff6d92ff38a499d1a991284f40e1717e9fac2ae1c40',
    '8693bd01adab33b8dd78800e9083fa0082dbf7be6e953ab6118d1867e187d68a',
    '7173aed06ab6e21d17f5ddddd04f48cfec611d372e6e9d5095ec9972cd380e9c',
    '1083afadd5dafd4c9628f0936a6e127991a5ddfc7239d00ac275ef5e951f5229',
    'ca6d36f0db717faa72f2b3a44831879874084a2a2fb363da5cd7524a73198f7c',
    '68d1396c0a9f7544c60fbfb6a2b5cc1c796c5582c94b5c2f46e2ab7b1c6ea7b4',
    'c4148eb1302d85ea285085fddc4de511c95680acf21989166ef6c659cced9405',
    '0441515ec45be772e1fc82ed5b31551652cba3b3041db69fadfc61e92ede48cc',
    'd1857fcb360400110c626fb356aa80277e3693c66ecc713c86fd71c78ca10cca',
    'ade270c87aa2615bee6b3ee94244d834352e24113f67dab92dffcdc387395d40',
    'ad5682f1e7a0255e8aea3e574b4df389af549292a4eb5ebcc3c6b61692007e34',
    'bee300e9c81e48d7ab5fc29294c7bbb536cf9dcd9c91ee3be9898faec91b11b6',
    '4e497db00769f6402580c351c092ec6ae0306f08575c7a9c719267c84049c840',
    '61a579c46d92f2718576fc9839a2a1983f172e889ec234af8504b5bbf10edd89',
    'e24d17f85ac406827b0436a648f3960d8965e677700949ff28ab0ca9a37dd50e',
  ],
  farmsWhiteList: [
    '1b3d37d78650dd8527fa02f8783d9b98490df3b464dd44af0e0593ceb4717702',
    'af629d8e63d08a9770bc543f807bdb82dcda942d4e21d506771f975dc2b3fd3a',
    '24e9f9a3e0aa89092d8690941900323dea2ee3603ca7368c0c35175259df6930',
    'badf2fabbacf4f8d9efa7549a6ca06bbf02bbd737e1770d7e7df5a8a26a40cfc',
    '563394b82c5a518351fd6994a5f115b0165b8f96e05d460453ba21837091b7dd',
    '4136eba32fe50118ce0c556b83f85c0460da975489a3a5f3d0450fef0ab40dd5',
    '53472966344861e6dc21f59517199672a6486b6ebe57aa211cad03afdd6b816f',
    '5f22cb20453e0856acb4b40e4ee2430e4b73a5abe4e72a0b2235a0adfb48a2be',
    'feb3a5c4b30fbe82ae316465c343169fcf3c0db6bc821902be4928270289f6eb',
    '82737701cc3e083ba3644ffd372c543198a74510e0a45e3bc21744c3185abef4',
    '11c4f52ebeb0e1d291f541a095edd0c101fffaf421c6a6744321b9e4934b724d',
    '25f0defafdc6eb7a9942d26ca8e909f620221bbd53d42df648b7366dbb3dde71',
  ],
  testFarms: [
    '69eff57ea62b13c58e5668e3fbc9927fdb2dffb1c692261f98728a665b2f8abb',
  ],
  deprecatedPools: [],
  operationsRestrictions: [
    {
      asset: 'd71693c49a84fbbecd4908c94813b46514b18b67a99952dc1e6e4791556de413',
      restrictionEnd: DateTime.utc(2022, 2, 2, 19, 0, 0),
      operation: 'swap',
    },
  ],
};
