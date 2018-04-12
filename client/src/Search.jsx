import React from 'react';
import axios from 'axios';

class Search extends React.Component{
  constructor(props){
    super(props);
    this.state = {
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
    this.clearFilters = this.clearFilters.bind(this)
  }

  handleButtonClick(event) {    
    let buttonClickedName = event.target.name;
    let buttonClickedValue = event.target.value;
    console.log('This button was clicked: ', buttonClickedName, buttonClickedValue);    
  }

  triggerButton(id) {
    let buttonId = document.getElementById(id);
    console.log('buttonId is ', buttonId)
     buttonId.style.backgroundColor = (buttonId.style.backgroundColor === 'dodgerblue') ? 'white' : 'dodgerblue'
  }

  clearFilters(){
    var buttons = document.getElementsByTagName("button");
      for (var key in buttons){
        if (buttons[key].style){ //this line accounts for clar filters button
          buttons[key].style.backgroundColor = 'white'
        }
      }
    this.setState({
      region: [],
      climate: [],
      rent: [],
      by_ocean: [],
      by_mountains: [],
      by_lake: [],
      city_size: []
    }, () => {
      this.props.getCities()
    })
  }  

  render(){
    return (
      <div className="buttons">
      <button onClick = {this.clearFilters}>Show All Cities</button>
        <div>
          <p className="button-title">Cost of Living:</p>
          <button id="1" className="button is-rounded" name="rent" value="low" onClick={(event) => {this.onToggle(event)}}>Low</button>    
          <button id="2" className="button is-rounded" name="rent" value="medium" onClick={(event) => {this.onToggle(event)}}>Med</button>
          <button id="3" className="button is-rounded" name="rent" value="high" onClick={(event) => {this.onToggle(event)}}>High</button>        
        </div>
        <div>
          <p className="button-title">Weather:</p>
          <button id="4" className="button is-rounded" name="climate" value="cold" onClick={(event) => {this.onToggle(event)}}>Cold</button>    
          <button id="5" className="button is-rounded" name="climate" value="mild" onClick={(event) => {this.onToggle(event)}}>Mild</button>
          <button id="6" className="button is-rounded" name="climate" value="hot" onClick={(event) => {this.onToggle(event)}}>Hot</button>
        </div>
        <div>
          <p className="button-title">Region:</p>
          <button id="7" className="button is-rounded" name="region" value="Northeast" onClick={(event) => {this.onToggle(event)}}>Northeast</button>    
          <button id="8" className="button is-rounded" name="region" value="Southeast" onClick={(event) => {this.onToggle(event)}}>Southeast</button>
          <button id="9" className="button is-rounded" name="region" value="Midwest" onClick={(event) => {this.onToggle(event)}}>Midwest</button>
          <br></br>
          <button id="10" className="button is-rounded" name="region" value="Southwest" onClick={(event) => {this.onToggle(event)}}>Southwest</button>
          <button id="11" className="button is-rounded" name="region" value="Pacific" onClick={(event) => {this.onToggle(event)}}>Rockies</button>
          <button id="12" className="button is-rounded" name="region" value="Pacific" onClick={(event) => {this.onToggle(event)}}>Pacific</button>
        </div>
        <div>
          <p className="button-title">Environment:</p>
          <button id="13" className="button is-rounded" name="by_ocean" value="TRUE" onClick={(event) => {this.onToggle(event)}}>Near ocean</button>    
          <button id="14" className="button is-rounded" name="by_mountains" value="TRUE" onClick={(event) => {this.onToggle(event)}}>In the mountains</button>
          <button id="15" className="button is-rounded" name="by_lake" value="TRUE" onClick={(event) => {this.onToggle(event)}}>Near major lake</button>
        </div>
        <div>
          <p className="button-title">Population:</p>
          <button id="16" className="button is-rounded" name="city_size" value="small" onClick={(event) => {this.onToggle(event)}}>Small city</button>
          <button id="17" className="button is-rounded" name="city_size" value="medium" onClick={(event) => {this.onToggle(event)}}>Mid-size city</button>
          <button id="18" className="button is-rounded" name="city_size" value="big" onClick={(event) => {this.onToggle(event)}}>Big city</button>
        </div>
        
      </div>
    )
  }

  onToggle(event){
    //change the color of the button when clicked
    this.triggerButton(event.target.id);
    //check if state has value
    if (this.state[event.target.name].includes(event.target.value)){
      var newStateArr = this.state[event.target.name].slice()
      newStateArr.splice(this.state[event.target.name].indexOf(event.target.value), 1)
      this.setState({
        [event.target.name]: newStateArr,
      }, () => {
        this.props.getCities(JSON.stringify(this.state))
      })
    } else {
      var newStateArr = this.state[event.target.name].slice();
      newStateArr.push(event.target.value);
      this.setState({
        [event.target.name]: newStateArr
      }, () => {
        this.props.getCities(JSON.stringify(this.state))
      })
    }
  }
}

export default Search;