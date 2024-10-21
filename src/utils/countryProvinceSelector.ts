import { FieldHelperProps } from 'formik';

export const removeClassFromElement = (item: HTMLElement) =>
  item.classList.remove('active');

export const initializeCustomSelect = (
  existingElement: HTMLElement,
  select: HTMLSelectElement,
  className: string,
  selectWrapperIsExits?: HTMLElement | null,
  isProvince?: boolean,
  selectedValue?: string,
  onChange?: (e?: string) => void
) => {
  const numberOfOptions = select.children.length;
  if (isProvince && selectWrapperIsExits) {
    const ulElement = document.querySelector(`#${className}`);
    ulElement?.parentElement?.removeChild(ulElement);
  }
  const wrapperDivSelect = document.createElement('div');
  wrapperDivSelect.classList.add(className);
  wrapperDivSelect.setAttribute('id', className);
  existingElement.appendChild(wrapperDivSelect);

  select.classList.add('select-hidden');
  const styledSelect = document.createElement('div');
  styledSelect.classList.add('select-styled');
  styledSelect.textContent = select.children[0].textContent;
  wrapperDivSelect.appendChild(styledSelect);

  const optionList = document.createElement('ul');
  optionList.classList.add('select-options');
  wrapperDivSelect.appendChild(optionList);

  for (let i = 0; i < numberOfOptions; i++) {
    const optionItem = document.createElement('li');
    optionItem.textContent = select.children[i].textContent;
    optionItem.dataset.value = (select.children[i] as HTMLOptionElement).value;
    optionList?.appendChild(optionItem);
  }

  const listItems = optionList.querySelectorAll('li');
  (listItems ?? []).forEach((l) => {
    if (l.dataset.value === selectedValue) {
      if (selectedValue) {
        if (onChange) onChange?.(selectedValue);
        (l as unknown as HTMLOptionElement).selected = true;
        styledSelect.textContent = selectedValue;
        l.classList.add('active');
        select.dispatchEvent(new Event('change'));
      }
    }
  });

  return { styledSelect, optionList };
};

export const addEventListeners = (
  styledSelect: HTMLDivElement,
  optionList: HTMLUListElement,
  select: HTMLSelectElement,
  helpers: FieldHelperProps<string>,
  onChange?: (e?: string) => void
) => {
  const listItems = optionList.querySelectorAll('li');
  const func = (event: MouseEvent) => {
    event.stopPropagation();

    styledSelect.classList.toggle('active');
    optionList.classList.toggle('active');
  };

  styledSelect.addEventListener('click', func);

  listItems.forEach((listItem) => {
    const func = (event: MouseEvent) => {
      event.stopPropagation();

      styledSelect.textContent = listItem.textContent;
      styledSelect.classList.remove('active');
      select.value = listItem.dataset.value ?? '';
      helpers?.setValue(select.value);
      optionList.classList.remove('active');
      const selectedValue = listItem.dataset.value;
      if (onChange) onChange?.(selectedValue);
      const selectedOption = select.querySelector(
        `option[value="${selectedValue}"]`
      ) as HTMLOptionElement;
      selectedOption.selected = true;
      listItems.forEach(removeClassFromElement);
      listItem.classList.add('active');
      select.dispatchEvent(new Event('change'));
    };
    listItem.addEventListener('click', func);
  });

  document.addEventListener('click', () => {
    styledSelect.classList.remove('active');
    optionList.classList.remove('active');
  });
};
