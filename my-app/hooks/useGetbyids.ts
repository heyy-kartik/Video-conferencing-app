import { useEffect , useState } from "react";

import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'; 
export const useGetByIds = (ids: string[]) => {

    const [call, setcall] = useState<Call>()
    const [iscallloading, setiscallloading] = useState(true)
  const [data, setData] = useState<any[]>([]);

  const client = useStreamVideoClient();
  useEffect(() => {
    
  if(!client) return;
  const      
    return () => {
    
    }
  }, [third])
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 
    
      return { data, loading, error };

};
