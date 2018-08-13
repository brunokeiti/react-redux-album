import React, { Component } from 'react';
import './App.css';

class Imagem extends React.Component {
  constructor ( props ){
    super ( props );
  }
  render() {
    return (
      <div style={{ width:'calc(33.3% - 10px)', margin:5, display:'inline-block'}} onClick={this.props.clickImg}>
        <img style={{ width:'100%'}} src={this.props.thumbnailUrl} />
      </div>
    );
  }
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null,
      album: 0,
      foto: false,
      url: '',

    };
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  clicarAlbum(id){
    this.setState({ album: id });
  }
  fecharAlbum(){
    this.setState({ album: 0 });
  }

  clicarFoto(urlimagem){
    this.setState({ foto: true, url: urlimagem });
  }
  fecharFoto(){
    this.setState({ foto: false });
  }

  render() {
    var album = [];

    return (
      <div className="App" style={{ padding: '20px' }}>

        {this.state.album === 0 && Array.isArray(this.state.data) && this.state.data.map((item, i) => {

          if (album.filter((a) => a == item.albumId).length == 0){
            album.push(item.albumId);
            return(
              <div style={{ width:'calc(33.3% - 10px)', height: window.innerWidth/3, margin:5, display:'inline-block', backgroundColor:'#5fba7d'}} onClick={() => this.clicarAlbum(item.albumId)}>
                <div style={{position:'relative', margin: 'auto', width:'100px', height:'50px', top:'calc(50% - 25px)', lineHeight:'50px'}} >
                  ALBUM {item.albumId}
                </div>
              </div>
            )
          }
        })}

        {this.state.album > 0 &&
          <div style={{ width:'calc(100% - 10px)', height: window.innerWidth/3, margin:5, marginBottom:'10px', display:'inline-block', backgroundColor:'#5fba7d'}} onClick={() => this.fecharAlbum()}>
            <div style={{position:'relative', margin: 'auto', width:'100px', height:'50px', top:'calc(50% - 25px)', lineHeight:'50px'}} >
              ALBUM {this.state.album}
            </div>
          </div>
        }

        {this.state.album > 0 && Array.isArray(this.state.data) && this.state.data.map((item, i) => {
          if (item.albumId === this.state.album){
            return(
              <Imagem thumbnailUrl={item.thumbnailUrl} clickImg={() => this.clicarFoto(item.url)}/>
            )
          }
        })}

        {this.state.foto &&
          <div style={{position:'fixed', width:'100%', height:'100%', top:0, left:0, backgroundColor:'rgba(0, 0, 0, 0.5)'}} onClick={() => this.fecharFoto()}>
            <div style={{position:'fixed', margin: 'auto', width:'80%', height:'80%', top:'50%', left:'50%', marginTop:'-40%', marginLeft:'-40%'}}>
              <img style={{ width:'100%'}} src={this.state.url} />
            </div>
          </div>
        }

      </div>
    )
  }
}

export default App;
