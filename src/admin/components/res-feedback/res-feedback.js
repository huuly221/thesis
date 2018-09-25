import React, { Component } from 'react';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn, BootstrapButton, DeleteButton, ButtonGroup,ExportCSVButton,InsertButton } from 'react-bootstrap-table';
import {  Link} from "react-router-dom";
 class ModifyAdmin extends Component {
    constructor(props) {
        super(props);
       /// dinh nghia cac ham khoi tao
       
       

        //this.hidePassword = this.hidePassword.bind(this);
        this.state = {
         data:[],
         datapost: [],
         set: props.match.params.Id ////code event pass from manager.js(select event and pass code event)
         
 
        };
       
      }
     
       
      renderShowsTotal(start, to, total) {
        return (
          <p style={ { color: 'blue' } }>
            Kết quả từ { start } đến { to }, trên tổng số { total }
          </p>
        );
    }
    createCustomExportCSVButton = (onClick) => {
        return (
          <ExportCSVButton btnText='Xuất file'  className='btnEdit'/>
        );
      }
      createCustomButtonGroup = props => {
        return (
          <ButtonGroup className='my-custom-class'>
            
            
            {props.exportCSVBtn}
           
            
          </ButtonGroup>
        );
      }
      componentDidMount(){
        axios.get(`http://localhost:3001/api/feedback`)
        .then(res => {
          this.setState({ datapost: res.data});
          this.setState({number: res.data.length})
        });  
    }
    componentWillReceiveProps(nextProps){
        axios.get(`http://localhost:3001/api/feedback`)
        .then(res => {
          this.setState({ datapost: res.data});
          
        });  
    }
    
       
       //ham submit to hop du lieu gui len ham xu li
    
      // ham xu li du lieu chuyen len serve
     
      
      
  
       
      
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
            exportCSVBtn: this.createCustomExportCSVButton,
            btnGroup: this.createCustomButtonGroup
            
            
        };
        const selectRowProp = {
            mode: 'radio',
            clickToSelect: false,
            showOnlySelected: true,
            width: '50px'
        };
        
          return (
            <div className="documents-wrap">
                
            <div className="clearfix-page"></div>
            <div className="container background-white"> 
                <div className="clearfix"></div>                   
                <div className="document-wrap-content">
                <Link to={{pathname: `/Admin-panel/event-manager`}}>
                    <header className="panel-heading hvr-fade1 cover-heading">
                        <a>Phản hồi </a>
                    </header>
                    </Link>

                    <div className="clearfix"></div>
                    <div className ="form-for-insert">
            <div className="clearfix"> 
            <h1>Số lượng phản hồi: {this.state.number} phản hồi</h1>
            </div>
            <div>
               <BootstrapTable
                        data={ this.state.datapost }
                        pagination={ true } 
                        hover={ true } 
                        options={ options } 
                        exportCSV 
                        ref='table'
                        >
                        
                        
                        <TableHeaderColumn dataField='name'  filter={ { type: 'TextFilter', delay: 0  } } headerAlign='center'>Tên</TableHeaderColumn>
                        <TableHeaderColumn dataField='email' isKey filter={ { type: 'TextFilter', delay: 0 } } headerAlign='center' dataAlign='center'>Email</TableHeaderColumn>
                        <TableHeaderColumn dataField='subject' filter={ { type: 'TextFilter', delay: 0 } } headerAlign='center' dataAlign='center'>Chủ đề</TableHeaderColumn>
                        <TableHeaderColumn dataField='content' filter={ { type: 'TextFilter', delay: 0 } } headerAlign='center' dataAlign='center'>Nội dung phản hồi</TableHeaderColumn>
                        <TableHeaderColumn dataField='createdAt' filter={ { type: 'TextFilter', delay: 0 } } headerAlign='center' dataAlign='center'>Ngày gửi</TableHeaderColumn>
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

export default ModifyAdmin;