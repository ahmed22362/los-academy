import { CustomFlowbiteTheme, Spinner, Table } from "flowbite-react";
import { convertDateTimeZone } from "@/utilities";

export default function GenericTable({
  tableName,
  headers,
  data,
  ComboBox,
  EditCells,
  isLoading,
}: {
  tableName: string;
  headers: string[];
  data: object[];
  ComboBox: any;
  isLoading: boolean;
  EditCells: any;
}) {
  const customTheme: CustomFlowbiteTheme["table"] = {
    head: {
      base: "group/head text-xs uppercase text-black-color-one bg-white-color p-[15px] text-center",
      cell: {
        base: "group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-white-color px-6 py-3",
      },
    },
  };
  const IdComb = (id: any) => {
    return (
      <div className="flex items-center space-x-2 text-sm">
        <div>
          <a href="#" className="text-blue-500 font-bold hover:underline">
            #{id}
          </a>
        </div>
      </div>
    );
  };
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="xl" />
        </div>
      ) : (
        <div className="p-5">
          <ComboBox />
          <div className="overflow-auto rounded-lg shadow hidden md:block">
            <Table>
              <Table.Head theme={customTheme.head}>
                {headers.map((header) => (
                  <Table.HeadCell theme={customTheme.head}>
                    {header === "id" ? "#" + header : header}
                  </Table.HeadCell>
                ))}
              </Table.Head>
              <Table.Body className="divide-y divide-gray-100">
                {data && data.length > 0 ? (
                  data.map((data: any, index: number) => (
                    <Table.Row
                      key={data.id || index}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center"
                    >
                      <Table.Cell
                      // className={
                      //   data.headers[index] === "id" ? "font-medium" : ""
                      // }
                      >
                        <span>
                          {index + headers[index] + data.headers[index]}
                        </span>

                        {data.headers[index] === "createdAt" ? (
                          convertDateTimeZone(
                            data.headers[index].createdAt,
                            "UTC",
                            Intl.DateTimeFormat().resolvedOptions().timeZone,
                            "YYYY-MM-DD h:mm A",
                          )
                        ) : (data.headers[index] + "").length > 100 ? (
                          data.headers[index].substring(0, 100) + "..."
                        ) : data.headers[index] === "id" ? (
                          <IdComb id={data.headers[index]} />
                        ) : (
                          data.header[index]
                        )}
                      </Table.Cell>
                      <EditCells />
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <td colSpan={5} className="p-3 text-center">
                      {`No ${tableName} found`}
                    </td>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {data.map((data: any, index: number) => (
              <div
                key={index}
                className="bg-white space-y-3 p-4 rounded-lg shadow"
              >
                <div className="text-sm text-gray-700">
                  {data.headers[index] === "createdAt"
                    ? convertDateTimeZone(
                        data.headers[index].createdAt,
                        "UTC",
                        Intl.DateTimeFormat().resolvedOptions().timeZone,
                        "YYYY-MM-DD h:mm A",
                      )
                    : (data.headers[index] + "").length > 100
                    ? data.headers[index].substring(0, 100) + "..."
                    : data.headers[index] === "id"
                    ? "#" + data.headers[index]
                    : data.header[index]}
                </div>
                <div className="text-sm font-medium text-black flex justify-center items-center">
                  {<EditCells />}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
