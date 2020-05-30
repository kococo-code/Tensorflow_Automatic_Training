import React,{Component} from 'react';
import axios from 'axios';
import './css/Model.css';
import {Form} from 'react-bootstrap';
import DashBoard from './DashBoard';

export default class ModelBuilder extends Component{
    constructor(props){
        super(props);
        this.state = {
            model : 'default' ,
            inputShape : '',
            n_classes : '',
            loss : '',
            Batch_size :0,
            Optimizer : '',
            Metrics : '',
            epochs : 0,
            learning_rate : '',
            isTraining : false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({ [event.target.name] : event.target.value});
    }
    getSelectValue(event){
        this.setState({ [event.target.name] : event.target.value});
    }
    setIncludeTop(event){
        this.setState({include_top : this.include_top.value})
    }
    /* 
    Send Params to Flask 
    Model : Keras Applications Model
    InputShape : Image InputShape
    N Classes : N_Classes
    Include Top : Using Origin NetWork
    */
    handleSubmit(event){
        event.preventDefault();
        const payload = {
            model: this.state.model,
            inputShape : this.state.inputShape,
            n_classes : this.state.n_classes,
            loss : this.state.loss,
            optimizer : this.state.optimizer,
            batch_size : this.state.Batch_size,
            metrics : this.state.Metrics,
            epochs : this.state.epochs,
            learning_rate : this.state.learning_rate
        };
        axios.post(`http://127.0.0.1:5000/api`, {payload})
        .then(res => {
            console.log(res);
            if(res.data == 'Empty Dataset'){
                this.setState({
                    isTraining :false
                })
            }
        })
        .catch(err => {
            console.log(err);
        }); 
        alert(`Start Train! ${this.state.epochs}epochs`)
        this.setState({
            isTraining : true
        });
    }


    render(){
        return(
            <div>
                <div className="FormContainer">
                    <div className="ModelSelector">  
                    <form onSubmit={this.handleSubmit}>
                    <Form>
                        <Form.Group>
                            <Form.Label> Model</Form.Label>
                            <Form.Control as="select" name="model" ref={model => this.model=model} onChange={this.getSelectValue.bind(this)}custom>
                            <option>default</option>
                            <option>VGG16</option>
                            <option>VGG19</option>
                            <option>Inception</option>
                            <option>ResNet</option>
                            <option>Inception</option>
                            </Form.Control>
                        </Form.Group>
                        </Form>
                        <form autoComplete='off'>
                            <span id="formexplain">Input Shape</span><div id="inputForm"><input id="inputBox" type='text' name='inputShape' onChange={this.handleChange}/></div>
                            <span id="formexplain">N Classes </span><div id="inputForm"> <input id="inputBox" type='text' name="n_classes" onChange={this.handleChange}/> </div>
                            <span id="formexplain">Batch_size </span><div id="inputForm"> <input id="inputBox" type='text' name="Batch_size" onChange={this.handleChange}/> </div>
                            <span id="formexplain">Epochs </span><div id="inputForm"> <input id="inputBox" type='text' name="epochs" onChange={this.handleChange}/> </div>
                            <span id="formexplain">Learning Rate </span><div id="inputForm"> <input id="inputBox" type='text' name="Learning_rate" onChange={this.handleChange}/> </div>

                        </form>
                        <Form>
                        <Form.Group>
                            <Form.Label>Loss</Form.Label>
                            <Form.Control as="select" name="loss" ref={loss => this.loss=loss} onChange={this.getSelectValue.bind(this)}custom>
                            <option>default</option>
                            <option>Categorical Cross Entropy</option>
                            <option>Binary Cross Entropy</option>
                            <option>Mean Square Error</option>
                            <option>Hinge</option>
                            </Form.Control>
                        </Form.Group>
                        </Form>
                        <Form>
                        <Form.Group>
                            <Form.Label>Optimizer</Form.Label>
                            <Form.Control as="select" name="optimizer" ref={optimizer => this.optimizer=optimizer} onChange={this.getSelectValue.bind(this)}custom>
                            <option>default</option>
                            <option>Adam</option>
                            <option>SGD</option>
                            <option>RMSprop</option>
                            <option>Adagrad</option>
                            <option>AdeDelta</option>
                            <option>AdaMax</option>
                            <option>Nadam</option>
                            </Form.Control>
                        </Form.Group>
                        </Form>
                        
                        <input className="TrainStartButton" type='submit' value='Train Start'/>

                    </form>
                    </div>
                    
                </div>
                <DashBoard training_status={this.state.isTraining} TotalEpochs={this.state.epochs}></DashBoard>
            </div>
        )
    }
}