import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import EnvSelector from './EnvSelector';
import { menuEnvironmentAction } from '../../../store/menu-environment-slice';
import { menuSiteAction } from '../../../store/menu-site-slice';
import styles from './EnvSelectorSection.module.scss';

const EnvSelectorSection = () => {
  const dispatch = useDispatch();
  const mainState = useSelector(state => state.main);
  const buttonSectionCSS = { display: mainState.isEditMode ? 'flex' : 'none' };

  const showEditEnvironments = () => {
    dispatch(menuEnvironmentAction.openList());
  };

  const showAddSite = () => {
    dispatch(menuSiteAction.openAdd());
  };

  return (
    <div id={ styles['environment-selector-wrapper'] }>
      <EnvSelector />
      <div id={ styles['environment-selector-btns'] } style={ buttonSectionCSS }>
        <Button
          onClick={ showEditEnvironments }>
          Edit Environments
        </Button>
        <Button
          onClick={ showAddSite }>
          Add Site
        </Button>
      </div>
    </div>
  );
}

export default EnvSelectorSection;
