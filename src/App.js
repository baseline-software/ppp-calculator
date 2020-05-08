import React from 'react';
import calculator from './PPPcalculator.png';
// import './App.css';
import {
  Form,
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  InputGroup,
} from 'react-bootstrap';
function App() {
  const [form, setForm] = React.useState({
    totalAmount: null,
    payrollCost: null,
    rent: null,
    utilities: null,
    interest: null,
    ftEmployees: 0,
    loanEmployees: 0,
    wageDecrease: null,
    eidlAdvance: null,
  });
  const onChange = (e) => {
    const newdata = e.target.value.replace(/,/g, '');
    setForm({ ...form, [e.target.name]: newdata });
  };
  const {
    interest,
    utilities,
    rent,
    totalAmount,
    payrollCost,
    loanEmployees,
    ftEmployees,
    wageDecrease,
    eidlAdvance,
  } = form;

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  };
  const payrollCostGreater = Number(payrollCost) > Number(totalAmount);
  //is payroll atleast 75% of one
  const percentOf75 = Number(payrollCost) / Number(totalAmount) / 0.75;
  // if atleast 75 percent return one if not return the percent
  const isPayroll75 = percentOf75 > 1 ? 1 : percentOf75;

  const calculateOtherShit = () => {
    const otherStuffGreater25 =
      (Number(interest) + Number(utilities) + Number(rent)) / totalAmount >
      0.25;
    const otherAmount = otherStuffGreater25
      ? 0.25 * totalAmount
      : Number(interest) + Number(utilities) + Number(rent);
    if (payrollCostGreater) {
      return 0;
    } else {
      const diff = Number(totalAmount) - Number(payrollCost);
      const otherDiff =
        diff > otherAmount * isPayroll75 ? otherAmount * isPayroll75 : diff;
      return otherDiff;
    }
  };
  const totalLoanForgiven = () => {
    if (payrollCostGreater) {
      return totalAmount;
    }
    const percentDiff =
      (Number(loanEmployees) - Number(ftEmployees)) / Number(loanEmployees) ||
      0;
    const totalWithWageDecrease =
      (totalAmount - (totalAmount - payrollCost) + calculateOtherShit()) *
        (1 - percentDiff) -
      Number(wageDecrease) -
      Number(eidlAdvance);
    return totalWithWageDecrease > 0 && payrollCost > 0
      ? totalWithWageDecrease.toFixed(2)
      : 0;
  };

  //total the client has to pay
  const totalToPay = () => {
    const res = Number(totalAmount) - totalLoanForgiven();
    return res.toFixed(2);
  };

  // add the commas into the text fields
  function comma(x = '') {
    if (x && x.length > 0) {
      var parts = x.toString().split('.');
      parts[0] = parts[0].replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ',');
      return parts.join('.');
    }
    return x;
  }
  // label for the text fields
  const Label = ({ text }) => (
    <Form.Label style={{ fontWeight: 600 }}>{text}</Form.Label>
  );

  return (
    <div className="App">
      <Container style={{ marginLeft: 0 }}>
        <Row>
          <Col>
            <Form
              style={{ margin: '2rem 0 2rem 2rem' }}
              onSubmit={(e) => e.preventDefault()}
            >
              <Form.Group controlId="formBasicEmail">
                <Label text="What is your total PPP loan amount?" />
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    aria-describedby="inputGroupPrepend"
                    type="text"
                    placeholder="Enter amount"
                    value={comma(form.totalAmount)}
                    name="totalAmount"
                    onChange={onChange}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Label text="Total Payroll Costs for 8 weeks" />
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="Enter amount"
                    onChange={onChange}
                    name="payrollCost"
                    value={comma(form.payrollCost)}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Label text="Rent for 8 weeks" />
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="Enter amount"
                    onChange={onChange}
                    value={comma(form.rent)}
                    name="rent"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Label text="Utilities for 8 weeks" />
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="Enter amount"
                    onChange={onChange}
                    value={comma(form.utilities)}
                    name="utilities"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Label text="Interest on Covered Mortgages for 8 weeks" />
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="Enter amount"
                    onChange={onChange}
                    value={comma(form.interest)}
                    name="interest"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Label
                  text="
                    Avg. full time equivalent employees during the covered 8
                    weeks"
                />
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="How Many"
                    onChange={onChange}
                    value={form.ftEmployees}
                    name="ftEmployees"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Label
                  text="Avg. full time equivalent employees submitted with your loan
                    application"
                />
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="How Many"
                    onChange={onChange}
                    value={form.loanEmployees}
                    name="loanEmployees"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Label text="Total $ Decrease in Wages [if greater than 25% of total salary]" />
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="Enter amount"
                    onChange={onChange}
                    value={comma(form.wageDecrease)}
                    name="wageDecrease"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Label text="Amount of EIDL advance" />
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="Enter amount"
                    onChange={onChange}
                    value={comma(form.eidlAdvance)}
                    name="eidlAdvance"
                    max="10000"
                  />
                </InputGroup>
              </Form.Group>
            </Form>
          </Col>
          <Col className="text-center">
            <Card.Img
              variant="top"
              src={calculator}
              style={{ height: '34%', width: '50%', marginTop: '100px' }}
            />
            <Card.Body>
              <Card.Title>Estimated Loan Amount to be Forgiven</Card.Title>
              <Card.Title>${numberWithCommas(totalLoanForgiven())}</Card.Title>

              <Card>
                <ListGroup>
                  <ListGroup.Item
                    style={{
                      backgroundColor: '#367B5A',
                      color: 'white',
                      fontSize: '20px',
                    }}
                  >
                    Total amount to be paid back: $
                    {numberWithCommas(totalToPay())}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
              <Card.Text>
                *This calculator is just for informational purposes, please
                confirm with your lender.
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
