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

   useEffect(() => {
      
    const loadCalls = async () => {
      if(!client || !user?.id) return;
      setisLoading(true);
      try {
        const {calls } = await client.queryCalls({
          sort: [{field: 'starts_at', direction: -1}],
           filter_conditions : {
            starts_at : {$exists : true}, 
            $or : [
              {created_by_id : user.id}, 
              {participants : {$in : [user.id]}}
            ], 
           }, 
        }); 
        setcalls(calls);
      } catch (error) {
        console.error("Error fetching calls:", error);
      }
       finally {setisLoading(false) }
    }  
    loadCalls();}, 
      
              
     
       [client , user?.id])
     
}

const now = new Date(); 

  const endedCalls = Call?.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (startsAt && new Date(startsAt) < now) || !!endedAt
  })
export default useGetCalls; 
