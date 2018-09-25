import React, { Component } from 'react';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn, BootstrapButton, DeleteButton, ButtonGroup} from 'react-bootstrap-table';
import {Redirect,Link,Route ,BrowserRouter as Router,Switch} from 'react-router-dom';
 class ModifyAdmin extends Component {
    constructor(props) {
        super(props);
       /// dinh nghia cac ham khoi tao
    
       

        //this.hidePassword = this.hidePassword.bind(this);
        this.state = {
         data:[],
         datapost: [],
         
 
        };
       
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
            
            <button type="button" class="btn btn-primary btnEdit" onClick={this.seeDetail.bind(this)}>Xem chi tiết</button>
            </ButtonGroup>
        );
      }
      seeDetail() {
        var key = this.refs.table.state.selectedRowKeys[0];
        this.setState({see:true});
        this.setState({code:key});
      }
       
    
      componentDidMount(){
        axios.get("https://tuoitrebachkhoa.herokuapp.com/api/eventdetail")
        .then(res => {
          this.setState({ datapost: res.data});
          
        }); 
    }
    componentWillReceiveProps(nextProps){
        axios.get("https://tuoitrebachkhoa.herokuapp.com/api/eventdetail")
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
            btnGroup: this.createCustomButtonGroup
            
        };
        const selectRowProp = {
            mode: 'radio',
            clickToSelect: true,
            showOnlySelected: true,
            width: '50px'
        };
          return (
              this.state.see?<Redirect to={{pathname: `/Admin-panel/event-manager/${this.state.code}`}} /> : 
            <div className="documents-wrap">
                
            <div className="clearfix-page"></div>
            <div className="container background-white"> 
                <div className="clearfix"></div>                   
                <div className="document-wrap-content">
                    <header className="panel-heading hvr-fade1 cover-heading">
                        <a>Quản lí sự kiện</a>
                    </header>

                    <div className="clearfix"></div>
                    <div className ="form-for-insert">
            <div className="clearfix"></div>
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
                        <TableHeaderColumn dataField='title'  filter={ { type: 'TextFilter', delay: 0  } } headerAlign='center'>Sự kiện</TableHeaderColumn>
                        <TableHeaderColumn dataField='startdate' filter={ { type: 'TextFilter', delay: 0 } } headerAlign='center' dataAlign='center'>Bắt đầu</TableHeaderColumn>
                        <TableHeaderColumn dataField='enddate' filter={ { type: 'TextFilter', delay: 0 } } headerAlign='center' dataAlign='center'>Kết thúc</TableHeaderColumn>
                        
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