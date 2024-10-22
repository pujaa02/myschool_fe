import { ChangeEventHandler } from 'react';

interface ISwitch {
  onChangeHandler?: ChangeEventHandler<HTMLInputElement>;
  parentClass?: string;
  name?: string;
  checked?: boolean;
  small?: boolean;
  label?: string;
  switchLabel?: { onText: string; offText: string };
  labelClass?: string;
  labelLeft?: boolean;
  disabled?: boolean;
}
const Switch = ({
  label,
  name,
  parentClass,
  labelClass,
  labelLeft,
  small = false,
  switchLabel,
  checked,
  disabled = false,
  onChangeHandler,
}: ISwitch) => {
  return (
    <div className={`switch-wrap flex items-center ${parentClass}`}>
      {label && labelLeft && (
        <label
          className={`text-14px font-semibold text-dark block max-w-[calc(100%_-_60px)] me-10px ${labelClass}`}
        >
          {label}
        </label>
      )}

      <div
        className={`relative overflow-hidden ${
          small !== undefined && small ? 'w-10 h-6' : ' w-12 h-8'
        }`}
      >
        <input
          type="checkbox"
          checked={checked ?? undefined}
          className="peer absolute p-0 m-0 w-full h-full opacity-0 cursor-pointer"
          name={name}
          id={name}
          disabled={disabled}
          onChange={onChangeHandler}
        />
        <span className="inline-block w-full h-full rounded-full bg-gray-300/70 peer-checked:bg-green3 transition-all duration-300" />
        <span
          className={`${
            small
              ? 'w-5 h-5 peer-checked:left-18px'
              : 'w-[26px] h-[26px] peer-checked:left-5'
          } pointer-events-none inline-block absolute bg-white rounded-full left-0.5 top-1/2 -translate-y-1/2 shadow-lg shadow-black/10 transition-all duration-300`}
        />
        {switchLabel && small !== undefined && !small && (
          <>
            <span className="text-12px font-bold absolute top-1/2 -translate-y-1/2 text-white left-2 opacity-0 peer-checked:opacity-100 transition-all duration-300">
              {switchLabel?.onText}
            </span>
            <span className="text-12px font-bold absolute top-1/2 -translate-y-1/2 text-GrayDark right-2  opacity-100 peer-checked:opacity-0 transition-all duration-300">
              {switchLabel?.offText}
            </span>
          </>
        )}
      </div>

      {label && !labelLeft ? (
        <label
          className={`text-14px font-semibold text-dark block max-w-[calc(100%_-_60px)] ms-10px ${labelClass}`}
        >
          {label}
        </label>
      ) : (
        ''
      )}
    </div>
  );
};

export default Switch;
