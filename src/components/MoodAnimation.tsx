import React, { useRef, useEffect } from 'react';
import { ViewStyle } from 'react-native';
import LottieView from 'lottie-react-native';

const SEGMENT_SIZE = 24; // total frames per mood (in + out)
const HALF_SEGMENT = 12; // frames for mood-in or mood-out

// Each mood segment (24 frames):
//   mood-in:  N to N+12  (transition into mood)
//   mood:     N+12       (mood keyframe)
//   mood-out: N+12 to N+24 (transition out of mood)
const moodFrameMap: Record<string, { start: number; end: number }> = {
  awful: { start: 0, end: HALF_SEGMENT },
  bad: { start: SEGMENT_SIZE, end: SEGMENT_SIZE + HALF_SEGMENT },
  okay: { start: SEGMENT_SIZE * 2, end: SEGMENT_SIZE * 2 + HALF_SEGMENT },
  good: { start: SEGMENT_SIZE * 3, end: SEGMENT_SIZE * 3 + HALF_SEGMENT },
  awesome: { start: SEGMENT_SIZE * 4, end: SEGMENT_SIZE * 4 + HALF_SEGMENT },
};

interface MoodAnimationProps {
  mood: string;
  size?: number;
  style?: ViewStyle;
}

export function MoodAnimation({ mood, size = 120, style }: MoodAnimationProps) {
  const lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    const frames = moodFrameMap[mood];
    if (frames && lottieRef.current) {
      lottieRef.current.play(frames.start, frames.end);
    }
  }, [mood]);

  return (
    <LottieView
      ref={lottieRef}
      source={require('../MoodAnimation.json')}
      autoPlay={false}
      loop={false}
      style={[{ width: size, height: size }, style]}
    />
  );
}
