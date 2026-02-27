'use client';

import { useState } from 'react';
import GenericComboBox from '@/app/[locale]/components/genericTableComponent/genericSearchBox.component';
import AddSessionReportModal from './addSessionReportModal';

export default function SessionReportComboBox({
  onSearch,
  onReportAdded,
}: {
  onSearch?: (value: string) => void;
  onReportAdded: () => void;
}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <GenericComboBox
      onSearch={onSearch}
      AdditionalComponent={
        <div className="flex flex-row justify-between items-center gap-5 my-3">
          <button
            onClick={() => setOpenModal(true)}
            className="bg-white hover:bg-gray-100 transition-colors text-black-color-one px-5 py-2 rounded-[16px] font-normal"
          >
            Add Report +
          </button>
          <AddSessionReportModal
            openModal={openModal}
            handleCloseModal={() => setOpenModal(false)}
            onReportAdded={onReportAdded}
          />
        </div>
      }
    />
  );
}
