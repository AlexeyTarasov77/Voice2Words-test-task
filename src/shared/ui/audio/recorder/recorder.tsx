import { useEffect, ReactElement } from "react";

import { RecorderProps } from "./types";
import { useAudioRecorder } from "./use-audio-recorder";
import { LiveAudioVisualizer } from "../visualizer";
import { cn } from "@/shared/lib/css";
import { Mic, Pause, Save, Play, Trash } from "lucide-react";

export const AudioRecorder: (props: RecorderProps) => ReactElement = ({
  onRecordingComplete,
  onNotAllowedOrFound,
  recorderControls,
  audioTrackConstraints,
  showVisualizer = false,
  mediaRecorderOptions,
  className
}: RecorderProps) => {
  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder,
  } =
    recorderControls ??
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAudioRecorder(
      audioTrackConstraints,
      onNotAllowedOrFound,
      mediaRecorderOptions
    );


  useEffect(() => {
    if (
      (recorderControls) &&
      recordingBlob != null &&
      onRecordingComplete != null
    ) {
      onRecordingComplete(recordingBlob);
    }
  }, [recordingBlob]);

  return (
    <div
      className={cn(
        "flex items-center shadow-md gap-3 p-2 rounded-full text-black transition-all duration-200 ease-in max-w-fit bg-destructive overflow-hidden",
        isRecording && "rounded-xl ease-out",
        className
      )}
    >
      <span
        className="cursor-pointer rounded-full"
        onClick={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? <Save /> : <Mic />}
      </span>

      {isRecording &&
        <>
          <span
            className="text-[14px] leading-none font-normal font-sans"
          >
            {Math.floor(recordingTime / 60)}:
            {String(recordingTime % 60).padStart(2, "0")}
          </span>

          {showVisualizer ? (
            <span
              className={cn(
                "flex flex-grow items-center self-center",
              )}
            >
              {mediaRecorder && (
                <LiveAudioVisualizer
                  mediaRecorder={mediaRecorder}
                  barWidth={2}
                  barColor="rgb(0,0,0)"
                  gap={2}
                  width={140}
                  height={30}
                  fftSize={512}
                  maxDecibels={-10}
                  minDecibels={-80}
                  smoothingTimeConstant={0.4}
                />
              )}
            </span>
          ) : (
            <span
              className="text-[14px] font-normal font-sans flex items-baseline flex-grow animate-pulse"
            >
              <span className="bg-red-600 rounded-full h-[10px] w-[9px] mr-1.5" />
              Recording
            </span>
          )}


          <span
            className="cursor-pointer"
            onClick={togglePauseResume}
          >
            {isPaused ? <Play /> : <Pause />}
          </span>

          <span
            className="cursor-pointer"
            onClick={stopRecording}
          >
            <Trash />
          </span>
        </>
      }
    </div>
  );
};

