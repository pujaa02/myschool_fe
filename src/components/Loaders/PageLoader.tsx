// ** CSS **
import './style/pageLoader.css';

type Props = {
  pageLoaderClassName?: string;
  pageLoaderWrapperClassName?: string;
};

const PageLoader = (props: Props) => {
  const { pageLoaderClassName = '' } = props;
  const { pageLoaderWrapperClassName = '' } = props;
  return (
    <div
      className={`pageLoader__wrapper h-screen w-screen flex items-center justify-center ${pageLoaderWrapperClassName}`}
    >
      <div className={`page__round__loader ${pageLoaderClassName}`} />
    </div>
  );
};

export default PageLoader;
