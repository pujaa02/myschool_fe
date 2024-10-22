// ** CSS **
import './style/smallLoader.css';

type Props = {
  smallSpinnerClassName?: string;
};

const Spinner = (props: Props) => {
  const { smallSpinnerClassName = '' } = props;
  return <div className={`small__loader__sd ${smallSpinnerClassName}`} />;
};

export default Spinner;
