import axios from "axios";
const apiDomain = "https://dev1-www.mh3838.com/";

export async function callApi(config: IAPIConfig) {
  const url = `${apiDomain}${config.path}`;
  const params = config.params ? config.params : undefined;

  await axios
    .post(url, params, { withCredentials: true })
    .then((response) => {
      const data = response.data;
      const callback = config.callback;
      if (data.code === 200) {
        callback && callback(data, undefined);
      } else if (data.code === 400) {
        callback && callback(undefined, data.msg);
      }
    })
    .catch((err) => {
      const callback = config.callback;
      callback && callback(undefined, err);
    });
}

export async function callMultipleApi(configs: IAPIConfig[], callback) {
  const requests = [];

  configs.forEach((config: IAPIConfig): void => {
    const url = `${apiDomain}${config.path}`;
    requests.push(axios.post(url));
  });

  axios.all(requests).then(
    axios.spread((...responses) => {
      callback && callback(responses, undefined);
    })
  );
}

export function loginGame(platform: string, gameCode?: string): void {
  let url = `${apiDomain}transfer/login-game?platform=${platform}`;
  if (gameCode) {
    url = `${url}&gamecode=${gameCode}`;
  }

  window.open(url, "_blank");
}
