import React, { Component } from 'react';
export default  class Wrong extends Component {
    constructor(props) {
        super(props);

      }
      render() {
          return (
            
            /// form
              <div className="limiter">
              <div className="container-login100">
                <div >
                <p style={{'color':'red'}} >
                {sessionStorage.getItem("checklogin")} 
               </p>
                  
                </div>
              </div>
            </div>
          );
      }
}
