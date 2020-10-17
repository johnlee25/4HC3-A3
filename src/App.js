import React from 'react';
import './App.css';
import Lists from './Lists.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Form } from 'react-bootstrap';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], nextID: 0, editIndex: 0, input: "", mode: "Edit" }
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
    else if (this.state.mode == "Done") {
      errormsg.style.display = "inline-block";
      errormsg.innerHTML = "In Edit Mode";
    }
    else {
      errormsg.style.display = "inline-block";
      errormsg.innerHTML = "Field Is Blank";
    }
  }

  delete() {
    let errormsg = document.getElementById("err");
    var dele = this.state.items.find(({ title }) => this.state.input == title);
    //console.log(dele.title);
    if (this.state.input == dele.title) {
      errormsg.style.display = "none";
      this.setState({
        input: "",
        items: this.state.items.filter(({ title, id }) => title != this.state.input)
      })
    }
    else {
      errormsg.style.display = "inline-block";
      errormsg.innerHTML = "Could Not Find";
    }
  }

  edit() {
    let errormsg = document.getElementById("err");
    if (this.state.input != "" && this.state.mode == "Edit") {
      errormsg.style.display = "none";
      var edit = this.state.items.find(({ title, id }) => this.state.input == title);
      this.setState({
        input: edit.title,
        mode: "Done",
        editIndex: this.state.items.indexOf(edit)
      })
      console.log(this.state.items.indexOf(edit));
    }
    else if(this.state.input != "" && this.state.mode == "Done"){
      errormsg.style.display = "none";
      var newTitle = this.state.title;
      newTitle[this.state.editIndex].title = this.state.input;
      this.setState({
        mode: "Edit",
        input: "",
        items: newTitle
      })
    }
    else{
      errormsg.style.display = "inline-block";
      errormsg.innerHTML = "Field Is Blank";
    }
  }

  editTitle(prioID) {
    var editPrio = this.state.items.find(({ item, id }) => id == prioID);
    this.setState({
      input: editPrio.item,
      prio: "Edit",
      prioIndex: this.state.items.indexOf(editPrio)
    })
  }

  deleteTitle(delID) {
    if (this.state.mode != "Edit") {
      this.setState({
        items: this.state.items.filter(({ item, id }) => id != delID)
      })
    }
    //console.log(delID)
  }

  render() {
    return (
      <div className="App">
        <header class="App-header">
          <p>Dunder Mifflin Infinity 2.0</p>
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
          <Col xs="auto">
            <Button variant="warning" onClick={this.edit.bind(this)}>{this.state.mode}</Button>
          </Col>
          <Col xs="auto">
            <Button variant="danger" onClick={this.delete.bind(this)}>Delete</Button>
          </Col>
          <Col></Col>
        </Form.Row>

        <div style={{ marginBottom: '100px' }}></div>

        {this.state.items.map(
          ({ title, id }) =>
            <Lists title={title} key={id} />
        )}
      </div>
    )
  }
}



export default App;
