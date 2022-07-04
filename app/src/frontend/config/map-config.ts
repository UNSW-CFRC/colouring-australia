interface MapViewport {
    position: [number, number];
    zoom: number;
}

export const initialMapViewport: MapViewport = {
  position: [-31.9523, 115.8613 ], // lat,lng
  zoom: 16,
};

export type MapTheme = 'light' | 'night';

export const mapBackgroundColor: Record<MapTheme, string> = {
    light: '#F0EEEB',
    night: '#162639'
};
