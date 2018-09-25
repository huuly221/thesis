import React, { Component } from 'react';
import { Button, Icon, Reveal } from 'semantic-ui-react';
import axios from 'axios';

export default class UploadFile extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        
        this.state = {
          data:[],
          menu:[],
          sub:[],
          contents: 'content',
          text:'',
          selectedFile: '',
          
          dataform: {
            category: '',
            sub_category:'',
            title:'',
            description: '',
            content: '',
            file:'',
            poster:'',
            tag:''
          }
        };
    }
    onChange(event){
        console.log("File: ", event.target.files[0]);
        this.setState({selectedFile: event.target.files[0]})
    }
    handleSubmit(event){
        event.preventDefault();
        var form = new FormData();
        
        form.append('file', this.state.selectedFile);
        axios.post('http://localhost:3001/api/eventdetail', form)
        .then(res => {
            alert("Đăng bài thành công");
            
        })
          .catch(err => {
            console.error(err);
            
          });
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                
                <input type="file" name="file" onChange={this.onChange.bind(this)}/>
                <input type="submit" value="Upload" />
            </form>
        )
    }
}
