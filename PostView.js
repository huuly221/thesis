import React, { Component } from 'react';
import { Button, Icon, Reveal } from 'semantic-ui-react';
import axios from 'axios';
import FaDownload from 'react-icons/lib/fa/download';
import FaEye from 'react-icons/lib/fa/eye';
import { Document, Page } from 'react-pdf';
import "../../css/PostView.css";
import CKEditor from "react-ckeditor-component";
import CKEditors from '../CKEditor/CKEditors';
import ReactQuill from 'react-quill';


var fs = require('fs');

export default class PostView extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.handleChange = this.handleChange.bind(this);
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
    }
    handleChange(value) {
        console.log(value);
        this.setState({ text: value })
      }
    

    handleSubmit(event) {
        event.preventDefault();
        var formdata = document.getElementById("insertform");
        
        console.log("file", event.target);
        
        const data = new FormData(event.target);
        var data2= new FormData(formdata);
        
        console.log("aaaaaaaaa", data.get('category'));
        console.log("hêrerereereee", data2.get('file'));
        //this.state.dataform.category = data2.get('category');
        console.log(this.state.dataform.category);
        
        this.state.dataform.category = data.get('category');
        this.state.dataform.sub_category = data.get('sub_category');
        this.state.dataform.title = data.get('title');
        this.state.dataform.description = data.get('description');
        this.state.dataform.content = data.get('content');
        this.state.dataform.file = data2.get('file');
        this.state.dataform.poster = data.get('poster');
        this.state.dataform.tag = data.get('tag');
        const showdata = { 
            'category': this.state.dataform.category,
            'sub_category':this.state.dataform.sub_category,
            'title':this.state.dataform.title,
            'description': this.state.dataform.description,
            'content':this.state.text,
            'file':this.state.dataform.file,
            'poster':this.state.dataform.poster,
            'tag':this.state.dataform.tag
        }
        /*var uri = "";
        if (this.state.sub == "giới thiệu"){ 
            uri = "intro";
        }
        if (this.state.sub == "tin tức") {
            uri = "newsdetail";
        }
        if (this.state.sub == "sự kiện") {
            uri = "eventdetail";
        }
        if (this.state.sub == "văn bản") {
            uri = "documentdetail";
        }
        if (this.state.sub == "liên hệ") {
            uri = "intro";
        }
        */
        console.log("show: ", showdata);
        axios.post('https://tuoitrebachkhoa.herokuapp.com/api/eventdetail', showdata)
        .then(res => {
            alert("Đăng bài thành công");
            formdata.reset();
        })
          .catch(err => {
            console.error(err);
            
          });
        
      }


    /////upload file
    /*onChange = (e) => {
        const state = this.state;

        switch (e.target.name) {
          case 'selectedFile':
            state.selectedFile = e.target.files[0];
            break;
          default:
            state[e.target.name] = e.target.value;
        }

        this.setState(state);
      }

      onSubmit = (e) => {
        e.preventDefault();
        const { description, selectedFile } = this.state;
        let formData = new FormData();

        formData.append('description', description);
        formData.append('selectedFile', selectedFile);

        
      }

*/




    handleModelChange(model) {
        this.setState({
          model: model
        });
    }
    selected = (e) => {
        this.setState({sub: this.refs.select.value});
        
    }
      componentDidMount(){
        
            
        
        axios.get("https://tuoitrebachkhoa.herokuapp.com/admin/navbar")
        .then(res => {
          this.setState({ menu: res.data});
          
        });
        
      }
      componentWillMount(){
        
      }
    
    render() {
        const { description, selectedFile } = this.state;
        return(
            
            <div className="documents-wrap">
                
                <div className="clearfix-page"></div>
                <div className="container background-white"> 
                    <div className="clearfix"></div>                   
                    <div className="document-wrap-content">
                        <header className="panel-heading hvr-fade1 cover-heading">
                            <a>Đăng bài</a>
                        </header>

                        <div className="clearfix"></div>
                        <div className ="form-for-insert">
                            <form onSubmit={this.handleSubmit.bind(this)} id="insertform">
                            
                                <div class="form-group">
                                    <label for="category">Chọn danh mục: </label>
                                    <select class="form-control" id="category" name="category" ref="select" onChange={this.selected.bind(this)}>
                                        <option disabled selected value> -- select an option -- </option>
                                    {
                                        this.state.menu.map(item =>
                                            <option>{item.parentNode}</option>
                                        )
                                    }    
                                    </select>
                                    
                                </div>
                                <div class="form-group">
                                    <label for="sub_category">Chọn danh mục con: </label>
                                    <select class="form-control" id="sub_category" name="sub_category">
                                        
                                    {
                                        this.state.menu.filter(a => a.parentNode === this.state.sub).map(item1 =>
                                            item1.subList.map(sub => 
                                                <option>{sub.subMenu}</option>
                                            )
                                            
                                        )
                                    }    
                                    </select>
                                    
                                </div>
                                <div class="form-group">
                                    <label for="title">Tiêu đề: </label>
                                    <input type="text" class="form-control" id="title" name="title" />
                                </div>
                                <div class="form-group">
                                    <label for="description">Mô tả: </label>
                                    <input type="text" class="form-control" id="description" name="description"/>
                                </div>
                                <div class="form-group">
                                    <label for="content">Nội dung: </label>
                                    <ReactQuill value={this.state.text}
                                    onChange={this.handleChange} />
                                    
                                </div>

                                <div class="form-group">
                                    <label for="file">Tải tệp đính kèm: </label>
                                    <input multiple type="file" id="file" name="file" onChange={this.onChange} />
                                </div>
                                <div class="form-group">
                                    <label for="poster">Người viết: </label>
                                    <input type="text" class="form-control" id="poster" name="poster"/>
                                </div>
                                <div class="form-group">
                                    <label for="tag">Tag: </label>
                                    <input type="text" class="form-control" id="tag" name="tag" />
                                </div>
                                <div class="form-group">
                                <Button animated type="submit">
                                    <Button.Content visible>Đăng bài</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='upload' />
                                    </Button.Content>
                                </Button>
                                <Button animated className="right floated" type="reset">
                                    <Button.Content visible>Hủy</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='history'/>
                                    </Button.Content>
                                </Button>
                                
                                </div>
                                <div className="clearfix"></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

            