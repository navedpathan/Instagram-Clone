import {
    HeartIcon,
    PaperAirplaneIcon,
    DotsHorizontalIcon,
    ChatIcon,
    BookmarkIcon,
    EmojiHappyIcon,
  } from '@heroicons/react/outline';
  import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import Moment from 'react-moment';
import Image from 'next/image'

function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession();
  const [ comment, setComment ] = useState('');
  const [ comments, setComments ] = useState([]);
  const [ likes, setLikes ] = useState([]);
  const [ hasLiked, setHasLiked ] = useState(false);

  useEffect(() => {
    onSnapshot(
      query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')), 
      (snapshot) => setComments(snapshot.docs))
  }, [db, id]);
  

  useEffect(() => {
    onSnapshot(
      collection(db, 'posts', id, 'likes'),
      (snapshot) => setLikes(snapshot.docs)
    )
  }, [db, id]);

  useEffect(() => {
   setHasLiked(
     likes.findIndex( (like) => like.id == session?.user?.userid ) !== -1
     );
  }, [likes])
  
  const likePost = async (e) => {
    if (hasLiked) {
         await deleteDoc(doc(db, 'posts', id, 'likes', session.user.userid));
    } else {
      await setDoc(doc(db, 'posts', id , 'likes', session.user.userid), {
        username: session.user.username
      });
    }
    };
    console.log(hasLiked)
  
  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment('');

    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp()
    })
  }
  console.log(comments);

  return (
    <div className='bg-white my-7 border rounded-sm'>
        
        {/* Header */}
        <div className='flex items-center p-3'>
            <Image src={userImg}className='rounded-full h-12 w-12 object-contain border p-1 mr-3' alt="" />
            <p className='flex-auto font-bold'>{username}</p>
            <DotsHorizontalIcon className='h-5'/>
        </div>

        {/* img */}
        <Image src={img} className='object-cover w-full' alt="Loading..." />

        {/* Buttons */}
        {session && (
        <div className='flex justify-between p-2 px-4'>
        <div className='flex space-x-4'>
          {
            hasLiked ? (
              <HeartIconFilled onClick={likePost} className='btn text-red-500' />
            ) : (
              <HeartIcon onClick={likePost} className='btn'/>
            )
          }
            <ChatIcon className='btn'/>
            <PaperAirplaneIcon className='btn'/>
        </div>

        <BookmarkIcon className='btn'/>
        </div>
        )}

        {/* caption */}
        <p className='px-4 pt-1 truncate'>
          {likes.length > 0 && (
            <p className='font-bold mb-1'>{likes.length}  likes </p>
          )}
            <span className='font-bold mr-1'>{username}</span>
            {caption}
        </p>

        {/* comments */}
        {comments.length > 0 && (
          <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin mt-4'>
            {comments.map((comment) => (
              <div key={comment.id} className='flex items-center space-x-2 mb-3'>
                <Image src={comment.data().userImage} className='h-7 rounded-full' alt="" />
                <p className='text-sm flex-1'>
                  <span className='font-bold mr-1'>{comment.data().username}</span>{comment.data().comment}
                </p>

                <Moment fromNow className='pr-5 text-xs'>
                  {comment.data().timestamp?.toDate()}
                </Moment>
              </div>
            ))}
          </div>
        )}

        {/* input box */}
        {session && (
        <form className='flex items-center px-4 py-2'>
            <EmojiHappyIcon className='h-7'/>
            <input 
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='Add a comment...' 
            className=' flex-1 border-none outline-none focus:ring-0'
            />
            <button 
            type='submit' 
            disabled={!comment.trim()} 
            onClick={sendComment} 
            className='font-semibold text-blue-400 transform hover:text-blue-600'>Post</button>
        </form>
        )}

    </div>
  )
}

export default Post