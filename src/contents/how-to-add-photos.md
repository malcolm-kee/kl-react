---
title: How to Add Photos to kl-react.com
---

## Steps

1. compress the images with [Squoosh](https://squoosh.app/). Add resize settings to change it to width of 1600 pixels. (The maximum width displayed for event photos is 800px, we double it for retina display).
2. rename the files with the conventions `<event-id>_<optional_numbering>_<name>.<ext>`, e.g. `feb-2020_01-entrance.png`, where `<event_id>` is the id for the event, or the last part of the event page. For example, the URL for the February Meetup is `/event/feb-2020`.
3. upload the files to S3 buckets. You can [request access from Malcolm](mailto:malcolm.keeweesiong@gmail.com) or just send him the photos.

## Note

We store the images in a S3 bucket instead of this repo to avoid making the sizes of this repo unnecessarily.
