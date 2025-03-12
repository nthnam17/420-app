// ;(function () {
//   // Lưu trữ hàm gốc của XMLHttpRequest và fetch
//   const originalXHROpen = XMLHttpRequest.prototype.open
//   // const originalFetch = window.fetch

//   // Monkey patch XMLHttpRequest
//   XMLHttpRequest.prototype.open = function (method, url) {
//     console.log(url, 'url')
//     this.addEventListener('load', function () {
//       if (url.includes('https://x.com/i/api/1.1')) {
//         const authHeader = this.getResponseHeader('Authorization')
//         if (authHeader && authHeader.startsWith('Bearer ')) {
//           console.log('Bearer Token (XMLHttpRequest):', authHeader)
//         }
//       }
//     })
//     originalXHROpen.apply(this, arguments)
//   }

//   // // Monkey patch fetch
//   // window.fetch = function () {
//   //   return originalFetch.apply(this, arguments).then((response) => {
//   //     if (response.url.includes('https://x.com/i/api/1.1')) {
//   //       const authHeader = response.headers.get('Authorization')
//   //       if (authHeader && authHeader.startsWith('Bearer ')) {
//   //         console.log('Bearer Token (Fetch):', authHeader)
//   //       }
//   //     }
//   //     return response
//   //   })
//   // }

//   console.log('Script đã chạy. Theo dõi các yêu cầu mạng để lấy Bearer Token...')
// })()
// ;(function () {
//   const originalXHROpen = XMLHttpRequest.prototype.open

//   XMLHttpRequest.prototype.open = function (method, url) {
//     if (url.includes('https://api.x.com/1.1/')) {
//       const authHeader = this.getResponseHeader('authorization')
//       console.log(authHeader, 'header')

//       if (authHeader && authHeader.startsWith('Bearer ')) {
//         console.log('Bearer Token (XMLHttpRequest):', authHeader)
//       }
//     }
//     originalXHROpen.apply(this, arguments)
//   }

//   console.log('Script đã chạy. Theo dõi các yêu cầu mạng để lấy Bearer Token...')
// })()




try {
  a.headers["X-Client-Transaction-Id"] = await async function(e, n) {
          xn = xn || new Promise((e => {
              d.e("ondemand.s").then(d.bind(d, 71269)).then((n => e(n.default())))
          }));
          const t = await xn;
          return await t(e, n)
      }
      (function(e) {
          return (e || "").split("?")[0].trim()
      }(t), e)
} catch (e) {
  a.headers["X-Client-Transaction-Id"] = btoa(`e:${e}`)
}
}
return t(a)
}
}
var Ln = d(63752),
  Fn = d(24058),
  On = d(90742);
const Zn = ["/1.1/help/settings.json", "/1.1/live_pipeline", "/1.1/account", "/1.1/attribution", "/1.1/onboarding", "/1.1/guest/activate.json"],
  Un = ({
      featureSwitches: e,
      store: n
  }) => (d, t) => {
      if (!On.Qb(n.getState())) return t(d);
      if (a = d.path, Zn.some((e => a.includes(e)))) return t(d);
      var a;
      if (!e.isTrue("responsive_web_api_transition_enabled")) return t(d);
      if (d.host !== In.F$) return t(d);
      if (d.headers["x-act-as-user-id"]) return t(d);
      if (!(0, Fn.ej)({
              cookieName: Ln.qj,
              featureSwitches: e
          })) return t(d);
      const r = `/i/api${d.path}`,
          l = window.location.origin + r;
      return t({
          ...d,
          host: window.location.origin,
          path: r,
          uri: l
      })
  };
d(21515);
var Hn = d(20647),
  zn = d(32307);
const Vn = {},
  jn = (e, n) => {
      if ("GET" === e.method) {
          const d = (0, Hn.X)(e.params),
              t = [e.uri, d].filter(Boolean).join("?");
          let a = Vn[t];
          a || (a = Vn[t] = new Map);
          for (const [n, d] of a)
              if ((0, zn.Z)(n, e.headers)) return d;
          const r = n(e).finally((() => {
              a.delete(e.headers), 0 === a.size && delete Vn[t]
          }));
          return a.set(e.headers, r), r
      }
      return n(e)
  };
var qn = d(56726),
  Wn = d(31388);

function Kn(e) {
  return (n, d) => (e && !(0, Wn.Mb)(n) && Object.assign(n.headers, (0, qn.L)(e)), d(n))
}
var $n = d(93863),
  Gn = d(66136),
  Qn = d(22907);

function Jn(e) {
  return (n, d) => {
      if (n.host === In.F$ || n.host === Qn.Y) {
          const d = e(),
              t = (0, On.F5)(d.getState());
          t && (n.headers["x-twitter-client-language"] = (0, Gn.o)(t))
      }
      return d(n)
  }
}
var Yn = d(11273);
const Xn = (e, n) => (0, Yn.fH)("prod") || !window.__INJECTED_FILTER__ ? n(e) : window.__INJECTED_FILTER__(e, n);
var ed = d(13421);
const nd = ["cookie", "user-agent", "referer", "x-b3-spanid", "x-b3-traceid", "x-client-transaction-id", "x-twitter-ip-tags"];
