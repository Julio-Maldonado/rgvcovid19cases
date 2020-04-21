import React from 'react';
import { PRESS_RELEASES } from '../constants/constants';
import ReactGA from 'react-ga';

const PressReleases = () => {
  return (
    <div className="press-releases-div">
        <ul className="nobull">
          {
            PRESS_RELEASES.map(({title, url, date}, i) => {
              return (
                <li key={i + title}>
                  <div>
                  <p id="p" style={{display:'inline'}}>{date.substr(1,4)}: </p> <div
                    onClick={() => ReactGA.event({
                    category: "Press Release Visit",
                    action: `User navigated to ${title}: url = ${url} with date: ${date}`,
                  })}><a href={url} rel="noopener noreferrer" target="_blank" className="App-link">{title}</a></div>
                  </div>
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
