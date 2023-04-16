import React, { useMemo, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { archiveCall, getData, getPaginationData } from "../utils/utils";

const TableComponent = () => {
  const [reloadRes, setReloadRes] = useState(false);
  const [filter, setFilter] = useState("all");
  const [archiveData, setarchiveData] = useState({});
  const [callsDataFiltered, setCallsDataFiltered] = useState([]);
  const [callsData, setCallsData] = useState([]);
  const [offset, setOffset] = useState(0);

  const setFIlterData = (filterValue) => {
    if (filterValue === "all") {
      setCallsDataFiltered(callsData);
    } else if (filterValue === "archived") {
      setCallsDataFiltered(
        callsData.filter((item) => item.is_archived === true)
      );
    } else if (filterValue === "unarchived") {
      setCallsDataFiltered(
        callsData.filter((item) => item.is_archived === false)
      );
    }
  };

  useEffect(() => {
    const retreiveData = async () => {
      // debugger;
      var res = await getData();
      await setCallsData(res.data.nodes);
      setCallsDataFiltered(res.data.nodes);
      setOffset(0);
    };
    retreiveData();
  }, [reloadRes, archiveData]);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default TableComponent;
