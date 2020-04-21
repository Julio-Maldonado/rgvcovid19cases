import React from 'react';
import ReactGA from 'react-ga';

import { RESOURCES } from '../constants/constants';

const RGVResources = () => {
  return (
    <div className="press-releases-div">
        <ul className="nobull">
          {
            RESOURCES.map(({title, url, description}, i) => {
              return (
                <li key={i + title}>
                  {description}: <div
                    onClick={() => ReactGA.event({
                    category: "Resource Visit",
                    action: `User navigated to ${title}: url = ${url} with description: ${description}`,
                  })}><a rel="noopener noreferrer" target="_blank" href={url} className="App-link">{title}</a></div>
                </li>
              );
            })
          }
        </ul>
      <br />
    </div>
  );
};

export default RGVResources;
