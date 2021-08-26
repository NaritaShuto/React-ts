import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

type Props = {
    content: string
    nextId: string
    select: (
        selectedAnswer: string, 
        nextQuestionId: string
    ) => void
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

const Answer: React.FC<Props> = ({ content, nextId, select }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const classes = useStyles();
    return(
        <Button variant="contained" color="primary" onClick={() => select(content, nextId)}>
            {content}
        </Button>
    )
}

export default Answer