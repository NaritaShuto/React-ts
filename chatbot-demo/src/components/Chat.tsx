import React from "react";
import ListItem from "@material-ui/core/ListItem";
// import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// import Avatar from "@material-ui/core/Avatar";
// import NoProfile from '../assets/img/775c7c6a-a699-4156-a8bf-cc16b90ed66c_LI.jpg'
// import Dog from '../assets/img/775c7c6a-a699-4156-a8bf-cc16b90ed66c_LI (2).jpg'

type Props = {
  text: string;
  // 型をUnionで厳密にする。
  type: "question" | "answer";
};

const Chat: React.FC<Props> = ({ text, type }) => {
  // const isQuestion = type === 'question'
  // const classes = isQuestion ? 'p-chat__row' : 'p-chat__reverse'

  // 型を厳密にしたことで、定義も簡単になる。仮にtypeに別なものが増えた場合、型エラーが起きるところも良い。
  // 試しに、typeに'others'を追加してみると良い。
  const classes = {
    question: "p-chat__row",
    answer: "p-chat__reverse",
  }[type];

  return (
    <ListItem className={classes}>
      {/* <ListItemAvatar>
                {isQuestion ? (
                    <Avatar alt="Icon" src={Dog} />
                ) : (
                    <Avatar alt="Icon" src={NoProfile} />
                )}
            </ListItemAvatar> */}
      <div className="p-chat__bubble">{text}</div>
    </ListItem>
  );
};

export default Chat;
