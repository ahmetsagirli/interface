import {
  Flex,
  Tabs,
  Typography,
} from '@ergolabs/ui-kit';
import { t, Trans } from '@lingui/macro';
import { user } from '@spectrumlabs/analytics';
import { FC, useCallback } from 'react';

import { Theme, useApplicationSettings } from '../../context';

export const ThemeSwitch: FC = () => {
  const [settings, setSettings] = useApplicationSettings();
  const { theme } = settings;

  const handleChangeTheme = useCallback(
    (key: Theme) => {
      setSettings({
        ...settings,
        theme: key,
      });
      // fireAnalyticsEvent('Select Theme', { theme: key });
      user.set('theme_active', key);
    },
    [settings, setSettings],
  );

  return (
    <Flex col>
      <Flex.Item marginBottom={1}>
        <Typography.Body size="small">
          <Trans>Theme</Trans>
        </Typography.Body>
      </Flex.Item>
      <Flex col>
        <Flex.Item marginBottom={2}>
          <Tabs
            size="small"
            fullWidth
            onChange={handleChangeTheme as any}
            activeKey={theme || 'light'}
          >
            <Tabs.TabPane tab={t`Dark`} key="dark" />
            <Tabs.TabPane tab={t`Light`} key="light" />
            <Tabs.TabPane tab={t`System`} key="system" />
          </Tabs>
        </Flex.Item>
      </Flex>
    </Flex>
  );
};
