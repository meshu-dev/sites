import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import EnvSelector from './EnvSelector';
import { mainAction } from '@/store/main-slice';
import { menuEnvironmentAction } from '@/store/menu-environment-slice';
import { menuSiteAction } from '@/store/menu-site-slice';
import styles from './EnvSelectorSection.module.scss';

const EnvSelectorSection = () => {
  const dispatch = useDispatch();
  const mainState = useSelector(state => state.main);
  const buttonSectionCSS = { display: mainState.isEditMode ? 'flex' : 'none' };

  const showEditEnvironments = () => {
    dispatch(menuEnvironmentAction.openList());
  };

  const showAddSite = () => {
    dispatch(mainAction.clearStatusMsg());
    dispatch(menuSiteAction.setSelected(null));

    dispatch(menuSiteAction.openAdd());
  };

  return (
    <div id={ styles['environment-selector-wrapper'] }>
      <EnvSelector />
      <div id={ styles['environment-selector-btns'] } style={ buttonSectionCSS }>
        <Button
          variant="contained"
          onClick={ showEditEnvironments }>
          Edit Environments
        </Button>
        <Button
          variant="contained"
          onClick={ showAddSite }>
          Add Site
        </Button>
      </div>
    </div>
  );
}

export default EnvSelectorSection;
