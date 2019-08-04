import React from 'react'
import '@progress/kendo-theme-default/dist/all.css'
import { formatDate,formatTime} from '../Helper';
class Contacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pax: '',
            date: '',
            time: ''
        };
    }
      
        render() {
        return (
            <div className="ui raised very padded text container segment">
                <h2 className="ui header">
                    <div className="col-sm-5">
                                <h1 className="mb-5">{this.props.params.name}</h1>
                                <h2 className="ui small label">{this.props.params.address}</h2>
                     </div>
                    <div className="col-sm-12">
                        <h1 className="mb-5">{this.state.name}</h1><h3>Reservation for {formatDate( new Date(this.props.params.date.id))} at {formatTime(this.props.params.selectTimeSlot)} for {this.props.params.pax}</h3>
                        <h2 className="ui small label">{this.state.address}</h2>
                    </div>
                </h2>
                
                <div className="ui form">
                        <div className="two fields">
                            <div className="field">
                            <input placeholder="First Name" type="text"/>
                            </div>
                            <div className="field">
                            <input placeholder="Last Name" type="text"/>
                            </div>
                        </div>
                        <div className="two fields">
                            <div className="field">
                            <input placeholder="Phone No" type="text"/>
                            </div>
                            <div className="field">
                            <input placeholder="Email" type="text"/>
                            </div>
                        </div>
                        <div className="field">
                            <input placeholder="Special Request" type="text"/>
                        </div>
                        By continuing, you agree to Eat’s Terms of Service and Privacy Policy.
                        <button className="ui green button">Complete ReserVation</button>
                </div>
            </div>
        );
        }
}

export default Contacts;