module.exports = {
  convertTestType: (testType) => {
    const config = {
      object: {
        id: 2,
        name: 'Object'
      },
      emulated: {
        id: 3,
        name: 'Emulated'
      },
      ieBrowser: {
        id: 0,
        name: 'IEBrowser'
      },
      tcp: {
        id: 15,
        name: 'Tcp'
      },
      ftp: {
        id: 16,
        name: 'Ftp'
      },
      pingIcmp: {
        id: 8,
        name: 'PingIcmp'
      },
      pingTcp: {
        id: 15,
        name: 'PingTcp'
      },
      pingUdp: {
        id: 23,
        name: 'PingUdp'
      },
      dnsDirect: {
        id: 13,
        name: 'DnsDirect'
      },
      dnsExperience: {
        id: 12,
        name: 'DnsExperience'
      },
      chromeBrowser: {
        id: 18,
        name: 'ChromeBrowser'
      },
      mobile: {
        id: 26,
        name: 'Mobile'
      },
      playback: {
        id: 19,
        name: 'Playback'
      },
      MobilePlayback: {
        id: 20,
        name: 'MobilePlayback'
      },
      smtp: {
        id: 21,
        name: 'SMTP'
      },
      api: {
        id: 25,
        name: 'Api'
      },
      streaming: {
        id: 24,
        name: 'Streaming'
      },
      ssh: {
        id: 28,
        name: 'Ssh'
      },
      tracerouteIcmp: {
        id: 9,
        name: 'TraceRouteIcmp'
      },
      tracerouteUdp: {
        id: 14,
        name: 'TraceRouteUdp'
      },
      tracerouteTcp: {
        id: 29,
        name: 'TraceRouteTcp'
      },
    };

    return config[testType];
  },
  convertMonitor: (monitorName) => {
    const config = {
      web: {
        id: 0,
        name: 'Web'
      },
      transaction: {
        id: 1,
        name: 'Transaction'
      },
      htmlCode: {
        id: 2,
        name: 'HtmlCode'
      },
      ftp: {
        id: 3,
        name: 'Ftp'
      },
      tcp: {
        id: 4,
        name: 'Tcp'
      },
      dns: {
        id: 5,
        name: 'Dns'
      },
      ping: {
        id: 6,
        name: 'Ping'
      },
      smtp: {
        id: 7,
        name: 'Smtp'
      },
      api: {
        id: 9,
        name: 'Api'
      },
      streaming: {
        id: 10,
        name: 'Streaming'
      },
      ssh: {
        id: 11,
        name: 'Ssh'
      },
      traceroute: {
        id: 12,
        name: 'TraceRoute'
      },
    };

    return config[monitorName];
  }
};
