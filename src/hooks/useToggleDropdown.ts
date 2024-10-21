import { useEffect, useRef, useState } from 'react';

type Props = {
  id?: string;
  className?: string;
};

export const useToggleDropdown = (props: Props = {}) => {
  const { id, className } = props;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownList, setIsDropdownList] = useState<{
    isOpen: boolean;
    id: number | null;
  }>({
    isOpen: false,
    id: null,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleDropdownForList = ({
    idToggle,
    isOpen,
  }: {
    idToggle: number;
    isOpen: boolean;
  }) => {
    setIsDropdownList({ id: idToggle, isOpen });
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownList({
        id: null,
        isOpen: false,
      });
      setIsDropdownOpen(false);
    }
  };

  const closeDropDown = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClick = (event: Event) => {
      if (event.type === 'mousedown') {
        const target = event.target as HTMLElement;
        if (id && target.id !== id) {
          return;
        }
        if (className && !target.classList.contains(className)) {
          return;
        }
        handleClickOutside(event as MouseEvent);
      }
    };
    if (id) {
      const element = document.getElementById?.(id);
      element?.addEventListener?.('mousedown', handleClick);
    } else if (className) {
      const element = document.getElementsByClassName(className)[0];
      element?.addEventListener('mousedown', handleClick);
    } else {
      document.addEventListener('mousedown', handleClick);
    }
    return () => {
      if (id) {
        const element = document.getElementById?.(id);
        element?.removeEventListener?.('mousedown', handleClick);
      } else if (className) {
        const element = document.getElementsByClassName(className)[0];
        element?.removeEventListener('mousedown', handleClick);
      } else {
        document.removeEventListener('mousedown', handleClick);
      }
    };
  }, []);

  return {
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
    toggleDropdownForList,
    isDropdownList,
    setIsDropdownOpen,
    closeDropDown,
  };
};
