import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import NoProfile from '../assets/img/no-profile.png';
import Dog from '../assets/img/dog.png';


type Props = {
    text: string
    type: string
}

const Chat: React.FC<Props> = ({ text, type }) => {
  const isQuestion = type === 'question'
  const classes = isQuestion ? 'p-chat__row' : 'p-chat__reverse'

  return (
      <ListItem className={classes}>
          <ListItemAvatar>
              {isQuestion ? (
                  <Avatar alt="Icon" src={Dog} />
              ) : (
                  <Avatar alt="Icon" src={NoProfile} />
              )}
              <Avatar alt="icon" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <div className="p-chat__bubble">{text}</div>
      </ListItem>
  )
}

export default Chat