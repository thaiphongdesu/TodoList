import React, {Component} from 'react';
import tickImg from '../Img/tick.svg';
import TodoItem from './TodoItem';

export default class TodoApp extends Component{
    constructor(){
        super();
        this.state={
          todoList : [
            // {title:'Đi ngủ', isComplete: true},
            // {title:'Đi ăn',},
            // {title:'Đi cà phê',isComplete: true},
            // {title:'Đi học code'}
          ]
        };
        this.onClickAll = this.onClickAll.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.inputElement = React.createRef();
        this.cleanUp = this.cleanUp.bind(this);
      }
      componentDidMount(){
        let dataStr = JSON.parse(localStorage.getItem('todoList'));
        if(dataStr){
          this.setState(state => {return {todoList: state.todoList.concat(dataStr)}})
        }
        this.inputElement.current.focus();
      }
      componentDidUpdate(){
        let dataStr = JSON.stringify(this.state.todoList);
        localStorage.setItem('todoList',dataStr);
      }
      componentWillUnmount(){
          localStorage.removeItem('todoList');
      }
      onClick(item){
        return()=>{
          const isComplete = item.isComplete;
          const {todoList} = this.state;
          const index = todoList.indexOf(item);
          this.setState({
            todoList : [
              ...todoList.slice(0,index),
              {
                ...item,
                isComplete: !isComplete
              },
              ...todoList.slice(index + 1)
            ]
          });
        }
      }
      onClickAll(event){
        const {todoList} = this.state;
        if(event.target.className === '0'){
          const listTemp = [...todoList].map(item=>{
            return{
              ...item,
              isComplete : true
            }
          });
          this.setState({
            todoList: [
              ...listTemp
            ]
          });
          event.target.className = '1';
        }else{
          const listTemp = [...todoList].map(item=>{
            return{
              ...item,
              isComplete : false
            }
          });
          this.setState({
            todoList: [
              ...listTemp
            ]
          });
          event.target.className = '0';
        } 
      }
      onKeyUp(event){
        let text = event.target.value.trim();
        if(event.keyCode === 13){
          if(text === ''){
            return;
          }else{
            this.setState({
              todoList: [
                {title:text, isComplete: false},
                ...this.state.todoList
              ]
            });
            event.target.value = ''; 
          } 
        }
      }
      cleanUp(){
        let cleanedList = this.state.todoList.filter(item=> item.isComplete === false);
        this.setState(state => {return{todoList:cleanedList}});
      }
      render(){
        const {todoList} = this.state;
        return (
          <div className='todoApp'>
              <h1>To do list.</h1>
              <div className='header'>
                <img onClick={this.onClickAll} className='0' src={tickImg} height={32} width={32} alt='tickImg'/>
                <input onKeyUp={this.onKeyUp} ref={this.inputElement} placeholder='Add a thing...'></input>
              </div>
              {
                todoList.length > 0 && <div>
                  {todoList.map((item,index)=> <TodoItem key={index} data={item} onClick={this.onClick(item)}/>)}
                  <div className="todoApp-footer">
                    <button className='todoApp-footer--clean' onClick={this.cleanUp}>Clear finished</button>
                  </div>
                </div>
              }
              {todoList.length === 0 && <h2>Nothing here!</h2>}
              
          </div>
        );
      }
}