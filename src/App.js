import React from 'react';
import Search from './Search/Search.js';
import Header from './Header/Header.js';
import './App.css';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileTitles: [],
      authors: [],
      admins: [], 
      fileTypes: [],
      fileTypesNum: 0
    }
    this.fetchFiles = this.fetchFiles.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
    this.fetchTypes = this.fetchTypes.bind(this);
    this.setNumberOfFileTypesToState = this.setNumberOfFileTypesToState.bind(this);
  }

  async componentDidMount(){
    console.log('componentDidMount() Called')
    const promiseArr = await this.fetchEngine(this.fetchFiles, this.fetchUsers, this.fetchTypes);
    const [resolvedFiles, resolvedUsers, resolvedTypes] = promiseArr;
    console.log(resolvedFiles);
    this.setTFetchedFileTitlesFromFilesEndpointToState(resolvedFiles);
    this.setFetchedFileTypesFromFilesEndpointToState(resolvedFiles);
    this.setUserNumbersFromFilesEndpointToState(resolvedFiles);
    this.setNumberOfFileTypesToState();
 }

  fetchFiles ()  {
    console.log('fetchFiles() called')
    return fetch( 'http://localhost:3001/files', {cache: 'no-store'})
      .then(response => response.json())
  };

  fetchUsers () {
    console.log('fetchUsers() called');
    return fetch('http://localhost:3001/users', {cache: 'no-store'})
      .then( response => {
        console.log(response);
        if (!response.ok || response.statusText === "Internal Server Error") { 
          this.componentDidMount();
        }
        else{
          response.json() 
        }
        
      })
    
  };

  fetchTypes  () {
    console.log('fetchTypes() called')
    return fetch('http://localhost:3001/types', {cache: 'no-store'})
    .then(response => response.json())
  };

  fetchEngine = (func1, func2, func3) => {
    const fetchedFiles = func1();
    const fetchedUsers = func2();
    const fetchedTypes = func3(); 

    return Promise.all([fetchedFiles, fetchedUsers, fetchedTypes])
      .catch(error => alert(error));
  };


  setTFetchedFileTitlesFromFilesEndpointToState = (resolvedFiles) => {
    let fetchedFileTitlesArr = [];

    for (let i = 0; i < resolvedFiles.length; i++) {
      fetchedFileTitlesArr.push(resolvedFiles[i].title);
    };

    this.setState({
      fileTitles: fetchedFileTitlesArr,
    });
  };

  setFetchedFileTypesFromFilesEndpointToState = (resolvedFiles) => {
    let fetchedFileTypesArr = []; 
    let fetchedFileTypesObj = {};

    for (let i = 0; i < resolvedFiles.length; i++) {
      let fileType = resolvedFiles[i].type; 
      if (!fetchedFileTypesObj[fileType]) {
        fetchedFileTypesObj[fileType] = 1;
      }
    };

    for (let fileType in fetchedFileTypesObj){
      fetchedFileTypesArr.push(fileType);
    };

    this.setState({
      fileTypes: fetchedFileTypesArr,
    });
  };

  setUserNumbersFromFilesEndpointToState = (resolvedFiles) => {
    let authorNumberArr = []; 

    for (let i = 0; i < resolvedFiles.length; i++) {
      authorNumberArr.push(resolvedFiles[i].modifiedBy);
    };
    
    authorNumberArr.sort( (a, b) => a - b );

    for (let j = authorNumberArr.length - 1; j >= 0; j--) {
      if (authorNumberArr[j] === authorNumberArr[j - 1]) {
        authorNumberArr.splice(j - 1, 1)
      }; 
    };

    this.setState({
      authors: authorNumberArr,
    });
  };

  setNumberOfFileTypesToState () {
    this.setState(state => ({
      fileTypesNum: state.fileTypes.length - 1
    }));
  }


  render() {
    // console.log(this.state)
    return (
      <>
        <Search searchIcon={faSearch}/>
        <Header userCount={this.state.authors.length} adminCount={this.state.admins.length} icon={faUsers}/> 
        <div className='latestContent'>Latest Content</div>
      </>
    );
  }
}

export default App;