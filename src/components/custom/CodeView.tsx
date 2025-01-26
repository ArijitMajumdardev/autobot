'use client'
import React, { useState } from 'react'
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import Lookup from '@/data/Lookup';

const CodeView = () => {
  const [activeTab, setActiveTab] = useState('code')
  const [files, setFiles] = useState(Lookup.DEFAULT_FILE)
  return (
    <div>
      <div className='w-full bg-[#181818] borfer p-2'>
        <div className='flex flex-wrap items-center justify-center shrink-0 bg-black p-1 w-[140px] gap-3  rounded-full'>
          <h2 className={`text-sm cursor-pointer 
            ${activeTab == 'code' && 'text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full'}`}
            onClick={()=>setActiveTab('code')}
          >
            Code
          </h2>
          <h2 className={`text-sm cursor-pointer 
            ${activeTab == 'preview' && 'text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full'}`}
          onClick={()=>setActiveTab('preview')}
          >
            Preview
          </h2>
        </div>
      </div>
      <SandpackProvider template="react" theme={'dark'} customSetup={{
        dependencies: {
            ...Lookup.DEPENDANCY
          }
      }}
        files={files} options={{
          externalResources:['https://cdn.tailwindcss.com']
        }}
      >
        <SandpackLayout>
          {activeTab == 'code' ? 
          (<>
          <SandpackFileExplorer style={{height:'75vh'}} />
          <SandpackCodeEditor style={{height:'75vh'}} />
          </>):
          
          (<>
      <SandpackPreview style={{height:'75vh'}}  showNavigator />

          </>)
          }
    </SandpackLayout>
  </SandpackProvider>
    </div>
  )
}

export default CodeView