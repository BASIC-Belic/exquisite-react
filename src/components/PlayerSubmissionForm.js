import React, { Component } from 'react';
import './PlayerSubmissionForm.css';
import PropTypes from 'prop-types';

class PlayerSubmissionForm extends Component {

  constructor(props) {
    super(props);
    this.state = this.fetchFields()
    console.log(this.state)
  }

  fetchFields = () => {
    const fields = this.props.fields.filter((field) => {
      return field.hasOwnProperty("key");
    });

    const startingState = fields.reduce((acc, field) => {
      console.log(field.key)
      acc[field.key] = ["", field.placeholder];
      return acc
    }, {});

    startingState.playerNum = this.props.playerNum;

    return startingState;
  }

  onInputChange = (event) => {

    const field = event.target.name;
    const value = event.target.value;

    const updateState = this.state;
    updateState[field] = value;
    this.setState(updateState);
  }

  onLineSubmit = (event) => {
    event.preventDefault();

    this.props.currentLineCallback(`The ${this.state.adj1} ${this.state.noun1} ${this.state.adv} ${this.state.verb} ${this.state.adj2} ${this.state.noun2}.`)



    this.setState({
      adj1: "",
      noun1: "",
      adv: "",
      verb: "",
      adj2: "",
      noun2: ""
    });
  }

  render() {

    // const filteredInputs = this.fetchFields().forEach((input) => {
    //   // const key = input.key
    //   console.log("state", this.state[input.key])
    //
    //   // const key =
    //   //       // const key =  this.state[Object.keys(input)[0]]
    //   //       console.log("state", Object.keys(input)[0])
    //   console.log("state", Object.keys(input)[0])
    //   return(
    //     <input name={input.key} placeholder={input.placeholder} type="text" value={this.state[input.key]} onChange={this.onInputChange}/>
    //     <input name={input[Object.keys(input)[0]]} placeholder={input.placeholder} type="text" value={input[Object.keys(input)[0]]} onChange={this.onInputChange}/>
    //   )
    // })
    //
    const chooseInputClass = (currentState) => {
      if (currentState === "") {
        return "PlayerSubmissionForm__input--invalid"
      }
    }

    const adj1Class = chooseInputClass(this.state.adj1)
    const noun1Class = chooseInputClass(this.state.noun1)
    const advClass = chooseInputClass(this.state.adv)
    const verbClass = chooseInputClass(this.state.verb)
    const noun2Class = chooseInputClass(this.state.noun2)

    return (
      <div className="PlayerSubmissionForm">
        { !this.props.ended &&
          (<h3>Player Submission Form for Player #{ this.props.playerNum }</h3> ) }
          { !this.props.ended &&
            ( <form className="PlayerSubmissionForm__form" onSubmit={this.onLineSubmit}>
            <div className="PlayerSubmissionForm__poem-inputs">
              <input
                className={adj1Class}
                name="adj1" placeholder="adjective" type="text" value={this.state.adj1} onChange={this.onInputChange}/>
              <input name="noun1"
                className={noun1Class} placeholder="noun" type="text" value={this.state.noun1} onChange={this.onInputChange}/>
              <input name="adv"
                className={advClass} placeholder="adverb" type="text" value={this.state.adv} onChange={this.onInputChange}/>
              <input name="verb"
                className={verbClass} placeholder="verb" type="text" value={this.state.verb} onChange={this.onInputChange}/>
              <input name="noun2"
                className={noun2Class} placeholder="noun" type="text" value={this.state.noun2} onChange={this.onInputChange}/>
            </div>

            <div className="PlayerSubmissionForm__submit">
              <input type="submit" value="Submit Line" className="PlayerSubmissionForm__submit-btn" />
            </div>
          </form> ) }
        </div>
      );
    }
  }

  export default PlayerSubmissionForm;

  PlayerSubmissionForm.propTypes = {
    currentLineCallback: PropTypes.func.isRequired,
    ended: PropTypes.bool.isRequired,
    fields: PropTypes.array.isRequired,
    playerNum: PropTypes.number.isRequired,
  };
