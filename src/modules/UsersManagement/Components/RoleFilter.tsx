import Button from 'components/Button/Button';
import Switch from 'components/FormElement/Switch';
import Image from 'components/Image';
import { RoleFilterProps } from 'modules/UsersManagement/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { customRandomNumberGenerator } from 'utils';

const RoleFilterComponent = ({
  roleFilter,
  setRoleFilter,
  setActiveRoles,
}: RoleFilterProps) => {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(false);

  const handleRoleChange = (e: React.SyntheticEvent) => {
    const field = e.currentTarget.id;
    const updatedRoleFilter = roleFilter.map((item) => {
      return item.key === field ? { ...item, isChecked: !item.isChecked } : item;
    });
    setRoleFilter(updatedRoleFilter);
    const newActiveData = updatedRoleFilter
      .filter((dat) => dat.isChecked === true)
      .map((dat) => dat.id)
      .join(',');
    setActiveRoles(newActiveData.includes('0') ? '' : newActiveData);
  };
  return (
    <div className="flex gap-2 justify-between items-center">
      {t('UserManagement.addEditUser.role')}
      <Button
        className="relative group"
        onClickHandler={() => setIsActive(!isActive)}
      >
        <Image iconName="filterStrokeSD" width={20} height={20} />
        {isActive ? (
          <div className="visible h-auto  absolute top-7 right-0 shadow-md rounded-md bg-white flex flex-col">
            <div className="absolute w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white -top-2 right-0" />
            {roleFilter?.map((item) => {
              return (
                <div
                  key={customRandomNumberGenerator()}
                  className={`flex px-4 py-2 gap-4 items-center  whitespace-nowrap ${
                    item.key === 'selectAll' ? 'border-b border-b-borderColor' : ''
                  }`}
                >
                  <Switch
                    name={item.key}
                    label={item.title}
                    checked={item.isChecked}
                    onChangeHandler={(e) => handleRoleChange(e)}
                    small
                  />
                </div>
              );
            })}
          </div>
        ) : (
          ''
        )}
      </Button>
    </div>
  );
};

export default RoleFilterComponent;
