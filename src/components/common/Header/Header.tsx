import { faCog, faHistory } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Image } from '@geist-ui/react';
import React, { useContext } from 'react';

import logo from '../../../assets/images/logo.svg';
import { WalletContext } from '../../../context';
import { useToggle } from '../../../hooks/useToggle';
import { ConnectWallet } from '../../ConnectWallet/ConnectWallet';
import { FeedbackLink } from '../../FeedbackLink/FeedbackLink';
import { HistoryModal } from '../../HistoryModal/HistoryModal';
import { InstructionsModal } from '../../InstructionsModal/InstructionsModal';
import { NetworkDropdown } from '../../NetworkDropdown/NetworkDropdown';
import { SettingsModal } from '../../Settings/SettingsModal';
import css from './header.module.scss';

const SettingsButton = ({ className }: { className: string }): JSX.Element => {
  const [open, handleOpen, handleClose] = useToggle(false);

  return (
    <div className={className}>
      <Button
        auto
        type="abort"
        disabled={open}
        icon={<FontAwesomeIcon icon={faCog} size="lg" />}
        onClick={handleOpen}
      />
      <SettingsModal open={open} onClose={handleClose} />
    </div>
  );
};

const HistoryButton = ({ className }: { className: string }): JSX.Element => {
  const [open, handleOpen, handleClose] = useToggle(false);

  return (
    <div className={className}>
      <Button
        auto
        type="abort"
        disabled={open}
        icon={<FontAwesomeIcon icon={faHistory} size="lg" />}
        onClick={handleOpen}
      />
      <HistoryModal open={open} onClose={handleClose} />
    </div>
  );
};

type Props = {
  showNav?: boolean;
};

const Header: React.FC<Props> = ({ showNav = true }) => {
  const { isWalletConnected } = useContext(WalletContext);

  // TODO: split this component to Header and Navbar components
  return (
    <header className={css.header}>
      <div>
        <a href={window.location.origin} className={css.logotype}>
          <Image src={logo} className={css.main} />
        </a>
      </div>
      <div className={css.tools}>
        {showNav && (
          <>
            <NetworkDropdown />
            <FeedbackLink className={css.feedback} />
            <InstructionsModal className={css.rightsideItem} />
            <SettingsButton className={css.rightsideItem} />
            {isWalletConnected && (
              <HistoryButton className={css.rightsideItem} />
            )}
            <ConnectWallet className={css.rightsideItem} />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
