import React, { Component } from 'react';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn, BootstrapButton, DeleteButton, ButtonGroup,ExportCSVButton,InsertButton } from 'react-bootstrap-table';
import {  Link} from "react-router-dom";
 class ModifyAdmin extends Component {
    constructor(props) {
        super(props);
       /// dinh nghia cac ham khoi tao
       this.onAfterDeleteRow = this.onAfterDeleteRow.bind(this);
       this.handleInsertedRow = this.handleInsertedRow.bind(this);
       

        //this.hidePassword = this.hidePassword.bind(this);
        this.state = {
         data:[],
         datapost: [],
         set: props.match.params.Id ////code event pass from manager.js(select event and pass code event)
         
 
        };
       
      }
      onAfterDeleteRow(rowKeys) {
        axios.delete(`https://tuoitrebachkhoa.herokuapp.com/api/eventsuser?_id=${rowKeys}`)
        .then(function(response) {
            alert('The rowkey you drop: ' + rowKeys);
        });
 
      }
      handleInsertedRow(row){
        console.log(row)
        this.state.thisevent.full_name = row.full_name;
        this.state.thisevent.mssv = row.mssv;
        this.state.thisevent.phone = row.phone;
        this.state.thisevent.email = row.email;

        axios.post("https://tuoitrebachkhoa.herokuapp.com/api/eventsuser",this.state.thisevent)
        .catch(err => {
          console.error(err);
        });
 
      }
    
    createCustomDeleteButton = (onClick) => {
        return (
          <DeleteButton
            btnText='Xóa đăng kí'
            btnContextual='btn-danger'
            className='btnEdit'
            
            />
        );
        
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
    createCustomInsertButton = (onClick) => {
      return (
        <InsertButton
          btnText='Thêm đăng kí'
          btnContextual='btn-warning'
          className='btnEdit'
          btnGlyphicon='glyphicon-edit'
          
          />
      );
    }
    createCustomButtonGroup = props => {
        return (
          <ButtonGroup className='my-custom-class'>
            
            { props.deleteBtn }
            {props.exportCSVBtn}
            { props.insertBtn }
            
          </ButtonGroup>
        );
      }
       
    
      componentDidMount(){
        axios.get(`https://tuoitrebachkhoa.herokuapp.com/api/eventsuser?code=${this.state.set}`)
        .then(res => {
          console.log(!Array.isArray(res.data))
          if(!Array.isArray(res.data)){     
              ////if  data from listevent
            this.setState({thisevent:
              {
              title:res.data.title,
              code_event:res.data._id,
              startDate:res.data.startdate,
              endDate :res.data.enddate
             }});
            this.setState({nameevent: res.data.title});
          }
          else{                                    ////if  data from   user event
            this.setState({thisevent:
              {
              title:res.data[0].title,
              code_event:res.data[0].code_event,
              startDate:res.data[0].startDate,
              endDate :res.data[0].endDate
             }})
            this.setState({ datapost: res.data});
            this.setState({nameevent: res.data[0].title});
          }
          
          
        }); 
    }
    componentWillReceiveProps(nextProps){
        axios.get(`https://tuoitrebachkhoa.herokuapp.com/api/eventsuser?code=${this.state.set}`)
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
            deleteBtn: this.createCustomDeleteButton,
            afterDeleteRow: this.onAfterDeleteRow, /// delete row
            exportCSVBtn: this.createCustomExportCSVButton,
            insertBtn: this.createCustomInsertButton,
            afterInsertRow: this.handleInsertedRow,
            btnGroup: this.createCustomButtonGroup
            
            
        };
        const selectRowProp = {
            mode: 'radio',
            clickToSelect: true,
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
                        <a>Quản lí sự kiện</a>
                    </header>
                    </Link>

                    <div className="clearfix"></div>
                    <div className ="form-for-insert">
            <div className="clearfix"> 
            <h1>Danh sách đăng kí sự kiện : {this.state.nameevent}</h1>
            </div>
            <div>
               <BootstrapTable
                        data={ this.state.datapost }
                        pagination={ true } 
                        hover={ true } 
                        onDeleteRow={this.onAfterDeleteRow}
                        onDeleteRow = {this.handleInsertedRow }
                        deleteRow={ true }
                        options={ options } 
                        selectRow={selectRowProp} 
                        exportCSV 
                        insertRow
                        
                        ref='table'
                        >
                        
                        
                        <TableHeaderColumn dataField='full_name'  filter={ { type: 'TextFilter', delay: 0  } } headerAlign='center'>Họ và tên</TableHeaderColumn>
                        <TableHeaderColumn dataField='mssv' isKey filter={ { type: 'TextFilter', delay: 0 } } headerAlign='center' dataAlign='center'>MSSV</TableHeaderColumn>
                        <TableHeaderColumn dataField='email' filter={ { type: 'TextFilter', delay: 0 } } headerAlign='center' dataAlign='center'>Email</TableHeaderColumn>
                        <TableHeaderColumn dataField='phone' filter={ { type: 'TextFilter', delay: 0 } } headerAlign='center' dataAlign='center'>Số điện thoại</TableHeaderColumn>
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