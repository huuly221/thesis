import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
 
export default class DocumentDownload extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          
          numPages: null,
            pageNumber: 1,
            set: props.match.params.Filedownload
        };
      }
 
      componentDidMount(){
          this.setState({set: this.props.match.params.Filedownload});
      }
  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  }
 
  render() {
    const { pageNumber, numPages } = this.state;
    
    return (
      <div>
        <Document
        file={{ url: 'http://localhost:3001/uploads/Document-1-3.pdf', httpHeaders: { 'X-CustomHeader': '40359820958024350238508234' }, withCredentials: true }}
          //file={"http://localhost:3001/uploads/Document-1-3.pdf"}
          onLoadSuccess={this.onDocumentLoad}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    );
  }
}