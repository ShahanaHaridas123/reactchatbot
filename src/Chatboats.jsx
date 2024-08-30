import React, { useEffect, useRef, useState } from "react";
import "./chatboat.css";
import { IoLogoOctocat } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import catgif from "./assets/catgif.gif"
import axios from "axios";

export default function Chatboats() {
  const [question, setQuestion] = useState("");
  const [answerdata, setAnswerdata] = useState([]);
  const bottomRef = useRef(null);

  console.log(bottomRef);
  
  useEffect(() => {
    // Step 2: Scroll to the bottom when messages change
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [question]);

  async function generateanswer(e) {
    e.preventDefault();
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDen3RKxvHLIPdfvTPNpYa_ts7FCEU5LNM",
      method: "post",
      data: { contents: [{ parts: [{ text: question }] }] },
    });
    const data = response.data;
    console.log(data);
    

    const questionAndAnswer = {
      question: question,
      answer: data.candidates[0].content.parts[0].text,
    };

    setAnswerdata([...answerdata, questionAndAnswer]);
    console.log(answerdata);
    setQuestion("");
  }
  return (
    <div
      className="d-flex justify-content-center main-div "
      style={{ overflowX: "hidden" }}
    >
      <div className="main">
        <header>
          <img src={catgif} alt=""/>
          <div>
            <h2 className="m-0">Meow</h2>
            <h6 className="text-start text-white fw-lighter">bot</h6>
          </div>
        </header>
        <div style={{ height: "75%", overflowY: "scroll" }}>
          {answerdata.length > 0 ? (
            answerdata.map((item, index) => (
              <div key={index}>
                <div ref={bottomRef} />
                <div className="question">
                  <span>
                    <IoLogoOctocat />
                  </span>
                  <p>{item.question}</p>
                </div>
                <div className=" d-flex justify-content-end w-100">
                  <div className="answer">
                    <p className="text-end w-100">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="question">
              <span>
                <IoLogoOctocat />
              </span>
              <p>Hi how can i help you?</p>
            </div>
          )}
        </div>
        <div
          className="d-flex justify-content-center align-items-center w-100"
          style={{ height: "12%" }}
        >
          <div className="ask-question">
            <form action="" onSubmit={generateanswer}>
              <input
                type="text"
                placeholder="ask your question?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <button type="submit">
                <span>
                  <IoSend />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
