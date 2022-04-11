/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import Axios from "axios";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardText,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    CardTitle,
    Table,
} from "reactstrap";


function Commands() {
    const [CommandsList, setCommandsList] = React.useState(null);
    const test = [1, 2, 3]

    React.useEffect(() => {
        Axios.get("http://127.0.0.1:4242/api/v1/commands").then((response) => {
            setCommandsList(response.data[0]);
        });
    }, []);

    if (!CommandsList) return null;

    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <h5 className="title">Ajouter une commande</h5>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Row>
                                        <Col className="px-md-1" md="8">
                                            <FormGroup>
                                                <label>Commande</label>
                                                <Input
                                                    placeholder="!commande"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="8">
                                            <FormGroup>
                                                <label>Message</label>
                                                <Input
                                                    cols="80"
                                                    placeholder="Merci de votre confiance ! :)"
                                                    rows="5"
                                                    type="textarea"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button className="btn-fill" color="primary" type="submit">
                                    Ajouter
                                </Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Table>
                            <thead>
                                <tr>
                                    <th className="text-center">#</th>
                                    <th>Commande</th>
                                    <th>Message</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="text-center">3</td>
                                    <td>!commande</td>
                                    <td>Merci de votre confiance ! :)</td>
                                    <td className="text-right">
                                        <Button className="btn-icon btn-simple" color="info" size="sm">
                                            <i className="fa fa-user"></i>
                                        </Button>{` `}
                                        <Button className="btn-icon btn-simple" color="success" size="sm">
                                            <i className="fa fa-edit"></i>
                                        </Button>{` `}
                                        <Button className="btn-icon btn-simple" color="danger" size="sm">
                                            <i className="fa fa-times" />
                                        </Button>{` `}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Commands;
