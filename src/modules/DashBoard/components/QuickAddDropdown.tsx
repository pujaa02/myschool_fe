// ** Import Packages **

// ** Components **
import Button from 'components/Button';


const QuickAddDropDown = () => {

  return (
    <>
      <div
        className="inline-flex items-center relative header__quick__wrapper z-[5]"
      >
        <Button
          className="!text-[0px] primary__Btn !bg-black w-[30px] h-[30px] rounded-full !p-0 relative hover:!bg-primaryColorSD before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-y-[-50%] before:translate-x-[-50%] before:w-[2px] before:h-[12px] before:bg-white before:rounded-[20px] after:content-[''] after:absolute after:top-[50%] after:left-[50%] after:translate-y-[-50%] after:translate-x-[-50%] after:h-[2px] after:w-[12px] after:bg-white after:rounded-[20px]"
        >
          add student or teacher
        </Button>
       
      </div>
     
    </>
  );
};

export default QuickAddDropDown;
