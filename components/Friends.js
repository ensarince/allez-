import React,{useEffect, useState} from 'react'
import { UserGroupIcon } from '@heroicons/react/outline'
import { faker } from '@faker-js/faker'


function Friends() {

  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const suggestions = [...Array(30)].map((_, i) => ({
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
      worksAt: faker.company.name(),
    }));
    setSuggestions(suggestions);
  }, []);
  
  return (
    <div className='bg-green1 rounded-sm  p-5 my-4 overflow-y-scroll h-1/2 scrollbar-thin scrollbar-thumb-green3'>
      <div className='flex space-x-2 justify-center'>
        <h1 className='text-md lg:text-xl text-green3'>Friends</h1>
        <UserGroupIcon  className="h-8 cursor-pointer"/>
      </div>

      <div className='p-2'>
        <div className='flex flex-col'>
              
        {suggestions.map(suggestion => (
          <div key={suggestion.userId} className="flex items-center justify-between mt-3">
              <img className='w-10 h-10 rounded-full border p-1' src={suggestion.avatar} alt="" />
              <div className='flex-1 ml-4'>
                  <h2 className='font-semibold text-sm'>{suggestion.username}</h2>
                  <h3 className='text-xs text-gray-400'>Climbed <span className='font-bold text-gray-500'>{suggestion.worksAt}</span></h3>
              </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default Friends