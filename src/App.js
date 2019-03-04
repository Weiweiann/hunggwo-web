import React, { Component } from 'react';
import waterfall from 'waterfall';
import imageLoaded from 'imagesloaded';
import logo from './hunggwo-logo-only.svg';
import './App.css';
import items from './item';


class Category extends Component {
  render() {
    const categories = this.props.items.map((item, index) => {
      return (
        <li className="nav-item" onClick={() => this.props.handleClick(item)} key={index}>
          <span className="nav-link">{item.name}</span>
        </li>
      )
    })

    return (
      <ul className="nav justify-content-center">{categories}</ul>
    )
  }
}

class Photos extends Component {

  componentDidMount() {
    const element = document.querySelector('.grid');
    imageLoaded(element, () => {
      waterfall(element);
    })

    window.addEventListener('resize', function () {
      waterfall(element);
    });
  }

  render() {
    const images = [];
    for (let i = 1; i <= this.props.item.photoCount; i++) {
      images.push(
        <Photo src={process.env.PUBLIC_URL + `/photos/${this.props.item.name}/${i}.jpg`} key={i}></Photo>
      )
    }

    return (
      <div class="grid">
        {images}
      </div>
    )
  }
}

class Photo extends Component {
  render() {
    return (
      
      <a href={this.props.src} data-lightbox={this.props.src} data-title="">
        <img src={this.props.src} class="item item-image shadow p-1 m-1 bg-white rounded"></img>
      </a>
    )
  }
}

class Jumbotron extends Component {
  render() {
    return (
      <div className="jumbotron">
        <img src={logo}/>
        <h1>弘國廣告</h1>
        <hr></hr>
        <p>{this.props.item.name}</p>
      </div>
    )
  }
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: items,
      selectItem: items[0],  
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(item) {
    console.log(item);
    this.setState({ selectItem: item });
  }

  componentDidMount() {
    console.log(this.state);
  }

  render() {
    return (
      <div className="container">
        <Jumbotron item={this.state.selectItem}/>
        <Category items={this.state.items} handleClick={this.handleClick}></Category>
  
        <Photos item={this.state.selectItem}/>
     
       

        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </div>
    );
  }
}

export default App;
