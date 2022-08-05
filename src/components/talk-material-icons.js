import * as React from 'react';
import {
  FiCast as Cast,
  FiCode as Code,
  FiPlayCircle as PlayCircle,
} from 'react-icons/fi';
import { IconLink } from './icon-link';

export function TalkMaterialIcons({ type, url }) {
  switch (type) {
    case 'repo':
      return (
        <IconLink
          to={url}
          aria-label="See code repository"
          title="See code repository"
        >
          <Code className="w-5 h-5" />
        </IconLink>
      );

    case 'demo':
      return (
        <IconLink to={url} aria-label="See live demo" title="See live demo">
          <PlayCircle className="w-5 h-5" />
        </IconLink>
      );

    case 'slide':
      return (
        <IconLink to={url} aria-label="See slides" title="See slides">
          <Cast className="w-5 h-5" />
        </IconLink>
      );

    default:
      return null;
  }
}
