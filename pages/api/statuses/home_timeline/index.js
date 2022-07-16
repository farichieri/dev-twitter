const timeline = [
  {
    id: "0",
    avatar: "avatar",
    username: "username",
    message: "message",
  },
  {
    id: "1",
    avatar: "avatar2",
    username: "username2",
    message: "message2",
  },
  {
    id: "2",
    avatar: "avatar3",
    username: "username3",
    message: "message3",
  },
];

export default (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(timeline));
};
