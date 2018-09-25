import React, { Component } from 'react';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn, BootstrapButton, DeleteButton, ButtonGroup} from 'react-bootstrap-table';
 class ModifyAdmin extends Component {
    constructor(props) {
        super(props);
       /// dinh nghia cac ham khoi tao
       this.onAfterDeleteRow = this.onAfterDeleteRow.bind(this);
       

        //this.hidePassword = this.hidePassword.bind(this);
        this.state = {
         data:[],
         datapost: [],
         
 
        };
       
      }
      onAfterDeleteRow(rowKeys) {
        axios.delete(`https://tuoitrebachkhoa.herokuapp.com/api/admin/signup?_id=${rowKeys}`)
        .then(function(response) {
            alert('The rowkey you drop: ' + rowKeys);
        });
        
        
    }
    createCustomDeleteButton = (onClick) => {
        return (
          <DeleteButton
            btnText='Xóa admin'
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
    createCustomButtonGroup = props => {
        return (
          <ButtonGroup className='my-custom-class'>
            { props.deleteBtn }
            <button type="button" class="btn btn-primary btnEdit" onClick={this.onGrantAdmin.bind(this)}>gán quyền</button>
            <button type="button" class="btn btn-primary btnEdit" onClick={this.onCancelAdmin.bind(this)}>hủy quyền</button>
          </ButtonGroup>
        );
      }
       onGrantAdmin() {
        var key = this.refs.table.state.selectedRowKeys[0];
        axios.put(`https://tuoitrebachkhoa.herokuapp.com/api/admin/signup?_id=${key}&is_admin=${true}`)
        .then(res => {
          this.setState({ datapost: res.data});
        }); 
        
        
        
        
      }
       onCancelAdmin() {
        var key = this.refs.table.state.selectedRowKeys[0];
        axios.put(`https://tuoitrebachkhoa.herokuapp.com/api/admin/signup?_id=${key}&is_admin=${false}`)
        .then(res => {
          this.setState({ datapost: res.data});
          /*let i = res.data.filter(data => data.is_admin===false && data.display_name ===sessionStorage.getItem("display_name"))
           if(i>0){
            sessionStorage.removeItem("admin");
           }*/

        });
      }
    
      componentDidMount(){
        axios.get("https://tuoitrebachkhoa.herokuapp.com/api/admin/signup")
        .then(res => {
          this.setState({ datapost: res.data});
          
        }); 
    }
    componentWillReceiveProps(nextProps){
        axios.get("https://tuoitrebachkhoa.herokuapp.com/api/admin/signup")
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
            btnGroup: this.createCustomButtonGroup
            
        };
        const selectRowProp = {
            mode: 'radio',
            clickToSelect: true,
            showOnlySelected: true,
            width: '50px'
        };
          return (
           <div>
               <BootstrapTable
                        data={ this.state.datapost }
                        pagination={ true } 
                        hover={ true } 
                        onDeleteRow={this.onAfterDeleteRow} 
                        deleteRow={ true }
                        options={ options }
                        selectRow={selectRowProp} ref='table'
                        >
                        
                        <TableHeaderColumn dataField="_id" hidden isKey headerAlign='center'>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='display_name'  filter={ { type: 'TextFilter', delay: 0  } } headerAlign='center'>Tên hiển thị</TableHeaderColumn>
                        <TableHeaderColumn dataField='phone' filter={ { type: 'TextFilter', delay: 0 } } headerAlign='center' dataAlign='center'>Số điện thoại</TableHeaderColumn>
                        <TableHeaderColumn dataField='email' filter={ { type: 'TextFilter', delay: 0 } } headerAlign='center' dataAlign='center'>Email</TableHeaderColumn>
                        <TableHeaderColumn dataField='is_admin' headerAlign='center' dataAlign='center'>Quyền Admin</TableHeaderColumn>
                </BootstrapTable>
           </div>
          );
      }
}

export default ModifyAdmin;