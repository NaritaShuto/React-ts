import React from 'react';
import defaultDataset from './dataset';
import './assets/styles/index.css';
import {AnswersList, Chats} from './components/index';

type Props = {}
type State = {
  answers: {
    content: string
    nextId: string
  }[]
  chats: {
    text: string
    type: string
  }[]
  currentId: string
  dataset: typeof defaultDataset
  open: boolean
}

class App extends React.Component<Props, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      answers: [],
      chats: [],
      currentId: 'init',
      dataset: defaultDataset,
      open: true
    }
    this.selectAnswer = this.selectAnswer.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  displayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats
    chats.push({
      text: this.state.dataset[nextQuestionId].question,
      type: 'question'
    })

    this.setState({
      answers: this.state.dataset[nextQuestionId].answers,
      chats: chats,
      currentId: nextQuestionId
    })
  }

  selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch(true) {
      case(nextQuestionId === 'init'):
        setTimeout(() => this.displayNextQuestion(nextQuestionId), 500);
        break;

      case(nextQuestionId === 'content'):
        this.handleClickOpen()
        break;

      case(/^https:*/.test(nextQuestionId)):
        const a = document.createElement('a');
        a.href = nextQuestionId;
        a.target = '_blank';
        a.click();
        break;
      
      default:
        const chat = {
          text: selectedAnswer,
          type: 'answer'
        }

        const chats = this.state.chats;
        chats.push(chat)

        this.setState({
          chats: chats
        })

        setTimeout(() => this.displayNextQuestion(nextQuestionId), 500);
        break;
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  componentDidMount() {
    const initAnswer = "";
    this.selectAnswer(initAnswer, this.state.currentId)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const scrollArea = document.getElementById('scroll-area')
    if(scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  }
  
  render() {
    return (
      <section className="c-section">
        <div className="c-box">
          {/* {this.state.currentId} */}
          <Chats chats={this.state.chats} />
          <AnswersList
            answers={this.state.answers}
            select={this.selectAnswer}
          />
          <FromDialog open={this.state.open} handleClose={this.handleClose} />
        </div>
      </section>
    )
  }
}

export default App