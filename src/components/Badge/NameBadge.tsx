import { generateFirstLetter } from './constants';

type Props = {
  parentClass?: string;
  FirstName?: string;
  LastName?: string;
};

const NameBadge = (props: Props) => {
  const { parentClass, FirstName, LastName } = props;
  return (
    <div
      className={`w-8 h-8 bg-gray-300/50 text-dark font-semibold text-sm rounded-full flex items-center justify-center ${parentClass}`}
    >
      <span>
        {generateFirstLetter(FirstName)}
        {generateFirstLetter(LastName ? LastName?.slice(0) : '')}
      </span>
    </div>
  );
};

export default NameBadge;
