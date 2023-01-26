import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Details from "./Details";
import { useNavigate } from "react-router-dom";
import { FormControl, Grid, InputLabel, MenuItem, Pagination, Select, Typography } from "@mui/material";
import { Box } from "@mui/system";

//For table header
const columns = [
  { id: "id", label: "id", minWidth: 170 },
  { id: "image", label: "image", minWidth: 100 },
  {
    id: "firstName",
    label: "FirstName",
    minWidth: 170,
  },
  {
    id: "LastName",
    label: "LastName",
    minWidth: 170,
  },
  {
    id: "email",
    label: "email",
    minWidth: 170,
  },
  {
    id: "view",
    label: "view",
    minWidth: 170,
    align: "left",
  },
];

function Home() {
  //to navigate on anotherPage
  const navigate = useNavigate();

  var email = localStorage.getItem("email");
  const [data, setData] = useState([]);
  const [show, setShow] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsperpage, setRowsperpage] = useState(10);
  const [maxrow, setMaxRow] = useState(3);
  const [pageCount, setPageCount] = useState(null);
  const [selecteds, setSelecteds] = useState("");

  //To show the details of user
  const getData = async () => {
    
    await axios
      .get(`https://reqres.in/api/users?page=${page}&&per_page=${maxrow}`)

      .then((res) => {
        console.log("REeeeeeS::", res?.data?.data[1]);
        setData(res?.data?.data);
        setPageCount(res?.data?.total_page_count);

      })
      .catch((err) => {
        return err;
      });
  };

  useEffect(() => {
    getData();
  }, [page,maxrow]);

  console.log("page", page);
  console.log("Row", rowsperpage);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    console.log("Pages:::", newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsperpage(parseInt(event.target.value,3));
    setPage(1);
  };

  const selectionChangeHandler = (event) => {
    setSelecteds(event.target.value);
  };



  return (
    <>
      <h4 style={{float:"right",marginRight:"10%"}}> Email:{email}</h4>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {/* to show header */}
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* to list data */}
              {data
                .map((row,index) => {
                  console.log("Values", row);
                  return (
                    <>
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        <TableCell>{row.id}</TableCell>
                        <TableCell>
                          <img src={row.avatar} />
                        </TableCell>

                        <TableCell>{row.first_name}</TableCell>
                        <TableCell>{row.last_name}</TableCell>

                        <TableCell>{row.email}</TableCell>

                        <TableCell>
                          {row.id % 2 == 0 ? (
                            <>
                              <Button
                                onClick={() => navigate(`/Details/${row.id}`)}
                              >
                                View
                              </Button>{" "}
                            </>
                          ) : row.id % 2 == 1 ? (
                            <>
                              {show ? (
                                <Button
                                  onClick={() => {
                                    setShow(!show);
                                  }}
                                >
                                  View
                                </Button>
                              ) : (
                                ""
                              )}
                            </>
                          ) : (
                            ""
                          )}
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid item xs={7} style={{display:"flex"}}>
                        <Box
                          display="flex"
                          alignItems={"center"}
                          flexDirection="row"
                          style={{marginTop:"2%",marginLeft:"5%"}}
                        >
                          <Typography
                            sx={{
                              fontFamily: "Montserrat",
                              fontStyle: "normal",
                              fontWeight: "400",
                              fontSize: "14px",
                              lineHeight: "20px",
                              marginTop:"5%",
                            }}
                          >
                            Row Per Page
                          </Typography>
                          <FormControl
                            variant="standard"
                            sx={{ m: 0, minWidth: 50 }}
                          >
                            <Select
                              size="small"
                              disableUnderline
                              style={{
                                textAlign: "center",
                                fontSize: "14px",
                                paddingLeft: 10,
                                paddingTop: 8,
                                ":before": {
                                  borderColor: "#fafafc",
                                },
                                ":after": {
                                  borderColor: "#fafafc",
                                },
                                height: 30,
                                justifyContent: "center",
                              }}
                            >
                              
                              <MenuItem
                                value={1}
                                onClick={() => {
                                  setMaxRow(3);
                                }}
                              >
                                3
                              </MenuItem>
                              <MenuItem
                                value={2}
                                onClick={() => {
                                  setMaxRow(10);
                                }}
                              >
                                10
                              </MenuItem>
                              <MenuItem
                                value={3}
                                onClick={() => {
                                  setMaxRow(15);
                                }}
                              >
                                15
                              </MenuItem>
                            </Select>
                          </FormControl>
                         
                        </Box>
                      </Grid>
        <Pagination
        
          style={{ float:"right",marginRight:"8%",marginTop:"-2%" }}
          onChange={handlePageChange}
          onRowsPerPageChange={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsperpage}
          count={pageCount}
        />
      </Paper>
    </>
  );
}
export default Home;
