import React from 'react';
import videoConnect from 'react-html5video';
import {
  Time,
  Seek,
  Volume,
  Captions,
  PlayPause,
  Fullscreen,
  Overlay
} from 'react-html5video';
import {
  setVolume,
  showTrack,
  toggleTracks,
  toggleMute,
  togglePause,
  setCurrentTime,
  toggleFullscreen,
  getPercentagePlayed,
  getPercentageBuffered
} from './API';
import Magnet from './Magnet';
import Discord from './Discord';
import ArlongPark from './ArlongPark';
import '../../../index.scss';

const controls = ['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen', 'Captions', 'Magnet', 'Discord', 'ArlongPark'];

const DefaultPlayer = ({
  video,
  videoEl,
  controls,
  children,
  onSeekChange,
  onVolumeChange,
  onVolumeClick,
  onCaptionsClick,
  onPlayPauseClick,
  onFullscreenClick,
  onCaptionsItemClick,
  onMagnetClick,
  onDiscordClick,
  onArlongParkClick,
  ...restProps
}) => (
    <div className="video-player">
      <video className="video" {...restProps}>
        {children}
      </video>
      <Overlay onClick={onPlayPauseClick} {...video} />
      { 
        controls && controls.length && !video.error ?
          <div className="controls">
            {
              controls.map((control, i) => {
                switch (control) {
                  case 'Seek': return <Seek key={i} ariaLabel={"Seek video"} className="seek" onChange={onSeekChange} {...video} />;
                  case 'PlayPause': return <PlayPause key={i} ariaLabelPlay={"Play video"} ariaLabelPause={"Pause video"} onClick={onPlayPauseClick} {...video} />;
                  case 'Fullscreen': return <Fullscreen key={i} ariaLabel={"View video fullscreen"} onClick={onFullscreenClick} {...video} />;
                  case 'Time': return <Time key={i} {...video} />;
                  case 'Volume': return <Volume key={i} onClick={onVolumeClick} onChange={onVolumeChange} ariaLabelMute={"Mute video"} ariaLabelUnmute={"Unmute video"} ariaLabelVolume={"Change volume"} {...video} />;
                  case 'Captions': return video.textTracks && video.textTracks.length ? <Captions key={i} onClick={onCaptionsClick} ariaLabel={"Toggle captions"} onItemClick={onCaptionsItemClick} {...video} /> : null;
                  case 'Magnet': return <Magnet key={i} onClick={onMagnetClick} {...video} />;
                  case 'Discord': return <Discord key={i} onClick={onDiscordClick} {...video} />;
                  case 'ArlongPark': return <ArlongPark key={i} onClick={onArlongParkClick} {...video} />;
                  default: return null;
                }
              })
            }
          </div>
          : null
      }
    </div>
  );

const connectedPlayer = videoConnect(
  DefaultPlayer,
  ({ networkState, readyState, error, ...restState }) => ({
    video: {
      readyState,
      networkState,
      error: error || networkState === 3,
      loading: readyState < (/iPad|iPhone|iPod/.test(navigator.userAgent) ? 1 : 4),
      percentagePlayed: getPercentagePlayed(restState),
      percentageBuffered: getPercentageBuffered(restState),
      ...restState
    }
  }),
  (videoEl, state) => ({
    onFullscreenClick: () => toggleFullscreen(videoEl.parentElement),
    onVolumeClick: () => toggleMute(videoEl, state),
    onCaptionsClick: () => toggleTracks(state),
    onPlayPauseClick: () => togglePause(videoEl, state),
    onCaptionsItemClick: (track) => showTrack(state, track),
    onVolumeChange: (e) => setVolume(videoEl, state, e.target.value),
    onSeekChange: (e) => setCurrentTime(videoEl, state, e.target.value * state.duration / 100)
  })
);

export default connectedPlayer;
