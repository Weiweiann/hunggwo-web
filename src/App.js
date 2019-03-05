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
      <div>
        <h3 className="text-center">成品展示</h3>
        <hr/>
        <div class="grid">
          {images}
        </div>
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
    const categories = this.props.items.map((item, index) => {
      return (
        <li className="nav-item" onClick={() => this.props.handleClick(item)} key={index}>
          <span className={'nav-link ' + (this.props.item.name === item.name ? 'active' : '') }>{item.name}</span>
        </li>
      )
    })

    return (
      <div className="jumbotron">
        <div className="jumbotron-header">
          <img className="img-fluid" src={logo}/>
          <div className="" >
            <h1>弘國廣告</h1>
            <h4>台中市西區忠明路59號</h4>
            <h4>04-23145649</h4>
            <a href="mailto:hunggwo@seed.net.tw">hunggwo@seed.net.tw</a>
          </div>
        </div>
        
        <hr></hr>
        <ul className="nav nav-pills nav-fill justify-content-center">{categories}</ul>
      </div>
    )
  }
}

function GoogleMap(props) {
  return (
    <div>
      <h3>聯絡我們</h3>
      <iframe
        className="img-fluid"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640.3191685237184!2d120.65938431474355!3d24.160536878901937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d8395c7601b%3A0x29e789c6323ee1db!2z5byY5ZyL5buj5ZGK!5e0!3m2!1szh-TW!2stw!4v1551750786215"
        width="600"
        height="450"
        frameBorder="0" allowFullScreen></iframe>
    </div>
  )
}


class FooterComp extends Component {
  render() {
    return (
      <div>
        <GoogleMap></GoogleMap>
      </div>
    )
  }
}

function MailIcon(props) {
  return (
    <a href="mailto:hunggwo@seed.net.tw" className="fixed-mail-icon">
      <span class="fa-stack fa-2x">
        <i class="fas fa-circle fa-stack-2x"></i>
        <i class="far fa-envelope fa-stack-1x fa-inverse"></i>
      </span>
    </a>
  )
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
    this.setState({ selectItem: item });
  }

  render() {
    return (
      <div className="container">
        <Jumbotron item={this.state.selectItem} items={this.state.items} handleClick={this.handleClick}/>
        <Photos item={this.state.selectItem} />
        {/* <FooterComp></FooterComp> */}
        <MailIcon></MailIcon>
      </div>
    );
  }
}

export default App;
