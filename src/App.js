import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Form } from 'react-bootstrap';


class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], nextID: 0, editIndex: 0, input: "", mode: "Add", prio: "none", prioIndex: 0 }
  }
  
  submit() {
    if (this.state.mode == "Add") {
      this.setState({
        nextID: this.state.nextID + 1,
        input: "",
        items: [...this.state.items,
        { item: this.state.input, id: this.state.nextID + 1 }]
      })
    }
    else {
      var newItems = this.state.items;
      newItems[this.state.editIndex].item = this.state.input;

      this.setState({
        mode: "Add",
        input: "",
        items: newItems
      })
    }
  }

  delete(delID) {
    if (this.state.mode != "Edit") {
      this.setState({
        items: this.state.items.filter(({ item, id }) => id != delID)
      })
    }
  }

  edit(editID) {
    var editItem = this.state.items.find(({ item, id }) => id == editID);
    this.setState({
      input: editItem.item,
      mode: "Edit",
      editIndex: this.state.items.indexOf(editItem)
    })
  }

  addDate(editID) {
    var editItem = this.state.items.find(({ item, id }) => id == editID);
    this.setState({
      input: editItem.item,
      mode: "Edit",
      editIndex: this.state.items.indexOf(editItem)
    })
  }

  addNote(editID) {
    var editItem = this.state.items.find(({ item, id }) => id == editID);
    this.setState({
      input: editItem.item,
      mode: "Edit",
      editIndex: this.state.items.indexOf(editItem)
    })
  }

  setPrio(prioID) {
    var editPrio = this.state.items.find(({ item, id }) => id == prioID);
    this.setState({
      input: editPrio.item,
      prio: "Edit",
      prioIndex: this.state.items.indexOf(editPrio)
    })
  }

  render() {
    return (
      <div class="list">
        <div class="subtitle">test</div>
        <Form.Row className="align-items-center">
          <Col xs="auto">
            <Form.Control type="text" placeholder="Enter Data Here"
              onChange={(event) => this.setState({ input: event.target.value })}
              value={this.state.input} />
          </Col>
          <Col xs="auto">
            <Button variant="primary" onClick={this.submit.bind(this)}>{this.state.mode}</Button>
          </Col>
        </Form.Row>
        <ul>
          {this.state.items.map(
            ({ item, id }) =>
              <li key={id}>
                {item}
                <span onClick={this.addDate.bind(this, id)} class="sub"> Add Date &nbsp;</span>
                <span onClick={this.addNote.bind(this, id)} class="sub"> Add Note &nbsp;</span>
                <span onClick={this.setPrio.bind(this, id)} class="sub"> Prioity &nbsp;</span>
                <span onClick={this.edit.bind(this, id)} class="sub">Edit &nbsp; </span>
                <span onClick={this.delete.bind(this, id)} class="sub"> Delete </span>
              </li>)}
        </ul>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], nextID: 0, editIndex: 0, input: "", mode: "Add" }
  }

  create() {
    if (this.state.mode == "Add") {
      this.setState({
        nextID: this.state.nextID + 1,
        input: "",
        items: [...this.state.items,
        { item: this.state.input, id: this.state.nextID + 1 }]
      })
    }
    else {
      var newItems = this.state.items;
      newItems[this.state.editIndex].item = this.state.input;

      this.setState({
        mode: "Add",
        input: "",
        items: newItems
      })
    }
  }

  delete(delID) {
    if (this.state.mode != "Edit") {

      this.setState({
        items: this.state.items.filter(({ item, id }) => id != delID)
      })
    }
  }

  edit(editID) {
    var editItem = this.state.items.find(({ item, id }) => id == editID);
    this.setState({
      input: editItem.item,
      mode: "Edit",
      editIndex: this.state.items.indexOf(editItem)
    })
  }

  render() {

    return (
      <div className="App">
        <header class="App-header">
          <p>Dunder Mifflin Infinity 2.0</p>
        </header>
        <Container>
          <div class="intro">
            Create Custom Lists Using The Bar Below
        </div>
          <Form.Row className="align-items-center">
            <Col xs="auto">
              <Form.Control type="text" placeholder="Create List Here" />
            </Col>
            <Col xs="auto">
              <Button variant="primary" onClick={this.create.bind(this)}>Create</Button>
            </Col>
          </Form.Row>
          <div style={{ marginBottom: '100px' }}></div>
        </Container>
        <Lists />
      </div>
    )
  }
}



export default App;
