import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { PinDropSharp } from '@material-ui/icons';

type Props = {
    content: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        borderColor: '#FFB549',
        color: '#FFB549',
        fontWeight: 600,
        marginBottom: '8px',
        "&:hover": {
            backgroundColor: '#FFB549',
            color: '#fff'
        }
    },
}));

const Answer: React.FC<Props> = ({ content }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const classes = useStyles();
    return(
        <Button variant="contained" color="primary" onClick={() => props.select(props.content, props.nextId)}>
            {content}
        </Button>
    )
}

export default Answer