import React, { useEffect, useState } from "react";
import "./table.css";

import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

function Index({ title, data }) {
  const [sortType, setSortType] = useState("Started");
  const [sortDirection, setSortDirection] = useState(false);

  const [filter, setFilter] = useState("");

  const [tableData, setTableData] = useState(data);

  const [titles, setTitles] = useState([
    "Started",
    "Ended",
    "Status",
    "Support Agent ID",
  ]);

  const handleSort = (title) => {
    if (title === sortType) {
      setSortDirection((prev) => !prev);
    } else {
      setSortType(title);
      setSortDirection(false);
    }
  };

  useEffect(() => {
    setTableData(data);
    console.log(data);
  }, [data]);

  useEffect(() => {
    let sortedData;
    switch (sortType) {
      case "Started":
        sortedData = data.sort((a, b) => {
          return sortDirection
            ? new Date(b[sortType]).valueOf() - new Date(a[sortType]).valueOf()
            : new Date(a[sortType]).valueOf() - new Date(b[sortType]).valueOf();
        });
        break;
      case "Ended":
        sortedData = data.sort((a, b) => {
          return sortDirection
            ? new Date(b[sortType]).valueOf() - new Date(a[sortType]).valueOf()
            : new Date(a[sortType]).valueOf() - new Date(b[sortType]).valueOf();
        });
        break;
      case "Status":
        sortedData = data.sort((a, b) => {
          return sortDirection
            ? a[sortType] === b[sortType]
              ? 0
              : a[sortType]
              ? -1
              : 1
            : a[sortType] === b[sortType]
            ? 0
            : a[sortType]
            ? 1
            : -1;
        });
        break;
      default:
        sortedData = data;
    }
    setTableData(sortedData);
  }, [sortType, sortDirection]);

  useEffect(() => {
    setTableData(
      data.filter((dt) => {
        if (filter) {
          return (
            (filter === "answered" && dt.Status) ||
            (filter === "missed" && !dt.Status)
          );
        }
        return true;
      })
    );
  }, [filter, data]);

  return (
    <section className="table">
      <h1>{`${title}'s calls history`}</h1>
      <div className="tableButton">
        <button
          onClick={() =>
            filter === "answered" ? setFilter("") : setFilter("answered")
          }
          style={{
            backgroundColor: "dodgerblue",
            boxShadow:
              filter === "answered" && "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          Answered
        </button>
        <button
          onClick={() =>
            filter === "missed" ? setFilter("") : setFilter("missed")
          }
          style={{
            backgroundColor: "indianred",
            boxShadow:
              filter === "missed" && "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          Missed Call
        </button>
      </div>
      <div className="table-header">
        <table cellPadding="0" cellSpacing="0" border="0">
          <thead>
            <tr>
              {titles.map((title, i) => (
                <th key={`${i}`} onClick={() => handleSort(title)}>
                  {title}
                  {sortType === title &&
                    (sortDirection ? (
                      <IoMdArrowDropup
                        fontSize={24}
                        style={{ transform: "translateY(7px)" }}
                      />
                    ) : (
                      <IoMdArrowDropdown
                        fontSize={24}
                        style={{ transform: "translateY(7px)" }}
                      />
                    ))}
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </div>
      {tableData.map(({ Started, Ended, Status, SupportedAgentID }, i) => (
        <div key={`${i}`} className="table-content">
          <table cellPadding="0" cellSpacing="0" border="0">
            <tbody>
              <tr>
                <td>{Started} </td>
                <td>{Ended}</td>
                <td>{Status ? "Answered" : "Missed Call"}</td>
                <td>{SupportedAgentID}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </section>
  );
}

export default Index;
