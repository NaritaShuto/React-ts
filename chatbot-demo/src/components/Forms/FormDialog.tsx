import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextInput from './TextInput';

type Props = {}
type State = {}

class FromDialog extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state ={
            name: "",
            emaile: "",
            description: ""
        }

        this.inputName = this.inputName.bind(this)
        this.inputEmail = this.inputEmail.bind(this)
        this.inputDescroption = this.inputDescroption.bind(this)
    }

    inputName = (event) => {
        this.setState({ name: event.target.value })
    }

    inputEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    inputDescroption = (event) => {
        this.setState({ descroption: event.target.value })
    }
    submit = () => {
        const name = this.state.name
        const email = this.state.email
        const description = this.state.description
    }

    render() {
        return(
            <Dialog
            open={this.props.open}
            onClose={this.props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">お問い合わせ</DialogTitle>
            <DialogContent>
                <TextInput 
                    label={"お名前（必須）"} multiline={false} rows={1}
                    value={this.state.name} type={"text"} onChange={this.inputName}
                />
                <TextInput 
                    label={"メールアドレス（必須）"} multiline={false} rows={1}
                    value={this.state.email} type={"email"} onChange={this.inputEmail}
                />
                <TextInput 
                    label={"お問い合わせ内容（必須）"} multiline={true} rows={5}
                    value={this.state.description} type={"text"} onChange={this.inputDescroption}
                />
              <DialogContentText id="alert-dialog-description">
                Let Google help apps determine location. This means sending anonymous location data to
                Google, even when no apps are running.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.handleClose} color="primary">
                キャンセル
              </Button>
              <Button onClick={this.submitForm} color="primary" autoFocus>
                送信
              </Button>
            </DialogActions>
          </Dialog>
        )
    }
}

export default FromDialog