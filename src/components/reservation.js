import React from 'react'
import '@progress/kendo-theme-default/dist/all.css'
import { DropDownList } from '@progress/kendo-react-dropdowns';
import Contacts from './Contact';
import { formatDate} from '../Helper';
const baseUrl ="https://api.sandbox.eatapp.co/public/v2/restaurants/14bf9273-64f3-4b39-875b-a616fc83f453";
class ReserVation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pax: '',
            date: '',
            time: '',
            availability: [],
            name:'',
            address:'',
            allotedslots:[],
            availableDate:[],
            showAvailabilty:false,
            selectTimeSlot:''

        };
    }
    steps = {
        hour: 1,
        minute: 15,
        second: 30
    };
    datesAvailable=[];
    dateAvailableShow=[];
    timeslotsAvailable=[];
    allowedPeople=[];

    componentDidMount() {
        fetch(baseUrl, {
            method: 'GET',
            headers: {
                Accept: "application/json"
            },
        }).then((response) => response.json())
        
            .then((data) => 
            {
                var maxpeopleAllowed=[];
                this.setState({name: data.data.attributes.name})
                this.setState({address: data.data.attributes.address_line_1})
                var length=Object.keys(data.data.attributes.openings).length;
                for(var i=0;i<length;i++)
                {
                    let obj={};
                    obj.id=(Object.keys(data.data.attributes.openings)[i]);
                    obj.text=formatDate( new Date((Object.keys(data.data.attributes.openings)[i])))
                    this.datesAvailable.push(obj)
                }
               
                 this.timeslotsAvailable=(Object.keys(data.data.attributes.openings)[this.datesAvailable[1].id])
             
                 this.timeslotsAvailable=Object.values(data.data.attributes.openings)[1];

                 for (var j=1;j<=50;j++)
                 {
                    maxpeopleAllowed.push(j+ " People");
                 }
                 this.allowedPeople=maxpeopleAllowed;
                 console.log(this.datesAvailable);
            })
            .catch(
                (error) => console.log(error)
            );
    }

    handleSearchAvailibility = (e) => {
        fetch(baseUrl, {
            method: 'GET',
            headers: {
                Accept: "application/json"
            },
        }).then((response) => response.json())
        
            .then((data) => 
            {
                
                this.setState({availability: data.data.attributes.openings})
                var requestedDate=this.state.date
                var availableslots=[]
                var requestedStartTime=this.state.time
                availableslots= this.state.availability[requestedDate.id]
                var count=0;
                var startIndex=0;
                for (var i = 0; i < availableslots.length; i++) {
                    if (availableslots[i]===requestedStartTime)
                    {
                        startIndex=i;
                    }
                
                }
                var allotedtop5slots=[];
                for (var p=startIndex;p<availableslots.length;p++)
                {
                        if (count<5)
                        {
                        //console.log(availableslots[p]);
                        allotedtop5slots.push(availableslots[p]);
                        count++;
                        }
                }
            
               
                    for(var j=0;j<5;j++){
                        if(count < 5){
                        allotedtop5slots.push("Unavailable");
                        count++;
                        }
                    }
                
    
                this.setState({allotedslots:allotedtop5slots});
                this.setState({showAvailabilty:true});
            
            
            
            
            
            })
            .catch(
                (error) => console.log(error)
            );


    }

    render() {
        return (
            <div>
            <form>
            <div className="ui raised very padded text container segment"style={{ display: (this.state.selectTimeSlot=='' ? 'block' : 'none') }}>

                    <h2 className="ui header">
                        
                    <div className="col-sm-5">
                        <h1 className="mb-5">{this.state.name}</h1>
                        <h2 className="ui small label">{this.state.address}</h2>
                    </div>
                        </h2>
                    <div className="ui action input">                
                        <DropDownList data={this.allowedPeople} value={this.state.pax} defaultItem="2 People"
                                onChange={(e)=> this.setState({pax: e.target.value})}/>
                        <DropDownList data={this.datesAvailable} value={this.state.date} textField="text"  dataItemKey="id"
                                onChange={(e)=> this.setState({date: e.target.value})}/>
                        <DropDownList data={this.timeslotsAvailable} value={this.state.time}
                                onChange={(e)=> this.setState({time: e.target.value})}/>
                        <div className="ui green button" onClick={this.handleSearchAvailibility}>Search</div>
                    </div>
            </div>
            <div className="ui raised very padded text container segment" style={{ display: (this.state.showAvailabilty && this.state.selectTimeSlot=='' ? 'block' : 'none') }} >
                <div className="time-slots confirmation" >
                    <h4>Available openings, please select a time to reserve:</h4>
                    { this.state.allotedslots.map(item=>(
                            <div key={item} onClick={()=>this.setState({selectTimeSlot:item})} className={` ${item==='Unavailable' ? 'ui grey button' : 'ui green button'}`} data-time={item}>{item}</div>
                    ))}
                        
                    
                </div>
            </div>
          
            {(this.state.selectTimeSlot !== ''&& this.state.selectTimeSlot !== 'Unavailable') && <Contacts params={this.state}/>}
            </form>
            </div>
        );
    }
}

export default ReserVation;