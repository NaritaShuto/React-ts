import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import { Chat } from './index'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        "chats": {
            height: 400,
            padding: '0',
            overflow: 'auto'
        },
}))

type Props = {
    chats: {
        text: string
        type: string
    }[]

}

const Chats: React.FC<Props> = ({ chats }) => {
    const classes = useStyles();

    return (
      <List className={classes.chats} id={"scroll-area"}>
          {chats.map((chat, index) => {
              return <Chat text={chat.text} type={chat.type} key={index.toString()} />
          })}
      </List>
    );
};

export default Chats