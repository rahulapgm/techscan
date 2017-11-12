import React, { Component } from 'react';
import Gallery from './Gallery';
import AutoComplete from 'material-ui/AutoComplete';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SearchAction from 'material-ui/svg-icons/action/search';
import logo from './logo.svg';
import './App.css';


class App extends Component {  
  constructor(props){
    super(props);
    this.state = {
      dataSource: ["javascript", "python","php", "ruby", "c", "c++", 
                   "java", "react", "redux", "angular", "node", "material", 
                   "css", "html5", "html","jquery", "c#", "js"],
      searchString: '',
      type:'',
      value:1,
      searching: false,
      searchPlaceHolder: '',
      searchResponse:[]
    };
  }
  
  handleDropDownInput = (event, index, value) => {
    this.setState({
      value
    });
  };

  handleUpdateInput = (value) => {
    this.setState({searchString: value});
  };
  
  callAPIService(){
    
    if(this.state.value === 1){
       let BASE_URL = `https://api.github.com/search/repositories?q=${this.state.searchString}`;
      fetch(BASE_URL, {
        method:'GET',
        headers: {'Content-Type': 'application/json'}
      }).then(response => response.json())
      .then(json => {
        this.setState({
          searchResponse:json,
          searching:false
        });
        console.log("json response", json);
      })
    }    
    
    else if(this.state.value === 2){
       let BASE_URL = `https://api.github.com/search/users?q=${this.state.searchString}`;
      fetch(BASE_URL, {
        method:'GET',
        headers: {'Content-Type': 'application/json'}
      }).then(response => response.json())
      .then(json => {
        this.setState({
          searchResponse:json,
          searching:false
        });
        console.log("json response", json);
      })
    }    
    
  }
  
  render(){
    return (
      <div className="container-fluid">
        <div className="App-title">TechScan</div>
        <div className="App-Caption">Search Github Profiles and Repositories</div>
        <div className="form-inline row Search">
          <div className="form-group col Search-bar">
            <AutoComplete
              filter={AutoComplete.fuzzyFilter}
              dataSource={this.state.value===1 ? this.state.dataSource: []}
              onUpdateInput={this.handleUpdateInput}
              floatingLabelText= {this.state.value===2? "Search Profiles" : "Search Technologies"}
              fullWidth={true}
              onKeyPress={event => {
                if(event.key==="Enter"){
                  console.log("Call API");
                  console.log("search string: ",this.state.searchString);
                  console.log("DropDownMenu: ",this.state.type)
                  this.setState({searching:true});
                  this.callAPIService();
                }
              }}
           />
          </div>
          <div className="form-group col Search-DropDownMenu">
            <DropDownMenu value={this.state.value} onChange={this.handleDropDownInput} openImmediately={true} style={{width:'15em'}}>
                <MenuItem value={2} primaryText="Profile Search" />
                <MenuItem value={1} primaryText="Repository Search" />
            </DropDownMenu>
          </div>
          <div className="form-group col Search-Button">
             <RaisedButton
                icon={<SearchAction />}
                onClick={() =>{
                         console.log("Call Api")
                         this.setState({searching:true});
                         this.callAPIService();
                        }}
             />
          </div>
        </div>
        <div>
        {
            this.state.searching ? <h4 className="searching-on">Searching</h4> 
            :  <Gallery jsonRes={this.state.searchResponse}/> 
        }
        </div>
            <footer class="footer">
          <div class="container">
            <span class="text-muted">Tech Scan - A guide to scan Github Repositories and profiles</span>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
