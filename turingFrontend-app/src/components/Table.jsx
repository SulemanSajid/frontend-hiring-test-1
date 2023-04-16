import React, { useRef, useEffect, useState } from "react";
import { Table, Pagination, Dropdown } from "react-bootstrap";
import CustomPagination from "./CustomPagination";
import Loader from "./Loader";
import { archiveCall, getData, getPaginationData } from "../utils/utils";
import Button from "react-bootstrap/Button";

const TableComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const statusRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const itemsPerPage = 5;
  const [reloadRes, setReloadRes] = useState(false);
  const [callsDataFiltered, setCallsDataFiltered] = useState([]);
  const [loader, setLoader] = useState(true);
  const [callsData, setCallsData] = useState([]);

  // Handle pagination click
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate the start and end index of the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const setFilterData = (filterValue) => {
    debugger;
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

  const retreiveData = async () => {
    try {
      var res = await getData();
      console.log(res);
      if (res) {
        let data = res.data.nodes;
        setCallsData(data);
        setCallsDataFiltered(data);
        console.log(callsData);
        setLoader(false);
      }
    } catch (e) {
      console.log(e);
      setLoader(false);
    }
  };
  useEffect(() => {
    retreiveData();
  }, [reloadRes]);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="table" style={{ width: "86%", margin: "auto" }}>
            <h3 style={{ margin: "20px 0" }}>
              Turing Technologies Frontend Test
            </h3>
            <p style={{ margin: "20px 0", display: "inline" }}>Filter by:</p>
            <Dropdown style={{ display: "inline" }}>
              <Dropdown.Toggle
                // statusRef
                ref={statusRef}
                variant="success"
                id="dropdown-basic"
                style={{ background: "none", color: "blue", border: "none" }}
              >
                Status
              </Dropdown.Toggle>

              <Dropdown.Menu
                onChange={(e) => {
                  setFilterData(e.target.value);
                }}
              >
                <Dropdown.Item href="">All</Dropdown.Item>
                <Dropdown.Item href="">Archived</Dropdown.Item>
                <Dropdown.Item href="">Unarchived</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Table striped bordered hover style={{ margin: "20px 0" }}>
              <thead>
                <tr>
                  <th>CALL TYPE</th>
                  <th>DIRECTION</th>
                  <th>DURATION</th>
                  <th>FROM</th>
                  <th>TO</th>
                  <th>VIA</th>
                  <th>CREATED AT</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {callsData.length > 0 ? (
                  callsData.map((each, index) => (
                    <tr key={each.id}>
                      <td>{each.call_type}</td>
                      <td>{each.direction}</td>
                      <td>{each.duration}</td>
                      <td>{each.from}</td>
                      <td>{each.to}</td>
                      <td>{each.via}</td>
                      <td>{each.created_at}</td>
                      <td>
                        <Button
                          className={
                            each.is_archived ? "archived" : "unarchived"
                          }
                        >
                          {each.is_archived ? "Archived" : "Unarchived"}
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="primary"
                          className="addNotes"
                          style={{ borderRadius: "0" }}
                        >
                          Add Notes
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9}>No Data Found</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <CustomPagination
              itemsPerPage={itemsPerPage}
              totalItems={callsData.length}
              paginate={paginate}
            />
          </div>
        </>
      )}
    </>
  );
};

export default TableComponent;
