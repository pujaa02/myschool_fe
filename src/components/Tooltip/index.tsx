import Button from 'components/Button/Button';

interface ToolTipProps {
  position?: 'top' | 'bottom' | 'left' | 'right';
  text?: string | React.ReactNode;
  className?: string;
  spanClass?: string;
}

const getToolTipPosition = (variant: string) => {
  switch (variant) {
    case 'top':
      return 'left-1/2 -translate-x-1/2 mx-auto bottom-[calc(100%_+_15px)] group-hover:bottom-[calc(100%_+_5px)] before:border-t-8 before:border-x-8 before:border-x-transparent before:border-b-0 before:border-t-dark before:-bottom-1.5 before:-translate-x-1/2 before:left-1/2 ';
    case 'bottom':
      return 'left-1/2 -translate-x-1/2 mx-auto top-[calc(100%_+_15px)] group-hover:top-[calc(100%_+_5px)] before:border-b-8 before:border-x-8 before:border-x-transparent before:border-t-0 before:border-b-dark before:-top-1.5 before:-translate-x-1/2 before:left-1/2 ';
    case 'left':
      return 'top-1/2 -translate-y-1/2 right-[calc(100%_+_15px)] group-hover:right-[calc(100%_+_5px)] before:border-l-8 before:border-y-8 before:border-y-transparent before:border-r-0 before:border-l-dark before:top-1/2 before:-translate-y-1/2 before:left-[calc(100%_-_4px)] ';
    case 'right':
      return 'top-1/2 -translate-y-1/2 left-[calc(100%_+_15px)] group-hover:left-[calc(100%_+_5px)] before:border-r-8 before:border-y-8 before:border-y-transparent before:border-l-0 before:border-r-dark before:top-1/2 before:-translate-y-1/2 before:right-[calc(100%_-_4px)]';
    default:
      return 'left-1/2 -translate-x-1/2 mx-auto bottom-[calc(100%_+_15px)] group-hover:bottom-[calc(100%_+_5px)] before:border-t-8 before:border-x-8 before:border-x-transparent before:border-b-0 before:border-t-dark before:-bottom-1.5 before:-translate-x-1/2 before:left-1/2 ';
  }
};

const ToolTip = ({ className, position, text, spanClass }: ToolTipProps) => {
  return (
    <Button
      className={`inline-block w-max transition-all duration-300 pointer-events-none group-hover:opacity-100 opacity-0 absolute max-w-[200px] bg-dark text-white z-2 px-2 py-px text-sm font-normal font-sans rounded  before:absolute before:content-[''] before:border-solid 
      ${getToolTipPosition(`${position}`)} ${className || ''} ${spanClass ?? ''}`}
    >
      {text ?? 'Tooltip Text'}
    </Button>
  );
};

export default ToolTip;
