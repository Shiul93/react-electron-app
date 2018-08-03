import React, { Component } from 'react';
import './App.css';
import Serial from './components/Serial.js';
import Broker from './components/Broker';
import Console from './components/Console';
import TopBar from './components/TopBar';
const devFolder = '/dev';


class App extends Component {
  constructor(props){
    super()
  // const bluetooth = window.require('node-bluetooth');
  // create bluetooth device instance
  // const device = new bluetooth.DeviceINQ();
  // device.listPairedDevices(console.log);

    this.state = {
      data:0,
      broker: new Broker,
      ports: {},
      ready: false
    };
    this.serial = new Serial(this.state.broker,"SERIALPORT");
    this.serial.onData((dt)=>(
      this.setState({
        data:dt,       
      })
    ));
    this.serial.getPorts();

    this.serial.onReady(()=>{this.setState({
      ready:true

    })})

    


    this.serial.open("/dev/tty.SLAB_USBtoUART");
    

  

  }
  componentDidMount(){
    this.setState({
      ports: this.serial.getPorts(),
    });
  }

  render() {
    const echoFun = (text, response)=>{
      this.serial.writeln(text);
    }

    return ( 
      <div className="App">
      {this.state.ready==true ?
      <div>
        <div>
            
            
        </div>

        <div>
          <Console textCallback={echoFun} broker={this.state.broker} id ={"c1"} subscriptions={["SERIALPORT"]}/>

        </div>
        </div>
        :<img src={'./logo.svg'} />
        
      }

        
      </div>

    );
  }
}

export default App;
