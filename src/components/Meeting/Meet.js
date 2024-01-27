import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

import { useLocation } from 'react-router-dom';
const Meet = () => {
    const {meetId} = useParams();
    const location = useLocation();
    const userID = location.state?.userID;
    

    const meeting = async(element)=>{
        const appID = 1684575977;
        const serverSecret = "3e5a4f5f1bea0f8c0651c000f5694a5e";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID ,serverSecret  , meetId ,userID , "name");
        const zc = ZegoUIKitPrebuilt.create(kitToken)
        zc.joinRoom({
            container:element,
            scenario:{
                mode : ZegoUIKitPrebuilt.OneONoneCall,
            }
        })
    }
  return (
    <div style={{height:'80vh'}}>
      <div ref={meeting} style={{height:'90vh'}}>
      </div>
    </div>
  )
}

export default Meet
