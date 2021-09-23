import './App.css';
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useRef, useState } from 'react';

function App() {
  const [Text, setText] = useState("");
  const [Title, setTitle] = useState("");
  const [Artist, setArtist] = useState("");
  const [Genre, setGenre] = useState("");
  const [Description, setDescription] = useState("");
  const [ExternalURL, setExternalURL] = useState("");
  const [Amount, setAmount] = useState("");
  
  const PutText = (str) => setText(str);
  const PutTitle = (str) => setTitle(str);
  const PutArtist = (str) => setArtist(str);
  const PutGenre = (str) => setGenre(str);
  const PutDescription = (str) => setDescription(str);
  const PutExternalURL = (str) => setExternalURL(str);
  const PutAmount = (str) => setAmount(str);

  const GetPinataAuth = () => {
    const url = "http://localhost:4000";
    axios.get(url).then((res) => {
      PutText(res.data);
      console.log(res.data);
    })
  }

  const inputRef = useRef(null);

  const Upload = () => {
    inputRef.current?.click();
  }

  const SubmitForm = (e) => {
  }

  return (
    <div className="App">
      <Container style={{margin: "5em"}}>
        <Row className="justify-content-md-center">
          <Col>
            <Button variant="primary" style={{ width: "15vw"}} onClick={GetPinataAuth}>Press This button</Button>
            <p>{Text}</p>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <Button variant="primary" style={{ width: "15vw"}} onClick={Upload}>Upload Image</Button>
            <input type="file" ref={inputRef} style={{ display: "none" }} />
          </Col>
        </Row>
        <Row className="justify-content-md-center" style={{ marginTop: "5vh"}} onSubmit={SubmitForm}>
          <Form style={{ width: "30vw" }}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control placeholder="Enter title" onChange={PutTitle} />
              {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formArtist">
              <Form.Label>Artist</Form.Label>
              <Form.Control placeholder="Enter artist" onChange={PutArtist} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Control placeholder="Enter genre" onChange={PutGenre} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" type="description" style={{ height: "20vh" }} placeholder="Enter description" onChange={PutDescription} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formURL">
              <Form.Label>External URL</Form.Label>
              <Form.Control placeholder="Enter external URL" onChange={PutExternalURL} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAmount">
              <Form.Label>NFT Amount</Form.Label>
              <Form.Control type="number" placeholder="Enter NFT amount" onChange={PutAmount} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Row>
      </Container>
    </div>
  );
}

export default App;
