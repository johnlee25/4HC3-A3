import React, { Component } from 'react';
import './List.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Form } from 'react-bootstrap';

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], box: "", date: "", prio: "", nextID: 0, editIndex: 0, input: "", mode: "Add" }
  }
  submit() {
    if (this.state.mode == "Add") {
      this.setState({
        nextID: this.state.nextID + 1,
        input: "",
        box: "",
        date: "",
        prio: "",
        items: [...this.state.items,
        { item: this.state.input, data: this.state.box, dated: this.state.date, priod: this.state.prio, id: this.state.nextID + 1 }]
      })
    }
    else if (this.state.mode == "Title") {
      if (this.state.input != "") {
        document.getElementById("editerr").style.display = "none";
        this.props.sendTitle(this.state.input, this.props.indexnum);
        let temp = document.getElementById("databox");
        temp.disabled = false;
        this.setState({
          mode: "Add",
          input: "",
          box: "",
        })
      }
      else {
        document.getElementById("editerr").style.display = "inline-block";
      }
    }
    else {
      var newItems = this.state.items;
      newItems[this.state.editIndex].item = this.state.input;
      newItems[this.state.editIndex].data = this.state.box;
      newItems[this.state.editIndex].dated = this.state.date;
      newItems[this.state.editIndex].priod = this.state.prio;
      this.setState({
        mode: "Add",
        input: "",
        box: "",
        date: "",
        prio: "",
        items: newItems
      })
    }
  }

  delete(delID) {
    if (this.state.mode != "Done") {
      this.setState({
        items: this.state.items.filter(({ item, id }) => id != delID)
      })
    }
  }

  edit(editID) {
    var editItem = this.state.items.find(({ item, data, dated, priod, id }) => id == editID);
    this.setState({
      input: editItem.item,
      box: editItem.data,
      date: editItem.dated,
      prio: editItem.priod,
      mode: "Done",
      editIndex: this.state.items.indexOf(editItem)
    })
  }

  editTitle() {
    let temp = document.getElementById("databox");
    temp.disabled = true;
    var tit = this.props.title;
    this.setState({
      input: tit,
      box: "",
      mode: "Title"
    })
  }

  deleteTitle() {
    this.props.sendDele(this.props.indexnum);
  }

  render() {
    return (
      <div class="list">
        <b><div class="subtitle">{this.props.title}</div></b>
        <div class="changes" onClick={this.editTitle.bind(this)}>&nbsp; edit</div>
        <div class="changes" onClick={this.deleteTitle.bind(this)}>&nbsp; delete</div>
        <input type="date" id="noteDate" name="noteDate" min="2018-01-01" max="2025-12-31"
          onChange={(event) => this.setState({ date: event.target.value })}
          value={this.state.date}></input>
        <Form.Control as="select" id="prio" title="Priority"onChange={(event) => this.setState({ prio: event.target.value })}
          value={this.state.prio}>
          <option value="">Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="Important">Important</option>
        </Form.Control>
        <div id="editerr">&nbsp; Title Cannot Be Empty</div>
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
              <Form.Control as="textarea" rows={3} id="databox" placeholder="Enter Additional Data Here"
                onChange={(event) => this.setState({ box: event.target.value })}
                value={this.state.box} />
            </Col>
          </Form.Row>
        </Form.Group>
        <ul class="top">
          {this.state.items.map(
            ({ item, data, id, dated, priod }) =>
              <li key={id} >
                <b>{item}</b>
                <ul class="bottom">
                  <li>
                    {data}
                  </li>
                </ul>
                <span onClick={this.edit.bind(this, id)} class="sub">Edit &nbsp; </span>
                <span onClick={this.delete.bind(this, id)} class="sub"> Delete &nbsp; </span>
                <span class="dated">{dated} &nbsp;</span>
                <span class="priod">{priod}</span>
              </li>)}
        </ul>
      </div>
    );
  }
}

export default Lists;