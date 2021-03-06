class Views extends React.Component {
  constructor(props) {
    super(props);
  }

  handleGroupExit() {
    var context = this;
    console.log('THIS', this);

    $(document).ready(function() {
      console.log('Attaching ajax to the button');
      $('.exit').click(function() {
        $.ajax({
          url: SERVER_IP + ':3000/test/groups/edit',
          method: 'POST',
          data: {
            groupID: context.props.groupid,
            owner: context.props.owner,
            username: getUsername()
          },
          success: function(data) {
            console.log('DATA', data);
            if (data === true) {
            //get rid of the modal
              context.props.owner ? deleteGroup.close() : leaveGroup.close();
            //TODO: reroute to home page?
              console.log('Server removed you from group');
              context.props.changeViewCb(null, 'home', null, null);
              // console.log($('.heading > a'));
              // $('.heading > a').click();
            } else {
            //get rid of the modal
              context.props.owner ? deleteGroup.close() : leaveGroup.close();
              console.log('Server couldn\'t edit groups!');
            } 
          }
        });
        return false;
      });
    });
  }

  componentDidUpdate() {
    console.log('Component did update!');
    if (this.props.viewType !== 'home') {
      console.log('Handling the group leave');
      $('.exit').off();
      this.handleGroupExit();
    }
  }

  render() {
    if (this.props.viewType === 'home') {
      return (
        <div className='container'>
          <Heading title={'Dashboard'} changeViewCb={this.props.changeViewCb} logoutCb={this.props.logoutCb}/>
          <MarkupPanel groupid={this.props.groupid} markups={[1, 2, 3, 4, 5, 6, 7, 8]} />
          <GroupPanel changeViewCb={this.props.changeViewCb} />
        </div>
      );
    } else {
    //make this the callback to a get request for the user's group data and pass it into the three panels
    // but what if someone makes a group named 'home' ???
      var leaveDelete = this.props.owner ? (<DeleteGroupButton owner={this.props.owner} groupid={this.props.groupid} />) : 
                                           (<LeaveGroupButton owner={this.props.owner} groupid={this.props.groupid} />);
      return (
        <div className='container'>
          <Heading title={this.props.viewType} changeViewCb={this.props.changeViewCb} logoutCb={this.props.logoutCb} />        
          <UserPanel owner={this.props.owner} groupid={this.props.groupid} />
          <div className='row'>
            <MarkupPanel groupid={this.props.groupid} markups={[1, 2]} />
            <SharedPanel groupid={this.props.groupid} sites={[1, 2, 3]} />
          </div>
          <div className='row'>
            {leaveDelete}
          </div>
        </div>
      ); 
    }
  }

}

window.Views = Views;
