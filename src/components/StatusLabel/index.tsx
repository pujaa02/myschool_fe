import Button from 'components/Button/Button';

interface StatusLabelProps {
  className?: string;
  text?: string;
  variants?:
    | 'primary'
    | 'primaryFill'
    | 'secondary'
    | 'completed'
    | 'pending'
    | 'cancelled'
    | 'neon'
    | 'gray'
    | 'WhiteBorder';
  style?: any;
}

const getLabelvariant = (variant: string) => {
  switch (variant) {
    case 'primary':
      return 'bg-primary/10 text-primary';
    case 'primaryFill':
      return 'bg-primary text-white';
    case 'secondary':
      return 'bg-secondary/10 text-secondary';
    case 'completed':
      return 'bg-green2/10 text-green2';
    case 'pending':
      return 'bg-orange2/10 text-orange2';
    case 'cancelled':
      return 'bg-danger/10 text-danger';
    case 'neon':
      return 'bg-lime text-primary';
    case 'gray':
      return 'bg-navText/10 text-navText';
    case 'WhiteBorder':
      return 'border border-solid border-borderColor bg-white text-navText';
    default:
      return 'sdsd';
  }
};

const StatusLabel = ({ text, variants, className, style }: StatusLabelProps) => {
  return (
    <Button
      customStyle={style}
      className={`text-sm w-fit leading-4 px-2.5 py-1.5 inline-flex items-center justify-center rounded-md ${
        className ?? ''
      } ${
        variants
          ? getLabelvariant(variants)
          : 'ring-1 ring-gray-200 bg-white text-dark'
      }`}
    >
      <span className="capitalize">{text}</span>
    </Button>
  );
};

export default StatusLabel;
