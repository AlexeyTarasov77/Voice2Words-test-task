import {
  type ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { calculateBarData, draw } from "./utils";
import { VisualizerProps } from "./types";


export const LiveAudioVisualizer: (props: VisualizerProps) => ReactElement = ({
  mediaRecorder,
  width = "100%",
  height = "100%",
  barWidth = 2,
  gap = 1,
  backgroundColor = "transparent",
  barColor = "rgb(160, 198, 255)",
  fftSize = 1024,
  maxDecibels = -10,
  minDecibels = -90,
  smoothingTimeConstant = 0.4,
}: VisualizerProps) => {
  const [context, setContext] = useState<AudioContext>();
  const [audioSource, setAudioSource] = useState<MediaStreamAudioSourceNode>();
  const [analyser, setAnalyser] = useState<AnalyserNode>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!mediaRecorder.stream) return;

    const ctx = new AudioContext();
    const analyserNode = ctx.createAnalyser();
    setAnalyser(analyserNode);
    analyserNode.fftSize = fftSize;
    analyserNode.minDecibels = minDecibels;
    analyserNode.maxDecibels = maxDecibels;
    analyserNode.smoothingTimeConstant = smoothingTimeConstant;
    const source = ctx.createMediaStreamSource(mediaRecorder.stream);
    source.connect(analyserNode);
    setContext(ctx);
    setAudioSource(source);

    return () => {
      source.disconnect();
      analyserNode.disconnect();
      ctx.state !== "closed" && ctx.close();
    };
  }, [mediaRecorder.stream]);

  useEffect(() => {
    if (analyser && mediaRecorder.state === "recording") {
      report();
    }
  }, [analyser, mediaRecorder.state]);

  const report = useCallback(() => {
    if (!analyser || !context) return;

    const data = new Uint8Array(analyser?.frequencyBinCount);

    if (mediaRecorder.state === "recording") {
      analyser?.getByteFrequencyData(data);
      processFrequencyData(data);
      requestAnimationFrame(report);
    } else if (mediaRecorder.state === "paused") {
      processFrequencyData(data);
    } else if (
      mediaRecorder.state === "inactive" &&
      context.state !== "closed"
    ) {
      context.close();
    }
  }, [analyser, context?.state]);

  useEffect(() => {
    return () => {
      if (context && context.state !== "closed") {
        context.close();
      }
      audioSource?.disconnect();
      analyser?.disconnect();
    };
  }, []);

  const processFrequencyData = (data: Uint8Array): void => {
    if (!canvasRef.current) return;

    const dataPoints = calculateBarData(
      data,
      canvasRef.current.width,
      barWidth,
      gap
    );
    draw(
      dataPoints,
      canvasRef.current,
      barWidth,
      gap,
      backgroundColor,
      barColor
    );
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        aspectRatio: "unset",
      }}
    />
  );
};

