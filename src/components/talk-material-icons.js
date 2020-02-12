import React from 'react';
import { IconLink } from './icon-link';
import { Cast, Code, PlayCircle } from 'react-feather';

export function TalkMaterialIcons({ type, url }) {
  switch (type) {
    case 'repo':
      return (
        <IconLink
          to={url}
          aria-label="See code repository"
          title="See code repository"
        >
          <Code />
        </IconLink>
      );

    case 'demo':
      return (
        <IconLink to={url} aria-label="See live demo" title="See live demo">
          <PlayCircle />
        </IconLink>
      );

    case 'slide':
      return (
        <IconLink to={url} aria-label="See slides" title="See slides">
          <Cast />
        </IconLink>
      );

    default:
      return null;
  }
}
