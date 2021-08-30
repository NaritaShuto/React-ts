import React, { FC, ChangeEvent, useCallback, useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextInput from './TextInput'

type Props = {
    open: boolean
    handleClose: () => void
}

const FormDialog: FC<Props> = ({ open, handleClose }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [description, setDescription] = useState('')

    const inputName = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value)
        },
        [setName]
    )

    const inputEmail = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value)
        },
        [setEmail]
    )

    const inputDescription = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setDescription(event.target.value)
        },
        [setDescription]
    )
    
    const submitForm = () => {
        const payload = {
            text:
                `問い合わせ有ったよ！\n` +
                `お名前：${name}\n` +
                `Email：${email}\n` +
                `お問い合わせ内容\n${description}`,
        }

        // const url =
        //     'https://hooks.slack.com/services/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'

        // fetch(url, {
        //     method: 'POST',
        //     body: JSON.stringify(payload),
        // }).then(() => {
        //     alert('後で連絡するから楽しみに待っててね')

        //     // 初期化しておく
        //     setName('')
        //     setEmail('')
        //     setDescription('')

        //     // モーダルを閉じておく
        //     return handleClose()
        // })
    }

    return(
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">お問い合わせ</DialogTitle>
        <DialogContent>
            <TextInput 
                label={"お名前（必須）"} multiline={false} rows={1}
                value={name} type={"text"} onChange={inputName}
            />
            <TextInput 
                label={"メールアドレス（必須）"} multiline={false} rows={1}
                value={email} type={"email"} onChange={inputEmail}
            />
            <TextInput 
                label={"お問い合わせ内容（必須）"} multiline={true} rows={5}
                value={description} type={"text"} onChange={inputDescription}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
          <Button onClick={submitForm} color="primary" autoFocus>
            送信
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default FormDialog