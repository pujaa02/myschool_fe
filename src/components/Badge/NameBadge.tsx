// =================== import packages ==================
import { NAME_BADGE_COLOR_COMBINATIONS } from '../../constants/index';
import { useEffect, useState } from 'react';
import { customRandomNumberGenerator, generateFirstLetter } from 'utils';


interface NameBadgeProps {
  first_name?: string;
  last_name?: string;
  color?: string;
}

const NameBadge = (props: NameBadgeProps) => {
  const { first_name, last_name, color } = props;

  // ================= States ===================
  const [combination, setCombination] = useState({
    bgColor: '',
    Color: '',
  });
  // ================= Hooks =============
  useEffect(() => {
    if (color) {
      setCombination(
        NAME_BADGE_COLOR_COMBINATIONS.filter((e: { Color: string; }) => e.Color === color)[0]
      );
    } else {
      const randomNumberGenerate = customRandomNumberGenerator(
        NAME_BADGE_COLOR_COMBINATIONS.length
      );

      setCombination(NAME_BADGE_COLOR_COMBINATIONS[randomNumberGenerate]);
    }
  }, [first_name, last_name]);

  return (
    <>
      <div
        style={{ backgroundColor: `var(--${combination?.bgColor})` }}
        className="w-[70px] h-[70px] noName__letter rounded-full flex items-center justify-center"
      >
        <span
          style={{ color: `var(--${combination?.Color})` }}
          className="noName__letter__text text-2xl font-biotif__ExtraBold text-center"
        >
          {generateFirstLetter(first_name)}
          {generateFirstLetter(last_name || first_name?.slice(1))}
        </span>
      </div>
    </>
  );
};

export default NameBadge;
