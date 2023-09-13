import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";


import Card from '../../../components/Shared/Card/Card'
import Button from '../../../components/Shared/Button/Button'

const name = "zahid"
const StepAvatar = () => {
  const [image, setImage] = useState("/images/Avatar.png");
  const Navigate = useNavigate();

  // capture image
  function captureImage(e){
    
  }

  // submit image
  function submit(){
    Navigate("/rooms");
    
  }
  return (
   <Card title={`Okay,${name}`} icon="monkey-emoji">
    <p className='mb-5 text-center text-secondary-text'>Upload Your Profile Picture</p>
    <div className='w-[110px] h-[110px] border-[6px] border-secondary-text rounded-full flex items-center justify-center overflow-hidden'>
      <img className="h-[100%] w-[100%] object-cover" src={image} alt='profile'/>
    </div>
    <div>
					<input
						onChange={captureImage}
						id="avatarInput"
						type="file"
						className="hidden"
					/>
					<label className="inline-block my-8 cursor-pointer text-Active-text" htmlFor="avatarInput">
						Choose a different photo
					</label>
				</div>
				<div>
					<Button onClick={submit} text="Next" />
				</div>
   </Card>
  )
}

export default StepAvatar