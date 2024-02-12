"use client";

import { Table } from "flowbite-react";
import { convertDateTimeZone } from "@/utilities";

export default function FetchPayOutData({ payOutData }: { payOutData: any }) {
  const payout = payOutData && payOutData;
  const convertTime = convertDateTimeZone;

  return (
    <Table.Row
      key={payout.id}
      className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center"
    >
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {payout.id}
      </Table.Cell>
      <Table.Cell>
        {convertTime(
          payout.createdAt,
          "UTC",
          Intl.DateTimeFormat().resolvedOptions().timeZone,
          "YYYY-MM-DD h:mm A",
        )}
      </Table.Cell>
      <Table.Cell>{payout.amount}$</Table.Cell>
      <Table.Cell>
        {payout.status === "pending" ? (
          <p className="p-2 bg-warning-color text-white rounded-full font-semibold">
            Pending
          </p>
        ) : payout.status === "failed" ? (
          <p className="p-2 bg-danger-color text-white rounded-full font-semibold">
            Failed
          </p>
        ) : (
          <p className="p-2 bg-success-color text-white rounded-full font-semibold">
            Successful
          </p>
        )}
      </Table.Cell>
    </Table.Row>
  );
}
