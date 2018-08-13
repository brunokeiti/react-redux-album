import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux';

class Imagem extends React.Component {
  render() {
    return (
      <div style={{ width:'calc(33.3% - 10px)', margin:5, display:'inline-block'}} onClick={this.props.clickImg}>
        <img alt={this.props.thumbnailUrl} style={{ width:'100%'}} src={this.props.thumbnailUrl} />
      </div>
    );
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);

    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response => response.json())
      .then(data => this.props.salvarDados(data))
  }

  render() {
    var album = [];

    return (
      <div className="App" style={{ padding: '20px' }}>

        {this.props.album === 0 && Array.isArray(this.props.data) && this.props.data.map((item, i) => {

          if (album.filter((a) => a === item.albumId).length === 0){
            album.push(item.albumId);
            return(
              <div key={item.albumId} style={{ width:'calc(33.3% - 10px)', height: window.innerWidth/3, margin:5, display:'inline-block', backgroundColor:'#5fba7d'}} onClick={() => this.props.abrirAlbum(item.albumId)}>
                <div style={{position:'relative', margin: 'auto', width:'100px', height:'50px', top:'calc(50% - 25px)', lineHeight:'50px'}} >
                  ALBUM {item.albumId}
                </div>
              </div>
            )
          }
        })}

        {this.props.album > 0 &&
          <div style={{ width:'calc(100% - 10px)', height: window.innerWidth/3, margin:5, marginBottom:'10px', display:'inline-block', backgroundColor:'#5fba7d'}} onClick={() => this.props.abrirAlbum(0)}>
            <div style={{position:'relative', margin: 'auto', width:'100px', height:'50px', top:'calc(50% - 25px)', lineHeight:'50px'}} >
              ALBUM {this.props.album}
            </div>
          </div>
        }

        {this.props.album > 0 && Array.isArray(this.props.data) && this.props.data.map((item, i) => {
          if (item.albumId === this.props.album){
            return(
              <Imagem key={item.url} thumbnailUrl={item.thumbnailUrl} clickImg={() => this.props.abrirFoto(true,item.url)}/>
            )
          }
        })}

        {this.props.foto &&
          <div style={{position:'fixed', width:'100%', height:'100%', top:0, left:0, backgroundColor:'rgba(0, 0, 0, 0.5)'}} onClick={() => this.props.abrirFoto(false,'')}>
            <div style={{position:'fixed', margin: 'auto', width:'80%', height:'80%', top:'50%', left:'50%', marginTop:'-40%', marginLeft:'-40%'}}>
              <img alt={this.props.url} style={{ width:'100%'}} src={this.props.url} />
            </div>
          </div>
        }

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  album: state.album,
  foto: state.foto,
  url: state.url,
  data: state.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    abrirAlbum: (payload) => {
      dispatch({type:"ABRIR_ALBUM",payload})
    },
    abrirFoto: (foto,url) => {
      dispatch({type:"ABRIR_FOTO",foto,url})
    },
    salvarDados: (data) => {
      dispatch({type:"SALVAR_DADOS",data})
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
