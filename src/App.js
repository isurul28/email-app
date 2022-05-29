import './App.css';
import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import axios from 'axios';
import 'react-notifications/lib/notifications.css';

function App() {
  
 
  const [email, setemail] = useState('')
  const [subject, setsubject] = useState('') 
  const [Content, setContent] = useState('') 
  
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {    
      NotificationManager.success('Email has send to '+email, 'Email Send!!');
   
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , 'Access-Control-Allow-Origin':'*'},
        mode: 'cors',      
        body: JSON.stringify({ 
          to: email,
          content: Content,
          subject: subject,
          contentType: 'text/plain'  
       })     
    };
    console.log(requestOptions);
    try{
      axios.post(`http://localhost:8290/emailconnector/send`, requestOptions.body, requestOptions.headers)
      .then(function(){
          NotificationManager.success('Email has send to '+email, 'Email Send!!');
          
          
      })  
    }catch(err){
      alert(err)
    }
  
    } catch (err) {
      alert(err)
    }
  }
    
    return (
      <Row>
        <Col>
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-1*/}
          {/* --------------------------------------------------------------------------------*/}
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-patch-check"> </i>
             Email Send Form
            </CardTitle>
            <CardBody>
              <Form onSubmit={handleSubmit}>
             <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required="true"     
                    onChange={(e) => setemail(e.target.value)} 
                    value={email}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    required="true"     
                    type="text"
                    onChange={(e) => setsubject(e.target.value)} 
                    value={subject}
                  />
                </FormGroup>               
                
                <FormGroup>
                  <Label for="Content">Content</Label>
                  <Input id="Content" name="text" type="textarea"   onChange={(e) => setContent(e.target.value)} 
                    value={Content} />
                </FormGroup>               
              
                <Button className="btn" type='submit' color="success">Send Mail</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
  
  export default App;
