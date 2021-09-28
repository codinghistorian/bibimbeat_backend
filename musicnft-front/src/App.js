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

  const [Image, setImage] = useState(null);
  const [ImageName, setImageName] = useState("Upload Image");
  
  const [Song, setSong] = useState(null);
  const [SongName, setSongName] = useState("Upload Music");
  
  const PutText = (str) => setText(str);
  const PutTitle = (e) => setTitle(e.target.value);
  const PutArtist = (e) => setArtist(e.target.value);
  const PutGenre = (e) => setGenre(e.target.value);
  const PutDescription = (e) => setDescription(e.target.value);
  const PutExternalURL = (e) => setExternalURL(e.target.value);
  const PutAmount = (e) => setAmount(e.target.value);

  const GetPinataAuth = () => {
    const url = "http://localhost:4000";
    axios.get(url).then((res) => {
      PutText(res.data);
      console.log(res.data);
    })
  }

  const imageInputRef = useRef(null);
  const songInputRef = useRef(null);

  const ClickImageInput = () => {
    imageInputRef.current?.click();
  }
  
  const ClickMusicInput = () => {
    songInputRef.current?.click();
  }

  const UploadImage = (e) => {
    console.log(e.target.files[0]);
    setImageName(e.target.files[0].name)
    setImage(e.target.files[0]);
  }

  const UploadMusic = (e) => {
    console.log(e.target.files[0]);
    setSongName(e.target.files[0].name)
    setSong(e.target.files[0]);
  }


  const SubmitForm = () => {
    const JsonPosturl = "http://localhost:4000/pinJsonFileToIPFS";
    const ImagePostUrl = "http://localhost:4000/pinAlbumCoverToIPFS";
    const MusicPostUrl = "http://localhost:4000/pinMusicSourceToIPFS";

    const data = {
      title: Title,
      artist: Artist,
      genre: Genre,
      description: Description,
      externalURL: ExternalURL,
      amount: Amount
    };
    
    console.log(Image);
    console.log(Song);

    // post image file to the server
    const imageFormData = new FormData();
    imageFormData.append("image", Image);
    axios.post(ImagePostUrl, imageFormData, {
      headers: {
        'Content-type': 'multipart/form-data'
      }
    })

    // post music source file to the server
    const musicFormData = new FormData();
    musicFormData.append("music", Song);
    axios.post(MusicPostUrl, musicFormData, {
      headers: {
        'Content-type': 'multipart/form-data'
      }
    })



    // post json file to the server
    // axios.post(JsonPosturl, JSON.stringify(data), {
    //   headers: {"Content-Type": "application/json"}
    // });
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
        <Row className="justify-content-md-center"  style={{ marginTop: "10vh"}} >
          <Col>
            <Button variant="primary" style={{ width: "15vw"}} onClick={ClickImageInput}>{ImageName}</Button>
            <input type="file" ref={imageInputRef} style={{ display: "none" }} onChange={UploadImage}/>
          </Col>
        </Row>
        <Row className="justify-content-md-center" style={{ marginTop: "2vh"}} >
          <Col>
            <Button variant="primary" style={{ width: "15vw"}} onClick={ClickMusicInput}>{SongName}</Button>
            <input type="file" ref={songInputRef} style={{ display: "none" }} onChange={UploadMusic}/>
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
