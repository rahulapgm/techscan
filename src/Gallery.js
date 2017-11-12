import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';



class Gallery extends Component {
 constructor(props){
		super(props);
		this.state = {
      profileName:'',
      profileGitLink:'',
      profileAvatar:'',
      profileScore:''
		}
   console.log("data::>", this.props.jsonRes)
	}
  render(){
    return (
      <div className="profile">
      {
        this.props.jsonRes.items ?
          this.props.jsonRes.items.map( (profile, k) => {
          const avatar = profile.owner ? profile.owner.avatar_url : profile.avatar_url;
          return (         
            <div key={k} className="col-6 col-md-4" >
                <List>
                  <ListItem
                    style={{margin:"3%"}}
                    primaryText= {profile.full_name ? profile.full_name : profile.login}
                    leftAvatar={<Avatar src={avatar} />}
                    href={profile.html_url}
                    target="_blank"
                  />
                </List>
            </div>
    
          ) 
        }) : <div></div>
      } 

      </div>
    );
}
}
export default Gallery;