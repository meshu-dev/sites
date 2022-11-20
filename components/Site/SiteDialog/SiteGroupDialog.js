import SiteAddDialog from './SiteFormDialog/SiteAddDialog';
import SiteEditDialog from './SiteFormDialog/SiteEditDialog';
import SiteDeleteDialog from './SiteDeleteDialog/SiteDeleteDialog';

const SiteGroupDialog = () => {
  return (
    <div>
      <SiteAddDialog />
      <SiteEditDialog />
      <SiteDeleteDialog />
    </div>
  );
};

export default SiteGroupDialog;
