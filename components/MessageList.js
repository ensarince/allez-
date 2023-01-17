import useSWR from 'swr'
import fetcher from '../utils/fetchMessages';
import MessageComponent from './MessageComponent';
import { useEffect } from 'react';
import { clientPusher } from '../pusher';


function MessageList({initialMessages}) {
  
  const {data: messages, error, mutate} = useSWR("/api/getMessages", fetcher)
  
  //fetch messages from pusher(websocket app)
  useEffect(() => {
    const channel = clientPusher.subscribe('messages')

    channel.bind('new-message', async(data) => {
      //if you send the message, dont update the cache
      if(messages?.find((message) => message.id === data.id)) return;
      //!see yourself that sender doesnt get the message
      console.log("-- NEW MESSAGE FROM PUSHER: ", data)

      if(!messages) {
        mutate(fetcher);
      }else{
        mutate(fetcher, {
          optimisticData: [data, ...messages],
          rollbackOnError: true
        })
      }
    })
    //close the operations running
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages, mutate, clientPusher])

  

  return (
    <div className='space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto'>
      {(messages || initialMessages)?.map(message => (
          <MessageComponent message={message} key={message.id}/>
      ))}

    </div>
  )
}

export default MessageList

