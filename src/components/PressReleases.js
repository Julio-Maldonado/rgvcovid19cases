import React from 'react';
import { PRESS_RELEASES } from '../constants/constants';

const PressReleases = () => {
  return (
    <div className="press-releases-div">
        <ul className="nobull">
          {
            PRESS_RELEASES.map(({title, url, date}, i) => {
              return (
                <li key={i + title}>
                  <p id="p">{date.substr(1,4)}: <a href={url} className="App-link">{title}</a></p>
                </li>
              );
            })
          }
        </ul>
      <br />
    </div>
  );
};

export default PressReleases;
