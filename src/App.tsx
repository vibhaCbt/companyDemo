import { useState } from "react";
import { addCompanyData, removeCompanyData, updateCompanyData } from "./reducers/companySlice";
import { RootState, useAppDispatch, useAppSelector } from "./store"
import { useForm, SubmitHandler } from "react-hook-form";
import { companyTodo } from "./model";
import { AiOutlineFileText, AiFillFileAdd, AiFillDelete, AiFillEdit } from 'react-icons/ai'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Modal, Button, ButtonGroup, Table } from "react-bootstrap";
import './App.css'

const App = () => {

    const [show, setShow] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)
    const[cid, setCid] = useState<number>(0)

    const companyDetail = useAppSelector((state: RootState) => state.company.companyTodo)
    const dispatch = useAppDispatch();

    const { register, handleSubmit, reset, watch, formState: { errors }, setValue } = useForm<companyTodo>();

    const onSubmit: SubmitHandler<companyTodo> = (data) => {
        dispatch(addCompanyData(data))
        setShow(false)
        reset()
    }
    const handleShow = () => setShow(true)
    const handleClose = () => {
        setShow(false)
        reset()
    }

    const handleCompanyDelete = (id: number) =>{
        dispatch(removeCompanyData(id))
    }


    const handleCompanyEdit = (elem:companyTodo) =>{

        const {companyId, companyName, companyLocation, companyCode} = elem
        setCid(companyId)
        setEdit(true)
        setShow(true)
        setValue('companyName', companyName, { shouldValidate: true })
        setValue('companyLocation', companyLocation, { shouldValidate: true })
        setValue('companyCode', companyCode, { shouldValidate: true })
    }    

    const editCompanyName = watch("companyName");
    const editCompanyLocation = watch("companyLocation");
    const editCompanyCode = watch("companyCode");

    const handleEdit = () =>{
        const newElem = {companyId: cid, companyName: editCompanyName, companyLocation: editCompanyLocation, companyCode: editCompanyCode}
        dispatch(updateCompanyData(newElem))
        setEdit(false)
        setShow(false)
        reset()
    }

    return (
        <div className="wrapper">
            <div className="main-area-wrapper py-5">
                <Container>
                    <Row>
                        <Col>
                            <h3 className="text-white mb-3">Company</h3>
                            <div className="main-area">
                                <div><AiOutlineFileText className="mb-2" size={35} color="#6a8ce6" /></div>
                                <div className="companyData p-2 mb-2 rounded-2 d-flex justify-content-between align-items-center">
                                    <h6 className="mb-0 compDataTitle">Company Data</h6>
                                    <AiFillFileAdd className="addIcon icon" size={30} color="rgb(102 100 143)" onClick={handleShow} />
                                </div>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Company</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form onSubmit={handleSubmit(onSubmit)}>
                                            <Form.Group className="mb-3" controlId="companyName">
                                                <Form.Label>Company Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Name" {...register("companyName", { required: true })} />
                                                {errors.companyName && <span>Company Name required</span>}
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="companyLocation">
                                                <Form.Label>Company Location</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Location" {...register("companyLocation", { required: true })} />
                                                {errors.companyLocation && <span>Company Location required</span>}
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="companyCode">
                                                <Form.Label>Company Code</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Code" {...register("companyCode", { required: true })} />
                                                {errors.companyCode && <span>Company Code required</span>}
                                            </Form.Group>
                                            <ButtonGroup aria-label="Basic example">
                                                {edit ? 
                                                    <Button variant="primary" type='submit' className="me-2" onClick={handleEdit}>Edit</Button> : 
                                                    <Button variant="primary" type='submit' className="me-2">Submit</Button>
                                                }
                                            </ButtonGroup>
                                        </Form>
                                    </Modal.Body>
                                </Modal>
                                {companyDetail.length > 0 &&
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Company ID</th>
                                                <th>Company Name</th>
                                                <th>Company Location</th>
                                                <th>Company Code</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {companyDetail.map((elem:companyTodo) => {
                                                const {companyId, companyName, companyLocation, companyCode} = elem
                                                return (
                                                    <tr key={companyId}>
                                                        <td>{companyId}</td>
                                                        <td>{companyName}</td>
                                                        <td>{companyLocation}</td>
                                                        <td>{companyCode}</td>
                                                        <td>
                                                            <AiFillDelete className="me-3 deleteIcon icon" size={20} color="rgb(102 100 143)" onClick={() => handleCompanyDelete(companyId)} />
                                                            <AiFillEdit className="editIcon icon" size={20} color="rgb(102 100 143)" onClick={() => handleCompanyEdit(elem)} />
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default App
