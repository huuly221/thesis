import React, { Component } from 'react';
import { Button, Icon, Reveal } from 'semantic-ui-react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {Redirect} from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

import "../../css/PostView.css";
import CKEditor from "react-ckeditor-component";
import CKEditors from '../CKEditor/CKEditors';
import ReactQuill from 'react-quill';
//import ListDataTable from '../ListDataTable/ListDataTable';
import {BootstrapTable, TableHeaderColumn, BootstrapButton, DeleteButton, ButtonGroup} from 'react-bootstrap-table';





export default class PostView extends Component {
    constructor(props) {
        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onAfterDeleteRow = this.onAfterDeleteRow.bind(this);
        this.handleChangestartDate = this.handleChangestartDate.bind(this);
        this.handleChangeendDate = this.handleChangeendDate.bind(this);
        
        this.state = {
          data:[],
          datapost: [],
          startDate: moment(),
          endDate:moment(),
          format:"DD/MM/YYYY",

          menu:[],
          sub:[],
          text:'',
          
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

    

    ////handle change start date
    handleChangestartDate(newDate) {
       
        this.setState({startDate: newDate});
        
        if(newDate > this.state.endDate )
        this.setState({endDate: newDate})
    }

    ////handle change start date
    handleChangeendDate(newDate) {
        
        this.setState({endDate: newDate});
        if(newDate < this.state.startDate )
        this.setState({endDate: this.state.startDate})
    
    }

    //// handle change file input
    onChange(event){
        console.log("File: ", event.target.files[0]);
        this.setState({selectedFile: event.target.files[0]})
    }

    //// handle change CKeditor
    handleChange(value) {
        console.log(value);
        
        this.setState({ text: value })
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
        this.state.dataform.sub_category = data.get('sub_category');
        this.state.dataform.title = data.get('title');
        this.state.dataform.description = data.get('description');
        this.state.dataform.content = data.get('content');

        this.state.dataform.poster = data.get('poster');
        this.state.dataform.tag = data.get('tag');
        const showdata = { 
            'category': this.state.dataform.category,
            'sub_category':this.state.dataform.sub_category,
            'title':this.state.dataform.title,
            'description': this.state.dataform.description,
            'content':this.state.text,
            'file':'',
            'startDate': this.state.startDate,
            'endDate': this.state.endDate,
            'poster':this.state.dataform.poster,
            'tag':this.state.dataform.tag
        }
        alert('Đăng bài thành công');
        formdata.reset();
        if (this.state.selectedFile == null){
            const postForm = axios.post('http://localhost:3001/api/eventdetail', showdata);
            await axios.all([postForm])
            .then(axios.spread(function(acct, perms){
                console.log("success"); 
                alert('cập nhật bài thành công');
                
            }));
        } else{
            const postForm = axios.post('http://localhost:3001/api/eventdetail', showdata);
            const postFile = axios.post('http://localhost:3001/api/fileeventdetail', formsubmit1);
            await axios.all([postForm, postFile])
            .then(axios.spread(function(acct, perms){
                console.log("success");   
                alert('cập nhật bài thành công');
               ;
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
            this.state.updatedata.sub_category = data.get('sub_category');
            this.state.updatedata.title = data.get('title');
            this.state.updatedata.description = data.get('description');
            this.state.updatedata.content = data.get('content');
            this.state.updatedata.startDate = this.state.startDate; 
            this.state.updatedata.endDate = this.state.endDate; 
            this.state.updatedata.poster = data.get('poster');
            this.state.updatedata.tag = data.get('tag');
        }
        var updatedata = this.state.updatedata;
        var idUpdate = this.state.updatedata._id;
        
        
        alert('cập nhật bài thành công');
        formdata.reset();
        if (this.state.selectedFile == null){
            const postForm = axios.post('http://localhost:3001/api/updateeventdetail', updatedata);
            await axios.all([postForm])
            .then(axios.spread(function(acct, perms){
                
                alert('cập nhật bài thành công');
                
            }));
        } else{
            
            const postForm = axios.post('http://localhost:3001/api/updateeventdetail', updatedata);
            const postFile = axios.post(`http://localhost:3001/api/fileeventdetail?_id=${idUpdate}`, formsubmit1);
            await axios.all([postForm, postFile])
            .then(axios.spread(function(acct, perms){
                
                
            }));
            alert('cập nhật bài thành công');
            
        }
        
       
        
    }

    /// get sub_category from selected category
    selected = (e) => {
        this.setState({sub: this.refs.select.value});
        if(this.refs.select.value ==='sự kiện')
        this.setState({isdateEvent:true})
        else {this.setState({isdateEvent:false})}
    }
    
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
        axios.get(`http://localhost:3001/api/eventdetail?_id=${key}`)
        .then(res => {
            this.setState({ updatedata: res.data});
            console.log("state: ", this.state.updatedata.category);
          console.log(res.data)
            if (this.state.updatedata != null){
                this.refs.select.value = this.state.updatedata.category;
                console.log("select: ", this.refs.select.value);
                this.selected(this.refs.select.value); 
                this.setState({text: this.state.updatedata.content});
                this.setState({startDate: this.state.updatedata.startDate});
                this.setState({endDate: this.state.updatedata.endDate})
            }
        });
        
        console.log("o day", key)
    }

    onAfterDeleteRow(rowKeys) {
        axios.delete(`http://localhost:3001/api/eventdetail/delete?_id=${rowKeys}`)
        .then(function(response) {
            alert('The rowkey you drop: ' + rowKeys);
        });
        
        
    }
    seeDetail() {
        var key = this.refs.table.state.selectedRowKeys[0];
        var key1 =this.state.datapost.filter(x=> x._id ===key)
        if(key1[0] ){
            this.setState({code:key});
        if( key1[0].category =="giới thiệu")
        {
            this.setState({see:"Gioithieu"});
        }
        else if(key1[0].category =="sự kiện")
        {
            this.setState({see:"Sukien"});
        }
        else 
        
        this.setState({see:"Tintuc"});
        
        }
      }
    /// get data from server
    componentDidMount(){
        axios.get("http://localhost:3001/admin/navbar")
        .then(res => {
          this.setState({ menu: res.data});
          
        });

        axios.get("http://localhost:3001/api/eventdetail")
        .then(res => {
          this.setState({ datapost: res.data});
          
        });
        
    }
    componentWillReceiveProps(nextProps){
        axios.get("http://localhost:3001/api/eventdetail")
        .then(res => {
          this.setState({ datapost: res.data});
          
        });
    }
    
    createCustomDeleteButton = (onClick) => {
        return (
          <DeleteButton
            btnText='Xóa Bài'
            btnContextual='btn-danger'
            className='btnEdit'
            
            />
        );
        
    }
    createCustomButtonGroup = props => {
        return (
          <ButtonGroup className='my-custom-class'>
            { props.deleteBtn }
            <button type="button" class="btn btn-primary btnEdit" onClick={this.getSelectedRowKeys.bind(this)}><Icon name='edit outline' />Cập nhật bài</button>
            <button type="button" class="btn btn-primary btnEdit" onClick={this.seeDetail.bind(this)}>Xem chi tiết bài viết</button>
          </ButtonGroup>
        );
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
            this.state.see?<Redirect to={{pathname: `/${this.state.see}/${this.state.code}`}} /> :  
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
                            {updatedata == null?
                                <form onSubmit={this.handleSubmit} id="insertform">
                            
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
                                        <select class="form-control" id="sub_category" name="sub_category" >
                                            
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
                                    
                                    { (this.state.isdateEvent ==true)
                                        ? ( <div>
                                            <div class="form-group">
                                            <label for="startDate">Ngày bắt đầu: </label>
                                            <div>
                                            <DatePicker
                                                    selected={this.state.startDate}
                                                    onChange={this.handleChangestartDate}
                                                    selectsStart
                                                    startDate={this.state.startDate}
                                                    endDate={this.state.endDate}
                                                    minDate={moment()}
                                                    showDisabledMonthNavigation
                                                    showTimeSelect
                                                    timeFormat="HH:mm"
                                                    injectTimes={[
                                                      moment().hours(0).minutes(1),
                                                      moment().hours(12).minutes(5),
                                                      moment().hours(23).minutes(59)
                                                    ]}
                                                    dateFormat="LLL"
                                                />
                                             </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="endDate">Ngày kết thúc: </label>
                                                <div>
                                                <DatePicker
                                                    selected={this.state.endDate}
                                                    onChange={this.handleChangeendDate}
                                                    selectsEnd    
                                                    startDate={this.state.startDate}
                                                    endDate={this.state.endDate}
                                                    minDate={this.state.startDate}
                                                    showDisabledMonthNavigation
                                                    showTimeSelect
                                                    timeFormat="HH:mm"
                                                    injectTimes={[
                                                      moment().hours(0).minutes(1),
                                                      moment().hours(12).minutes(5),
                                                      moment().hours(23).minutes(59)
                                                    ]}
                                                    dateFormat="LLL"
                                                />
                                                </div>
                                            </div>
                                            </div>
                                        )
                                     : null}
                                    <div class="form-group">
                                        <label for="description">Mô tả: </label>
                                        <input type="text" class="form-control" id="description" name="description" />
                                    </div>
                                    <div class="form-group">
                                        <label for="content">Nội dung: </label>
                                            <ReactQuill name="content" id="content" value={this.state.text}
                                            onChange={this.handleChange} />
                                    </div>

                                    <div class="form-group">
                                        <label for="file">Tải tệp đính kèm: </label>
                                        <input type="file" id="file" name="file" ref="fileup" onChange={this.onChange.bind(this)} />
                                    </div>
                                    
                                    
                                    <div class="form-group">
                                        <label for="poster">Người viết: </label>
                                        <input type="text" class="form-control" id="poster" name="poster"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="tag">Tag: </label>
                                        <input type="text" class="form-control" id="tag" name="tag"/>
                                    </div>
                                    <div class="form-group">
                                        <Button animated type="submit" >
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
                                    
                                </form>
                                :
                                <form onSubmit={this.handleUpdate} id="insertform" >
                            
                                    <div class="form-group">
                                        <label for="category">Chọn danh mục: </label>
                                        <select class="form-control" id="category" name="category" ref="select" onChange={this.selected.bind(this)}>
                                        <option disabled selected value> -- select an option -- </option>
                                        {
                                            this.state.menu.map(item =>
                                                <option selected={item.parentNode == updatedata.category}>{item.parentNode}</option>
                                            )
                                        }    
                                        </select>
                                        
                                    </div>
                                    <div class="form-group">
                                        <label for="sub_category">Chọn danh mục con: </label>
                                        <select class="form-control" id="sub_category" name="sub_category" >
                                            
                                        {
                                            this.state.menu.filter(a => a.parentNode === this.state.sub).map(item1 =>
                                                item1.subList.map(sub => 
                                                    <option selected={sub.subMenu == updatedata.sub_category}>{sub.subMenu}</option>
                                                )
                                                
                                            )
                                        }    
                                        </select>
                                        
                                    </div>
                                    <div class="form-group">
                                        <label for="title">Tiêu đề: </label>
                                        <input type="text" class="form-control" id="title" name="title" defaultValue={updatedata.title}/>
                                    </div>
                                    { (this.state.isdateEvent ==true)
                                        ? ( <div>
                                            <div class="form-group">
                                            <label for="startDate">Ngày bắt đầu: </label>
                                            <div>
                                            <DatePicker
                                                    selected={this.state.startDate}
                                                    onChange={this.handleChangestartDate}
                                                    selectsStart
                                                    startDate={this.state.startDate}
                                                    endDate={this.state.endDate}
                                                    minDate={moment()}
                                                    showDisabledMonthNavigation
                                                    showTimeSelect
                                                    timeFormat="HH:mm"
                                                    injectTimes={[
                                                      moment().hours(0).minutes(1),
                                                      moment().hours(12).minutes(5),
                                                      moment().hours(23).minutes(59)
                                                    ]}
                                                    dateFormat="LLL"
                                                />
                                             </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="endDate">Ngày kết thúc: </label>
                                                <div>
                                                <DatePicker
                                                    selected={this.state.endDate}
                                                    onChange={this.handleChangeendDate}
                                                    selectsEnd    
                                                    startDate={this.state.startDate}
                                                    endDate={this.state.endDate}
                                                    minDate={this.state.startDate}
                                                    showDisabledMonthNavigation
                                                    showTimeSelect
                                                    timeFormat="HH:mm"
                                                    injectTimes={[
                                                      moment().hours(0).minutes(1),
                                                      moment().hours(12).minutes(5),
                                                      moment().hours(23).minutes(59)
                                                    ]}
                                                    dateFormat="LLL"
                                                />
                                                </div>
                                            </div>
                                            </div>
                                        )
                                     : null}
                                    <div class="form-group">
                                        <label for="description">Mô tả: </label>
                                        <input type="text" class="form-control" id="description" name="description" defaultValue={updatedata.description}/>
                                    </div>
                                    <div class="form-group">
                                        <label for="content">Nội dung: </label>
                                            <ReactQuill name="content" id="content" defaultValue={updatedata.content} value={this.state.text}
                                            onChange={this.handleChange}/>
                                        
                                    </div>

                                    <div class="form-group">
                                        <label for="file">Tải tệp đính kèm: </label>
                                        <input type="file" id="file" name="file" ref="fileup" onChange={this.onChange.bind(this)} />
                                    </div>
                                   
                                    {/*
                                        <div class="form-group">
                                        <label for="startDate">Ngày bắt đầu: </label>
                                        
                                        <DateTimePicker
                                            id = "endDate"
                                            name = "endDate"
                                            time={false}
                                            format={formatter}
                                            value={updatedata.startDate}
                                            onChange={this.handleChangeendDate}
                                        />;
                                    </div>
                                    <div class="form-group">
                                        <label for="endDate">Ngày kết thúc: </label>
                                        <DateTimePicker
                                            id = "endDate"
                                            name = "endDate"
                                            time={false}
                                            format={formatter}
                                            value={updatedata.endDate}
                                            onChange={this.handleChangeendDate}
                                        />;
                                    </div>
                                    */
                                    }
                                    
                                    <div class="form-group">
                                        <label for="poster">Người viết: </label>
                                        <input type="text" class="form-control" id="poster" name="poster" defaultValue={updatedata.poster}/>
                                    </div>
                                    <div class="form-group">
                                        <label for="tag">Tag: </label>
                                        <input type="text" class="form-control" id="tag" name="tag" defaultValue={updatedata.tag}/>
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
                                        
                                        <TableHeaderColumn dataField="_id" hidden isKey headerAlign='center'>ID</TableHeaderColumn>
                                        
                                        <TableHeaderColumn dataField='title'  filter={ { type: 'TextFilter', delay: 0  } } headerAlign='center'>Tiêu đề</TableHeaderColumn>
                                        <TableHeaderColumn dataField='category' filter={ { type: 'TextFilter', delay: 0 } } headerAlign='center' dataAlign='center'>Danh mục</TableHeaderColumn>
                                        <TableHeaderColumn dataField='poster' filter={ { type: 'TextFilter', delay: 0 } } headerAlign='center' dataAlign='center'>Người viết</TableHeaderColumn>
                                        <TableHeaderColumn dataField='date' filter={ { type: 'TextFilter', delay: 0 } } headerAlign='center' dataAlign='center'>Ngày đăng</TableHeaderColumn>
                                        <TableHeaderColumn dataField='file' filter={ { type: 'TextFilter', delay: 0 } } headerAlign='center' dataAlign='center'>Sart</TableHeaderColumn>
                                        
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
