'use client'
import { useActionContext } from '@/context/ActionContext';
import { SandpackPreview, useSandpack } from '@codesandbox/sandpack-react'
import React, { useEffect, useRef } from 'react'

interface IresultSandBoxURL{
    editorUrl:string,
embedUrl: string, 
sandboxId:string 
}

interface ExtendedSandpackClient {
    getCodeSandboxURL: () => Promise<IresultSandBoxURL>;
}
  


export const SandPackPreviewClient = () => {
    const previewRef = useRef<React.ElementRef<typeof SandpackPreview>>(null);
    const { sandpack } = useSandpack();
    const {action,setAction } = useActionContext()

    useEffect(() => {
        
        GetSandPackClient()
    },[sandpack && action])

    const GetSandPackClient = async () => {
        const client = previewRef.current?.getClient() as unknown as ExtendedSandpackClient
        if (client) {
            console.log("client sand ",client)
            try {
                const result = await client.getCodeSandboxURL(); 

                if (action?.actionType == 'deploy') {
                    window.open('http://'+result?.sandboxId+'.csb.app/')
                } else if(action?.actionType == 'export') {
                    window.open(result?.editorUrl)
                }
                console.log('Result:', result);
              } catch (error) {
                console.error('Error fetching CodeSandbox URL:', error);
              }
        }
    }
  return (
      <SandpackPreview
      ref={previewRef}
          style={{ height: '75vh' }} showNavigator={true} />
    
  )
}
