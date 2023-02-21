/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// icon from antd
import {
    SearchOutlined,
    PlusOutlined,
    SaveOutlined,
    // EditOutlined,
    DeleteOutlined,
    MoreOutlined,
} from "@ant-design/icons";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
// import TextField from '@mui/material/TextField';
import FormControl from "@mui/material/FormControl";

// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Button,
    Modal,
    Form,
    FormGroup,
    Input,
    // Tooltip,
    Row,
    UncontrolledTooltip,
    Label,
    Col,
    CardBody
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

import axios from "axios";
import React, { useMemo, useState, useEffect } from "react";

import Tbl from "components/Table/Table.js";
// import { DataGrid } from "@mui/x-data-grid";


import { DataGrid } from '@mui/x-data-grid';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


const rows = [
    {
        id: 1, lastName: 'Snow', firstName: 'Jon', age: 35
    },
    {
        id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42
    },
    {
        id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45
    },
    {
        id: 4, lastName: 'Stark', firstName: 'Arya', age: 16
    },
    {
        id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null
    },
    {
        id: 6, lastName: 'Melisandre', firstName: null, age: 150
    },
    {
        id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44
    },
    {
        id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36
    },
    {
        id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65
    },
];

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
        marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
        borderRadius: 4,
        position: "relative",
        backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
        border: "1px solid #ced4da",
        fontSize: 16,
        width: "auto",
        padding: "10px 12px",
        transition: theme.transitions.create([
            "border-color",
            "background-color",
            "box-shadow",
        ]),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
        "&:focus": {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));


