import React, {Component} from 'react';
import classNames from 'classnames';
import './todoItem.css';
import checkImg from '../Img/check.svg';

class TodoItem extends Component{
    render(){
        const {data, onClick} = this.props;
        return(
            <div
                className={classNames('todoItem',{'todoItem--complete':data.isComplete})}>
                <img onClick={onClick} src={checkImg} width={32} height={32} alt='checkImg'/>
                <p>{this.props.data.title}</p>
            </div>
        );
    }
}

export default TodoItem;