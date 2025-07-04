export interface RecorderControls {
  startRecording: () => void;
  stopRecording: () => void;
  togglePauseResume: () => void;
  recordingBlob?: Blob;
  isRecording: boolean;
  isPaused: boolean;
  recordingTime: number;
  mediaRecorder?: MediaRecorder;
}

export interface RecorderProps {
  /**
   * This gets called when the save button is clicked.
   * In case the recording is cancelled, the blob is discarded.
   **/
  onRecordingComplete?: (blob: Blob) => void;
  /**
   * This gets called when the getUserMedia Promise is rejected.
   * It takes the resultant DOMException as its parameter.
   **/
  onNotAllowedOrFound?: (exception: DOMException) => any;
  /**
   * Allows calling of hook outside this component. The controls returned by the hook can then be passed to the component using this prop.
   * This allows for use of hook methods and state outside this component
   * @sample_usage https://github.com/samhirtarif/react-audio-recorder#combine-the-useaudiorecorder-hook-and-the-audiorecorder-component
   **/
  recorderControls?: RecorderControls;
  /**
   * Takes a {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSettings#instance_properties_of_audio_tracks subset} of
   * `MediaTrackConstraints` that apply to the audio track
   *
   * @Property `deviceId`
   * @Property `groupId`
   * @Property `autoGainControl`
   * @Property `channelCount`
   * @Property `echoCancellation`
   * @Property `noiseSuppression`
   * @Property `sampleRate`
   * @Property `sampleSize`
   */
  audioTrackConstraints?: MediaTrackConstraints;
  /**
   * Displays a waveform visualization for the audio when set to `true`. Defaults to `false`
   **/
  showVisualizer?: boolean;
  /**
   * The options passed to the HTML MediaRecorder API.
   **/
  mediaRecorderOptions?: MediaRecorderOptions;

  className?: string;
}