const MasterDetail = () => {
    // const columns = useMemo()
    const [data, setData] = useState([])
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
        console.log("button is clicked")
    };
    const [modal, setModal] = useState(false)
    const toggleModal = () => setModal(!modal)
    const toggleModalClose = () => setModal(!modal)



    const columns = [
        {
            field: "action",
            headerName: <MoreOutlined style={{ marginLeft: "8px" }} />,
            width: 20,
            sortable: false,
            filterable: false,
            hideable: false,
            // showcolumns:false,
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation(); // don't select this row after clicking
                    console.log(params.id);
                    setAnchorEl(e.currentTarget);
                    // const api: GridApi = params.api;
                    // const thisRow: Record<string, GridCellValue> = {};

                    // api
                    //   .getAllColumns()
                    //   .filter((c) => c.field !== "__check__" && !!c)
                    //   .forEach(
                    //     (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
                    //   );

                    // return alert(JSON.stringify(thisRow, null, 4));
                };

                return (
                    <div>
                        <IconButton onClick={onClick}> {<MoreOutlined />} </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>Button 1</MenuItem>
                            <MenuItem onClick={handleClose}>Button 2</MenuItem>
                            <MenuItem onClick={handleClose}>Button 3</MenuItem>
                        </Menu>
                    </div>
                )
            }
        },
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 90,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (params) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
    ];

    useEffect(() => {
        (async () => {
            const result = await axios.get("https://api.tvmaze.com/search/shows?q=snow")
            setData(result.data)
            // const result = await axios.post("http://10.53.26.249:3003/api/getToken",{
            //   username: "FJR",
            //   password: "FJR",
            // },
            // {
            //   headers: {
            //     "content-type": "application/x-www-form-urlencoded",
            //     Connection: "keep-alive",
            //     Accept: "*/*"
            //   },
            // })
            // console.log(result.data);
        })()
    }, [])
    const modalConst = () => {

    }

    return (
        <>
            <Header />
            {/* Page content */}

            <div>
                <Container className="mt--7" fluid>
                    {/* Table */}

                </Container>
                <Container className="mt--7" fluid>
                    {/* Table */}
                    <Card style={{ marginBottom: "8px" }}>
                        <CardHeader>
                            <Row>
                                <IconButton onClick={() => {
                                    toggleModal()
                                    console.log(modal)
                                }} > {<PlusOutlined />} </IconButton>
                                <IconButton > {<SearchOutlined />} </IconButton>
                                <IconButton > {<DeleteOutlined />} </IconButton>
                                <IconButton > {<MoreOutlined />} </IconButton>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <Col>
                                    <Row>
                                        <FormGroup style={{ marginRight: "6px" }}>
                                            <label htmlFor="exampleFormControlInput1">Email address</label>
                                            <Input
                                                id="exampleFormControlInput1"
                                                placeholder="name@example.com"
                                                type="email"
                                            />
                                        </FormGroup>
                                        <FormGroup style={{ marginRight: "6px" }}>
                                            <label htmlFor="exampleFormControlInput1">Email address</label>
                                            <Input
                                                id="exampleFormControlInput1"
                                                placeholder="name@example.com"
                                                type="email"
                                            />
                                        </FormGroup>
                                        <FormGroup style={{ marginRight: "6px" }}>
                                            <label htmlFor="exampleFormControlInput1">Email address</label>
                                            <Input
                                                id="exampleFormControlInput1"
                                                placeholder="name@example.com"
                                                type="email"
                                            />
                                        </FormGroup>
                                        <FormGroup style={{ marginRight: "6px" }}>
                                            <label htmlFor="exampleFormControlInput1">Email address</label>
                                            <Input
                                                id="exampleFormControlInput1"
                                                placeholder="name@example.com"
                                                type="email"
                                            />
                                        </FormGroup>
                                        <FormGroup style={{ marginRight: "6px" }}>
                                            <label htmlFor="exampleFormControlInput1">Email address</label>
                                            <Input
                                                id="exampleFormControlInput1"
                                                placeholder="name@example.com"
                                                type="email"
                                            />
                                        </FormGroup>
                                        <FormGroup style={{ marginRight: "6px" }}>
                                            <label htmlFor="exampleFormControlInput1">Email address</label>
                                            <Input
                                                id="exampleFormControlInput1"
                                                placeholder="name@example.com"
                                                type="email"
                                            />
                                        </FormGroup>
                                        <FormGroup style={{ marginRight: "6px" }}>
                                            <label htmlFor="exampleFormControlInput1">Email address</label>
                                            <Input
                                                id="exampleFormControlInput1"
                                                placeholder="name@example.com"
                                                type="email"
                                            />
                                        </FormGroup>
                                        <FormGroup style={{ marginRight: "6px" }}>
                                            <label htmlFor="exampleFormControlInput1">Email address</label>
                                            <Input
                                                id="exampleFormControlInput1"
                                                placeholder="name@example.com"
                                                type="email"
                                            />
                                        </FormGroup>
                                        <FormGroup style={{ marginRight: "6px" }}>
                                            <label htmlFor="exampleFormControlInput1">Email address</label>
                                            <Input
                                                id="exampleFormControlInput1"
                                                placeholder="name@example.com"
                                                type="email"
                                            />
                                        </FormGroup>
                                        <FormGroup style={{ marginRight: "6px" }}>
                                            <label htmlFor="exampleFormControlInput1">Email address</label>
                                            <Input
                                                id="exampleFormControlInput1"
                                                placeholder="name@example.com"
                                                type="email"
                                            />
                                        </FormGroup>
                                        <FormGroup style={{ marginRight: "6px" }}>
                                            <label htmlFor="exampleFormControlInput1">Email address</label>
                                            <Input
                                                id="exampleFormControlInput1"
                                                placeholder="name@example.com"
                                                type="email"
                                            />
                                        </FormGroup>
                                        <FormGroup style={{ marginRight: "6px" }}>
                                            <label htmlFor="exampleFormControlInput1">Email address</label>
                                            <Input
                                                id="exampleFormControlInput1"
                                                placeholder="name@example.com"
                                                type="email"
                                            />
                                        </FormGroup>
                                        <FormGroup style={{ marginRight: "6px" }}>
                                            <label htmlFor="exampleFormControlInput1">Email address</label>
                                            <Input
                                                id="exampleFormControlInput1"
                                                placeholder="name@example.com"
                                                type="email"
                                            />
                                        </FormGroup>
                                        <FormGroup style={{ marginRight: "6px" }}>
                                            <label htmlFor="exampleFormControlInput1">Email address</label>
                                            <Input
                                                id="exampleFormControlInput1"
                                                placeholder="name@example.com"
                                                type="email"
                                            />
                                        </FormGroup>
                                    </Row>
                                </Col>
                            </Form>
                        </CardBody>
                    </Card>
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <Row>
                                        <IconButton onClick={() => {
                                            toggleModal()
                                            console.log(modal)
                                        }} > {<PlusOutlined />} </IconButton>
                                        <IconButton > {<SearchOutlined />} </IconButton>
                                        <IconButton > {<DeleteOutlined />} </IconButton>
                                        <IconButton > {<MoreOutlined />} </IconButton>
                                    </Row>
                                    {/* <h3 className="mb-0">Data Table using Material UI Data Grid</h3> */}
                                </CardHeader>
                                {/* <Tbl columns={column1} data={data} /> */}
                                <div style={{ height: 500, width: "100%" }}>
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        pageSize={7}
                                        rowsPerPageOptions={[7]}
                                        checkboxSelection
                                    />
                                </div>
                                {/* <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter> */}
                            </Card>
                        </div>
                    </Row>
                </Container>
            </div>
            <Modal
                className="modal-dialog-centered"
                isOpen={modal}
                toggle={() => {
                    toggleModalClose()
                }}
            >
                <div className="modal-header">
                    <h6 className="modal-title" id="modal-title-default">
                        Type your modal title
                    </h6>
                    <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => { toggleModalClose() }}
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p>
                        Far far away, behind the word mountains, far from the
                        countries Vokalia and Consonantia, there live the blind
                        texts. Separated they live in Bookmarksgrove right at the
                        coast of the Semantics, a large language ocean.
                    </p>
                    <p>
                        A small river named Duden flows by their place and supplies
                        it with the necessary regelialia. It is a paradisematic
                        country, in which roasted parts of sentences fly into your
                        mouth.
                    </p>
                </div>
                <div className="modal-footer">
                    <Button color="primary" type="button">
                        Save changes
                    </Button>
                    <Button
                        className="ml-auto"
                        color="link"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => toggleModalClose()}
                    >
                        Close
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default MasterDetail;
