import React from "react";
import { useState, useEffect } from "react";
import {
  databases,
  Database_ID,
  Collection_ID_Messages,
} from "../appwriteConfiq";

import { ID, Query } from "appwrite";
import { Trash2 } from "react-feather";
const Room = () => {
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    getMessages();
  }, []);
  //------------------------------------------------------------------------------------
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   let payload = {
  //     data: {
  //       body: messageBody,
  //     },
  //   };
  //   let response;

  //   try {
  //     response = await databases.createDocument(
  //       Database_ID,
  //       Collection_ID_Messages,
  //       ID.unique(),
  //       payload
  //     );
  //     if (response.success) {
  //       setMessages((prev) => [...prev, response]);
  //       setMessageBody("");

  //       console.log("Message created successfully!");
  //     } else {
  //       console.error("Error creating message:", response.error);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const handleSubmit = (e) => {
    e.preventDefault();

    let payload = {
      data: {
        body: messageBody,
      },
    };

    databases
      .createDocument(
        Database_ID,
        Collection_ID_Messages,
        ID.unique(),
        payload.data
      )
      .then((response) => {
        if (response.success) {
          setMessages((prev) => [...prev, response]);
          setMessageBody("");
          console.log("Message created successfully!");
        } else {
          console.error("Error creating message:", response.error);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  //----------------------------------------------------------------------------------------
  const handleChange = (e) => {
    setMessageBody(e.target.value);
  };
  //-------------------------------------------------------------------------------------
  const getMessages = async () => {
    const response = await databases.listDocuments(
      Database_ID,
      Collection_ID_Messages,
      [Query.orderDesc("$createdAt"), Query.limit(10)]
    );

    // await response.then(
    //   function (response) {
    //     console.log("Response:", response);
    //     setMessages(() => response.documents);
    //   },
    //   function (error) {
    //     console.log(error);
    //   }
    // );

    console.log("Response:", response);
    setMessages(() => response.documents);
  };
  //-------------------------------------------------------
  const deleteMessage = async (message_id) => {
    databases.deleteDocument(Database_ID, Collection_ID_Messages, message_id);
    setMessages((prev) => prev.filter((message) => message.$id !== message_id));
  };

  //-----------------------------------------------------------------------------------------
  const fetchMessage = messages.map((message) => {
    return (
      <div key={message.$id} className="messages--wrapper">
        <div className="message--header">
          <small className="message-timestamp">
            {new Date(message.$createdAt).toLocaleString()}
          </small>

          <Trash2
            className="delete--btn"
            onClick={() => deleteMessage(message.$id)}
          />
        </div>
        <div className="message--body">
          <span>{message.body}</span>
        </div>
      </div>
    );
  });

  //-----------------------------------------------------------------------------------------
  return (
    <main className="container">
      <div className="room--container">
        <form action="" id="message--form" onSubmit={handleSubmit}>
          <div>
            <textarea
              required
              name=""
              maxLength={1000}
              placeholder="Say Something"
              value={messageBody}
              onChange={handleChange}
            />
          </div>
          <div className="send-btn--wrapper">
            <input type="Submit" value="Send" className="btn btn --secondary" />
          </div>
        </form>{" "}
        <div>{fetchMessage}</div>
      </div>
    </main>
  );
};

export default Room;
