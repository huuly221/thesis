import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn, BootstrapButton} from 'react-bootstrap-table';
import axios from 'axios';

export default class ListDataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datapost: []
        }
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
    componentDidMount(){
        axios.get("https://tuoitrebachkhoa.herokuapp.com/api/eventdetail")
        .then(res => {
          this.setState({ datapost: res.data});
          
        });
    }
    getSelectedRowKeys() {
        //Here is your answer
        
        console.log("o day", this.refs.table.state.data)
      }
    render(){
        
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
        
        };
        const selectRowProp = {
            mode: "checkbox",
            clickToSelect: true
          };
        return(
            <div>
                <button onClick={this.getSelectedRowKeys.bind(this)}>Get selected row keys</button>
                <BootstrapTable
                    data={ this.state.datapost }
                    pagination={ true } hover={ true } options={ options } selectRow={selectRowProp} ref='table'>
                    <TableHeaderColumn dataField="_id" hidden isKey>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="action" dataFormat={this.buttonFormatter.bind(this)}>Chỉnh sửa</TableHeaderColumn>
                    <TableHeaderColumn dataField='title'  filter={ { type: 'TextFilter'} }>Tiêu đề</TableHeaderColumn>
                    <TableHeaderColumn dataField='category' filter={ { type: 'TextFilter' } }>Danh mục</TableHeaderColumn>
                    <TableHeaderColumn dataField='poster'>Người viết</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}