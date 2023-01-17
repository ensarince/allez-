import React, { useEffect } from 'react'
import ChatInput from './ChatInput'
import MessageList from './MessageList'

 function Inbox({session}) {

  let messages;
    
    useEffect(() => {
      async function fetchMessages() {
        // You can await here
         messages = await fetch(`${process.env.VERCEL_URL || "http://localhost:3000/"}/api/getMessages`).then(
          (res) => res.json()
        );
      }
      fetchMessages();
    }, []); // Or [] if effect doesn't need props or state
  
  return (
    <div class="w-fit h-full  md:h-4/6 flex justify-center md:w-96 mx-auto text-gray-700 rounded  overflow-y-scroll scrollbar scrollbar-thumb-green2 ">
      <>
        <MessageList initialMessages = {messages} />
        <ChatInput session={session} />
      </>
</div>
  )
}

export default Inbox