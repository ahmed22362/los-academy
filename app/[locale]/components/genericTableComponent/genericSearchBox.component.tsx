'use client';

import { useEffect, useRef, useState } from 'react';

export default function GenericComboBox({
  AdditionalComponent,
  onSearch,
}: {
  AdditionalComponent?: JSX.Element;
  onSearch?: (value: string) => void;
}) {
  const [searchValue, setSearchValue] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    console.log(val);
    setSearchValue(val);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      onSearch?.(val);
    }, 1000);
  };

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <section className={'mb-3'}>
      <div
        className={
          'flex flex-row w-full justify-between items-center bg-white-color p-5 rounded-[16px] flex-wrap'
        }
      >
        <div>
          <input
            className={
              'border-0 rounded-[16px] w-[420px] max-md:w-full focus:border-[2px] border-secondary-color transition-all'
            }
            type={'search'}
            placeholder={'search'}
            value={searchValue}
            onChange={handleChange}
          />
        </div>
        {AdditionalComponent}
      </div>
    </section>
  );
}
