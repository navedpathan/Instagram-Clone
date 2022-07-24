import faker from '@faker-js/faker';
import { useEffect, useState } from 'react';
import Story from './Story';
import { useSession } from 'next-auth/react'; 

const Stories = () => {
    const [suggestions, setSuggestions] = useState([]);
    const { data: session } = useSession();

    useEffect(() => {
     const suggestions = [...Array(20)].map((_, index) => ({
        ...faker.helpers.contextualCard(),
        id: index,
     }));
     setSuggestions(suggestions);
    }, []);
    
  return (
    <>
     <div className='flex space-x-3 p-6 bg-white mt-3 border-gray-200 border overflow-x-scroll scrollbar-thin scrollbar-thumb-black rounded-sm'>

       {session && (
         <Story img={session.user.image}
         username={session.user.username}/>
       )}

         {suggestions.map((profile) => (
             <Story
              key={profile.id} 
              img={profile.avatar} 
              username={profile.username}/>
         ))}
         </div>

    </>
  )
}

export default Stories