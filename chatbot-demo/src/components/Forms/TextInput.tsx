import React from 'react';
import TextField from '@material-ui/core/TextField';
import { PinDropSharp } from '@material-ui/icons';

type Props = {
    content: string
}

const TextInput: React.FC<Props> = ({ content }) => {
    return (
        <TextField
            fullwidth={true}
            label={props.label}
            margin={"dense"}
            multiline={props.multiline}
            rows={props.rows}
            value={props.value}
            type={PinDropSharp.type}
            onChange={PinDropSharp.onChange}
        />
    )
}

export default TextInput