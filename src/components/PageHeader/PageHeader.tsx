import Button from 'components/Button/Button';
import Image from 'components/Image';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  text?: string;
  titleClass?: string;
  parentClass?: string;
  children?: React.ReactElement;
  small?: boolean;
  url?: string;
  addSpace?: boolean;
  passState?: { [key: string]: unknown };
  customHandleBack?: () => void;
  showBackButton?: boolean;
}

const PageHeader = ({
  text,
  parentClass,
  titleClass,
  children,
  small,
  url,
  addSpace,
  passState,
  showBackButton = true,
  customHandleBack,
}: PageHeaderProps) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(`${url}`, {
      state: passState,
    });
  };
  const getText = () => {
    if (text) {
      if (addSpace) {
        return text.replace(/([A-Z])/g, ' $1');
      }
      return text;
    }
    return '';
  };
  return (
    <div className={`${parentClass ?? ''}  mb-4`}>
      <div className="flex items-center justify-between">
        {showBackButton && url ? (
          <Button
            className="bg-white me-2.5 w-8 h-8 rounded-full border border-solid border-borderColor inline-flex justify-center items-center rotate-180 p-1.5 select-none cursor-pointer active:scale-95"
            onClickHandler={customHandleBack ?? handleBack}
          >
            <Image iconName="arrowRightIcon" />
          </Button>
        ) : (
          ''
        )}

        <h2
          className={`text-dark font-bold leading-[1.5] me-auto ${titleClass} ${
            small ? 'text-2xl' : 'text-4xl '
          }`}
        >
          {getText()}
        </h2>
        {children}
      </div>
    </div>
  );
};

export default PageHeader;
