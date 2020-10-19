import React from 'react';
import './App.css';
import Lists from './Lists.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Form } from 'react-bootstrap';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], nextID: 0, editIndex: 0, input: "", mode: "Edit"}
  }

  create() {
    let errormsg = document.getElementById("err");
    if (this.state.input != "" && this.state.mode == "Edit") {
      errormsg.style.display = "none";
      this.setState({
        nextID: this.state.nextID + 1,
        input: "",
        items: [...this.state.items,
        { title: this.state.input, id: this.state.nextID + 1 }]
      })
    }
    else {
      errormsg.style.display = "inline-block";
      errormsg.innerHTML = "Field Is Blank";
    }
  }

  deleP(delID) {
    this.setState({
      items: this.state.items.filter(({ title, id }) => id != delID)
    })
  }


  editP(inputTitle, editID) {
    var editItem = this.state.items.find(({ title, id }) => id == editID);
    var temp=this.state.items.indexOf(editItem);
    var newTitle = this.state.items;
    newTitle[temp].title = inputTitle;
    this.setState({
      items: newTitle
    })
  }

  render() {
    return (
      <div className="App">
        <header>
          <Form.Row>
            <Col></Col>
            <Col>
              <div class="App-header">Dunder Mifflin Infinity 2.0</div>
            </Col>
            <Col >
              <div class="signout">
                <Button variant="success" >Sign Out</Button>
              </div>
            </Col>
          </Form.Row>
        </header>
        <div class="intro">
          Create Custom Lists Using The Input Below
          </div>
        <Form.Row>
          <Col></Col>
          <Col xs="3">
            <Form.Control type="text" class="inputList" placeholder="Enter List Here"
              onChange={(event) => this.setState({ input: event.target.value })}
              value={this.state.input} />
            <div id="err"></div>
          </Col>
          <Col xs="auto">
            <Button variant="primary" onClick={this.create.bind(this)}>Create</Button>
          </Col>
          <Col></Col>
        </Form.Row>

        <div style={{ marginBottom: '100px' }}></div>

        {this.state.items.map(
          ({ title, id }) =>
            <Lists title={title} key={id} indexnum={id} sendTitle={this.editP.bind(this)} sendDele={this.deleP.bind(this)} />
        )}
      </div>
    )
  }
}

export default App;
