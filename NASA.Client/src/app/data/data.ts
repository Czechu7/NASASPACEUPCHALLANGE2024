import { EonetEvent } from '../interfaces/eonet.interface';

export const customZagrebEvent: EonetEvent = {
  id: 'EONET_99999',
  title: 'Minor Earthquake near Zagreb',
  description:
    'A minor earthquake has been reported near the city of Zagreb, Croatia.',
  link: 'https://example.com/events/EONET_99999',
  categories: [
    {
      id: 16,
      title: 'Earthquakes',
    },
  ],
  sources: [
    {
      id: 'USGS',
      url: 'https://earthquake.usgs.gov/earthquakes/eventpage/EONET_99999',
    },
  ],
  geometries: [
    {
      date: '2024-10-05T10:00:00Z',
      type: 'Point',
      coordinates: [15.9819, 45.815],
      isGame: true,
    },
  ],
};
