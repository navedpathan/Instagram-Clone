import Image from 'next/image'

const Story = ({img, username}) => {
  return (
    <>
    <div>
     <Image className='h-14 w-14 p-[1.5px] rounded-full border-red-500 border-2 object-contain cursor-pointer transform hover:scale-110 transition duration-200 ease-out
     ' src={img} alt="" />
    <p className="text-sm w-16 truncate">{username}</p>
    </div>
    </>
  )
}

export default Story