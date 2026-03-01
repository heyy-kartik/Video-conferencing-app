/* eslint-disable @typescript-eslint/no-unused-vars */
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import React from 'react'
import {useUser} from '@clerk/nextjs'
import { useEffect , useState } from 'react'
const useGetCalls = () => {

     
     
  const [calls, setcalls] = useState<Call[]>([])
  const [isLoading, setisLoading] = useState(false)
  const client = useStreamVideoClient(); 
  const {user} = useUser();
}

export default useGetCalls; 
