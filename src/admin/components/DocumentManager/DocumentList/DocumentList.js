import React, { Component } from 'react';
import { Button, Icon, Reveal } from 'semantic-ui-react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import FaDownload from 'react-icons/lib/fa/download';
import FaEye from 'react-icons/lib/fa/eye';
import { Document, Page } from 'react-pdf';
import "../../../css/PostView.css";
import CKEditor from "react-ckeditor-component";
import CKEditors from '../../CKEditor/CKEditors';
import ReactQuill from 'react-quill';
//import ListDataTable from '../ListDataTable/ListDataTable';
import {BootstrapTable, TableHeaderColumn, BootstrapButton, DeleteButton, ButtonGroup} from 'react-bootstrap-table';



let formatter = 'dd/mm/yyyy'

export default class DocumentList extends Component {
    constructor(props) {
        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this); 
        this.onAfterDeleteRow = this.onAfterDeleteRow.bind(this);
        this.state = {
          data:[],
          datapost: [],
          datatableFormated: [],
          startDate: moment(),
          endDate:moment(),
          format:"DD/MM/YYYY",

          menu:[],
          sub:[],
          text:'',
          
          dataform: {
            category: '',
            filename: '',
            file:'',
            poster:''
          }
        };
    }


    //// handle change file input
    onChange(event){
        
        this.setState({selectedFile: event.target.files[0]})
    }
    
    /// post data after submit 
    async handleSubmit(event) {
        event.preventDefault();
        var formdata = document.getElementById("insertform");
        var data= new FormData(formdata);
        
        if (this.state.selectedFile != null){
            var formsubmit1 = new FormData();
            formsubmit1.append('file', this.state.selectedFile);
        }
        
        this.state.dataform.category = data.get('category');
        this.state.dataform.filename = data.get('filename');
        this.state.dataform.poster = data.get('poster');
        const showdata = { 
            'category': this.state.dataform.category,
            'filename':this.state.dataform.filename,
            'file':'',
            'poster':this.state.dataform.poster
        }
        alert('Đăng văn bản thành công');
        formdata.reset();
        if (this.state.selectedFile == null){
            const postForm = axios.post('http://localhost:3001/api/documentfile', showdata);
            await axios.all([postForm])
            .then(axios.spread(function(acct, perms){
               
                alert('Đăng văn bản  thành công');
                
            }));
        } else{
            const postForm = axios.post('http://localhost:3001/api/documentfile', showdata);
            const postFile = axios.post('http://localhost:3001/api/documentfilepath', formsubmit1);
            await axios.all([postForm, postFile])
            .then(axios.spread(function(acct, perms){
                 
                alert('Đăng văn bản  thành công');
                
            }));
            
            
        }
       
       
    }

    /// handle update after submit form 
    async handleUpdate(event) {
        event.preventDefault();
        var formdata = document.getElementById("insertform");
        var data= new FormData(formdata);
        if (this.state.selectedFile != null){
            var formsubmit1 = new FormData();
            formsubmit1.append('file', this.state.selectedFile);
        }
        

        if (this.state.updatedata != null){
            this.state.updatedata.category = data.get('category');
            this.state.updatedata.filename = data.get('filename');
            this.state.updatedata.poster = data.get('poster');
        }
        var updatedata = this.state.updatedata;
        var idUpdate = this.state.updatedata._id;
        alert('cập nhật văn bản thành công');
        formdata.reset();
        if (this.state.selectedFile == null){
            const postForm = axios.post('http://localhost:3001/api/updatedocumentfile', updatedata);
            await axios.all([postForm])
            .then(axios.spread(function(acct, perms){
               
                alert('cập nhật văn bản thành công');
                
            }));
        } else{
           
            const postForm = axios.post('http://localhost:3001/api/updatedocumentfile', updatedata);
            const postFile = axios.post(`http://localhost:3001/api/documentfilepath?_id=${idUpdate}`, formsubmit1);
            await axios.all([postForm, postFile])
            .then(axios.spread(function(acct, perms){
                  
                
            }));
            alert('cập nhật văn bản thành công');
           
        }
        
        
        
    }

    /// get sub_category from selected category
    
    //// Table list post data
    renderShowsTotal(start, to, total) {
        return (
          <p style={ { color: 'blue' } }>
            Kết quả từ { start } đến { to }, trên tổng số { total }
          </p>
        );
    }
    buttonFormatter(cell, row){
        return '<button class="btn btn-primary" type="button">Chỉnh sửa</button>';
    }

    ////get selected row data from list
    async getSelectedRowKeys() {
        var key = this.refs.table.state.selectedRowKeys[0];
        //Here is your answer
        axios.get(`http://localhost:3001/api/documentfile?_id=${key}`)
        .then(res => {
            this.setState({ updatedata: res.data});
            console.log("state: ", this.state.updatedata.category);
          
            if (this.state.updatedata != null){
                this.refs.select.value = this.state.updatedata.category;
                console.log("select: ", this.refs.select.value);
            }
        });
        
        console.log("o day", key)
    }

    onAfterDeleteRow(rowKeys) {
        axios.delete(`http://localhost:3001/api/documentfile/delete?_id=${rowKeys}`)
        .then(function(response) {
            alert('Xóa thành công văn bản');
        });
        
        
    }

    convertStringToDateFormat(string){
        var a = new Date(string);
        var day = a.getDate();
        var month = a.getMonth()+1;
        var year = a.getFullYear();
        var hour = a.getHours();
        

        var dateformat = day+'/'+month+'/'+year;
        console.log(dateformat);
        return dateformat;
    }

    /// get data from server
    componentDidMount(){
        axios.get("http://localhost:3001/api/documentfile")
        .then(res => {
          this.setState({ datapost: res.data});

          console.log("frefgfgfgf", this.state.datapost.file);
          this.state.datapost.map(item => {
            var file = String(item.file);
        
            item.file = file.split("./uploads/")[1];
        console.log("frefgfgfgf", item.file);
        item.date = this.convertStringToDateFormat(item.date);
        this.setState({datatableFormated: this.state.datapost})
          })
            
        });
        
    }
    componentWillReceiveProps(nextProps){
        axios.get("http://localhost:3001/api/documentfile")
        .then(res => {
          this.setState({ datapost: res.data});
          
        });
    }
    
    createCustomDeleteButton = (onClick) => {
        return (
          <DeleteButton
            btnText='Xóa File'
            btnContextual='btn-danger'
            className='btnEdit'
            
            />
        );
        
    }
    createCustomButtonGroup = props => {
        return (
          <ButtonGroup className='my-custom-class'>
            { props.deleteBtn }
            <button type="button" class="btn btn-primary btnEdit" onClick={this.getSelectedRowKeys.bind(this)}><Icon name='edit outline' />Cập nhật File</button>
            <button type="button" class="btn btn-primary btnEdit" onClick={this.seeDetail.bind(this)}><Icon name='edit outline' />Xem văn bản</button>
          </ButtonGroup>
        );
      }
    async seeDetail() {
        var key = this.refs.table.state.selectedRowKeys[0];
        console.log(key);
       
         await axios.get(`http://localhost:3001api/documentfile?_id=${key}`)
              .then(res => {
                  console.log("file path ", res.data.file);
                  var a=  "http://localhost:3001/" + res.data.file;
                  console.log("link", a);
                  window.open(a);
               
         });
         
         //
      
      }

    render() {
        const { updatedata } = this.state;
        const options = {
            page: 1,  // which page you want to show as default
            sizePerPageList: [ {
              text: '5', value: 5
            }, {
              text: '10', value: 10
            }, {
              text: 'All', value: this.state.datapost.length
            } ], // you can change the dropdown list for size per page
            sizePerPage: 5,  // which size per page you want to locate as default
            pageStartIndex: 1, // where to start counting the pages
            paginationSize: 3,  // the pagination bar size.
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
            deleteBtn: this.createCustomDeleteButton,
            afterDeleteRow: this.onAfterDeleteRow, /// delete row
            btnGroup: this.createCustomButtonGroup
            
        };
        const selectRowProp = {
            mode: 'radio',
            clickToSelect: true,
            showOnlySelected: true,
            width: '50px'
        };
        return(
            
            <div className="documents-wrap">
                
                <div className="clearfix-page"></div>
                <div className="container background-white"> 
                    <div className="clearfix"></div>                   
                    <div className="document-wrap-content">
                        <header className="panel-heading hvr-fade1 cover-heading">
                            <a>Văn bản</a>
                        </header>

                        <div className="clearfix"></div>
                        <div className ="form-for-insert">
                            {updatedata == null?
                                <form onSubmit={this.handleSubmit} id="insertform">
                                    <div class="form-group">
                                        <label for="category">Chọn danh mục: </label>
                                        <select class="form-control" id="category" name="category" ref="select">
                                        <option disabled selected value> -- Danh mục văn bản -- </option>
                                        
                                                <option>văn bản</option>
                                                <option>thông báo</option>
                                                <option>khác</option>
                                         
                                        </select>
                                        
                                    </div>
                                    <div class="form-group">
                                        <label for="filename">Tiêu đề: </label>
                                        <input type="text" class="form-control" id="filename" name="filename" />
                                    </div>
                                    <div class="form-group">
                                        <label for="file">Tải tệp đính kèm: </label>
                                        <input type="file" id="file" name="file" ref="fileup" onChange={this.onChange.bind(this)} />
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="poster">Người đăng: </label>
                                        <input type="text" class="form-control" id="poster" name="poster"/>
                                    </div>
                                    <div class="form-group">
                                        <Button animated type="submit" >
                                            <Button.Content visible>Tải lên</Button.Content>
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
                                    
                                </form>
                                :
                                <form onSubmit={this.handleUpdate} id="insertform" >
                                    <div class="form-group">
                                        <label for="category">Chọn danh mục: </label>
                                        <select class="form-control" id="category" name="category" ref="select">
                                                <option disabled selected value> -- select an option -- </option>
                                                <option selected={updatedata.category == "văn bản"}>văn bản</option>
                                                <option selected={updatedata.category == "thông báo"}>thông báo</option>
                                                <option selected={updatedata.category == "khác"}>khác</option> 
                                        </select>
                                        
                                    </div>
                                    <div class="form-group">
                                        <label for="filename">Tiêu đề: </label>
                                        <input type="text" class="form-control" id="filename" name="filename" defaultValue={updatedata.filename}/>
                                    </div>
                                    <div class="form-group">
                                        <label for="file">Tải tệp đính kèm: </label>
                                        <input type="file" id="file" name="file" ref="fileup" onChange={this.onChange.bind(this)} />
                                    </div>
                                    <div class="form-group">
                                        <label for="poster">Người viết: </label>
                                        <input type="text" class="form-control" id="poster" name="poster" defaultValue={updatedata.poster}/>
                                    </div>
                                    
                                    <div class="form-group">
                                            <Button animated type="submit" >
                                                <Button.Content visible>Cập nhật</Button.Content>
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
                                    
                                </form>
                            }
                            

                            <div className="clearfix"></div>
                            <div>
                            
                                <BootstrapTable
                                        data={ this.state.datapost }
                                        pagination={ true } hover={ true } onDeleteRow={this.onAfterDeleteRow} deleteRow={ true } options={ options } selectRow={selectRowProp} ref='table'>
                                        
                                        <TableHeaderColumn dataField="_id" isKey hidden headerAlign='center'>ID</TableHeaderColumn>
                                        <TableHeaderColumn dataField='category' filter={ { type: 'TextFilter', delay: 0 } } width='150' headerAlign='center' dataAlign='center'>Danh mục</TableHeaderColumn>
                                        <TableHeaderColumn dataField='filename' filter={ { type: 'TextFilter', delay: 0 } } tdStyle={ { whiteSpace: 'normal' } } headerAlign='center'>Tiêu đề</TableHeaderColumn>
                                        <TableHeaderColumn dataField='file'  filter={ { type: 'TextFilter', delay: 0 } } headerAlign='center' tdStyle={ { whiteSpace: 'normal' } }>Tên tài liệu</TableHeaderColumn>
                                        <TableHeaderColumn dataField='poster' filter={ { type: 'TextFilter', delay: 0 } } width='150' headerAlign='center'>Người đăng</TableHeaderColumn>
                                        <TableHeaderColumn dataField='date' filter={ { type: 'TextFilter', delay: 0 } } width='200' headerAlign='center'>Người đăng</TableHeaderColumn>
                                </BootstrapTable>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
