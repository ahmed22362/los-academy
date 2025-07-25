import { CustomFlowbiteTheme, Table } from "flowbite-react";
import ContactOptions from "./contactOptions.component";
import { convertDateTimeZone } from "@/utilities";
import StatusBadge from "@/utilities/StatusBadge";
import { Active, Recommend } from "../../admin/plans/components/planTable";
import { GrDocumentDownload } from "react-icons/gr";
import Link from "next/link";
import { renderLinkComponent } from "../../admin/material/components/materialTable";
import { truncateHtmlText } from "@/utilities/truncateHtmlText";

const customTheme: CustomFlowbiteTheme["table"] = {
  head: {
    base: "group/head text-xs uppercase text-black-color-one bg-white-color p-[15px] text-center",
    cell: {
      base: "group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-white-color px-6 py-3",
    },
  },
};

interface RenderTableBodyProps<T> {
  headersValues: string[];
  idValueName: string;
  data: T[];
  contactOptions?: boolean;
  renderUpdateComponent?: (
    rowData: T,
    updateComponent?: () => void,
  ) => JSX.Element | null;
}
const dateTypes: string[] = ["sessionDate", "createdAt"];
export function renderTableBody<T>({
  headersValues,
  idValueName,
  data,
  contactOptions,
  renderUpdateComponent,
}: RenderTableBodyProps<T>) {
  const idClasses =
    "whitespace-nowrap font-medium text-gray-900 text-center dark:text-white";
  return (
    <>
      <Table.Body className="divide-y divide-gray-100">
        {data.map((row: any, index: number) => (
          <Table.Row
            key={index}
            className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center"
          >
            {headersValues.map((valueName: string, columnIndex) => (
              <Table.Cell
                key={columnIndex}
                className={`${valueName === idValueName ? idClasses : ""}`}
              >
                {valueName === idValueName &&
                typeof row[valueName] === "string" ? (
                  row[valueName].slice(-4)
                ) : dateTypes.includes(valueName) ? (
                  convertDateTimeZone(
                    row[valueName],
                    "UTC",
                    Intl.DateTimeFormat().resolvedOptions().timeZone,
                    "YYYY-MM-DD h:mm A",
                  )
                ) : valueName === "sessionInfo.teacher.name" ? (
                  row["sessionInfo"]["teacher"]["name"]
                ) : valueName === "sessionInfo.user.name" ? (
                  row["sessionInfo"]["user"]["name"]
                ) : valueName === "user.name" ? (
                  row["user"]["name"]
                ) : valueName === "teacher.name" ? (
                  row["teacher"]["name"]
                ) : valueName === "status" ? (
                  <StatusBadge status={row[valueName]} />
                ) : valueName === "recommended" ? (
                  <Recommend recommended={row[valueName]} />
                ) : valueName === "active" ? (
                  <Active active={row[valueName]} />
                ) : valueName === "b2Link" ? (
                  renderLinkComponent(row[valueName])
                ) : valueName === "details" ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: truncateHtmlText(row.details, 50),
                    }}
                  />
                ) : valueName === "description" ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: truncateHtmlText(row.description, 50),
                    }}
                  />
                ) : typeof row[valueName] === "string" &&
                  row[valueName].length > 100 ? (
                  row[valueName].substring(0, 100) + "..."
                ) : (
                  row[valueName]
                )}
              </Table.Cell>
            ))}
            {contactOptions && (
              <Table.Cell>
                <ContactOptions
                  phone={(row as any).phone}
                  email={(row as any).email}
                />
              </Table.Cell>
            )}
            {renderUpdateComponent && (
              <Table.Cell>{renderUpdateComponent(row)}</Table.Cell>
            )}
          </Table.Row>
        ))}
      </Table.Body>
    </>
  );
}

export const renderTableHead = (
  headers: string[],
  contactOptions?: boolean,
  updateOptions?: boolean,
) => (
  <Table.Head theme={customTheme.head}>
    {headers.map((header, index) => (
      <Table.HeadCell key={index} theme={customTheme.head}>
        {header}
      </Table.HeadCell>
    ))}
    {contactOptions && (
      <Table.HeadCell theme={customTheme.head}>Contact</Table.HeadCell>
    )}
    {updateOptions && (
      <Table.HeadCell theme={customTheme.head}>options</Table.HeadCell>
    )}
  </Table.Head>
);
