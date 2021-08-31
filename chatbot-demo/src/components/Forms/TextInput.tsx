import React, { ChangeEvent, FC } from "react";
import TextField from "@material-ui/core/TextField";

type Props = {
  label: string;
  multiline: boolean;
  rows: number;
  value: string;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const TextInput: FC<Props> = ({
  label,
  multiline,
  rows,
  value,
  type,
  onChange,
}) => {
  // TODO: id属性が入ってるのはアウト。
  return (
    <TextField
      fullWidth
      label={label}
      margin="dense"
      multiline={multiline}
      rows={rows}
      value={value}
      type={type}
      onChange={onChange}
    />
  );
};

export default TextInput;
