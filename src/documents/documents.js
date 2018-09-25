import React, { Component } from 'react';
import './documents.css';
import axios from 'axios';
import FaDownload from 'react-icons/lib/fa/download';
import FaEye from 'react-icons/lib/fa/eye';
import { Document, Page } from 'react-pdf';
import {BootstrapTable, TableHeaderColumn, BootstrapButton, DeleteButton, ButtonGroup} from 'react-bootstrap-table';
import { Button, Icon, Reveal } from 'semantic-ui-react';
import {Redirect,Link,Route ,BrowserRouter as Router,Switch} from 'react-router-dom';
class Documents extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      datapost:[],
      numPages: null,
      pageNumber: 1,
    };
  }

  convertStringToDateFormat(string){
    var a = new Date(string);
    var day = a.getDate();
    var month = a.getMonth()+1;
    var year = a.getFullYear();
   
    

    var dateformat = day+'/'+month+'/'+year;
    console.log(dateformat);
    return dateformat;
  }
  componentDidMount(){
    axios.get("http://localhost:3001/api/documentfile")
        .then(res => {
          this.setState({ datapost: res.data});

         
          this.state.datapost.map(item => {
            var file = String(item.file);
        
            item.file = file.split("./uploads/")[1];
            
        
        item.date = this.convertStringToDateFormat(item.date);
        this.setState({datatableFormated: this.state.datapost})
          })
        });
  }
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


createCustomButtonGroup = props => {
  return (
    <ButtonGroup className='my-custom-class'>
      
      <button type="button" class="btn btn-primary btnEdit" onClick={this.seeDetail.bind(this)}><Icon name='edit outline' />Xem văn bản</button>
      </ButtonGroup>
  );
}
seeDetail() {
  var key = this.refs.table.state.selectedRowKeys[0];
  window.open("http://localhost:3001/uploads/" + key)
 

}
 
 

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  }
 
  render() {
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
        </div>
        
        <div className="clearfix"></div>
          <div>

            <BootstrapTable
              data={ this.state.datapost }
              pagination={ true } hover={ true } options={ options } selectRow={selectRowProp} ref='table'>
              <TableHeaderColumn dataField="_id"  hidden headerAlign='center'>ID</TableHeaderColumn>
              <TableHeaderColumn dataField='category' filter={ { type: 'TextFilter', delay: 0 } } width='150' headerAlign='center' dataAlign='center'>Danh mục</TableHeaderColumn>
              <TableHeaderColumn dataField='filename' filter={ { type: 'TextFilter', delay: 0 } } tdStyle={ { whiteSpace: 'normal' } } headerAlign='center'>Tiêu đề</TableHeaderColumn>
              <TableHeaderColumn dataField='file' isKey filter={ { type: 'TextFilter', delay: 0 } }  headerAlign='center' tdStyle={ { whiteSpace: 'normal' } }>Tên tài liệu</TableHeaderColumn>
              <TableHeaderColumn dataField='poster' filter={ { type: 'TextFilter', delay: 0 } } width='150' headerAlign='center'>Người đăng</TableHeaderColumn>
              <TableHeaderColumn dataField='date' filter={ { type: 'TextFilter', delay: 0 } } width='200' headerAlign='center'>Ngày đăng</TableHeaderColumn>
            </BootstrapTable>
          </div>
          <h3>Có {this.state.datapost.length} văn bản</h3>
        <div className="clearfix"></div>
        






      </div>
    </div>
    );
  }
}

export default Documents;
