import React from 'react';
import axios from 'axios';

class Search extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      //clicked: false,
      region: [],
      climate: [],
      rent: [],
      by_ocean: [],
      by_mountains: [],
      by_lake: [],
      city_size: []
    }
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.onToggle = this.onToggle.bind(this)
    this.makeQueryObj = this.makeQueryObj.bind(this)
  }

  handleButtonClick(event) {    
    let buttonClickedName = event.target.name;
    let buttonClickedValue = event.target.value;
    console.log('This button was clicked: ', buttonClickedName, buttonClickedValue);    
  }
  
  //Changes the color of the button depending on if it is currently clicked or not
  triggerButton(id) {
    let buttonId = document.getElementById(id);
    buttonId.style.backgroundColor = (buttonId.style.backgroundColor === 'green') ? 'Transparent' : 'green'
  }

  onToggle(event){
    //check if state has value
    console.log('button clicked! event.target.id of button is: ', event.target.id)
    this.triggerButton(event.target.id);
    if (this.state[event.target.name].includes(event.target.value)){
      var newStateArr = this.state[event.target.name].slice()
      newStateArr.splice(this.state[event.target.name].indexOf(event.target.value), 1)
      this.setState({
        [event.target.name]: newStateArr,
      }, () => {
        let queryObj = this.makeQueryObj();
        console.log('removed state item', queryObj)
        this.props.getCities(queryObj)
      })
    } else {
      var newStateArr = this.state[event.target.name].slice();
      newStateArr.push(event.target.value);
      this.setState({
        [event.target.name]: newStateArr
      }, () => {
        let queryObj = this.makeQueryObj();
        console.log('added state item', queryObj)
        this.props.getCities(queryObj)
      })
      
    }
  }

  makeQueryObj() {
    let allQueries = []
    for (let category in this.state) {

      let oneQuery = [];
      if (this.state[category].length > 0) {
        this.state[category].forEach((selection) => {
          let obj = {};
          obj[category] = selection;
          oneQuery.push(obj);
        })
        let obj = {}
        obj["$or"] = oneQuery;
        allQueries.push(obj)
      }
    }
    let obj = {}
    obj["$and"] = allQueries;
    return (JSON.stringify(obj));
  }


  render(){
    return (
      <div>
        <div>
          <p>Cost of Living:</p>
          <a class="button">
            <button id="1" class="button is-link"name="rent" value="low" onClick={(event) => {this.onToggle(event)}}>Low</button>    
            <button id="2" class="button is-link"name="rent" value="medium" onClick={(event) => {this.onToggle(event)}}>Med</button>
            <button id="3" class="button is-link"name="rent" value="high" onClick={(event) => {this.onToggle(event)}}>High</button>          
          </a>          
        </div>
        <div>
          <p className="button-title">Climate:</p>
          <button id="4" class="button is-link"name="climate" value="cold" onClick={(event) => {this.onToggle(event)}}>Cold</button>    
          <button id="5" class="button is-link"name="climate" value="mild" onClick={(event) => {this.onToggle(event)}}>Mild</button>
          <button id="6" class="button is-link"name="climate" value="hot" onClick={(event) => {this.onToggle(event)}}>Hot</button>
        </div>
        <div>
          <p className="button-title">Region:</p>
          <button id="7" class="button is-link"name="region" value="Northeast" onClick={(event) => {this.onToggle(event)}}>Northeast</button>    
          <button id="8" class="button is-link"name="region" value="Southeast" onClick={(event) => {this.onToggle(event)}}>Southeast</button>
          <button id="9" class="button is-link"name="region" value="Mid-Atlantic" onClick={(event) => {this.onToggle(event)}}>Mid-Atlantic</button>
          <button id="10" class="button is-link"name="region" value="Midwest" onClick={(event) => {this.onToggle(event)}}>Midwest</button>
          <button id="11" class="button is-link"name="region" value="Southwest" onClick={(event) => {this.onToggle(event)}}>Southwest</button>
          <button id="12" class="button is-link"name="region" value="Pacific" onClick={(event) => {this.onToggle(event)}}>Pacific</button>
        </div>
        <div>
          <p className="button-title">Environment:</p>
          <button id="13" class="button is-link"name="by_ocean" value="TRUE" onClick={(event) => {this.onToggle(event)}}>Near ocean</button>    
          <button id="14" class="button is-link"name="by_mountains" value="TRUE" onClick={(event) => {this.onToggle(event)}}>In the mountains</button>
          <button id="15" class="button is-link"name="by_lake" value="TRUE" onClick={(event) => {this.onToggle(event)}}>Near major lake</button>
        </div>
        <div>
          <p className="button-title">Population:</p>
          <button id="16" class="button is-link"name="city_size" value="big" onClick={(event) => {this.onToggle(event)}}>Big city</button>
          <button id="17" class="button is-link"name="city_size" value="medium" onClick={(event) => {this.onToggle(event)}}>Mid-size city</button>
        </div>
      </div>
    )
  }
}

export default Search;