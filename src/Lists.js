import React, { Component } from 'react';
import './List.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Form } from 'react-bootstrap';

class Lists extends Component {
  constructor(props) {
    super(props);
    //console.log(props);
    this.state = { items: [], box: "", nextID: 0, editIndex: 0, input: "", mode: "Add" }
  }
  submit() {
    if (this.state.mode == "Add") {
      this.setState({
        nextID: this.state.nextID + 1,
        input: "",
        box: "",
        items: [...this.state.items,
        { item: this.state.input, data: this.state.box, id: this.state.nextID + 1 }]
      })
    }
    else {
      var newItems = this.state.items;
      newItems[this.state.editIndex].item = this.state.input;
      newItems[this.state.editIndex].data = this.state.box;

      this.setState({
        mode: "Add",
        input: "",
        box: "",
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
    //console.log(delID)
  }

  edit(editID) {
    var editItem = this.state.items.find(({ item, data, id }) => id == editID);
    this.setState({
      input: editItem.item,
      box: editItem.data,
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

  render() {
    return (
      <div class="list">
        <b><div class="subtitle">{this.props.title}</div></b>
        {/* <div class="changes" onClick={this.editTitle.bind(this ,this.state.items.listnum)}>&nbsp; edit</div>
        <div class="changes" onClick={this.deleteTitle.bind(this,this.state.items.listnum)}>&nbsp; delete</div> */}
        <Form.Group controlId="subject">
          <Form.Row >
            <Col xs="10">
              <Form.Control type="text" placeholder="Enter Data Here"
                onChange={(event) => this.setState({ input: event.target.value })}
                value={this.state.input} />
            </Col>
            <Col xs="auto">
              <Button variant="primary" onClick={this.submit.bind(this)}>{this.state.mode}</Button>
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group controlId="infoArea">
          <Form.Row>
            <Col xs="10">
              <Form.Control as="textarea" rows={3} placeholder="Enter Additional Data Here"
                onChange={(event) => this.setState({ box: event.target.value })}
                value={this.state.box} />
            </Col>
          </Form.Row>
        </Form.Group>
        <ul class="top">
          {this.state.items.map(
            ({ item, data, id }) =>
              <li key={id} >
                <b>{item}</b>
                <ul class="bottom">
                  <li>
                    {data}
                  </li>
                </ul>
   
                <span onClick={this.edit.bind(this, id)} class="sub">Edit &nbsp; </span>
                <span onClick={this.delete.bind(this, id)} class="sub"> Delete </span>
              </li>)}
        </ul>
      </div>
    );
  }
}

export default Lists;