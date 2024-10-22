import ErrorMessage from 'components/FormElement/ErrorMessage';
import { format, setHours, setMinutes, set, startOfToday } from 'date-fns';
import { useFormikContext } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { SetFieldValue } from 'types/common';
import '../style/timePicker.css';

interface ReactTimePickerProps {
  name: string;
  label?: string;
  // placeHolder?: string;
  labelClass?: string;
  parentClass?: string;
  selectedTime?: Date;
  minTime?: Date;
  maxTime?: Date;
  isCompulsory?: boolean;
  setFieldValue?: SetFieldValue;
}

const ReactTimePicker = ({
  name,
  label,
  labelClass,
  parentClass,
  selectedTime,
  minTime,
  maxTime,
  isCompulsory,
  setFieldValue,
}: ReactTimePickerProps) => {
  const formik = useFormikContext();
  const [isError, setIsError] = useState(false);

  const getTime = () => {
    const tzOffset = Date.parse('01 Jan 1970');
    return selectedTime
      ? (selectedTime.getTime() - tzOffset) % 86400000
      : (Date.now() - tzOffset) % 86400000;
  };
  const getHours = () => {
    return Math.floor(getTime() / 3600000) % 24;
  };

  const getMinutes = () => {
    return Math.floor(getTime() / 60000) % 60;
  };

  const getSeconds = () => {
    return Math.floor(getTime() / 1000) % 60;
  };

  let hour: number | undefined;
  let minute: number | undefined;
  let second: number;
  let isDragging = false;
  let isFiredByMouse = false;

  const time = {
    hour: hour === undefined ? getHours() : parseInt(`${hour}`, 10) % 24,
    minute: minute === undefined ? getMinutes() : parseInt(`${minute}`, 10) % 60,
  };

  let timerId: unknown;
  let isPM: boolean = time.hour >= 12;
  const is24H = false;
  const isClk = false;
  const isHidden = false;
  const isLight = true;
  let touchId: number;

  let lastHourDeg = 0;
  let lastMinuteDeg = 0;
  let isHourHand: boolean;
  let centerX: number;
  let centerY: number;
  let isReverseRotate: boolean;

  const clkFaceRef = useRef<HTMLCanvasElement | null>(null);
  const hourHandRef = useRef<HTMLCanvasElement | null>(null);
  const minuteHandRef = useRef<HTMLCanvasElement | null>(null);
  const secondHandRef = useRef<HTMLCanvasElement | null>(null);
  const timeStrRef = useRef<HTMLDivElement | null>(null);
  const tpickRef = useRef<HTMLDivElement | null>(null);

  const cssTransform = () => {
    const propsData = [
      'transform',
      'MozTransform',
      'WebkitTransform',
      'msTransform',
      'OTransform',
    ];
    const root = document.documentElement;
    const matchingProp = propsData.find((element) => element in root.style);
    if (matchingProp) return matchingProp;
    return null;
  };
  const scrollToFix = () => {
    let rect: DOMRect | undefined;
    if (tpickRef.current) rect = tpickRef.current.getBoundingClientRect();
    const dw = document.body.offsetWidth;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    if (rect) {
      const hsSpc = dw > vw ? 20 : 0;
      const scrollX = rect.left < 0 ? rect.left : 0;
      const scrollY =
        rect.bottom - rect.top > vh
          ? rect.top
          : rect.bottom > vh - hsSpc
          ? rect.bottom - vh + hsSpc
          : 0;
      window.scrollBy(scrollX, scrollY);
    }
  };

  useEffect(() => {
    hour = getHours();
    minute = getMinutes();
    scrollToFix();
  }, []);

  useEffect(() => {
    if (isClk) {
      if (hourHandRef.current) setCursor(hourHandRef.current, !isClk);
      if (minuteHandRef.current) setCursor(minuteHandRef.current, !isClk);
      if (secondHandRef.current)
        secondHandRef.current.style.display = isClk ? '' : 'none';
      if (timeStrRef.current) timeStrRef.current.style.display = isClk ? 'none' : '';
      if (tpickRef.current)
        tpickRef.current.style.height = isClk ? '240px' : '320px';
      if (isClk) {
        removeEventListeners();
        hour = getHours();
        minute = getMinutes();
        updClkTm();
        updPickedTm();
      } else {
        second = 0;
        window.clearInterval(timerId as number);
        addEventListeners();
      }
    }
  }, [isClk]);

  useEffect(() => {
    if (
      clkFaceRef.current &&
      hourHandRef.current &&
      minuteHandRef.current &&
      secondHandRef.current
    )
      create();

    if (isClk) {
      if (timeStrRef.current) timeStrRef.current.style.display = 'none';
      updClkTm();
    } else {
      addEventListeners();
      if (hourHandRef.current) setCursor(hourHandRef.current, true);
      if (minuteHandRef.current) setCursor(minuteHandRef.current, true);
      if (secondHandRef.current) secondHandRef.current.style.display = 'none';
      updClkTm();
    }
    updClkPtrs();

    updPickedTm();
    if (!cssTransform()) {
      if (tpickRef.current) tpickRef.current.remove();
      alert("Sorry, your browser doesn't support CSS transform!");
    }
    if (!clkFaceRef?.current?.getContext) {
      if (tpickRef.current) tpickRef.current.remove();
      alert("Sorry, your browser doesn't support HTML canvas!");
    }
    return () => {
      removeEventListeners();
    };
  }, [clkFaceRef, hourHandRef, minuteHandRef, secondHandRef]);

  const setCursor = (e: HTMLCanvasElement, p: boolean) => {
    e.style.cursor = p ? 'pointer' : 'default';
  };

  const getMillis = () => {
    return getTime() % 1e3;
  };
  const updClkTm = () => {
    second = getSeconds();
    if (isClk) {
      timerId = setTimeout(updClkTm, 1e3 - getMillis());
    }
    if (second === 0) {
      minute = getMinutes();
      hour = getHours();
      updPickedTm();
    }
    updClkPtrs();
  };

  const create = () => {
    const ctxClockFace = clkFaceRef?.current?.getContext('2d') ?? null;
    if (ctxClockFace) {
      ctxClockFace.strokeStyle = isLight ? '#000' : '#fff';
      // Draw clock face
      ctxClockFace.beginPath();
      ctxClockFace.arc(120, 120, 119, 0, 2 * Math.PI);
      ctxClockFace.stroke();
      // Create radial gradient for clock face
      const radGrd = ctxClockFace.createRadialGradient(120, 120, 1, 120, 120, 120);
      radGrd.addColorStop(0, isLight ? '#e7e7e7' : '#000');
      radGrd.addColorStop(1, isLight ? '#fff' : '#171717');
      ctxClockFace.fillStyle = radGrd;
      ctxClockFace.beginPath();
      ctxClockFace.arc(120, 120, 118, 0, 2 * Math.PI);
      ctxClockFace.fill();
      ctxClockFace.translate(120, 120);
      ctxClockFace.fillStyle = isLight ? '#000' : '#fff';
      // Draw clock numbers
      for (let i = 0; i < 12; i++) {
        ctxClockFace.beginPath();
        ctxClockFace.arc(0, -110, 2, 0, 2 * Math.PI);
        ctxClockFace.fill();
        ctxClockFace.rotate(Math.PI / 30);
        for (let j = 0; j < 4; j++) {
          ctxClockFace.beginPath();
          ctxClockFace.arc(0, -110, 1, 0, 2 * Math.PI);
          ctxClockFace.fill();
          ctxClockFace.rotate(Math.PI / 30);
        }
      }

      ctxClockFace.font = '18px Verdana';
      ctxClockFace.textAlign = 'center';
      ctxClockFace.textBaseline = 'middle';
      for (let i = 1; i <= 12; i++) {
        ctxClockFace.fillText(
          i.toString(),
          94 * Math.sin((i * Math.PI) / 6),
          -94 * Math.cos((i * Math.PI) / 6)
        );
      }
      ctxClockFace.translate(-120, -120);
    }

    // Initialize hour hand canvas
    const ctxHourHand = hourHandRef?.current?.getContext('2d');
    if (ctxHourHand) {
      ctxHourHand.fillStyle = isLight ? '#000' : '#2196F3';
      // Draw hour hand
      ctxHourHand.beginPath();
      ctxHourHand.moveTo(10, 0);
      ctxHourHand.lineTo(0, 90);
      ctxHourHand.lineTo(20, 90);
      ctxHourHand.lineTo(10, 0);
      ctxHourHand.fill();
    }
    // Initialize minute hand canvas
    const ctxMinuteHand = minuteHandRef?.current?.getContext('2d');
    if (ctxMinuteHand) {
      ctxMinuteHand.fillStyle = isLight ? '#7f7f7f' : '#ffeb3b';
      // Draw minute hand
      ctxMinuteHand.beginPath();
      ctxMinuteHand.moveTo(6, 0);
      ctxMinuteHand.lineTo(0, 110);
      ctxMinuteHand.lineTo(12, 110);
      ctxMinuteHand.lineTo(6, 0);
      ctxMinuteHand.fill();
      ctxMinuteHand.fillStyle = '#000';
      ctxMinuteHand.beginPath();
      ctxMinuteHand.arc(6, 90, 2, 0, 2 * Math.PI);
      ctxMinuteHand.fill();
    }

    // Initialize second hand canvas
    const ctxSecondHand = secondHandRef?.current?.getContext('2d');
    if (ctxSecondHand) {
      ctxSecondHand.fillStyle = '#f44336';
      // Draw second hand
      ctxSecondHand.beginPath();
      ctxSecondHand.moveTo(4, 0);
      ctxSecondHand.lineTo(0, 120);
      ctxSecondHand.lineTo(8, 120);
      ctxSecondHand.lineTo(4, 0);
      ctxSecondHand.fill();
      ctxSecondHand.fillStyle = '#000';
      ctxSecondHand.beginPath();
      ctxSecondHand.arc(4, 90, 2, 0, 2 * Math.PI);
      ctxSecondHand.fill();
    }

    // set a x and y position of canvas to properly rotation
    // const canvasRect =
    tpickRef?.current?.getBoundingClientRect();
    // console.log('Canvas position:', {
    //   top: canvasRect?.top,
    //   left: canvasRect?.left,
    //   width: canvasRect?.width,
    //   height: canvasRect?.height,
    // });
  };

  const updClkPtrs = () => {
    const sec = second * 6;
    if (minute) lastMinuteDeg = (minute + sec / 360) * 6;
    if (hour) lastHourDeg = ((hour % 12) + lastMinuteDeg / 360) * 30;
    rotateElm(hourHandRef.current, lastHourDeg);
    rotateElm(minuteHandRef.current, lastMinuteDeg);
    rotateElm(secondHandRef.current, sec);
  };

  const addEventListeners = () => {
    // Attach mouse event listeners
    if (hourHandRef.current)
      hourHandRef.current.addEventListener('mousedown', onMouseDown);
    if (minuteHandRef.current)
      minuteHandRef.current.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    // Attach touch event listeners
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      if (hourHandRef.current) {
        hourHandRef.current.addEventListener('touchstart', onTouchStart);
        hourHandRef.current.addEventListener('touchmove', onTouchMove);
        hourHandRef.current.addEventListener('touchcancel', onTouchEnd);
        hourHandRef.current.addEventListener('touchend', onTouchEnd);
      }
      if (minuteHandRef.current) {
        minuteHandRef.current.addEventListener('touchstart', onTouchStart);
        minuteHandRef.current.addEventListener('touchmove', onTouchMove);
        minuteHandRef.current.addEventListener('touchcancel', onTouchEnd);
        minuteHandRef.current.addEventListener('touchend', onTouchEnd);
      }
    }
  };

  const removeEventListeners = () => {
    if (hourHandRef.current)
      hourHandRef.current.removeEventListener('mousedown', onMouseDown);
    if (minuteHandRef.current)
      minuteHandRef.current.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    // Remove touch event listeners
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      if (hourHandRef.current) {
        hourHandRef.current.removeEventListener('touchstart', onTouchStart);
        hourHandRef.current.removeEventListener('touchmove', onTouchMove);
        hourHandRef.current.removeEventListener('touchcancel', onTouchEnd);
        hourHandRef.current.removeEventListener('touchend', onTouchEnd);
      }
      if (minuteHandRef.current) {
        minuteHandRef.current.removeEventListener('touchstart', onTouchStart);
        minuteHandRef.current.removeEventListener('touchmove', onTouchMove);
        minuteHandRef.current.removeEventListener('touchcancel', onTouchEnd);
        minuteHandRef.current.removeEventListener('touchend', onTouchEnd);
      }
    }
  };

  const onMouseDown = (e: MouseEvent) => {
    if (!isDragging) {
      e = e || window.event;
      e.preventDefault();
      e.stopPropagation();
      isFiredByMouse = true;
      isHourHand = e.target === hourHandRef.current;
      const canvasDivRect = tpickRef?.current?.getBoundingClientRect();
      if (canvasDivRect) {
        const offsetX = e.pageX - canvasDivRect.left;
        const offsetY = e.pageY - canvasDivRect.top;
        onPtrStart(offsetX, offsetY);
      }
    }
  };
  const onMouseMove = (e: MouseEvent) => {
    if (isDragging && isFiredByMouse) {
      e = e || window.event;
      e.preventDefault();
      const canvasDivRect = tpickRef?.current?.getBoundingClientRect();
      if (canvasDivRect) {
        const offsetX = e.pageX - canvasDivRect.left;
        const offsetY = e.pageY - canvasDivRect.top;
        onPtrMove(offsetX, offsetY);
      }
      // onPtrMove(e.pageX, e.pageY);
    }
  };
  const onMouseUp = (e: MouseEvent) => {
    if (isDragging && isFiredByMouse) {
      e = e || window.event;
      e.preventDefault();
      isDragging = false;
    }
  };

  const onTouchStart = (e: TouchEvent) => {
    e = e || window.event;
    if (isDragging && !isFiredByMouse && e.touches.length === 1) isDragging = false;
    if (!isDragging) {
      const touch = e.changedTouches[0];
      e.preventDefault();
      // e.stopPropagation();
      isFiredByMouse = false;
      touchId = touch.identifier;
      const tempIsHourHand = touch.target === hourHandRef.current;
      isHourHand = tempIsHourHand;
      const canvasDivRect = tpickRef?.current?.getBoundingClientRect();
      if (canvasDivRect) {
        const offsetX = touch.pageX - canvasDivRect.left;
        const offsetY = touch.pageY - canvasDivRect.top;
        onPtrStart(offsetX, offsetY);
      }

      // onPtrStart(touch.pageX, touch.pageY);
    }
  };
  const onTouchMove = (e: TouchEvent) => {
    if (isDragging && !isFiredByMouse) {
      e = e || window.event;
      const touches = e.changedTouches;
      const touch = Array.from(touches).find(
        (element) => element.identifier === touchId
      );
      if (touch) {
        e.preventDefault();
        const canvasDivRect = tpickRef?.current?.getBoundingClientRect();
        if (canvasDivRect) {
          const offsetX = touch.pageX - canvasDivRect.left;
          const offsetY = touch.pageY - canvasDivRect.top;
          onPtrMove(offsetX, offsetY);
        }
      }
    }
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (isDragging && !isFiredByMouse) {
      e = e || window.event;
      const touches = e.changedTouches;
      const touch = Array.from(touches).find(
        (element) => element.identifier === touchId
      );
      if (touch) {
        e.preventDefault();
        isDragging = false;
      }
    }
  };

  const onPtrStart = (x: number, y: number) => {
    isDragging = true;
    if (tpickRef.current && hourHandRef.current) {
      centerX = tpickRef.current.offsetLeft + hourHandRef.current.offsetLeft + 10;
      centerY = tpickRef.current.offsetTop + hourHandRef.current.offsetTop + 70;
      const last = isHourHand ? lastHourDeg : lastMinuteDeg;
      const deg = (-Math.atan2(centerX - x, centerY - y) * 180) / Math.PI;
      const dif = Math.abs(deg - last);
      isReverseRotate = dif > 160 && dif < 200;
    }
  };
  const rotateElm = (elm: HTMLCanvasElement | null, deg: number) => {
    const data = cssTransform();
    if (elm && data) elm.style[data as unknown as number] = `rotate(${deg}deg)`;
  };
  const sign = (n: number) => {
    if (Number.isNaN(n)) return NaN;
    if (n === 0) return 0;
    if (n < 0) return -1;
    return 1;
  };

  const getTmStr = () => {
    if (hour) {
      let s = `${`0${is24H ? hour : hour % 12 === 0 ? 12 : hour % 12}`.slice(
        -2
      )}:${`0${minute}`.slice(-2)}`;
      if (!is24H) s += ` ${isPM ? 'PM' : 'AM'}`;
      handleDateChange();
      return s;
    }
    return '';
  };
  const updPickedTm = () => {
    if (timeStrRef.current) timeStrRef.current.innerText = getTmStr();
  };

  const onPtrMove = (x: number, y: number) => {
    let deg;
    let target;
    if (x !== centerX || y !== centerY) {
      deg = (-Math.atan2(centerX - x, centerY - y) * 180) / Math.PI;
      if (isReverseRotate) deg -= 180;
      if (deg < 0) deg += 360;
      target = isHourHand ? hourHandRef.current : minuteHandRef.current;
      rotateElm(target, deg);
      if (isHourHand) {
        if (
          (deg >= 0 && deg < 90 && lastHourDeg > 270 && lastHourDeg < 360) ||
          (lastHourDeg >= 0 && lastHourDeg < 90 && deg > 270 && deg < 360)
        )
          isPM = !isPM;

        lastHourDeg = deg;
        lastMinuteDeg = (deg % 30) * 12;
        rotateElm(minuteHandRef.current, lastMinuteDeg);
      } else {
        if (
          (lastMinuteDeg > 270 && lastMinuteDeg < 360 && deg >= 0 && deg < 90) ||
          (deg > 270 && deg < 360 && lastMinuteDeg >= 0 && lastMinuteDeg < 90)
        ) {
          let tempLastHourDeg =
            lastHourDeg +
            (deg - lastMinuteDeg - sign(deg - lastMinuteDeg) * 360) / 12;
          if (tempLastHourDeg < 0) tempLastHourDeg += 360;
          tempLastHourDeg %= 360;
          if (tempLastHourDeg > 345 || tempLastHourDeg < 15) isPM = !isPM;
          lastHourDeg = tempLastHourDeg;
        } else {
          let tempLastHourDeg = lastHourDeg + (deg - lastMinuteDeg) / 12;
          if (tempLastHourDeg < 0) tempLastHourDeg += 360;
          tempLastHourDeg %= 360;
          lastHourDeg = tempLastHourDeg;
        }
        lastMinuteDeg = deg;
        rotateElm(hourHandRef.current, lastHourDeg);
      }
      let tempMinute = (6 * lastHourDeg) / 180;
      let tempHour = Math.trunc(tempMinute);
      tempMinute = Math.floor((tempMinute - tempHour) * 60);
      if (isPM) {
        tempHour += 12;
      }
      minute = tempMinute;
      hour = tempHour;
      updPickedTm();
    }
  };

  const createDateFromHourMinute = (hour: number, minute: number) => {
    const currentDate = startOfToday();
    return setMinutes(setHours(currentDate, hour), minute);
  };

  const normalizeDate = (date: Date) => set(date, { year: 1970, month: 0, date: 1 });

  const handleDateChange = () => {
    if (!hour || !minute || !name) return;
    const currentTime = normalizeDate(createDateFromHourMinute(hour, minute));
    const newMinTime = minTime ? normalizeDate(minTime) : null;
    const newMaxTime = maxTime ? normalizeDate(maxTime) : null;

    const isOutOfRange =
      (newMinTime && currentTime < newMinTime) ||
      (newMaxTime && currentTime > newMaxTime);

    if (isOutOfRange) {
      if (!isError) {
        setIsError(true);
        return;
      }
    } else setIsError(false);
    setFieldValue?.(name, currentTime?.toISOString());
  };
  return (
    <div className={`w-full relative  ${parentClass ?? ''}`}>
      {label && (
        <label
          className={`text-sm text-black leading-4 block mb-2 ${labelClass ?? ''}`}
        >
          {label}
          {isCompulsory && <span className="text-red-700">*</span>}
        </label>
      )}
      <div
        ref={tpickRef}
        style={{
          position: 'relative',
          width: '240px',
          height: '240px',
          margin: '0 auto',
          display: isHidden ? 'none' : '',
        }}
      >
        {/* Clock face */}
        <canvas
          ref={clkFaceRef}
          width={240}
          height={240}
          style={{
            position: 'absolute',
            left: '0px',
            top: '0px',
          }}
        />

        {/* Hour hand */}
        <canvas
          ref={hourHandRef}
          width={20}
          height={90}
          style={{
            position: 'absolute',
            left: '110px',
            top: '50px',
            transformOrigin: '50% 70px',
          }}
        />

        {/* Minute hand */}
        <canvas
          ref={minuteHandRef}
          width={12}
          height={110}
          style={{
            position: 'absolute',
            left: '114px',
            top: '30px',
            transformOrigin: '50% 90px',
          }}
        />

        {/* Second hand */}
        <canvas
          ref={secondHandRef}
          width={8}
          height={120}
          style={{
            position: 'absolute',
            left: '116px',
            top: '30px',
            transformOrigin: '50% 90px',
            display: isClk ? '' : 'none',
          }}
        />
      </div>
      {/* Time display */}
      <div
        ref={timeStrRef}
        className={`${
          isError ? 'error-message' : ''
        } input-field mx-auto mt-4 text-center`}
        style={{
          // position: 'absolute',
          // left: '60px',
          // top: '248px',
          // width: '120px',
          // textAlign: 'center',
          // fontSize: '24px',
          // fontFamily: 'Verdana',
          cursor: 'default',
          display: isClk ? 'none' : '',
        }}
      >
        {selectedTime && format(selectedTime, 'hh:mm a')}
      </div>

      {formik && name && <ErrorMessage name={name} />}
    </div>
  );
};

export default ReactTimePicker;
