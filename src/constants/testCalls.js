const fetch = require("node-fetch");
const graph = require('fb-react-sdk');

const getSiteData = async(devFlag, endpoint) => {
  try {
    const resp = await fetch(`http://${devFlag === 'dev' ? 'localhost:7555' : 'rgvcovid19backend.herokuapp.com'}/${endpoint}`, {
    // const resp = await fetch(`http://localhost:7555/${endpoint}/${county}`, {
      mode: 'cors',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    return resp.json();
  } catch (e) {
    console.error(e);
    return { success: false, e };
  }
}

const getActiveCases = async(devFlag, endpoint) => {
  try {
    const resp = await fetch(`http://${devFlag === 'dev' ? 'localhost:7555' : 'rgvcovid19backend.herokuapp.com'}/${endpoint}`, {
    // const resp = await fetch(`http://localhost:7555/${endpoint}/${county}`, {
      mode: 'cors',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    return resp.json();
  } catch (e) {
    console.error(e);
    return { success: false, e };
  }
}

const getFBPosts = async() => {
  try {
    const resp = await fetch("https://rss-bridge-example.herokuapp.com/?action=display&bridge=Facebook&context=User&u=https%3A%2F%2Fwww.facebook.com%2Frisergv&media_type=novideo&skip_reviews=on&limit=5&format=Json", {
      // mode: "no-cors",
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    return resp.json();
  } catch (e) {
    console.error(e);
    return { success: false, e };
  }
}

getFBPosts().then(res => {
  res.items.forEach(item => { console.log(item)});
  // console.log({res});
});

// getSiteData('dev', 'getSiteData').then(
//     res => {
//         console.log(res);
//     }
// );

// getActiveCases('dev', 'getActiveCases/get').then(
//     res => {
//         console.log(res);
//     }
// );


// app id = 1728269927313562
// app secret = 17121d86b4f71956833950ce94a7f8e7
// {"access_token":"1728269927313562|G2VIFiK-8nHxI9U_hmCnQqccfgk","token_type":"bearer"}
// const access_token = '1728269927313562|G2VIFiK-8nHxI9U_hmCnQqccfgk';
// graph.setAccessToken(access_token);

// const userId = '106137601156849';
// graph.api(userId + "/posts", function(err, res) {
//   if (err) {
//     console.log({err});
//   } else {
//     // returns the post id
//     console.log({res}); // { id: xxxxx}
//   }
// });

// // curl -i -X GET \
// //  `https://graph.facebook.com/{your-user-id}
// //    ?fields=id,name
// //    &access_token={your-user-access-token}`

// curl -i -X GET `https://graph.facebook.com/106137601156849/feed?access_token=1728269927313562|G2VIFiK-8nHxI9U_hmCnQqccfgk`

// curl -i -X GET \
//  "https://graph.facebook.com/106137601156849?fields=id,name&access_token=1728269927313562|G2VIFiK-8nHxI9U_hmCnQqccfgk"
  