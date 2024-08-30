import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import "./App.css";
import axios from "axios";
import { IoMdSend } from "react-icons/io";
import { RiRobot2Fill } from "react-icons/ri";
import Chatboats from "./Chatboats";

function App() {
  const [question, setQuestion] = useState("");
  const [answerdata, setAnswerdata] = useState([]);

  async function generateanswer(e) {
    e.preventDefault();
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDen3RKxvHLIPdfvTPNpYa_ts7FCEU5LNM",
      method: "post",
      data: { contents: [{ parts: [{ text: question }] }] },
    });
    const data = response.data;
    console.log(data);
    // console.log(data.candidates[0].content.parts[0].text);
    // setAnswer(data.candidates[0].content.parts[0].text);

    const questionAndAnswer = {
      question: question,
      answer: data.candidates[0].content.parts[0].text,
    };

    setAnswerdata([...answerdata, questionAndAnswer]);
    console.log(answerdata);
    setQuestion("");
  }

  return (
    <>
    <div>
    <Chatboats/>
    </div>

      {/* <div style={{display:"flex", justifyContent:"center", width:"100%"}}>
        <div className="container">
          <header>
            <h1>ChatBoat</h1>
          </header>
          <ul className="chatbox">
            <li className="chat question">
              <span>
                <RiRobot2Fill />
              </span>
              <p>hi hloo</p>
            </li>
            <li className="chat answer">
              <p>lorem ipsam....</p>
            </li>
          </ul>
          <div className="chat-input">
            <textarea
              name=""
              id=""
              placeholder="enter question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            ></textarea>
            <span>
              <IoMdSend />
            </span>
          </div>

          <div className="question">
            {answerdata?.map((item, index) => (
              <div key={index}>
                <h4>{item.question}</h4>
                <h6>{item.answer}</h6>
              </div>
            ))}
          </div>
          <button onClick={generateanswer}>chat</button>
        </div>
      </div> */}
    </>
  );
}

export default App;
