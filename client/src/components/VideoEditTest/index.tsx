import React, {useCallback, useEffect, useRef} from 'react';
import RecordRTC from 'recordrtc';
import axios from 'axios';

let recorder: RecordRTC;

import styled from 'styled-components';
import EditorJSText from '../EditorJSTest';

const VideoEditTest: React.FC /**
 *
 */
  = () => {
    const previewRef = useRef<HTMLVideoElement>(null);
    const videoRefCallback = useCallback<(el: HTMLVideoElement) => void>((el) => {
      navigator.mediaDevices.getUserMedia({audio: true, video: true}).then((stream) => {
        if (el === null) {
          return;
        }
        el.srcObject = stream;
      });
    }, []);

    useEffect(() => {
      navigator.mediaDevices.getUserMedia({audio: true, video: true}).then((stream) => {
        recorder = new RecordRTC(stream, {type: 'video', video: {width: 1920, height: 1080}});
      });
    }, []);

    const handleStartClick = () => {
      recorder.startRecording();
    };
    const handleStopClick = () => {
      recorder.stopRecording(() => {
        if (previewRef.current === null) return;
        previewRef.current.src = recorder.toURL();
        const formData = new FormData();
        formData.append('video', recorder.getBlob());
        axios.post('http://10.10.20.230:3001/upload-video', formData).then(() => {
          alert('upload ok!');
        });
      });
    };

    return <Scaffold>
      <EditorContainer>
        <EditorJSText/>
      </EditorContainer>
      <VideoContainer>
        <CameraVideo
          ref={videoRefCallback}
          autoPlay
          controls={false}
          muted
        />
        <div>
        Record Preview
          <video
            ref={previewRef}
            controls
            width="250"
          />
          <button onClick={handleStartClick}>start recording</button>
          <button onClick={handleStopClick}>stop recording</button>
        </div>
      </VideoContainer>
    </Scaffold>;
  };

export default VideoEditTest;

const Scaffold = styled.div`
  display: flex;
  flex-direction: row;
`;

const VideoContainer = styled.div`
  flex: 1;
  max-width: 30rem;
  
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const CameraVideo = styled.video`
  transform: scaleX(-1);
`;

const EditorContainer = styled.div`
  flex: 1;
`;
