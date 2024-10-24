import Button from 'components/Button/Button';
import Image from 'components/Image';
import { REACT_APP_API_BASE_URL } from 'config';
import { FormatDateFromNow } from 'constants/common.constant';
import { useEffect, useRef, useState } from 'react';
import { DescriptionDisplayProps } from '../types';

const DescriptionDisplay = ({
  descriptionNotes,
  CurrentUser,
  // t,
  storeLang,
  deleteModal,
  setNoteSlug,
  className,
  moreButtonClass,
}: DescriptionDisplayProps) => {
  const scrollDivRef = useRef<HTMLDivElement>(null);

  const [sliceBy, setSliceBy] = useState({
    activitySlice: 5,
  });

  useEffect(() => {
    if (sliceBy.activitySlice !== 3 && descriptionNotes) {
      scrollToTop();
    }
  }, [descriptionNotes]);

  const scrollToTop = () => {
    if (scrollDivRef.current) {
      scrollDivRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };
  return (
    <div
      ref={scrollDivRef}
      className={`overflow-auto max-h-[330px] p-2  comment-list flex flex-col gap-y-5  ${
        className ?? ''
      }`}
    >
      {descriptionNotes
        ?.slice(0, sliceBy.activitySlice)
        ?.map((data, index: number) => {
          return (
            <div
              className="bg-white shadow-md rounded-md p-5"
              key={`order_comment_${index + 1}`}
            >
              <div className="flex gap-2.5 items-start">
                <div className="w-7 h-7">
                  <Image
                    width={32}
                    height={32}
                    alt={'ProjectManagement.CustomCardModal.attachmentAltText'}
                    src={
                      CurrentUser?.profile_image
                        ? `${REACT_APP_API_BASE_URL}/${CurrentUser?.profile_image}`
                        : '/images/default-avatar.jpg'
                    }
                    imgClassName="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-primary text-sm font-semibold">
                    {CurrentUser?.full_name}
                  </p>
                  <span className="block text-grayText text-xs leading-4">
                    {data?.created_at &&
                      FormatDateFromNow(data?.created_at, true, storeLang)}
                  </span>
                </div>
                {String(CurrentUser?.id) === String(data?.created_by) && (
                  <Button
                    parentClass="h-fit"
                    className="action-button red-btn ml-auto shrink-0"
                    onClickHandler={() => {
                      deleteModal?.openModal();
                      setNoteSlug(data?.slug);
                    }}
                    tooltipText={'Tooltip.Delete'}
                  >
                    <Image
                      iconName="deleteIcon"
                      iconClassName="w-5 h-5 stroke-current"
                    />
                  </Button>
                )}
              </div>
              <div className="border border-solid border-borderColor rounded-lg p-4 mt-2.5 text-sm text-dark">
                {data.notes}
              </div>
            </div>
          );
        })}
      {descriptionNotes && descriptionNotes?.length > 5 && (
        <Button
          onClickHandler={() => {
            setSliceBy({
              activitySlice:
                sliceBy.activitySlice !== descriptionNotes?.length &&
                descriptionNotes
                  ? descriptionNotes.length
                  : 5,
            });
          }}
          className={`w-fit text-sm text-ic_1 font-medium hover:opacity-70 ${
            moreButtonClass ?? ''
          }`}
        >
          {sliceBy.activitySlice === descriptionNotes?.length
            ? 'ProjectManagement.CustomCardModal.showLess'
            : 'ProjectManagement.CustomCardModal.showMore'}
        </Button>
      )}
    </div>
  );
};
export default DescriptionDisplay;
