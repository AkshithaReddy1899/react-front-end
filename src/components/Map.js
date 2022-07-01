import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

function Map(props) {
  const { markers, setTooltipContent } = props;

  return (
    <div className="container-lg">
      <ComposableMap projection="geoMercator" width={950} height={650} projectionConfig={{ rotate: [-10, 0, 0], scale: 147 }} data-tip="">
        <Geographies geography={geoUrl}>
          {({ geographies }) => geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#EAEAEC"
              stroke="#D6D6DA"
            />
          ))}
        </Geographies>
        {markers.map(({ id, name, coordinates }) => (
          <Link to="/person" key={id} state={{ id }}>
            <Marker
              coordinates={coordinates}
              onMouseEnter={() => {
                setTooltipContent(name);
              }}
              onMouseLeave={() => {
                setTooltipContent('');
              }}
            >
              <g
                fill="none"
                stroke="#FF5533"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="10" r="2" />
                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
              </g>
            </Marker>
          </Link>
        ))}
      </ComposableMap>
    </div>
  );
}

Map.defaultProps = {
  markers: [
    {
      coordinates: [],
      name: 'Name',
      id: 0,
    },
  ],
};

Map.propTypes = {
  markers: PropTypes.arrayOf(PropTypes.shape({
    coordinates: PropTypes.arrayOf,
    name: PropTypes.string,
    id: PropTypes.number,
  })),
  setTooltipContent: PropTypes.func.isRequired,
};

export default Map;
